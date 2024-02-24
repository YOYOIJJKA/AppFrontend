import { Component, ViewChild } from '@angular/core';
import { StorageLocation } from '../../Interfaces/storage-location';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-storage-location',
  templateUrl: './storage-location.component.html',
  styleUrl: './storage-location.component.scss',
})
export class StorageLocationComponent {
  displayedColumns: string[] = [
    'id',
    'location'
  ];

  storage?: StorageLocation[];

  dataSource = new MatTableDataSource<StorageLocation>(this.storage);
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource = new MatTableDataSource<StorageLocation>(this.storage);
    this.dataSource.paginator = this.paginator;
  }

  
}
