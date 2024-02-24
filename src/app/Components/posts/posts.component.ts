import { Component, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { Post } from '../../Interfaces/post';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrl: './posts.component.scss',
})
export class PostsComponent {
  displayedColumns: string[] = ['id', 'name', 'flag'];
  ////////////flag == boolean; boolean => string by f = user t = admin
  posts?: Post[];

  dataSource = new MatTableDataSource<Post>(this.posts);
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource = new MatTableDataSource<Post>(this.posts);
    this.dataSource.paginator = this.paginator;
  }
}
