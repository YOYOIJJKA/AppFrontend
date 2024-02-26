import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Employee } from '../../Interfaces/employee';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.scss',
})
export class RegistrationComponent implements OnInit {
  authForm: FormGroup;
  constructor(
    public formBuilder: FormBuilder,
    public router: Router,
    public http: AuthService
  ) {
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
      phone: [
        null,
        [Validators.required, Validators.pattern(/^((\+7|7|8)+([0-9]){10})$/)],
      ],
      email: [
        null,
        [
          Validators.required,
          Validators.pattern(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/),
        ],
      ],
    });
  }
  ngOnInit(): void {}

  signIn() {
    let worker: Employee;
    if (this.authForm.valid) {
      worker = this.authForm.getRawValue();
      this.http.postEmployee(worker).subscribe();
      this.http.getEmployees().subscribe({
        next: (value) => {
          worker.id = value[value.length - 1].id;
        },
        complete: () => {
          this.http.saveId(worker.id);
          this.http.saveLogin(worker.email);
          this.http.savePassword(worker.password);
          this.router.navigate(['products']);
        },
      });
    }
  }
}
