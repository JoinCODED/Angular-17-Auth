import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { FormErrorComponent } from '../../../shared/form-error/form-error.component';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from '../../../services/auth/auth.service';

@Component({
  selector: 'app-note-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    FormErrorComponent,
  ],
  templateUrl: './note-form.component.html',
  styleUrls: ['./note-form.component.css'],
})
export class NoteFormComponent {
  noteForm: FormGroup;
  serverError = '';

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private auth: AuthService,
    private router: Router
  ) {
    this.noteForm = this.fb.group({
      title: ['', Validators.required],
      body: ['', Validators.required],
      topics: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.noteForm.invalid) return;
    this.serverError = '';

    const { title, body, topics } = this.noteForm.value;
    const payload = {
      title,
      body,
      topics: topics
        .split(',')
        .map((t: string) => t.trim())
        .filter((t: string) => t),
    };

    const token = this.auth.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    this.http
      .post<{ id: string }>(
        'https://task-react-auth-backend.eapi.joincoded.com/api/notes',
        payload,
        { headers }
      )
      .subscribe({
        next: (res) => {
          this.router.navigate(['/notes', res.id]);
        },
        error: (err) => {
          this.serverError = err.error?.message || 'Failed to create note';
        },
      });
  }
}
