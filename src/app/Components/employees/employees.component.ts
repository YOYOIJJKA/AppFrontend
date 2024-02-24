import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Employee } from '../../Interfaces/employee';

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
  ];
  ////////////flag == boolean; boolean => string by f = user t = admin
  employee?: Employee[];

  dataSource = new MatTableDataSource<Employee>(this.employee);
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource = new MatTableDataSource<Employee>(this.employee);
    this.dataSource.paginator = this.paginator;
  }
}
