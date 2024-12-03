import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { ProfileInfoComponent } from '../profile-info/profile-info.component';
import { PostsPreviewsComponent } from '../../articles/posts-previews/posts-previews.component';
import { IPosts } from '../../../ViewModels/PostsVM';
import { GenericApiHandlerService } from '../../../Services/generic-api-handler.service';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { ShortPostComponent } from '../../posts/short-post/short-post.component';
import { ArticlePreviewComponent } from '../../articles/article-preview/article-preview.component';
import { MatDivider, MatDividerModule } from '@angular/material/divider';
import { environment } from '../../../../environments/environment';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../../Services/auth.service';
import { RouterModule } from '@angular/router';
import { LikesComponent } from '../likes/likes.component';
import { BlogsComponent } from '../../blog/blogs/blogs.component';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    CommonModule,
    ProfileInfoComponent,
    PostsPreviewsComponent,
    MatTabsModule,
    MatIconModule,
    ShortPostComponent,
    ArticlePreviewComponent,
    MatDividerModule,
    RouterModule,
    LikesComponent,
    BlogsComponent,
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
})
export class ProfileComponent implements OnInit {
  posts: IPosts[] = [];
  likedPosts: IPosts[] = [];
  likedPostsLoaded = false;
  baseUrl = environment.BaseURL;
  username!: string | null;
  routeValue = '';

  private activatedRoute = inject(ActivatedRoute);
  private authService = inject(AuthService);

  user$ = this.authService.user$;
  sameuser = false;

  private router = inject(Router);

  constructor(private postsService: GenericApiHandlerService) {}

  activeLink: string = '/profile'; // Default active link
  navLinks = [
    { path: 'posts', label: 'Posts', icon: 'grid_on' },
    { path: 'likes', label: 'Likes', icon: 'favorite' },
  ];

  ngOnInit(): void {
    this.postsService.setTitle('Profile');

    this.username = this.activatedRoute.snapshot.paramMap.get('username');
    // this.user$.subscribe((user) => {
    //   this.sameuser = user?.id === this.;
    // });

    this.activatedRoute.paramMap.subscribe((pm) => {
      this.username = pm.get('username');
      // this.user$.subscribe((user) => {
      //   this.sameuser = user?.username === this.username;
      // });
      if (this.username && this.username.toLowerCase() !== 'profile') {
        this.username = this.username.substring(1);
        this.routeValue = `post/username/${this.username}`;
        this.sameuser = false;
      } else {
        this.routeValue = 'account/posts';
        this.sameuser = true;
      }

      this.postsService.get(`${this.routeValue}`).subscribe((response) => {
        this.posts = response.data as IPosts[];
        this.posts.forEach(
          (p) =>
            (p.authorPhotoPath = `${this.baseUrl}/Images/${p.authorPhotoPath}`)
        );
      });
    });
  }

  onTabChange(event: any) {
    if (event.index === 1 && !this.likedPostsLoaded) {
      this.postsService.get('account/likedPosts').subscribe((response) => {
        this.likedPosts = response.data as IPosts[];
        this.likedPosts.forEach(
          (p) =>
            (p.authorPhotoPath = `${this.baseUrl}/Images/${p.authorPhotoPath}`)
        );
        console.log(this.posts);
        this.likedPostsLoaded = true;
      });
    }
  }
}
