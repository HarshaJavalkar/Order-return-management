import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { from, Observable } from 'rxjs';
import Constants from './data/constants';

@Injectable({
  providedIn: 'root',
})
export class GetOrdersService {
  constructor(private http: HttpClient) {}
  getUserOrders() :Observable<any>  {
    let username = sessionStorage.getItem('username');
    return this.http.get<any>(`${Constants.LOGIN_BASE_URI}/orders/${username}`,{
      observe: 'response'
    });
  }

  // getUserOrders(): Observable<any> {
  //   let username = sessionStorage.getItem('username');
  //   let token = sessionStorage.getItem('token');
  //   return from(
  //     fetch(
  //       `${Constants.LOGIN_BASE_URI}/orders/${username}`, // the url you are trying to access
  //       {
  //         method: 'GET', // GET, POST, PUT, DELETE
  //         mode: 'no-cors' // the most important option
  //       }
  //     ));
  // }


}