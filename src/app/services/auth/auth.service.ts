import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, tap, throwError } from 'rxjs';
import { BaseService } from '../base/base.service';
import { AuthRequest, AuthResponse } from '../../interfaces/auth/auth';
import { Router } from '@angular/router';
import { toObservable } from '@angular/core/rxjs-interop';

@Injectable({ providedIn: 'root' })
export class AuthService extends BaseService {
  private readonly baseUrl =
    'https://task-react-auth-backend.eapi.joincoded.com/api/auth';
  private readonly router = inject(Router);

  constructor(_http: HttpClient) {
    super(_http);
    console.log(this.token$);
  }

  token = signal<string | null>(localStorage.getItem('token'));
  token$ = toObservable(this.token);

  login(data: AuthRequest): Observable<AuthResponse> {
    return this.post<AuthResponse, AuthRequest>(
      `${this.baseUrl}/login`,
      data
    ).pipe(
      catchError((error) => {
        console.error('Login failed:', error);
        return throwError(() => error);
      }),
      tap((response) => {
        localStorage.setItem('token', response.token);
        this.token.set(response.token);
      })
    );
  }

  register(data: AuthRequest): Observable<AuthResponse> {
    return this.post<AuthResponse, AuthRequest>(
      `${this.baseUrl}/register`,
      data
    ).pipe(
      catchError((error) => {
        console.error('Registration failed:', error);
        return throwError(() => error);
      }),
      tap((response) => {
        localStorage.setItem('token', response.token);
        this.token.set(response.token);
      })
    );
  }

  logout() {
    localStorage.removeItem('token');
    this.token.set(null);
  }
}
