import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { Client } from '../../Interfaces/client';
import { Employee } from '../../Interfaces/employee';
import { Suppliers } from '../../Interfaces/suppliers';
import { StorageLocation } from '../../Interfaces/storage-location';
import { ProductsService } from '../products/products.service';
import { Product } from '../../Interfaces/product';
import { AuthService } from '../auth/auth.service';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-modal-product',
  templateUrl: './modal-product.component.html',
  styleUrl: './modal.component.scss',
})
export class ModalProductComponent {
  modalForm: FormGroup;

  constructor(
    public formBuilder: FormBuilder,
    public http: ProductsService,
    public auth: AuthService,
    public dialog: MatDialog
  ) {
    this.modalForm = formBuilder.group({
      name: [
        null,
        [Validators.required, Validators.pattern('[A-Za-zА-Яа-яЁё]*')],
      ],
      number: [null, [Validators.required, Validators.pattern(/^\S*$/)]],
      clientId: [null, []],
      storageId: [null, [Validators.required]],
      suppliersId: [null, [Validators.required]],
      dateRecieved: [null, [Validators.required]],
      dateExpired: [null, []],
    });
  }

  clients$: Observable<Client[]> = this.http.getClients();
  employees$: Observable<Employee[]> = this.http.getEmployees();
  suppliers$: Observable<Suppliers[]> = this.http.getSuppliers();
  storeLocation$: Observable<StorageLocation[]> =
    this.http.getStorageLocations();

  post() {
    let product: Product = this.modalForm.getRawValue();
    product.employeeId = this.auth.getId().toString();
    this.http.postProduct(product).subscribe();
  }

  closeModal() {
    this.dialog.closeAll();
  }
}
