import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Employee } from '../../Interfaces/employee';
import { Post } from '../../Interfaces/post';
import { ProductsService } from '../products/products.service';
import { Observable } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalEmployeeComponent } from '../modal-employee/modal-employee.component';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrl: './employees.component.scss',
})
export class EmployeesComponent {
  displayedColumns: string[] = [
    'id',
    'postId',
    'name',
    'surname',
    'patronimic',
    'email',
    'phone',
    'confirm',
  ];
  ////////////flag == boolean; boolean => string by f = user t = admin
  employees?: Employee[];
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

  dataSource = new MatTableDataSource<Employee>(this.employees);
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  posts$: Observable<Post[]> = this.http.getPosts();

  ngAfterViewInit() {
    this.getEmployees();
  }

  getEmployees() {
    this.http.getEmployees().subscribe({
      next: (value) => (this.employees = value),
      complete: () => {
        this.dataSource = new MatTableDataSource<Employee>(this.employees);
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
    if (this.employees)
      if (
        this.employees.filter((employee) =>
          (employee[type as keyof Employee] as string).includes(filterParam)
        )
      ) {
        newProductList = this.employees.filter((employee) =>
          (employee[type as keyof Employee] as string).includes(filterParam)
        );
      }
    this.dataSource = new MatTableDataSource(newProductList);
    this.dataSource.paginator = this.paginator;
  }

  putElement(element: Employee) {
    this.http.putEmployee(element).subscribe();
  }

  putElements(elements: Employee[] | undefined) {
    if (elements)
      elements.forEach((element) => this.http.putEmployee(element).subscribe());
  }

  deleteElement(id: number) {
    this.http.deleteEmployee(id).subscribe({
      error: (e) => console.log(e),
      complete: () => this.getEmployees(),
    });
  }

  postElement(element: Employee) {
    this.http.postEmployee(element).subscribe({
      complete: () => this.getEmployees(),
    });
  }

  openModal() {
    const dialogRedact = this.dialog.open(ModalEmployeeComponent, {
      width: '40%',
    });
    dialogRedact.afterClosed().subscribe({
      complete: () => {
        this.getEmployees();
      },
    });
  }
}
