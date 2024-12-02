import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AboutComponent } from './about.component';
import { GenericApiHandlerService } from '../../Services/generic-api-handler.service';
import { BehaviorSubject } from 'rxjs';

describe('AboutComponent', () => {
  let component: AboutComponent;
  let fixture: ComponentFixture<AboutComponent>;
  let mockGenericApiHandlerService: jasmine.SpyObj<GenericApiHandlerService>;

  beforeEach(async () => {
    // Create mock service
    mockGenericApiHandlerService = jasmine.createSpyObj('GenericApiHandlerService', ['setTitle']);
    mockGenericApiHandlerService.title$ = new BehaviorSubject<string>('');

    await TestBed.configureTestingModule({
      imports: [AboutComponent],
      providers: [
        { provide: GenericApiHandlerService, useValue: mockGenericApiHandlerService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AboutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set title on init', () => {
    expect(mockGenericApiHandlerService.setTitle).toHaveBeenCalledWith('About Us');
  });

  it('should have team members array', () => {
    expect(component.teamMembers).toBeDefined();
    expect(Array.isArray(component.teamMembers)).toBeTruthy();
  });

  it('should have features array', () => {
    expect(component.features).toBeDefined();
    expect(Array.isArray(component.features)).toBeTruthy();
  });

  it('should render features section', () => {
    const compiled = fixture.nativeElement;
    const features = compiled.querySelectorAll('mat-card');
    expect(features.length).toBe(component.features.length);
  });

  it('should render team members section', () => {
    const compiled = fixture.nativeElement;
    const teamMembers = compiled.querySelectorAll('.team-member');
    expect(teamMembers.length).toBe(component.teamMembers.length);
  });
}); 