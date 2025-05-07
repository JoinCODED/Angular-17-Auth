import { inject } from '@angular/core';
import { CanDeactivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';
export const loggedinGuard: CanDeactivateFn<unknown> = (
  component,
  currentRoute,
  currentState,
  nextState
) => {
  const router = inject(Router);
  const authService = inject(AuthService);
  const token = authService.token();
  localStorage.getItem('token');
  if (!token) {
    router.navigate(['/login']);
    return false;
  }
  return true;
};
