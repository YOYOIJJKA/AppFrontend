import { Component, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { Client } from '../../Interfaces/client';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrl: './clients.component.scss',
})
export class ClientsComponent {
  displayedColumns: string[] = ['id', 'name', 'email', 'phone'];
  ////////////flag == boolean; boolean => string by f = user t = admin
  clients?: Client[];

  dataSource = new MatTableDataSource<Client>(this.clients);
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource = new MatTableDataSource<Client>(this.clients);
    this.dataSource.paginator = this.paginator;
  }
}
