import { Component, inject, Input, OnInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { IPosts } from '../../../ViewModels/PostsVM';
import { Router, RouterModule } from '@angular/router';
import { environment } from '../../../../environments/environment';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { CommentComponent } from '../../comment/comment.component';
import { GenericApiHandlerService } from '../../../Services/generic-api-handler.service';

@Component({
  selector: 'app-article-preview',
  standalone: true,
  imports: [
    DatePipe,
    RouterModule,
    CommonModule,
    MatCardModule,
    MatChipsModule,
    MatProgressBarModule,
    MatButtonModule,
    MatDividerModule,
    MatIconModule,
    CommentComponent,
  ],
  templateUrl: './article-preview.component.html',
  styleUrl: './article-preview.component.scss',
})
export class ArticlePreviewComponent implements OnInit {
  @Input() post!: IPosts;
  baseUrl = environment.BaseURL;
  private postsService = inject(GenericApiHandlerService);

  private router = inject(Router);

  ngOnInit(): void {
    this.post.publishedOn = new Date(this.post.publishedOn + 'z');
    if (this.post.title === null || this.post.title == '')
      this.post.title = 'Untitled';
  }

  log(event: Event) {
    event.stopPropagation();
    event.preventDefault();
  }

  visitUser() {
    this.router.navigate([`@${this.post.authorUsername}`]);
  }

  visitBlog() {
    this.router.navigate([`blog/${this.post.blogUsername}`]);
  }

  save() {
    if (!this.post.saved) {
      this.postsService.post(`Box/save`, { postId: this.post.id }).subscribe();
    } else {
      this.postsService.delete(`Box/unsave`, this.post.id).subscribe();
    }

    this.post.saved = !this.post.saved;
  }
}
