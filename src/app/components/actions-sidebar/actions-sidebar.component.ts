import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { MenuItem, MessageService } from 'primeng/api';
import { SpeedDialModule } from 'primeng/speeddial';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-actions-sidebar',
  standalone: true,
  imports: [
    MatButtonModule,
    CommonModule,
    RouterModule,
    SpeedDialModule,
    ToastModule,
  ],
  templateUrl: './actions-sidebar.component.html',
  styleUrl: './actions-sidebar.component.scss',
})
export class ActionsSidebarComponent implements OnInit {
  items: MenuItem[] | null = null;

  constructor() {}

  ngOnInit() {
    this.items = [
      {
        icon: 'pi pi-pencil',
        routerLink: ['article-editor'],
      },
      {
        icon: 'pi pi-refresh',
        command: () => {},
      },
      {
        icon: 'pi pi-trash',
        command: () => {},
      },
      {
        icon: 'pi pi-upload',
        routerLink: ['/fileupload'],
      },
      {
        icon: 'pi pi-external-link',
        target: '_blank',
        url: 'http://angular.io',
      },
    ];
  }
}
