import { Component, inject, Input, OnInit } from '@angular/core';
import { BlogInfo } from '../../../ViewModels/BlogInfo';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { GenericApiHandlerService } from '../../../Services/generic-api-handler.service';
import { environment } from '../../../../environments/environemnt.pord';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-blogs',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, RouterModule, MatIconModule],
  templateUrl: './blogs.component.html',
  styleUrl: './blogs.component.scss',
})
export class BlogsComponent implements OnInit {
  @Input() blogs: BlogInfo[] = [];

  private blogService = inject(GenericApiHandlerService);

  ngOnInit(): void {
    this.blogService.get('Account/Blogs').subscribe((res) => {
      this.blogs = res.data as BlogInfo[];

      this.blogs.forEach((blog) => {
        blog.photoPath = blog.photoPath
          ? `${environment.BaseURL}/Images/${blog.photoPath}`
          : 'https://static.vecteezy.com/system/resources/previews/021/710/815/original/blog-icon-vector.jpg';
      });
    });
  }
}
