import { CommonModule } from '@angular/common';
import { Component, inject, Input, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { environment } from '../../../../environments/environment';
import { GenericApiHandlerService } from '../../../Services/generic-api-handler.service';
import { IPosts } from '../../../ViewModels/PostsVM';
import { CommentComponent } from '../../comment/comment.component';
import CommentsVM from '../../../ViewModels/CommentsVM';
import { DomSanitizer, SafeHtml, Title } from '@angular/platform-browser';
import { UserProfile } from '../../../ViewModels/UserProfile';
import { AuthService } from '../../../Services/auth.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-article',
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
    MatIconModule,
  ],
  templateUrl: './article.component.html',
  styleUrl: './article.component.scss',
})
export class ArticleComponent implements OnInit {
  private activatedRoute = inject(ActivatedRoute);
  private postsService = inject(GenericApiHandlerService);
  private router = inject(Router);

  private titleService = inject(Title);

  postUrl?: string | null;
  postId?: string | null;
  post!: IPosts;
  comments: CommentsVM[] = [];
  baseUrl = environment.BaseURL;

  sanitizer = inject(DomSanitizer);
  sanitizedContent!: SafeHtml;

  newComment!: string;

  user!: UserProfile;

  authService = inject(AuthService);

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

        const title =
          this.activatedRoute.snapshot.data['title'] ||
          `${this.post.title} | by ${this.post.authorName}`;
        this.titleService.setTitle(title);

        this.post.publishedOn = new Date(this.post.publishedOn + 'z');
        if (this.post.title === null || this.post.title == '')
          this.post.title = 'Untitled';

        this.post.authorPhotoPath = `${this.baseUrl}/Images/${this.post.authorPhotoPath}`;

        this.sanitizedContent = this.sanitizer.bypassSecurityTrustHtml(
          this.post.content
        );
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

  visitBlog() {
    this.router.navigate(['blog', this.post.blogUsername]);
  }
}
