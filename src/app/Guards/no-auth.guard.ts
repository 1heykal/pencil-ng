import { inject } from '@angular/core';
import { AuthService } from '../Services/auth.service';
import { CanActivateFn, Router } from '@angular/router';

export const noAuthGuard: CanActivateFn = (route, state) => {
  let isUserLogged = inject(AuthService).isUserLogged;
  let router = inject(Router);

  if (!isUserLogged) return true;

  router.navigate(['/home']);
  return false;
};
