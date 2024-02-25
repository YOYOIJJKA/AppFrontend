import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { Product } from '../../Interfaces/product';
import { ProductsService } from './products.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss',
})
export class ProductsComponent implements AfterViewInit {
  constructor(public http: ProductsService) {}

  displayedColumns: string[] = [
    'id',
    'name',
    'storageId',
    'number',
    'employeeId',
    'clientId',
    'dateRecieved',
    'dateExpired',
    'confirm',
  ];

  products?: Product[];

  dataSource = new MatTableDataSource<Product>(this.products);
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  newElement: Product = {
    id: 0,
    name: 'Noname',
    storageId: 'N1',
    number: 1,
    employeeId: '1',
    clientId: '1',
    dateRecieved: '2022-02-02',
    dateExpired: '2022-02-02',
  };

  ngAfterViewInit(): void {
    this.getProducts();
  }

  putElement(element: Product) {
    this.http.putProduct(element).subscribe();
    this.ngAfterViewInit()
  }

  putElements(elements: Product[] | undefined) {
    if (elements) this.http.putProducts(elements).subscribe();
    this.ngAfterViewInit()
  }

  deleteElement(id: number) {
    this.http.deleteProduct(id).subscribe({ error: (e) => console.log(e) });
    this.ngAfterViewInit()
  }

  postElement(element: Product) {
    this.http.postProduct(element).subscribe();
    this.ngAfterViewInit()
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
}
