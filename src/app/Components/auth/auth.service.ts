import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../../Interfaces/user';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  postUser(user: User): Observable<User> {
    return this.http.post<User>('https://localhost:3000/users', user);
  }
  getUsers(): Observable<User[]> {
    return this.http.get<User[]>('https://localhost:3000/users');
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
  saveFlag(value: string): void {
    localStorage.setItem('flag', JSON.stringify(value));
  }
  getFlag(): string {
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
  }
}
