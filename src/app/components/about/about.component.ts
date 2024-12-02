import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { GenericApiHandlerService } from '../../Services/generic-api-handler.service';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule,
    MatDividerModule,
    MatButtonModule,
  ],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss',
})
export class AboutComponent implements OnInit {
  private titleService = inject(GenericApiHandlerService);

  teamMembers = [
    {
      name: 'Osama Hekal',
      role: 'Founder & CEO',
      image:
        'https://pbs.twimg.com/profile_images/1854140818774220816/CeZrsNPd_400x400.jpg',
      bio: 'Passionate about creating meaningful content platforms.',
      social: {
        twitter: 'https://twitter.com/1heykal',
        linkedin: 'https://linkedin.com/in/1heykal',
        github: 'https://github.com/1heykal',
      },
    },
    {
      name: 'Mohammed Al-Haj',
      role: 'Co-Founder & CTO',
      image: 'https://pbs.twimg.com/profile_images/1854140818774220816/CeZrsNPd_400x400.jpg',
      bio: 'Passionate about creating meaningful content platforms.',
      social: {
        twitter: 'https://twitter.com/1heykal',
        linkedin: 'https://linkedin.com/in/1heykal',
        github: 'https://github.com/1heykal',
      },
    },
    
];

  features = [
    {
      icon: 'edit',
      title: 'Rich Text Editor',
      description: 'Create beautiful articles with our powerful editor.',
    },
    {
      icon: 'group',
      title: 'Community Driven',
      description:
        'Connect with like-minded individuals and share your thoughts.',
    },
    {
      icon: 'trending_up',
      title: 'Analytics',
      description: 'Track your content performance and audience engagement.',
    },
  ];

  ngOnInit() {
    this.titleService.setTitle('About Us');
  }
}
