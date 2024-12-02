import { HttpHandlerFn, HttpRequest } from '@angular/common/http';
import { AuthService } from '../auth.service';
import { inject } from '@angular/core';

export default function authInterceptor(
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
) {
  const authToken = inject(AuthService).getAuthToken();

  if (authToken) {
    const newReq = req.clone({
      headers: req.headers.append('Authorization', `Bearer ${authToken}`),
    });

    return next(newReq);
  }

  return next(req);
}
