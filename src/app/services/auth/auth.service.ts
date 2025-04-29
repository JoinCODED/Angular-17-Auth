import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap, catchError, throwError } from 'rxjs';
import { BaseService } from '../base/base.service';
import { AuthRequest, AuthResponse } from '../../interfaces/auth/auth';

@Injectable({ providedIn: 'root' })
export class AuthService extends BaseService {
  private readonly baseUrl =
    'https://task-react-auth-backend.eapi.joincoded.com/api';

  constructor(http: HttpClient) {
    super(http);
  }

  login(data: AuthRequest): Observable<AuthResponse> {
    return this.post<AuthResponse, AuthRequest>(
      `${this.baseUrl}/auth/login`,
      data
    ).pipe(
      tap((res) => {
        document.cookie = `token=${res.token}; path=/;`;
      }),
      catchError((err) => {
        console.error('Login failed:', err);
        return throwError(() => err);
      })
    );
  }

  register(formData: FormData): Observable<AuthResponse> {
    return this.post<AuthResponse, FormData>(
      `${this.baseUrl}/auth/register`,
      formData
    ).pipe(
      tap((res) => {
        document.cookie = `token=${res.token}; path=/;`;
      }),
      catchError((err) => {
        console.error('Registration failed:', err);
        return throwError(() => err);
      })
    );
  }

  getToken(): string | null {
    const match = document.cookie.match(/(?:^|; )token=([^;]+)/);
    return match ? match[1] : null;
  }

  logout(): void {
    document.cookie = 'token=; path=/; max-age=0';
  }
}
