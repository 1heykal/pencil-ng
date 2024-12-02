import { Routes } from '@angular/router';
import { PostsComponent } from './components/posts/posts/posts.component';
import { ProfileComponent } from './components/profile/profile/profile.component';
import { UserLoginComponent } from './components/Auth/user-login/user-login.component';
import { ProfileEditorComponent } from './components/profile/profile-editor/profile-editor.component';
import { authGuard } from './Guards/auth.guard';
import { CreatePostComponent } from './components/posts/create-post/create-post.component';
import { PostDetailsComponent } from './components/posts/post-details/post-details.component';
import { TagComponent } from './components/tag/tag.component';
import { ArticleComponent } from './components/articles/article/article.component';
import { BoxComponent } from './components/box/box.component';
import { BlogComponent } from './components/blog/blog/blog.component';
import { UserSignupComponent } from './components/Auth/user-signup/user-signup.component';
import { MainLayoutComponent } from './components/layout/main-layout/main-layout.component';
import { ArticleEditorComponent } from './components/articles/article-editor/article-editor.component';
import { AboutComponent } from './components/about/about.component';
import { LikesComponent } from './components/profile/likes/likes.component';
import { noAuthGuard } from './Guards/no-auth.guard';

export const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    title: 'Pencil',
    children: [
      {
        path: 'home',
        component: PostsComponent,
        title: 'Home | Pencil',
      },
      {
        path: 'about',
        component: AboutComponent,
        title: 'About | Pencil',
      },
      {
        path: 'article',
        children: [
          {
            path: '',
            redirectTo: 'editor',
            pathMatch: 'full',
            title: 'Article Editor | Pencil',
          },
          {
            path: 'editor',
            component: ArticleEditorComponent,
            canActivate: [authGuard],
            title: 'Article Editor | Pencil',
          },
          {
            path: 'pid/:id',
            component: ArticleComponent,
          },
          {
            path: ':url',
            component: ArticleComponent,
          },
        ],
      },
      {
        path: 'post/create',
        component: CreatePostComponent,
        pathMatch: 'full',
        canActivate: [authGuard],
      },
      {
        path: 'post/:url',
        component: PostDetailsComponent,
      },
      {
        path: 'post/pid/:id',
        component: PostDetailsComponent,
      },
      {
        path: 'tag/:tag',
        component: TagComponent,
      },
      {
        path: 'profile',
        component: ProfileComponent,
        pathMatch: 'full',
        canActivate: [authGuard],
        children: [
          {
            path: 'likes',
            component: LikesComponent,
            pathMatch: 'full',
          },
        ],
      },
      {
        path: 'login',
        component: UserLoginComponent,
        canActivate: [noAuthGuard],
        title: 'Login | Pencil',
      },
      {
        path: 'register',
        component: UserSignupComponent,
        canActivate: [noAuthGuard],
        title: 'Register | Pencil',
      },
      {
        path: 'box',
        component: BoxComponent,
        pathMatch: 'full',
        title: 'Box | Pencil',
      },
      {
        path: ':username',
        component: ProfileComponent,
        pathMatch: 'full',
      },
      {
        path: 'blog/:username',
        component: BlogComponent,
      },
      {
        path: 'profile/edit',
        component: ProfileEditorComponent,
        canActivate: [authGuard],
      },
      {
        path: '**',
        component: PostsComponent,
      },
    ],
  },
];
