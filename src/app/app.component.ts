import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'AppFrontend';
  tableType = new FormControl('');
  constructor(public router: Router) {}

  ngOnInit(): void {
    this.tableType.setValue('products');
  }

  checkLink(): boolean {
    if (this.router.url != '/') return true;
    else return false;
  }

  logOut() {
    this.router.navigate(['']);
  }

  navigate() {
    this.router.navigate([this.tableType.getRawValue()]);
  }
}
