import { Component, OnInit } from '@angular/core';
import { GenericApiHandlerService } from '../../Services/generic-api-handler.service';
import { environment } from '../../../environments/environment';
import { IPosts } from '../../ViewModels/PostsVM';
import { BoxVM } from '../../ViewModels/BoxVM';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CommonModule } from '@angular/common';
import { ShortPostComponent } from '../posts/short-post/short-post.component';
import { ArticlePreviewComponent } from '../articles/article-preview/article-preview.component';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-box',
  standalone: true,
  imports: [
    MatProgressSpinnerModule,
    CommonModule,
    ShortPostComponent,
    ArticlePreviewComponent,
    MatDividerModule,
    MatIconModule,
  ],
  templateUrl: './box.component.html',
  styleUrl: './box.component.scss',
})
export class BoxComponent implements OnInit {
  posts: IPosts[] = [];
  baseUrl = environment.BaseURL;
  loading = true;
  box!: BoxVM;

  constructor(private postsService: GenericApiHandlerService) {}

  ngOnInit(): void {
    this.postsService.setTitle('Box');

    this.postsService.get('box').subscribe((response) => {
      this.loading = false;
      this.box = response.data as BoxVM;
      this.posts = this.box.posts;
      this.posts.forEach(
        (p) =>
          (p.authorPhotoPath = `${this.baseUrl}/Images/${p.authorPhotoPath}`)
      );
    });
  }
}
