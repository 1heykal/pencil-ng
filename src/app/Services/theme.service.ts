import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { OverlayContainer } from '@angular/cdk/overlay';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private isDarkTheme = new BehaviorSubject<boolean>(true);

  private preferedTheme = localStorage.getItem('preferedTheme');
  isDarkTheme$ = this.isDarkTheme.asObservable();

  constructor(private overlayContainer: OverlayContainer) {
    // Check system preference on init

    let prefersDark = true;

    if (this.preferedTheme == 'dark') {
      prefersDark = true;
    } else if (this.preferedTheme == 'light') {
      prefersDark = false;
    } else {
      prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    }

    this.setTheme(prefersDark);
  }

  toggleTheme() {
    this.setTheme(!this.isDarkTheme.value);
  }

  private setTheme(isDark: boolean) {
    this.isDarkTheme.next(isDark);

    // Update document classes
    if (isDark) {
      document.documentElement.classList.remove('light-theme');
      document.documentElement.classList.add('dark-theme');
      this.overlayContainer
        .getContainerElement()
        .classList.remove('light-theme');
      this.overlayContainer.getContainerElement().classList.add('dark-theme');

      localStorage.setItem('preferedTheme', 'dark');
    } else {
      document.documentElement.classList.remove('dark-theme');
      document.documentElement.classList.add('light-theme');
      this.overlayContainer
        .getContainerElement()
        .classList.remove('dark-theme');
      this.overlayContainer.getContainerElement().classList.add('light-theme');

      localStorage.setItem('preferedTheme', 'light');
    }
  }

  initializeTheme() {
    let prefersDark = true;

    if (this.preferedTheme == 'dark') {
      prefersDark = true;
    } else if (this.preferedTheme == 'light') {
      prefersDark = false;
    } else {
      prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    }

    this.setTheme(prefersDark);

    // Listen for system theme changes
    window
      .matchMedia('(prefers-color-scheme: dark)')
      .addEventListener('change', (e) => {
        if (this.preferedTheme == 'dark') {
          prefersDark = true;
        } else if (this.preferedTheme == 'light') {
          prefersDark = false;
        } else {
          prefersDark = e.matches;
        }
        this.setTheme(prefersDark);
      });
  }
}
