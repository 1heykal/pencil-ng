import { Component, OnInit } from '@angular/core';
import { ThemeService } from './Services/theme.service';
import { RouterModule } from '@angular/router';
import { MainLayoutComponent } from './components/layout/main-layout/main-layout.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule, MainLayoutComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(private themeService: ThemeService) {}

  ngOnInit() {
    // Theme will be initialized based on system preference
    this.themeService.initializeTheme();
  }
}
