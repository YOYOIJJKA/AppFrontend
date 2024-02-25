import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../../Interfaces/product';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  constructor(private http: HttpClient) {}
  URL = 'http://localhost:3000/products/';

  putProduct(product: Product): Observable<Product> {
    return this.http.put<Product>(this.URL + product.id, product);
  }
  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.URL);
  }

  deleteProduct(id: number): Observable<Product> {
    return this.http.delete<Product>(this.URL + id.toString());
  }

  postProduct(product: Product) {
    return this.http.post<Product>(this.URL, product);
  }
  getProduct(id: number): Observable<Product> {
    return this.http.get<Product>(this.URL + id.toString());
  }

  putProducts(products: Product[]): Observable<Product[]> {
    return this.http.put<Product[]>(this.URL, products);
  }
}
