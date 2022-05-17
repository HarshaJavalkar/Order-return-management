import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpHeaders,
} from '@angular/common/http';
import { EMPTY, Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable()
export class BaseInterceptor implements HttpInterceptor {
  isExpired: any;
  constructor(private jwtHelper: JwtHelperService, private router: Router) {
    const helper = new JwtHelperService();

    let token = sessionStorage.getItem('token');
    if (token) this.isExpired = helper.isTokenExpired(token);
  }

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (this.isExpired) {
      return EMPTY;
    } else {
      request = request.clone({
        headers: this.addExtraHeaders(request.headers),
      });
      return next.handle(request);
    }
  }

  private addExtraHeaders(headers: HttpHeaders): HttpHeaders {
    // let username = 'dev';
    // let password = 'test';
    // let authToken = 'Basic ' + window.btoa(username + ':' + password);
    let authToken = sessionStorage.getItem('token');

    if (authToken) {
      headers = headers.append('Authorization', `Bearer ${authToken}`);
    }
    return headers;
  }
}
