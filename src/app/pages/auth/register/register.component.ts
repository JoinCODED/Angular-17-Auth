import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule, NgIf } from '@angular/common';
import { FormErrorComponent } from '../../../shared/form-error/form-error.component';
import { AuthService } from '../../../services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, NgIf, FormErrorComponent],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  registerForm: FormGroup;
  selectedFile: File | null = null;
  serverError = '';

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router
  ) {
    this.registerForm = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length) {
      this.selectedFile = input.files[0];
    }
  }

  onSubmit() {
    if (this.registerForm.invalid || !this.selectedFile) {
      this.serverError = !this.selectedFile ? 'Profile image is required' : '';
      return;
    }

    const formData = new FormData();
    formData.append('name', this.registerForm.value.name);
    formData.append('email', this.registerForm.value.email);
    formData.append('password', this.registerForm.value.password);
    formData.append('image', this.selectedFile);

    this.serverError = '';
    this.auth.register(formData).subscribe({
      next: () => this.router.navigate(['/notes']),
      error: (err) => {
        this.serverError = err.error?.message || 'Registration failed';
      },
    });
  }
}
