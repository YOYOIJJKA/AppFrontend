import { Component } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ProductsService } from '../products/products.service';
import { MatDialog } from '@angular/material/dialog';
import { Employee } from '../../Interfaces/employee';
import { Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { Post } from '../../Interfaces/post';

@Component({
  selector: 'app-modal-employee',
  templateUrl: './modal-employee.component.html',
  styleUrl: './modal-employee.component.scss',
})
export class ModalEmployeeComponent {
  modalForm: FormGroup;

  constructor(
    public formBuilder: FormBuilder,
    public http: ProductsService,
    public dialog: MatDialog
  ) {
    this.modalForm = formBuilder.group({
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
      email: [
        null,
        [
          Validators.required,
          Validators.pattern(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/),
        ],
      ],
      phone: [
        null,
        [Validators.required, Validators.pattern(/^((\+7|7|8)+([0-9]){10})$/)],
      ],
      postId: [null, [Validators.required]],
      password: [null, [Validators.required]],
    });
  }

  posts$: Observable<Post[]> = this.http.getPosts();

  post() {
    if (this.modalForm.valid) {
      let employee: Employee = this.modalForm.getRawValue();
      this.http.postEmployee(employee).subscribe();
      this.closeModal();
    }
  }

  closeModal() {
    this.dialog.closeAll();
  }
}
