import { Component, inject } from '@angular/core';
import { GenericApiHandlerService } from '../../Services/generic-api-handler.service';
import { IPosts } from '../../ViewModels/PostsVM';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { PostDetailsComponent } from '../posts/post-details/post-details.component';
import { ArticlePreviewComponent } from '../articles/article-preview/article-preview.component';
import { ShortPostComponent } from '../posts/short-post/short-post.component';
import { MatDividerModule } from '@angular/material/divider';
import { environment } from '../../../environments/environment';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-tag',
  standalone: true,
  imports: [
    CommonModule,
    ShortPostComponent,
    MatDividerModule,
    ArticlePreviewComponent,
    MatIconModule,
  ],
  templateUrl: './tag.component.html',
  styleUrl: './tag.component.scss',
})
export class TagComponent {
  posts: IPosts[] = [];
  private activatedRoute = inject(ActivatedRoute);
  private postsService = inject(GenericApiHandlerService);
  baseUrl = environment.BaseURL;

  tag!: string;
  ngOnInit(): void {
    this.tag = this.activatedRoute.snapshot.paramMap.get('tag') ?? '';

    this.activatedRoute.paramMap.subscribe((pm) => {
      this.tag = pm.get('tag') ?? '';

      this.postsService.get(`post/t/${this.tag}`).subscribe((response) => {
        this.posts = response.data as IPosts[];
        this.posts.forEach(
          (p) =>
            (p.authorPhotoPath = `${this.baseUrl}/Images/${p.authorPhotoPath}`)
        );
        console.log(this.posts);
      });
    });
  }
}
