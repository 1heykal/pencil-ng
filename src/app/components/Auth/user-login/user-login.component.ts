import { Component, inject, Inject, OnInit } from '@angular/core';
import { AuthService } from '../../../Services/auth.service';
import { AuthModel } from '../../../ViewModels/AuthModel';
import {
  FormBuilder,
  FormControl,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-user-login',
  standalone: true,
  imports: [ReactiveFormsModule, RouterModule],
  templateUrl: './user-login.component.html',
  styleUrl: './user-login.component.scss',
})
export class UserLoginComponent implements OnInit {
  private formBuilder = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);

  loginForm = this.formBuilder.group({
    email: ['', Validators.required],
    password: ['', Validators.required],
  });

  ngOnInit(): void {
    //  if (this.authService.isUserLogged) this.router.navigateByUrl('/');
  }

  public login() {
    let model: AuthModel = {
      email: this.loginForm.value.email ?? '',
      password: this.loginForm.value.password ?? '',
    };

    this.authService.login(model).subscribe((response) => {
      this.router.navigateByUrl('/');
    });
  }
}
