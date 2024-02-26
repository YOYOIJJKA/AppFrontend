import { Component, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { Post } from '../../Interfaces/post';
import { ProductsService } from '../products/products.service';
import { MatDialog } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalPostComponent } from '../modal-post/modal-post.component';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrl: './posts.component.scss',
})
export class PostsComponent {
  displayedColumns: string[] = ['id', 'name', 'flag', 'confirm'];
  ////////////flag == boolean; boolean => string by f = user t = admin
  posts?: Post[];
  filterForm: FormGroup;

  dataSource = new MatTableDataSource<Post>(this.posts);
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  trueHTML: boolean = true;
  falseHTML: boolean = false;
  ngAfterViewInit() {
    this.getPosts();
  }

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

  getPosts() {
    this.http.getPosts().subscribe({
      next: (value) => (this.posts = value),
      complete: () => {
        this.dataSource = new MatTableDataSource<Post>(this.posts);
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
    if (this.posts)
      if (
        this.posts.filter((post) =>
          (post[type as keyof Post] as string).includes(filterParam)
        )
      ) {
        newProductList = this.posts.filter((post) =>
          (post[type as keyof Post] as string).includes(filterParam)
        );
      }
    this.dataSource = new MatTableDataSource(newProductList);
    this.dataSource.paginator = this.paginator;
  }

  putElement(element: Post) {
    this.http.putPost(element).subscribe();
  }

  putElements(elements: Post[] | undefined) {
    if (elements)
      elements.forEach((element) => this.http.putPost(element).subscribe());
  }

  deleteElement(id: number) {
    this.http.deletePost(id).subscribe({
      error: (e) => console.log(e),
      complete: () => this.getPosts(),
    });
  }

  postElement(element: Post) {
    this.http.postPost(element).subscribe({
      complete: () => this.getPosts(),
    });
  }

  openModal() {
    const dialogRedact = this.dialog.open(ModalPostComponent, {
      width: '40%',
    });
    dialogRedact.afterClosed().subscribe({
      complete: () => {
        this.getPosts();
      },
    });
  }
}
