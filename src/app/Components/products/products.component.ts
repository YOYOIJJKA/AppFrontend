import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { Product } from '../../Interfaces/product';
import { ProductsService } from './products.service';
import { Observable } from 'rxjs';
import { Client } from '../../Interfaces/client';
import { Employee } from '../../Interfaces/employee';
import { Suppliers } from '../../Interfaces/suppliers';
import { StorageLocation } from '../../Interfaces/storage-location';
import { ModalProductComponent } from '../modal-product/modal-product.component';
import { MatDialog } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss',
})
export class ProductsComponent implements AfterViewInit {
  filterForm: FormGroup;
  constructor(
    public http: ProductsService,
    public dialog: MatDialog,
    public formBuilder: FormBuilder
  ) {
    this.filterForm = this.formBuilder.group({
      type: [null, [Validators.required]],
      filterParam: [null, [Validators.required]],
    });
  }

  displayedColumns: string[] = [
    'id',
    'name',
    'storageId',
    'number',
    'employeeId',
    'clientId',
    'suppliersId',
    'dateRecieved',
    'dateExpired',
    'confirm',
  ];

  products?: Product[];

  dataSource = new MatTableDataSource<Product>(this.products);
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  clients$: Observable<Client[]> = this.http.getClients();
  employees$: Observable<Employee[]> = this.http.getEmployees();
  suppliers$: Observable<Suppliers[]> = this.http.getSuppliers();
  storeLocation$: Observable<StorageLocation[]> =
    this.http.getStorageLocations();

  ngAfterViewInit(): void {
    this.getProducts();
  }

  putElement(element: Product) {
    this.http.putProduct(element).subscribe();
    this.getProducts();
  }

  putElements(elements: Product[] | undefined) {
    if (elements)
      elements.forEach((element) => this.http.putProduct(element).subscribe());
    this.getProducts();
  }

  deleteElement(id: number) {
    this.http.deleteProduct(id).subscribe({ error: (e) => console.log(e) });
    this.getProducts();
  }

  postElement(element: Product) {
    this.http.postProduct(element).subscribe();
    this.getProducts();
  }

  getProducts() {
    this.http.getProducts().subscribe({
      next: (products) => (this.products = products),
      complete: () => {
        this.dataSource = new MatTableDataSource<Product>(this.products);
        this.dataSource.paginator = this.paginator;
      },
    });
  }

  openModal() {
    const dialogRedact = this.dialog.open(ModalProductComponent, {
      width: '40%',
    });
    dialogRedact.afterClosed().subscribe({
      complete: () => {
        this.getProducts();
      },
    });
  }

  filter() {
    if (this.filterForm.valid) {
      let filter = this.filterForm.getRawValue();
      this.filterByType(filter.type, filter.filterParam);
    }
  }

  filterByType(type: string, filterParam: string) {
    let newProductList;
    console.log('TRYING TO FILTER');
    if (this.products)
      if (
        this.products.filter((product) =>
          (product[type as keyof Product] as string).includes(filterParam)
        )
      ) {
        newProductList = this.products.filter((product) =>
          (product[type as keyof Product] as string).includes(filterParam)
        );
      }
    this.dataSource = new MatTableDataSource(newProductList);
    this.dataSource.paginator = this.paginator;
  }
}
