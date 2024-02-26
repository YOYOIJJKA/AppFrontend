import { Component } from '@angular/core';
import { Client } from '../../Interfaces/client';
import { ProductsService } from '../products/products.service';
import { MatDialog } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-modal-client',
  templateUrl: './modal-client.component.html',
  styleUrl: './modal-client.component.scss',
})
export class ModalClientComponent {
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
    });
  }

  post() {
    if (this.modalForm.valid) {
      let client: Client = this.modalForm.getRawValue();
      this.http.postClient(client).subscribe();
      this.closeModal();
    }
  }

  closeModal() {
    this.dialog.closeAll();
  }
}
