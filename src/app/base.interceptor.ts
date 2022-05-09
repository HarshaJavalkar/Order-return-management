import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpHeaders,
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class BaseInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    request = request.clone({ headers: this.addExtraHeaders(request.headers) });

    return next.handle(request);
  }

  private addExtraHeaders(headers: HttpHeaders): HttpHeaders {
    let username = 'dev';
    let password = 'test';

    let authToken = 'Basic ' + window.btoa(username + ':' + password);
    headers = headers.append('Authorization', authToken);

    return headers;
  }
}
