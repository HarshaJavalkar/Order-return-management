import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class CredentialsService {

  constructor(private http: HttpClient) { }
  validateCred(): Observable<HttpResponse<any>>{
    return this.http.get<any>('http://localhost:8080/limits')
  }


}
