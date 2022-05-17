import { Component, OnInit } from '@angular/core';
import { CredentialsService } from '../credentials.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
})
export class NavComponent implements OnInit {
  logged : any;
  constructor(private cred: CredentialsService) {}

  ngOnInit(): void {
    let token = false;
    this.cred.getStatus().subscribe((res) => {
      this.logged = res;
    });
  }
  logout() {
    sessionStorage.clear();
    this.cred.setStatus(false);
  }
}
