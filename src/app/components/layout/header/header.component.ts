import { Component, inject, Input, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { CommonModule } from '@angular/common';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../../Services/auth.service';
import { GenericApiHandlerService } from '../../../Services/generic-api-handler.service';
import { UserProfile } from '../../../ViewModels/UserProfile';
import { ThemeService } from '../../../Services/theme.service';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    CommonModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    IconFieldModule,
    InputIconModule,
    InputTextModule,
    RouterLink,
    RouterLinkActive,
    MatTooltipModule,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnInit {
  isUserLogged: boolean = false;

  private authService = inject(AuthService);
  private genericService = inject(GenericApiHandlerService);

  title = this.genericService.title$;

  private router = inject(Router);

  user$: UserProfile | null = null;

  private themeService = inject(ThemeService);

  isDarkTheme$ = this.themeService.isDarkTheme$;

  ngOnInit(): void {
    this.authService
      .isUserLoggedSubject()
      .subscribe((val) => (this.isUserLogged = val));

    this.authService.user$.subscribe((user) => {
      this.user$ = user;
    });
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  toggleTheme() {
    this.themeService.toggleTheme();
  }
}
