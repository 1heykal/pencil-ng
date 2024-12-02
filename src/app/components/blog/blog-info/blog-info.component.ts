import { AfterViewInit, Component, inject, Input, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { BlogInfo } from '../../../ViewModels/BlogInfo';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { GenericApiHandlerService } from '../../../Services/generic-api-handler.service';
@Component({
  selector: 'app-blog-info',
  standalone: true,
  imports: [
    MatCardModule,
    MatButtonModule,
    CommonModule,
    MatDividerModule,
    MatIconModule,
  ],
  templateUrl: './blog-info.component.html',
  styleUrl: './blog-info.component.scss',
})
export class BlogInfoComponent implements AfterViewInit {
  @Input() blog!: BlogInfo;
  isSubscibed: boolean = false;
  subscibeButtonText: string = 'Subscribe';
  private blogService = inject(GenericApiHandlerService);

  ngAfterViewInit(): void {
    this.isSubscibed = this.blog.isCurrentUserSubscribed;
    console.log(this.isSubscibed);
    this.subscibeButtonText = this.isSubscibed ? 'Subscribed' : 'Subscribe';
  }

  subscribe() {
    if (!this.isSubscibed) {
      this.blogService
        .post('Subscription/Subscribe', { blogId: this.blog.id })
        .subscribe(() => {
          this.isSubscibed = true;
          this.subscibeButtonText = 'Subscribed';
          this.blog.subscriptionsCount++;
        });
    } else {
      this.blogService
        .delete('Subscription/Unsubscribe', this.blog.id)
        .subscribe(() => {
          this.isSubscibed = false;
          this.subscibeButtonText = 'Subscribe';
          this.blog.subscriptionsCount--;
        });
    }
  }
}
