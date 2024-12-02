import { Component, inject, OnInit } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { CommonModule } from '@angular/common';
import {
  ActivatedRoute,
  RouterLink,
  RouterLinkActive,
  RouterOutlet,
} from '@angular/router';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { GenericApiHandlerService } from '../../../Services/generic-api-handler.service';

@Component({
  selector: 'app-sidenav',
  standalone: true,
  imports: [
    CommonModule,
    MatSidenavModule,
    MatSidenavModule,
    RouterOutlet,
    MatIconModule,
    MatButtonModule,
    MatTooltipModule,
    RouterLink,
    RouterLinkActive,
  ],
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.scss',
})
export class SidenavComponent implements OnInit {
  boxIsFilled = false;
  homeIsFilled = true;

  private genericService = inject(GenericApiHandlerService);

  title = this.genericService.title$;
  ngOnInit(): void {
    this.title.subscribe((title) => {
      if (title.toLowerCase() === 'home') {
        this.homeIsFilled = true;
        this.boxIsFilled = false;
      } else if (title.toLowerCase() === 'box') {
        this.boxIsFilled = true;
        this.homeIsFilled = false;
      } else {
        this.homeIsFilled = false;
        this.boxIsFilled = false;
      }
    });
  }

}
