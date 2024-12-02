import { Component, Input } from '@angular/core';
import { ArticlePreviewComponent } from '../article-preview/article-preview.component';
import { CommonModule } from '@angular/common';
import { IPosts } from '../../../ViewModels/PostsVM';

@Component({
  selector: 'app-posts-previews',
  standalone: true,
  imports: [ArticlePreviewComponent, CommonModule],
  templateUrl: './posts-previews.component.html',
  styleUrl: './posts-previews.component.scss',
})
export class PostsPreviewsComponent {
  @Input() posts!: IPosts[];
}
