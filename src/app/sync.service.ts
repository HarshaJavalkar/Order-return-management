import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SyncService {

  currentStep=new BehaviorSubject<string>('delivery')
  constructor() { }

  getCurrStep(){
    return this.currentStep;
  }
  setCurrStep(current:string){
    this.currentStep.next(current)
  }


}
