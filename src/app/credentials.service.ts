import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import Constants from './data/constants';

@Injectable({
  providedIn: 'root',
})
export class CredentialsService {
  url: string = `${Constants.LOGIN_BASE_URI}/authentications/login`;
  constructor(private http: HttpClient) {}
  validateCred(userObj: any): Observable<any> {
    return this.http.post(this.url, userObj);
  }

  getHeaders() {
    let basicAuthHeaderString = this.createBasicHttpHeaders();

    let header = new HttpHeaders({
      Authorization: basicAuthHeaderString,
    });

    return header;
  }
  getUsers() {
    return this.http
      .get(`${Constants.LOGIN_BASE_URI}/authentications/users`)
      .pipe(
        map((data) => {
          sessionStorage.setItem('users', 'test');
          return data;
        })
      );
  }

  createBasicHttpHeaders() {
    let username = 'dev';
    let password = 'test';
    let token = 'Basic ' + window.btoa(username + ':' + password);
    return token;
  }
}
// 'Authorization': `Basic ${window.btoa(username + ':' + password)}`