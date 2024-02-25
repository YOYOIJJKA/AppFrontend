import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Employee } from '../../Interfaces/employee';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.scss'
})
export class RegistrationComponent implements OnInit {

  authForm: FormGroup;
  constructor(public formBuilder: FormBuilder, public router: Router, public http: AuthService) {
    this.authForm = formBuilder.group({
      password: [null, [Validators.required, Validators.pattern(/^\S*$/)]],
      name: [
        null,
        [Validators.required, Validators.pattern('[A-Za-zА-Яа-яЁё]*')],
      ],
      surname: [
        null,
        [Validators.required, Validators.pattern('[A-Za-zА-Яа-яЁё]*')],
      ],
      patronimic: [
        null,
        [Validators.required, Validators.pattern('[A-Za-zА-Яа-яЁё]*')],
      ],
      phone: [null, [Validators.required, Validators.pattern('[- +()0-9]+'), Validators.maxLength(12), Validators.minLength(12)]],
      email: [null, [Validators.required]],
    });
  }
  ngOnInit(): void { }

  signIn() {
    let worker: Employee;
    if (this.authForm.valid) {
      worker = this.authForm.getRawValue()
      console.log(worker)
      this.http.postEmployee(worker).subscribe()
      this.router.navigate(['products'])
      // this.http.postUser(worker);
    }
  }
}