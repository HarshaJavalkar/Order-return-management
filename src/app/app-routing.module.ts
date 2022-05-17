import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonErrorComponent } from './commonError/commonError.component';
import { ConfirmComponent } from './confirm/confirm.component';
import { DeliveryComponent } from './delivery/delivery.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { MyOrdersComponent } from './Orders/orders.component';
import { PaymentComponent } from './payment/payment.component';
import { ProcessComponent } from './process/process.component';
import { SpinnerComponent } from './spinner/spinner.component';
import { SuccessComponent } from './success/success.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'login' },
  { path: 'login', component: LoginComponent },
  { path: 'orders', component: MyOrdersComponent },
  {
    path: 'process',
    component: ProcessComponent,
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'delivery' },
      { path: 'delivery', component: DeliveryComponent },
      { path: 'payment', component: PaymentComponent },
      { path: 'confirm', component: ConfirmComponent },
    ],
  },

  { path: 'spinner', component: SpinnerComponent },
  { path: 'success', component: SuccessComponent },
  { path: 'error', component: CommonErrorComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
