import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../Services/auth.service';
import RegisterModel from '../../../ViewModels/RegisterModel';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-signup',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './user-signup.component.html',
  styleUrl: './user-signup.component.scss',
})
export class UserSignupComponent {
  private formBuilder = inject(FormBuilder);
  private authService = inject(AuthService);

  private router = inject(Router);

  signUpForm = this.formBuilder.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    email: ['', Validators.required],
    password: ['', Validators.required],
    confirmPassword: ['', Validators.required],
  });

  register() {
    if (this.signUpForm.valid) {
      this.authService
        .register(this.signUpForm.value as RegisterModel)
        .subscribe(() => {
          this.router.navigate(['Home']);
        });
    }
  }
}
