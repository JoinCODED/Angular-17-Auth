import { Component, inject } from '@angular/core';
import { AuthService } from '../../../services/auth/auth.service';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-home',
  imports: [AsyncPipe],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  authService = inject(AuthService);
  token = this.authService.token$;

  logout() {
    this.authService.logout();
  }
}
