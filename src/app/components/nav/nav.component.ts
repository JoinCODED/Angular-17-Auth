import { Component, inject } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { AsyncPipe } from '@angular/common';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
@Component({
  selector: 'app-nav',
  imports: [AsyncPipe, RouterLink, RouterLinkActive],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css',
})
export class NavComponent {
  authService = inject(AuthService);
  token = this.authService.token$;
  router = inject(Router);

  logout() {
    this.authService.logout();
  }

  navigateToHome() {
    this.router.navigate(['/']);
  }
}
