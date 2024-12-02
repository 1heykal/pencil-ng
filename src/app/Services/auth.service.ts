import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { AuthModel } from '../ViewModels/AuthModel';
import { environment } from '../../environments/environment';
import { ApiResponseVM } from '../ViewModels/ApiResponseVM';
import { shareReplay, tap } from 'rxjs/operators';
import { UserProfile } from '../ViewModels/UserProfile';
import RegisterModel from '../ViewModels/RegisterModel';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http: HttpClient = inject(HttpClient);
  private isLoggedInSubject = new BehaviorSubject<boolean>(this.isUserLogged);

  private userSubject = new BehaviorSubject<UserProfile | null>(null);
  user$ = this.userSubject.asObservable();

  baseUrl = environment.BaseURL;

  public login(model: AuthModel): Observable<ApiResponseVM> {
    if (this.isUserLogged) return of();

    return this.http
      .post<ApiResponseVM>(`${environment.APIURL}/auth/login`, model)
      .pipe(
        shareReplay(),
        tap((res) => {
          this.setSession(res.data);
        })
      );
  }

  getUserData(): Observable<ApiResponseVM> {
    return this.http
      .get<ApiResponseVM>(`${environment.APIURL}/account/profile`)
      .pipe(
        tap((user) => {
          user.data.photoPath = `${this.baseUrl}/Images/${user.data.photoPath}`;
          this.userSubject.next(user.data as UserProfile);
        })
      );
  }

  getAuthToken() {
    return localStorage.getItem('token');
  }

  get isUserLogged() {
    return localStorage.getItem('token') != null;
  }

  setSession(response: string) {
    localStorage.setItem('token', response);
    this.isLoggedInSubject.next(true);
  }

  logout() {
    localStorage.removeItem('token');
    this.isLoggedInSubject.next(false);
    this.userSubject.next(null);
  }

  register(registerModel: RegisterModel): Observable<ApiResponseVM> {
    return this.http
      .post<ApiResponseVM>(`${environment.APIURL}/auth/register`, registerModel)
      .pipe(
        shareReplay(),
        tap((res) => {
          this.setSession(res.data);
        })
      );
  }

  isUserLoggedSubject() {
    return this.isLoggedInSubject.asObservable();
  }
}
