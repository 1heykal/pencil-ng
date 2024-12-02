import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { GenericApiHandlerService } from '../../../Services/generic-api-handler.service';
import { IPosts } from '../../../ViewModels/PostsVM';
import { ShortPostComponent } from '../short-post/short-post.component';
import { MatDividerModule } from '@angular/material/divider';
import { environment } from '../../../../environments/environment';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';
import { ArticlePreviewComponent } from '../../articles/article-preview/article-preview.component';
import { AuthService } from '../../../Services/auth.service';

@Component({
  selector: 'app-posts',
  standalone: true,
  imports: [
    CommonModule,
    ShortPostComponent,
    ArticlePreviewComponent,
    MatDividerModule,
    MatProgressSpinnerModule,
    MatIconModule,
  ],
  templateUrl: './posts.component.html',
  styleUrl: './posts.component.scss',
})
export class PostsComponent implements OnInit {
  posts: IPosts[] = [];
  baseUrl = environment.BaseURL;
  loading = true;
  error = false;

  private isUserLogged = inject(AuthService).isUserLogged;
  constructor(private postsService: GenericApiHandlerService) {}

  ngOnInit(): void {
    this.postsService.setTitle('Home');

    if (this.isUserLogged) this.loadFeedPosts();
    else this.loadAllPosts();
  }

  private loadFeedPosts(): void {
    this.postsService.get('post/Feed').subscribe({
      next: (response) => {
        this.loading = false;
        this.posts = response.data;

        if (this.posts.length === 0) {
          this.loadAllPosts();
        } else {
          this.updatePhotoPaths();
        }
      },
      error: (error) => {
        this.loading = false;
        this.error = true;
        console.error('Error fetching posts:', error);
      },
    });
  }

  private loadAllPosts(): void {
    this.postsService.get('post').subscribe({
      next: (res) => {
        this.loading = false;
        this.posts = res.data;
        this.updatePhotoPaths();
      },
      error: (error) => {
        this.loading = false;
        this.error = true;
        console.error('Error fetching all posts:', error);
      },
    });
  }

  private updatePhotoPaths(): void {
    this.posts.forEach((post) => {
      if (post.authorPhotoPath) {
        post.authorPhotoPath = `${this.baseUrl}/Images/${post.authorPhotoPath}`;
      }
    });
  }
}
