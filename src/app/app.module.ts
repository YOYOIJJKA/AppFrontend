import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ClientsComponent } from './Components/clients/clients.component';
import { ProductsComponent } from './Components/products/products.component';
import { EmployeesComponent } from './Components/employees/employees.component';
import { PostsComponent } from './Components/posts/posts.component';
import { SuppliersComponent } from './Components/suppliers/suppliers.component';
import { StorageLocationComponent } from './Components/storage-location/storage-location.component';
import { AuthComponent } from './Components/auth/auth.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatRadioModule } from '@angular/material/radio';
import { RegistrationComponent } from './Components/registration/registration.component';
import { MatSelectModule } from '@angular/material/select';
import { ModalProductComponent } from './Components/modal-product/modal-product.component';
import { MatDialogModule } from '@angular/material/dialog';
import { ModalEmployeeComponent } from './Components/modal-employee/modal-employee.component';
import { ModalClientComponent } from './Components/modal-client/modal-client.component';
import { ModalPostComponent } from './Components/modal-post/modal-post.component';
import { ModalSuppliersComponent } from './Components/modal-suppliers/modal-suppliers.component';
import { ModalStorageLocationComponent } from './Components/modal-storage-location/modal-storage-location.component';

@NgModule({
  declarations: [
    AppComponent,
    ClientsComponent,
    ProductsComponent,
    EmployeesComponent,
    PostsComponent,
    SuppliersComponent,
    StorageLocationComponent,
    AuthComponent,
    RegistrationComponent,
    ModalProductComponent,
    ModalEmployeeComponent,
    ModalClientComponent,
    ModalPostComponent,
    ModalSuppliersComponent,
    ModalStorageLocationComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    FormsModule,
    ReactiveFormsModule,
    MatPaginatorModule,
    MatSidenavModule,
    MatRadioModule,
    MatSelectModule,
    HttpClientModule,
    MatDialogModule,
  ],
  providers: [provideAnimationsAsync()],
  bootstrap: [AppComponent],
})
export class AppModule {}
