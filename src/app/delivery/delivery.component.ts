import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SyncService } from '../sync.service';

@Component({
  selector: 'app-delivery',
  templateUrl: './delivery.component.html',
  styleUrls: ['./delivery.component.scss'],
})
export class DeliveryComponent implements OnInit {
  selectedItem: any;
  processingDetails: any;
  total = 0;

  constructor(private router: Router, private sync: SyncService) {
    this.selectedItem = JSON.parse(
      sessionStorage.getItem('selectedItem') || '{}'
    );
  }

  ngOnInit(): void {
    this.processingDetails = JSON.parse(
      sessionStorage.getItem('processingDetails') || '{}'
    );

    this.total = this.calculateTotal(this.processingDetails);
  }
  calculateTotal(details: any) {
    return Math.round(
      details.processingCharge + details.packagingAndDeliveryCharge
    );
  }
  next() {
    this.sync.setCurrStep('payment')
    this.router.navigate(['process/payment']);
  }
  cancel(){
    this.router.navigate(['orders']);
  }
}
