import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, throwError } from 'rxjs';

export interface AuthResponse {
  kind: string;
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private BASE_URL = 'https://identitytoolkit.googleapis.com/v1/accounts:';
  private API_KEY = 'AIzaSyCFuOlGgMVDWXL4jNuaqhNywNogWTgk42E';

  constructor(private http: HttpClient) {}

  signup(email: string, password: string) {
    return this.http
      .post<AuthResponse>(`${this.BASE_URL}signUp?key=${this.API_KEY}`, {
        email,
        password,
        returnSecureToken: true,
      })
      .pipe(catchError((errorRes) => this.handleError(errorRes)));
  }

  login(email: string, password: string) {
    return this.http
      .post<AuthResponse>(
        `${this.BASE_URL}signInWithPassword?key=${this.API_KEY}`,
        {
          email,
          password,
          returnSecureToken: true,
        }
      )
      .pipe(catchError((errorRes) => this.handleError(errorRes)));
  }

  private handleError(errorRes: HttpErrorResponse) {
    let errorMsg = 'An unknown error occurred!';
    if (!errorRes.error || !errorRes.error.error) {
      return throwError(() => errorMsg);
    }
    switch (errorRes.error.error.message) {
      case 'EMAIL_EXISTS':
        errorMsg = 'This email exists already!';
        break;
      case 'EMAIL_NOT_FOUND':
        errorMsg = 'This email does not exist.';
        break;
      case 'INVALID_PASSWORD':
        errorMsg = 'This password is not correct.';
        break;
    }
    return throwError(() => errorMsg);
  }
}
