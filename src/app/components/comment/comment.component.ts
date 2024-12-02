import { CommonModule } from '@angular/common';
import { Component, inject, Input, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { Router, RouterModule } from '@angular/router';
import { environment } from '../../../environments/environment';
import { GenericApiHandlerService } from '../../Services/generic-api-handler.service';
import CommentsVM from '../../ViewModels/CommentsVM';

@Component({
  selector: 'app-comment',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatChipsModule,
    MatProgressBarModule,
    MatButtonModule,
    MatDividerModule,
    MatIconModule,
    RouterModule,
  ],
  templateUrl: './comment.component.html',
  styleUrl: './comment.component.scss',
})
export class CommentComponent implements OnInit {
  @Input() comment!: CommentsVM;
  baseUrl = environment.BaseURL;
  private commentsService = inject(GenericApiHandlerService);
  liked: boolean = false;
  private router = inject(Router);

  ngOnInit(): void {
    this.comment.publishedOn = new Date(this.comment.publishedOn + 'z');

    this.comment.authorPhotoPath = `${this.baseUrl}/Images/${this.comment.authorPhotoPath}`;
  }

  like() {
    if (!this.liked) {
      this.comment.likesCount++;
      this.commentsService
        .post(`LikeComment`, { commentId: this.comment.id })
        .subscribe();
    } else this.comment.likesCount--;

    this.liked = !this.liked;
  }

  log(event: Event) {
    event.stopPropagation();
    event.preventDefault();
  }

  visitUser() {
    this.router.navigate([`@${this.comment.username}`]);
  }
}
