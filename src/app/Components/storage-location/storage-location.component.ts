import { Component, ViewChild } from '@angular/core';
import { StorageLocation } from '../../Interfaces/storage-location';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { ProductsService } from '../products/products.service';
import { MatDialog } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalStorageLocationComponent } from '../modal-storage-location/modal-storage-location.component';

@Component({
  selector: 'app-storage-location',
  templateUrl: './storage-location.component.html',
  styleUrl: './storage-location.component.scss',
})
export class StorageLocationComponent {
  displayedColumns: string[] = ['id', 'location', 'confirm'];

  storage?: StorageLocation[];

  filterForm: FormGroup;

  dataSource = new MatTableDataSource<StorageLocation>(this.storage);
  @ViewChild(MatPaginator) paginator!: MatPaginator;

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

  ngAfterViewInit() {
    this.getStorageLocations();
  }

  getStorageLocations() {
    this.http.getStorageLocations().subscribe({
      next: (value) => (this.storage = value),
      complete: () => {
        this.dataSource = new MatTableDataSource<StorageLocation>(this.storage);
        this.dataSource.paginator = this.paginator;
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
    if (this.storage)
      if (
        this.storage.filter((store) =>
          (store[type as keyof StorageLocation] as string).includes(filterParam)
        )
      ) {
        newProductList = this.storage.filter((store) =>
          (store[type as keyof StorageLocation] as string).includes(filterParam)
        );
      }
    this.dataSource = new MatTableDataSource(newProductList);
    this.dataSource.paginator = this.paginator;
  }

  putElement(element: StorageLocation) {
    this.http.putStorageLocation(element).subscribe();
  }

  putElements(elements: StorageLocation[] | undefined) {
    if (elements)
      elements.forEach((element) =>
        this.http.putStorageLocation(element).subscribe()
      );
  }

  deleteElement(id: number) {
    this.http.deleteSuppliers(id).subscribe({
      error: (e) => console.log(e),
      complete: () => this.getStorageLocations(),
    });
  }

  postElement(element: StorageLocation) {
    this.http.postStorageLocation(element).subscribe({
      complete: () => this.getStorageLocations(),
    });
  }

  openModal() {
    const dialogRedact = this.dialog.open(ModalStorageLocationComponent, {
      width: '40%',
    });
    dialogRedact.afterClosed().subscribe({
      complete: () => {
        this.getStorageLocations();
      },
    });
  }
}
