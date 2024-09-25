import { Routes } from '@angular/router';
import { PostsComponent } from './components/posts/posts.component';
import { PostComponent } from './components/post/post.component';

export const routes: Routes = [
  {
    path: '',
    component: PostsComponent,
  },

  {
    path: 'home',
    component: PostsComponent,
  },

  {
    path: 'post/:pid',
    component: PostComponent,
  },
];
