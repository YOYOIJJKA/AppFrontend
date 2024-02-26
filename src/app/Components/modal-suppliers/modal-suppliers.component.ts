import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Suppliers } from '../../Interfaces/suppliers';
import { ProductsService } from '../products/products.service';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-modal-suppliers',
  templateUrl: './modal-suppliers.component.html',
  styleUrl: './modal-suppliers.component.scss',
})
export class ModalSuppliersComponent {
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
      let supplier: Suppliers = this.modalForm.getRawValue();
      this.http.postSuppliers(supplier).subscribe();
      this.closeModal();
    }
  }

  closeModal() {
    this.dialog.closeAll();
  }
}
