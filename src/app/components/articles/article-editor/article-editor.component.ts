import Quill from 'quill';

Quill.register('modules/syntax', true); // Enables the syntax module

import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
  WritableSignal,
  OnInit,
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { GenericApiHandlerService } from '../../../Services/generic-api-handler.service';
import CreatePostVM from '../../../ViewModels/CreatePostVM';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatChipInputEvent, MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { EditorModule } from 'primeng/editor';
import { QuillOptions } from 'quill';
import { BlogInfo } from '../../../ViewModels/BlogInfo';

@Component({
  selector: 'app-article-editor',
  standalone: true,
  imports: [
    EditorModule,
    ReactiveFormsModule,
    CommonModule,
    MatButtonModule,
    MatFormFieldModule,
    MatChipsModule,
    MatIconModule,
    MatButtonToggleModule,
    MatSelectModule,
    MatInputModule,
  ],
  templateUrl: './article-editor.component.html',
  styleUrl: './article-editor.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ArticleEditorComponent {
  private formBuilder = inject(FormBuilder);
  private postsService = inject(GenericApiHandlerService);
  private router = inject(Router);

  blogs: BlogInfo[] = [];

  createPostForm = this.formBuilder.group({
    title: [''],
    subtitle: [''],
    blogId: [''],
    content: ['', Validators.required],
    tags: [[]],
  });

  editorConfig: QuillOptions = {
    modules: {
      toolbar: [
        // Text formatting
        ['bold', 'italic', 'underline', 'strike'], // toggled buttons

        // Color and background
        [{ color: [] }, { background: [] }], // dropdown with defaults

        // Paragraph formatting
        [{ align: [] }], // text align
        [{ indent: '-1' }, { indent: '+1' }], // outdent/indent
        [{ direction: 'rtl' }], // text direction

        // Headers
        [{ header: [1, 2, 3, 4, 5, 6, false] }], // custom button values

        // Font
        [{ size: ['small', false, 'large', 'huge'] }], // custom dropdown
        [{ font: [] }], // font family

        // Lists and quotes
        [{ list: 'ordered' }, { list: 'bullet' }],
        [{ script: 'sub' }, { script: 'super' }], // superscript/subscript
        ['blockquote', 'code-block'],

        // Media and links
        ['link', 'image', 'video'],

        // Clear formatting
        ['clean'], // remove formatting button
      ],
    },
  };

  ngOnInit() {
    this.postsService.get('Account/Blogs').subscribe((res) => {
      this.blogs = res.data as BlogInfo[];
    });
  }

  create() {
    let post: CreatePostVM = {
      title: this.createPostForm.value.title,
      subtitle: this.createPostForm.value.subtitle,
      content: this.createPostForm.value.content ?? '',
      tags: this.createPostForm.value.tags ?? [],
      blogId: this.createPostForm.value.blogId,
      type: 'long',
    };
    console.log(this.createPostForm.value);
    this.postsService.post('post', post).subscribe();
    this.router.navigate(['/']);
  }

  readonly reactiveKeywords: WritableSignal<string[]> = signal([]);

  announcer = inject(LiveAnnouncer);

  removeReactiveKeyword(keyword: string) {
    this.reactiveKeywords.update((keywords) => {
      const index = keywords.indexOf(keyword);
      if (index < 0) {
        return keywords;
      }

      keywords.splice(index, 1);
      this.announcer.announce(`removed ${keyword} from reactive form`);
      return [...keywords];
    });
  }

  addReactiveKeyword(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add our keyword
    if (value) {
      this.reactiveKeywords.update((keywords) => [...keywords, value]);
      this.announcer.announce(`added ${value} to reactive form`);
    }

    // Clear the input value
    event.chipInput!.clear();
  }
}
