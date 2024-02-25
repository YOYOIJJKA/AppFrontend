import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss',
})
export class AuthComponent implements OnInit {
  authForm: FormGroup;
  constructor(public formBuilder: FormBuilder, public router: Router) {
    this.authForm = formBuilder.group({
      login: [
        null,
        [Validators.required, Validators.pattern('[A-Za-zА-Яа-яЁё]*')],
      ],
      password: [null, [Validators.required, Validators.pattern(/^\S*$/)]],
    });
  }
  ngOnInit(): void { }

  logIn() {
    if (!this.authForm.invalid) {
      this.router.navigate(['products'])
      //////////CHECK USER
    }
  }

  signIn() {
    this.router.navigate(['registration'])
  }
}
