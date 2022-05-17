import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ConfirmService } from '../confirm.service';
import { SyncService } from '../sync.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss'],
})
export class PaymentComponent implements OnInit {
  form: any;
  selectedItem: any;
  constructor(private router: Router, private sync: SyncService, private confirmService: ConfirmService) {}

  ngOnInit(): void {
   this.selectedItem=  JSON.parse(sessionStorage.getItem('selectedItem')||'{}')
    this.form = new FormGroup({
      cardNumber: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
      ]),
      cardLimit: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
      ]),
    });
  }
  next() {
    this.selectedItem.creditCardNumber=this.form.value.cardNumber;
    this.selectedItem.cardLimit=this.form.value.cardLimit
   JSON.stringify( sessionStorage.setItem('newReturn',this.selectedItem));
    this.confirmService.confirmReturn(this.selectedItem).subscribe(data=>{
      if(data.body.message=='Your Payment is successful. Thank you for using our service'){
        this.router.navigate(['success']);
      }
      else{
        this.router.navigate(['error']); 
      }

      console.log(data);
    });
  }
  back() {
    this.sync.setCurrStep('delivery');
    this.router.navigate(['process/delivery']);
  }
}
