import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl } from '@angular/forms';
import { AuthService } from './Components/auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'AppFrontend';
  tableType = new FormControl('');
  constructor(public router: Router, public auth: AuthService) {}

  ngOnInit(): void {
    this.tableType.setValue(this.router.url.replace('/', ''));
  }

  checkLink(): boolean {
    if (this.router.url != '/' && this.router.url != '/registration')
      return true;
    else return false;
  }

  logOut() {
    this.auth.clearStorage();
    this.router.navigate(['']);
  }

  navigate() {
    this.router.navigate([this.tableType.getRawValue()]);
  }
}
