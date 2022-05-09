import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as labels from  '../../assets/content/labels.json'
@Injectable({
  providedIn: 'root'
})
export class LabelsService {
  constructor(private http: HttpClient) { }
  getLabels(){
   return labels;
  }
}
