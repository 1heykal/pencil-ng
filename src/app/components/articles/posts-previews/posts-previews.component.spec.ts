import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostsPreviewsComponent } from './posts-previews.component';

describe('PostsPreviewsComponent', () => {
  let component: PostsPreviewsComponent;
  let fixture: ComponentFixture<PostsPreviewsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PostsPreviewsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PostsPreviewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
