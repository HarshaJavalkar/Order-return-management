import { Component, ElementRef, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CredentialsService } from '../credentials.service';
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
      '#2c3338';
  }
  ngOnInit(): void {
    this.cs.getUsers().subscribe((data: any) => {
      console.log(data);
    });

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
    this.subscription = this.cs.validateCred(this.form.value).subscribe(
      (data: any) => this.handleSuccessResponse(data),
      (error: any) => this.handleErrorResponse(error)
    );
  }

  handleSuccessResponse(res: any) {
    if (res.message == 'success') {
      this.router.navigateByUrl('/home');
    }
  }

  handleErrorResponse(error: any) {
    alert(error.error.message);
  }
}
