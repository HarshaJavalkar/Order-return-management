import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { BehaviorSubject, catchError, map, Observable } from 'rxjs';
import Constants from './data/constants';
import { Login } from './login';

@Injectable({
  providedIn: 'root',
})
export class CredentialsService {
  url: string = `${Constants.LOGIN_BASE_URI}/authentications/login`;
  token = new BehaviorSubject<boolean>(false);
  constructor(private http: HttpClient) {}
  jwTAuth(credOBj: Login): Observable<any> {
    return this.http
      .post<any>(`${Constants.LOGIN_BASE_URI}/login`, credOBj, {
        observe: 'response',
      })
      .pipe(
        map((data) => {
          sessionStorage.setItem(Constants.USERNAME, credOBj.username);
          sessionStorage.setItem(Constants.TOKEN, data.body.jwtToken);
          sessionStorage.setItem('orders', JSON.stringify(data.body.orders));
          // this.token.next(data.body.jwtToken!='');
          this.setStatus(data.body.jwtToken!='' && data.body.jwtToken!=undefined );
          return data;
        })
      );
  }
  setStatus(tokenStatus: any) {
    return this.token.next(tokenStatus);
  } 

  getStatus(): Observable<any> {
    return this.token;
  }
  // getHeaders() {
  //   let basicAuthHeaderString = this.createBasicHttpHeaders();
  //   let header = new HttpHeaders({
  //     Authorization: basicAuthHeaderString,
  //   });

  //   return header;
  // }
  // getUsers() {
  //   return this.http
  //     .get(`${Constants.LOGIN_BASE_URI}/authentications/users`)
  //     .pipe(
  //       map((data) => {
  //         sessionStorage.setItem('users', 'test');
  //         return data;
  //       })
  //     );
  // }

  // createBasicHttpHeaders() {
  //   let username = 'dev';
  //   let password = 'test';
  //   let token = 'Basic ' + window.btoa(username + ':' + password);
  //   return token;
  // }
}
// 'Authorization': `Basic ${window.btoa(username + ':' + password)}`
