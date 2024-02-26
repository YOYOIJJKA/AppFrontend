import { Component, ViewChild } from '@angular/core';
import { Suppliers } from '../../Interfaces/suppliers';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductsService } from '../products/products.service';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-suppliers',
  templateUrl: './suppliers.component.html',
  styleUrl: './suppliers.component.scss',
})
export class SuppliersComponent {
  displayedColumns: string[] = ['id', 'name', 'email', 'phone', 'confirm'];
  filterForm: FormGroup
  suppliers?: Suppliers[];

  dataSource = new MatTableDataSource<Suppliers>(this.suppliers);
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
    this.getSuppliers();
  }

  getSuppliers() {
    this.http.getSuppliers().subscribe({
      next: (value) => (this.suppliers = value),
      complete: () => {
        this.dataSource = new MatTableDataSource<Suppliers>(this.suppliers);
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
    if (this.suppliers)
      if (
        this.suppliers.filter((supplier) =>
          (supplier[type as keyof Suppliers] as string).includes(filterParam)
        )
      ) {
        newProductList = this.suppliers.filter((supplier) =>
          (supplier[type as keyof Suppliers] as string).includes(filterParam)
        );
      }
    this.dataSource = new MatTableDataSource(newProductList);
    this.dataSource.paginator = this.paginator;
  }

  putElement(element: Suppliers) {
    this.http.putSupplier(element).subscribe();
  }

  putElements(elements: Suppliers[] | undefined) {
    if (elements)
      elements.forEach((element) => this.http.putSupplier(element).subscribe());
  }

  deleteElement(id: number) {
    this.http.deleteSuppliers(id).subscribe({
      error: (e) => console.log(e),
      complete: () => this.getSuppliers(),
    });
  }

  postElement(element: Suppliers) {
    this.http.postClient(element).subscribe({
      complete: () => this.getSuppliers(),
    });
  }

  openModal() {
    // const dialogRedact = this.dialog.open(ModalClientComponent, {
    //   width: '40%',
    // });
    // dialogRedact.afterClosed().subscribe({
    //   complete: () => {
    //     this.getSuppliers();
    //   },
    // });
  }
}
