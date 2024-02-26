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
import { AuthGuard, FlagGuard } from './Guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: AuthComponent,
  },
  {
    path: 'products',
    component: ProductsComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'employees',
    component: EmployeesComponent,
    canActivate: [FlagGuard],
  },
  {
    path: 'clients',
    component: ClientsComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'suppliers',
    component: SuppliersComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'posts',
    component: PostsComponent,
    canActivate: [FlagGuard],
  },
  {
    path: 'storage-location',
    component: StorageLocationComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'registration',
    component: RegistrationComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
