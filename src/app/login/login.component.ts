import { Component, ElementRef, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CredentialsService } from '../credentials.service';
import Constants from '../data/constants';
import { LabelsService } from '../labels.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  form: any;
  labels: any;
  subscription: any;
  isInv = false;

  variable= 'text'
  constructor(
    private elementRef: ElementRef,
    private cs: CredentialsService,
    private labelService: LabelsService,
    private router: Router
  ) {
    this.labels = this.labelService.getLabels();
  }

  ngAfterViewInit() {
    this.elementRef.nativeElement.ownerDocument.body.style.backgroundColor =
      '#E9F2F9';
  }
  ngOnInit(): void {
    this.variable = "password"
    sessionStorage.clear();
    this.form = new FormGroup({
      username: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
      ]), 
    });
  }

  login() {
    this.subscription = this.cs.jwTAuth(this.form.value).subscribe(
      (data: any) => this.handleSuccessResponse(data),
      (error: any) => this.handleErrorResponse(error)
    );
  }

  handleSuccessResponse(res: any) {
    console.log(res);
    if(res.status==200){
      this.router.navigate(['orders']);
    }

  }
  handleErrorResponse(error: any) {
    if (Constants.INV_CRED) {
      this.isInv = true;
    }
  }
}
