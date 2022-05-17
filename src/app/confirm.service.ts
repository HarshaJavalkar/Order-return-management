import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import Constants from './data/constants';

@Injectable({
  providedIn: 'root',
})
export class ConfirmService {
  constructor(private http: HttpClient) {}

  confirmReturn(newObj: any): Observable<any> {
    let reqObj = {};
    let processingDetails = JSON.parse(
      sessionStorage.getItem('processingDetails') || '{}'
    );

    let url = `${Constants.COMP_PROCESSING_URL}/payment/${
      processingDetails?.requestID
    }/${newObj.creditCardNumber}/${newObj.cardLimit}/${
      processingDetails.processingCharge +
      processingDetails.packagingAndDeliveryCharge
    }`;

    return this.http.post<any>(
      url,
      {},
      {
        observe: 'response',
      }
    );
  }
}
