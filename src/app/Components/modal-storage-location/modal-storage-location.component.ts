import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductsService } from '../products/products.service';
import { MatDialog } from '@angular/material/dialog';
import { StorageLocation } from '../../Interfaces/storage-location';

@Component({
  selector: 'app-modal-storage-location',
  templateUrl: './modal-storage-location.component.html',
  styleUrl: './modal-storage-location.component.scss',
})
export class ModalStorageLocationComponent {
  modalForm: FormGroup;

  constructor(
    public formBuilder: FormBuilder,
    public http: ProductsService,
    public dialog: MatDialog
  ) {
    this.modalForm = formBuilder.group({
      location: [
        null,
        [Validators.required, Validators.pattern('[A-Za-zА-Яа-яЁё]*')],
      ],

    });
  }

  post() {
    if (this.modalForm.valid) {
      let storageLocation: StorageLocation = this.modalForm.getRawValue();
      this.http.postStorageLocation(storageLocation).subscribe();
      this.closeModal();
    }
  }

  closeModal() {
    this.dialog.closeAll();
  }
}
