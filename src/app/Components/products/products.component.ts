import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { Product } from '../../Interfaces/product';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss',
})
export class ProductsComponent implements AfterViewInit {
  displayedColumns: string[] = [
    'id',
    'name',
    'storageId',
    'number',
    'employeeId',
    'clientId',
    'dateRecieved',
    'dateExpired',
  ];

  products?: Product[];

  dataSource = new MatTableDataSource<Product>(this.products);
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit(): void {
    this.products = [
      {
        id: 0,
        name: 'Noname',
        storageId: 'N1',
        number: 1,
        employeeId: 1,
        clientId: 1,
        dateRecieved: '2022-02-02',
        dateExpired: '2022-02-02',
      },
      {
        id: 0,
        name: 'Noname',
        storageId: 'N2',
        number: 1,
        employeeId: 1,
        clientId: 1,
        dateRecieved: '2022-02-02',
        dateExpired: '2022-02-02',
      },
    ];
    this.dataSource = new MatTableDataSource<Product>(this.products);
    this.dataSource.paginator = this.paginator;
  }
}
