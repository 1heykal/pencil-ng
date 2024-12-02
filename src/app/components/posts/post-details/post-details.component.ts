import { Component, inject, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GenericApiHandlerService } from '../../../Services/generic-api-handler.service';
import { MatChipsModule } from '@angular/material/chips';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { IPosts } from '../../../ViewModels/PostsVM';
import { environment } from '../../../../environments/environment';
import CommentsVM from '../../../ViewModels/CommentsVM';
import { CommentComponent } from '../../comment/comment.component';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { AuthService } from '../../../Services/auth.service';
import { UserProfile } from '../../../ViewModels/UserProfile';
import { RelativeDateComponent } from '../../../shared/components/relative-date/relative-date.component';
@Component({
  selector: 'app-post-details',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatChipsModule,
    MatProgressBarModule,
    MatButtonModule,
    MatDividerModule,
    MatIconModule,
    CommentComponent,
    FormsModule,
    MatFormFieldModule,
    MatIconModule,
    RelativeDateComponent,
  ],
  templateUrl: './post-details.component.html',
  styleUrl: './post-details.component.scss',
})
export class PostDetailsComponent implements OnInit {
  private activatedRoute = inject(ActivatedRoute);
  private postsService = inject(GenericApiHandlerService);

  private authService = inject(AuthService);
  private router = inject(Router);

  postUrl?: string | null;
  postId?: string | null;
  post!: IPosts;
  comments!: CommentsVM[];
  baseUrl = environment.BaseURL;
  newComment: string = '';

  user!: UserProfile;

  constructor() {
    this.comments = [];
  }
  ngOnInit(): void {
    this.authService.user$.subscribe((user) => {
      this.user = user as UserProfile;
    });

    this.postUrl = this.activatedRoute.snapshot.paramMap.get('url');
    this.postId = this.activatedRoute.snapshot.paramMap.get('id');

    this.activatedRoute.paramMap.subscribe((pm) => {
      this.postUrl = pm.get('url');

      let routeValue = this.postUrl ?? 'pid/' + this.postId ?? '';

      this.postsService.get(`Post/${routeValue}`).subscribe((res) => {
        this.post = res.data as IPosts;
        this.post.publishedOn = new Date(this.post.publishedOn + 'z');
        if (this.post.title === null || this.post.title == '')
          this.post.title = 'Untitled';

        this.post.authorPhotoPath = `${this.baseUrl}/Images/${this.post.authorPhotoPath}`;

        this.postsService
          .get(`comment/pid/${this.post.id}`)
          .subscribe((res) => {
            this.comments = res.data as CommentsVM[];
          });
      });
    });
  }

  visitTag(tag: string) {
    this.router.navigate(['tag', tag]);
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
        .post(`LikePost/Like`, { postId: this.post.id })
        .subscribe(() => (this.post.liked = true));
    } else {
      this.post.likesCount++;
      this.postsService
        .post(`LikePost/unLike`, { postId: this.post.id })
        .subscribe(() => (this.post.liked = false));
    }
  }

  save() {
    if (!this.post.saved) {
      this.postsService.post(`Box/save`, { postId: this.post.id }).subscribe();
    } else {
      this.postsService.delete(`Box/unsave`, this.post.id).subscribe();
    }

    this.post.saved = !this.post.saved;
  }

  createComment() {
    this.postsService
      .post(`comment`, { postId: this.post.id, content: this.newComment })
      .subscribe((res) => {
        let comment = res.data as CommentsVM;
        comment.authorPhotoPath =
          this.user.photoPath?.split('/')[4] ?? 'assets/user-circle-thing.svg';
        comment.authorName = this.user.firstName + ' ' + this.user.lastName;
        comment.publishedOn = new Date(res.data.publishedOn.replace('Z', ''));
        comment.likesCount = 0;

        this.comments.push(comment);
        this.newComment = '';
      });
  }
}
