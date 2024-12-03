import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { GenericApiHandlerService } from '../../../Services/generic-api-handler.service';
import { Router } from '@angular/router';
import { FileUploadComponent } from '../../file-upload/file-upload.component';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-create-blog',
  standalone: true,
  imports: [ReactiveFormsModule, FileUploadComponent],
  templateUrl: './create-blog.component.html',
  styleUrl: './create-blog.component.scss',
})
export class CreateBlogComponent {
  formBuilder = inject(FormBuilder);
  blogService = inject(GenericApiHandlerService);

  router = inject(Router);

  baseUrl = environment.BaseURL;

  createBlogForm = this.formBuilder.group({
    name: ['', Validators.required],
    username: [''],
    photoPath: [''],
  });

  create() {
    var blog = {
      name: this.createBlogForm.value.name,
      username: this.createBlogForm.value.username,
      photoPath: this.createBlogForm.value.photoPath,
    };

    this.blogService.post('blog', blog).subscribe((res) => {
      this.router.navigate(['blog', res.data.username]);
    });
  }

  uploadImage() {
    this.blogService.post('ImageUpload', this.createBlogForm.value.photoPath);
  }
  setPhotoPath(name: string) {
    this.createBlogForm.value.photoPath = name;
  }
}
