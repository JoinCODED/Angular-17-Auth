import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);

  return next(req).pipe(
    catchError((error) => {
      switch (error.status) {
        case 401:
          console.log('Unauthorized');
          localStorage.removeItem('token');
          router.navigate(['/login']);
          break;
        case 404:
          console.log('Not Found');
          router.navigate(['/']);
          break;
        case 500:
          console.log('Internal Server Error');
          router.navigate(['/']);
          break;
        default:
          break;
      }
      return throwError(() => error);
    })
  );
};
