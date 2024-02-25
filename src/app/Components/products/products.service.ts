import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../../Interfaces/product';
import { Client } from '../../Interfaces/client';
import { Suppliers } from '../../Interfaces/suppliers';
import { Employee } from '../../Interfaces/employee';
import { StorageLocation } from '../../Interfaces/storage-location';
import { Post } from '../../Interfaces/post';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  constructor(private http: HttpClient) {}
  URL = 'http://localhost:3000/products/';
  CLIENTURL = 'http://localhost:3000/clients/';
  EMPLOYEEURL = 'http://localhost:3000/employees/';
  POSTURL = 'http://localhost:3000/posts/';
  SUPPLIERSURL = 'http://localhost:3000/suppliers/';
  STORAGELOCATIONURL = 'http://localhost:3000/storage-location/';

  putProduct(product: Product): Observable<Product> {
    return this.http.put<Product>(this.URL + product.id, product);
  }
  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.URL);
  }
  deleteProduct(id: number): Observable<Product> {
    return this.http.delete<Product>(this.URL + id.toString());
  }
  postProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(this.URL, product);
  }
  getProduct(id: number): Observable<Product> {
    return this.http.get<Product>(this.URL + id.toString());
  }
  putProducts(products: Product[]): Observable<Product[]> {
    return this.http.put<Product[]>(this.URL, products);
  }
  /////////////////////
  putClient(client: Client): Observable<Client> {
    return this.http.put<Client>(this.CLIENTURL + client.id, client);
  }
  getClients(): Observable<Client[]> {
    return this.http.get<Client[]>(this.CLIENTURL);
  }
  deleteClient(id: number): Observable<Client> {
    return this.http.delete<Client>(this.CLIENTURL + id.toString());
  }
  postClient(client: Client): Observable<Client> {
    return this.http.post<Client>(this.CLIENTURL, client);
  }
  getClient(id: number): Observable<Client> {
    return this.http.get<Client>(this.CLIENTURL + id.toString());
  }
  putClients(client: Client[]): Observable<Client[]> {
    return this.http.put<Client[]>(this.CLIENTURL, client);
  }
  ///////////////////////////
  putPost(post: Post): Observable<Post> {
    return this.http.put<Post>(this.POSTURL + post.id, post);
  }
  getPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(this.POSTURL);
  }
  deletePost(id: number): Observable<Post> {
    return this.http.delete<Post>(this.POSTURL + id.toString());
  }
  postPost(post: Post): Observable<Post> {
    return this.http.post<Post>(this.POSTURL, post);
  }
  getPost(id: number): Observable<Post> {
    return this.http.get<Post>(this.POSTURL + id.toString());
  }
  putPosts(post: Post[]): Observable<Post[]> {
    return this.http.put<Post[]>(this.POSTURL, post);
  }
  ///////////////
  putEmployee(Employee: Employee): Observable<Employee> {
    return this.http.put<Employee>(this.EMPLOYEEURL + Employee.id, Employee);
  }
  getEmployees(): Observable<Employee[]> {
    return this.http.get<Employee[]>(this.EMPLOYEEURL);
  }
  deleteEmployee(id: number): Observable<Employee> {
    return this.http.delete<Employee>(this.EMPLOYEEURL + id.toString());
  }
  postEmployee(Employee: Employee): Observable<Employee> {
    return this.http.post<Employee>(this.EMPLOYEEURL, Employee);
  }
  getEmployee(id: number): Observable<Employee> {
    return this.http.get<Employee>(this.EMPLOYEEURL + id.toString());
  }
  putEmployees(Employee: Employee[]): Observable<Employee[]> {
    return this.http.put<Employee[]>(this.EMPLOYEEURL, Employee);
  }
  //////////
  putStorageLocation(
    StorageLocation: StorageLocation
  ): Observable<StorageLocation> {
    return this.http.put<StorageLocation>(
      this.STORAGELOCATIONURL + StorageLocation.id,
      StorageLocation
    );
  }
  getStorageLocations(): Observable<StorageLocation[]> {
    return this.http.get<StorageLocation[]>(this.STORAGELOCATIONURL);
  }
  deleteStorageLocation(id: number): Observable<StorageLocation> {
    return this.http.delete<StorageLocation>(
      this.STORAGELOCATIONURL + id.toString()
    );
  }
  postStorageLocation(
    StorageLocation: StorageLocation
  ): Observable<StorageLocation> {
    return this.http.post<StorageLocation>(
      this.STORAGELOCATIONURL,
      StorageLocation
    );
  }
  getStorageLocation(id: number): Observable<StorageLocation> {
    return this.http.get<StorageLocation>(
      this.STORAGELOCATIONURL + id.toString()
    );
  }
  putStorageLocations(
    StorageLocation: StorageLocation[]
  ): Observable<StorageLocation[]> {
    return this.http.put<StorageLocation[]>(
      this.STORAGELOCATIONURL,
      StorageLocation
    );
  }

  ////////////////////

  putSuppliers(Suppliers: Suppliers): Observable<Suppliers> {
    return this.http.put<Suppliers>(
      this.SUPPLIERSURL + Suppliers.id,
      Suppliers
    );
  }
  getSupplierss(): Observable<Suppliers[]> {
    return this.http.get<Suppliers[]>(this.SUPPLIERSURL);
  }
  deleteSuppliers(id: number): Observable<Suppliers> {
    return this.http.delete<Suppliers>(this.SUPPLIERSURL + id.toString());
  }
  postSuppliers(Suppliers: Suppliers): Observable<Suppliers> {
    return this.http.post<Suppliers>(this.SUPPLIERSURL, Suppliers);
  }
  getSuppliers(id: number): Observable<Suppliers> {
    return this.http.get<Suppliers>(this.SUPPLIERSURL + id.toString());
  }
  putSupplierss(Suppliers: Suppliers[]): Observable<Suppliers[]> {
    return this.http.put<Suppliers[]>(this.SUPPLIERSURL, Suppliers);
  }
}
