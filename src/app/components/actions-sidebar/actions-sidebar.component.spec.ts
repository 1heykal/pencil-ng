import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActionsSidebarComponent } from './actions-sidebar.component';

describe('ActionsSidebarComponent', () => {
  let component: ActionsSidebarComponent;
  let fixture: ComponentFixture<ActionsSidebarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ActionsSidebarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActionsSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
