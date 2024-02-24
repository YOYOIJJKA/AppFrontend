import { Component, ViewChild } from '@angular/core';
import { Suppliers } from '../../Interfaces/suppliers';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-suppliers',
  templateUrl: './suppliers.component.html',
  styleUrl: './suppliers.component.scss',
})
export class SuppliersComponent {
  displayedColumns: string[] = ['id', 'name', 'email', 'phone'];

  suppliers?: Suppliers[];

  dataSource = new MatTableDataSource<Suppliers>(this.suppliers);
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource = new MatTableDataSource<Suppliers>(this.suppliers);
    this.dataSource.paginator = this.paginator;
  }
}
