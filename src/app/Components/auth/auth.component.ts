import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import { map } from 'rxjs';
import { Employee } from '../../Interfaces/employee';
import { ProductsService } from '../products/products.service';
import { Post } from '../../Interfaces/post';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss',
})
export class AuthComponent implements OnInit {
  authForm: FormGroup;
  employees?: Employee[];
  constructor(
    public formBuilder: FormBuilder,
    public router: Router,
    public auth: AuthService,
    public http: ProductsService
  ) {
    this.authForm = formBuilder.group({
      login: [
        null,
        [
          Validators.required,
          Validators.pattern(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/),
        ],
      ],
      password: [null, [Validators.required, Validators.pattern(/^\S*$/)]],
    });
  }
  ngOnInit(): void {}

  checkEmployees() {
    let login = this.authForm.getRawValue().login;
    let password = this.authForm.getRawValue().password;
    console.log(login);
    this.auth
      .getEmployees()
      .pipe(
        map((employees) => {
          return employees.filter((employee) => {
            return employee.email == login && employee.password == password;
          });
        })
      )
      .subscribe({
        next: (value) => {
          console.log(value);
          this.employees = value;
        },
        complete: () => {
          if (this.employees && this.employees.length != 0) {
            this.auth.setAuth();
            this.auth.saveId(this.employees[0].id);
            this.checkFlag();
            this.router.navigate(['products']);
          }
        },
      });
  }

  checkFlag() {
    let newPosts: Post[];
    if (this.employees && this.employees[0])
      this.http
        .getPosts()
        .pipe(
          map((posts) => {
            newPosts = posts.filter((post) => {
              return post.id.toString() == this.employees![0].postId;
            });
          })
        )
        .subscribe({
          complete: () => {
            if (newPosts.length != 0) {
              if (newPosts[0].flag == true) {
                this.auth.saveFlag(true);
                console.log('TRUES');
              } else {
                this.auth.saveFlag(false);
                console.log(false);
              }
            } else {
              this.auth.saveFlag(false);
            }
          },
        });
  }
  // logIn() {
  //   if (!this.authForm.invalid) {
  //     this.router.navigate(['products']);
  //   }
  // }

  signIn() {
    this.router.navigate(['registration']);
  }
}
