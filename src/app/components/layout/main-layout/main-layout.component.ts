import { Component, inject, OnInit } from '@angular/core';
import { PostsComponent } from '../../posts/posts/posts.component';
import { HeaderComponent } from '../header/header.component';
import { RouterOutlet } from '@angular/router';
import { SidenavComponent } from '../sidenav/sidenav.component';
import { ActionsSidebarComponent } from '../../actions-sidebar/actions-sidebar.component';
import { AuthService } from '../../../Services/auth.service';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [
    PostsComponent,
    HeaderComponent,
    RouterOutlet,
    SidenavComponent,
    ActionsSidebarComponent,
  ],
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.scss',
})
export class MainLayoutComponent implements OnInit {
  private userService = inject(AuthService);

  ngOnInit(): void {
    this.userService.getUserData().subscribe();
  }
}
