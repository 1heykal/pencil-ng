import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Post } from '../../../models/post';
import { PostComponent } from "../post/post.component";

@Component({
  selector: 'app-posts',
  standalone: true,
  imports: [CommonModule, PostComponent],
  templateUrl: './posts.component.html',
  styleUrl: './posts.component.scss',
})
export class PostsComponent {
  posts: Post[] = [
    {
      Id: '1',
      Title: 'Understanding Angular Directives',
      Subtitle: 'A guide to mastering Angular directives for dynamic content',
      Content:
        'Directives are an essential part of Angular. They allow developers to dynamically modify DOM elements and provide structure to your templates.',
      PublishedOn: new Date('2024-09-20'),
      BlogPhotoPath: 'assets/images/angular-directives.png',
      BlogName: 'Tech Insights',
      AuthorName: 'Jane Doe',
      AuthorPhotoPath: 'assets/images/jane-doe.jpg',
      LikesCount: 124,
      CommentsCount: 32,
    },
    {
      Id: '2',
      Title: 'Getting Started with NgRx',
      Subtitle: 'A beginner’s guide to state management in Angular',
      Content:
        'State management is critical for large-scale Angular applications, and NgRx provides a robust solution for handling state across different components.',
      PublishedOn: new Date('2024-08-15'),
      BlogPhotoPath: 'assets/images/ngrx-intro.png',
      BlogName: 'Dev Chronicle',
      AuthorName: 'John Smith',
      AuthorPhotoPath: 'assets/images/john-smith.jpg',
      LikesCount: 98,
      CommentsCount: 15,
    },
    {
      Id: '3',
      Title: 'Exploring RxJS Operators',
      Subtitle: 'A deep dive into the most powerful RxJS operators',
      Content:
        'RxJS is a powerful library for reactive programming in JavaScript. This article covers some of the most widely-used operators like map, filter, and mergeMap.',
      PublishedOn: new Date('2024-07-10'),
      BlogPhotoPath: 'assets/images/rxjs-operators.png',
      BlogName: 'Code Masters',
      AuthorName: 'Alice Johnson',
      AuthorPhotoPath: 'assets/images/alice-johnson.jpg',
      LikesCount: 256,
      CommentsCount: 45,
    },
    {
      Id: '4',
      Title: 'Building Scalable APIs with ASP.NET Core',
      Subtitle: 'A hands-on guide to building scalable and maintainable APIs',
      Content:
        'ASP.NET Core offers a modern framework for building RESTful APIs. Learn how to structure your API for scalability and maintainability.',
      PublishedOn: new Date('2024-06-28'),
      BlogPhotoPath: 'assets/images/aspnet-core-api.png',
      BlogName: 'Backend Pro',
      AuthorName: 'Michael Lee',
      AuthorPhotoPath: 'assets/images/michael-lee.jpg',
      LikesCount: 310,
      CommentsCount: 67,
    },
 ];

}
