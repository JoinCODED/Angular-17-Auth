import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { BaseService } from '../base/base.service';
import { AuthRequest, AuthResponse } from '../../interfaces/auth/auth';
import { CookieService } from 'ngx-cookie-service';

@Injectable({ providedIn: 'root' })
export class AuthService extends BaseService {
  
  private readonly baseUrl = 'https://api.escuelajs.co/api/v1/auth';
  private loggedIn = false;

  constructor(_http: HttpClient, private cookieService: CookieService) {
    super(_http);
  }

  login(data: AuthRequest): Observable<AuthResponse> {
    return this.post<AuthResponse, AuthRequest>(
      `${this.baseUrl}/login`,
      data
    ).pipe(
      catchError((error) => {
        console.error('Login failed:', error);
        return throwError(() => error);
      })
    );
  }

  register(data: FormData): Observable<AuthResponse> {
    return this.post<AuthResponse, FormData>(
      `${this.baseUrl}/register`,
      data
    ).pipe(
      catchError((error) => {
        console.error('Registration failed:', error);
        return throwError(() => error);
      })
    );
  }

  setToken(token: string): void {
    this.cookieService.set('authToken', token, { path: '/' });
  }

  getToken(): string {
    return this.cookieService.get('authToken');
  }

  deleteToken(): void {
    this.cookieService.delete('authToken', '/');
  }

  isAuthenticated(): boolean {
    return this.loggedIn;
  }

   logout(): void {
   this.deleteToken();
   this.loggedIn = false;
  }

}
