import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import Constants from './data/constants';

@Injectable({
  providedIn: 'root',
})
export class ProcessingService {
  processingUrl = Constants.COMP_PROCESSING_URL;
  constructor(private http: HttpClient) {}
  getProcessingDetails(ProcessRequest: any) {
    return this.http.post<any>(`${this.processingUrl}/service`, ProcessRequest, {
      observe: 'response',
    }).pipe(
      map((data) => {
    console.log(data)    
    
        sessionStorage.setItem('processingDetails', JSON.stringify(data.body));
        return data;
      })
    );
  }
}