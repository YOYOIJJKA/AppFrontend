import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Employee } from '../../Interfaces/employee';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  setEmployee(employee: Employee): void {
    this.saveLogin(employee.email);
    this.savePassword(employee.password);
    this.saveId(employee.id);
  }

  enableAdmin(): void {
    this.saveFlag(true);
  }
  disableAdmin(): void {
    this.saveFlag(false);
  }

  postEmployee(employee: Employee): Observable<Employee> {
    employee.postId = '0';
    this.setAuth();
    return this.http.post<Employee>(
      'http://localhost:3000/employees',
      employee
    );
  }
  getEmployees(): Observable<Employee[]> {
    return this.http.get<Employee[]>('http://localhost:3000/employees');
  }
  getEmployeeById(id: number): Observable<Employee> {
    return this.http.get<Employee>('http://localhost:3000/employees' + id);
  }
  saveId(value: number): void {
    localStorage.setItem('id', JSON.stringify(value));
  }
  getId(): number {
    return JSON.parse(localStorage.getItem('id')!);
  }
  savePassword(value: string): void {
    localStorage.setItem('password', JSON.stringify(value));
  }
  getPassword(): string {
    return JSON.parse(localStorage.getItem('password')!);
  }
  saveLogin(value: string): void {
    localStorage.setItem('login', JSON.stringify(value));
  }
  getLogin(): string {
    return JSON.parse(localStorage.getItem('login')!);
  }
  saveFlag(value: boolean): void {
    localStorage.setItem('flag', JSON.stringify(value));
  }
  savePost(value: number): void {
    localStorage.setItem('post', JSON.stringify(value));
  }
  getFlag(): boolean {
    return JSON.parse(localStorage.getItem('flag')!);
  }
  setAuth(): void {
    localStorage.setItem('authorized', JSON.stringify(true));
  }
  checkAuth(): boolean {
    if (localStorage.getItem('authorized')) return true;
    else return false;
  }
  clearStorage(): void {
    localStorage.removeItem('login');
    localStorage.removeItem('password');
    localStorage.removeItem('authorized');
    localStorage.removeItem('flag');
    localStorage.removeItem('post');
  }
}
