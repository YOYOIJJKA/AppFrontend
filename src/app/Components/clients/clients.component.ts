import { Component, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { Client } from '../../Interfaces/client';
import { ProductsService } from '../products/products.service';
import { MatDialog } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalClientComponent } from '../modal-client/modal-client.component';
import { Column } from '../../Interfaces/column';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrl: './clients.component.scss',
})
export class ClientsComponent {
  displayedColumns: string[] = ['id', 'name', 'email', 'phone', 'confirm'];
  displayedNames: string[] = [
    'Код клиента',
    'Название Организации',
    'E-mail',
    'Номер телефона',
  ];
  clients?: Client[];
  filterForm: FormGroup;
  columns: Column[];

  constructor(
    public http: ProductsService,
    public dialog: MatDialog,
    public formBuilder: FormBuilder
  ) {
    this.filterForm = this.formBuilder.group({
      type: [null, [Validators.required]],
      filterParam: [null, [Validators.required]],
    });
    this.columns = this.displayedNames.map((newName, index) => {
      return { id: this.displayedColumns[index], name: newName };
    });
  }

  dataSource = new MatTableDataSource<Client>(this.clients);
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.getClients();
  }

  getClients() {
    this.http.getClients().subscribe({
      next: (value) => (this.clients = value),
      complete: () => {
        this.dataSource = new MatTableDataSource<Client>(this.clients);
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
    if (this.clients)
      if (
        this.clients.filter((client) =>
          (client[type as keyof Client] as string).includes(filterParam)
        )
      ) {
        newProductList = this.clients.filter((client) =>
          (client[type as keyof Client] as string).includes(filterParam)
        );
      }
    this.dataSource = new MatTableDataSource(newProductList);
    this.dataSource.paginator = this.paginator;
  }

  putElement(element: Client) {
    this.http.putClient(element).subscribe();
  }

  putElements(elements: Client[] | undefined) {
    if (elements)
      elements.forEach((element) => this.http.putClient(element).subscribe());
  }

  deleteElement(id: number) {
    this.http.deleteClient(id).subscribe({
      error: (e) => console.log(e),
      complete: () => this.getClients(),
    });
  }

  postElement(element: Client) {
    this.http.postClient(element).subscribe({
      complete: () => this.getClients(),
    });
  }

  openModal() {
    const dialogRedact = this.dialog.open(ModalClientComponent, {
      width: '40%',
    });
    dialogRedact.afterClosed().subscribe({
      complete: () => {
        this.getClients();
      },
    });
  }
}
