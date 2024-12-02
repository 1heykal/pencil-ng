import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShortPostComponent } from '../../posts/short-post/short-post.component';
import { ArticlePreviewComponent } from '../../articles/article-preview/article-preview.component';
import { GenericApiHandlerService } from '../../../Services/generic-api-handler.service';
import { IPosts } from '../../../ViewModels/PostsVM';
import { environment } from '../../../../environments/environment';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-likes',
  standalone: true,
  imports: [
    CommonModule,
    ShortPostComponent,
    ArticlePreviewComponent,
    MatIconModule
  ],
  templateUrl: './likes.component.html',
  styleUrl: './likes.component.scss'
})
export class LikesComponent implements OnInit {
  private postsService = inject(GenericApiHandlerService);
  likedPosts: IPosts[] = [];
  baseUrl = environment.BaseURL;

  ngOnInit(): void {
    this.loadLikedPosts();
  }

  private loadLikedPosts() {
    this.postsService.get('account/likedPosts').subscribe((response) => {
      this.likedPosts = response.data as IPosts[];
      this.likedPosts.forEach(
        (post) => post.authorPhotoPath = `${this.baseUrl}/Images/${post.authorPhotoPath}`
      );
    });
  }
} 