import { CommonModule } from '@angular/common';
import { Component, inject, Input, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { Router, RouterModule } from '@angular/router';
import { environment } from '../../../../environments/environment';
import { GenericApiHandlerService } from '../../../Services/generic-api-handler.service';
import { IPosts } from '../../../ViewModels/PostsVM';
import { formatDistanceToNow, format } from 'date-fns';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RelativeDateComponent } from '../../../shared/components/relative-date/relative-date.component';
import { MatMenuModule } from '@angular/material/menu';

@Component({
  selector: 'app-short-post',
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
    MatTooltipModule,
    RelativeDateComponent,
    MatMenuModule,
  ],
  templateUrl: './short-post.component.html',
  styleUrl: './short-post.component.scss',
})
export class ShortPostComponent implements OnInit {
  @Input() post!: IPosts;
  baseUrl = environment.BaseURL;
  private router = inject(Router);
  private postsService = inject(GenericApiHandlerService);
  liked: boolean = false;

  ngOnInit(): void {
    this.post.publishedOn = new Date(this.post.publishedOn + 'z');
    if (this.post.title === null || this.post.title == '')
      this.post.title = 'Untitled';
  }

  visitPost() {
    this.router.navigate(['post/pid', this.post.id]);
  }

  visitUser() {
    this.router.navigate(['@' + this.post.authorUsername]);
  }

  like() {
    if (!this.post.liked) {
      this.post.likesCount++;
      this.postsService
        .post(`LikePost/like`, { postId: this.post.id })
        .subscribe();
    } else {
      this.post.likesCount--;
      this.postsService
        .post(`LikePost/unlike`, { postId: this.post.id })
        .subscribe();
    }

    this.post.liked = !this.post.liked;
  }

  save() {
    if (!this.post.saved) {
      this.postsService.post(`Box/save`, { postId: this.post.id }).subscribe();
    } else {
      this.postsService.delete(`Box/unsave`, this.post.id).subscribe();
    }

    this.post.saved = !this.post.saved;
  }

  formatDate(date: Date | string): string {
    const postDate = new Date(date);
    const now = new Date();
    const diffInHours = (now.getTime() - postDate.getTime()) / (1000 * 60 * 60);

    if (diffInHours < 24) {
      return formatDistanceToNow(postDate, { addSuffix: true });
    } else if (diffInHours < 48) {
      return 'Yesterday';
    } else if (diffInHours < 168) {
      // 7 days
      return formatDistanceToNow(postDate, { addSuffix: true });
    } else {
      return format(postDate, 'MMM d, yyyy');
    }
  }

  getFullDate(date: Date | string): string {
    return format(new Date(date), 'PPpp'); // e.g., "Apr 29, 2024, 9:30 AM"
  }
}
