import { Component, ElementRef, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CredentialsService } from '../credentials.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  form: any;


  constructor(private elementRef: ElementRef, private cs: CredentialsService) {}

  ngAfterViewInit() {
    this.elementRef.nativeElement.ownerDocument.body.style.backgroundColor ='#2c3338';
    }
  ngOnInit(): void {
    this.form =new FormGroup({
      username: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
      ]),
    });

    // this.cs.validateCred().subscribe((res) => {
    //   console.log(res);
    // });
  }

  login(){
    console.log(this.form.value);
  }


}
