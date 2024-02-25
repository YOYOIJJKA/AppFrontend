import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './Components/auth/auth.component';
import { ProductsComponent } from './Components/products/products.component';
import { EmployeesComponent } from './Components/employees/employees.component';
import { ClientsComponent } from './Components/clients/clients.component';
import { SuppliersComponent } from './Components/suppliers/suppliers.component';
import { PostsComponent } from './Components/posts/posts.component';
import { StorageLocationComponent } from './Components/storage-location/storage-location.component';
import { RegistrationComponent } from './Components/registration/registration.component';
import { ModalComponent } from './Components/modal/modal.component';

const routes: Routes = [
  {
    path: '',
    component: ModalComponent,
  },
  {
    path: 'products',
    component: ProductsComponent,
  },
  {
    path: 'employees',
    component: EmployeesComponent,
  },
  {
    path: 'clients',
    component: ClientsComponent,
  },
  {
    path: 'suppliers',
    component: SuppliersComponent,
  },
  {
    path: 'posts',
    component: PostsComponent,
  },
  {
    path: 'storage-location',
    component: StorageLocationComponent,
  },
  {
    path: 'registration',
    component: RegistrationComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
