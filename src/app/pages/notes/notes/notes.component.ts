import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../../services/auth/auth.service';

interface Note {
  _id: string;
  title: string;
  body: string;
  topics: string[];
  author: { id: string; name: string };
}

@Component({
  selector: 'app-notes',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css'],
})
export class NotesComponent implements OnInit {
  notes: Note[] = [];
  loading = true;
  error = '';

  // Inject AuthService separately from HttpClient
  constructor(private http: HttpClient, private authService: AuthService) {}

  ngOnInit() {
    // Use authService.getToken(), not http.getToken()
    const token = this.authService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    this.http
      .get<Note[]>(
        'https://task-react-auth-backend.eapi.joincoded.com/api/notes',
        { headers }
      )
      .subscribe({
        next: (data) => {
          console.log('Raw notes payload:', data);

          this.notes = data;
          this.loading = false;
        },
        error: (err) => {
          this.error = err.error?.message || 'Failed to load notes';
          this.loading = false;
        },
      });
  }
}
