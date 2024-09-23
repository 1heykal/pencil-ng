import { Component } from '@angular/core';
import { PostsComponent } from '../posts/posts.component';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [PostsComponent],
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.scss'
})
export class MainLayoutComponent {

}
