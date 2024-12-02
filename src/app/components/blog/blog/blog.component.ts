import { Component, inject, OnInit } from '@angular/core';
import { BlogInfoComponent } from '../blog-info/blog-info.component';
import { BlogInfo } from '../../../ViewModels/BlogInfo';
import { GenericApiHandlerService } from '../../../Services/generic-api-handler.service';
import { ActivatedRoute } from '@angular/router';
import { IPosts } from '../../../ViewModels/PostsVM';
import { environment } from '../../../../environments/environment';
import { ArticlePreviewComponent } from '../../articles/article-preview/article-preview.component';
import { ShortPostComponent } from '../../posts/short-post/short-post.component';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-blog',
  standalone: true,
  imports: [CommonModule, BlogInfoComponent, ArticlePreviewComponent, ShortPostComponent],
  templateUrl: './blog.component.html',
  styleUrl: './blog.component.scss',
})
export class BlogComponent implements OnInit {
  blog!: BlogInfo;
  private blogService = inject(GenericApiHandlerService);
  private route = inject(ActivatedRoute);

  posts: IPosts[] = [];

  ngOnInit(): void {
    const username = this.route.snapshot.paramMap.get('username');
    this.blogService.get(`Blog/info/username/${username}`).subscribe((blog) => {
      this.blog = blog.data as BlogInfo;
      this.blogService.get(`Blog/${this.blog.id}/posts`).subscribe((posts) => {
        this.posts = posts.data as IPosts[];
        this.posts.forEach((post) => {
          post.publishedOn = new Date(post.publishedOn + 'z');
          post.authorPhotoPath = `${environment.BaseURL}/Images/${post.authorPhotoPath}`;
        });
      });
    });
  }
}
