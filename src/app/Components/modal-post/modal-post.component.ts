import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductsService } from '../products/products.service';
import { MatDialog } from '@angular/material/dialog';
import { Post } from '../../Interfaces/post';

@Component({
  selector: 'app-modal-post',
  templateUrl: './modal-post.component.html',
  styleUrl: './modal-post.component.scss',
})
export class ModalPostComponent {
  modalForm: FormGroup;

  trueHTML: Boolean = true;
  falseHTML: Boolean = false;

  constructor(
    public formBuilder: FormBuilder,
    public http: ProductsService,
    public dialog: MatDialog
  ) {
    this.modalForm = formBuilder.group({
      name: [
        null,
        [Validators.required, Validators.pattern('[A-Za-zА-Яа-яЁё]*')],
      ],
      flag: [null, [Validators.required]],
    });
  }

  post() {
    if (this.modalForm.valid) {
      let post: Post = this.modalForm.getRawValue();
      this.http.postPost(post).subscribe();
      this.closeModal();
    }
  }

  closeModal() {
    this.dialog.closeAll();
  }
}
