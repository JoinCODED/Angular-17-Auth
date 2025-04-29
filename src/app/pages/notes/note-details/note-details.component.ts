import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../services/auth/auth.service';

interface Note {
  _id: string;
  title: string;
  body: string;
  topics: string[];
  author: { id: string; name: string };
}

@Component({
  selector: 'app-note-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './note-details.component.html',
  styleUrls: ['./note-details.component.css'],
})
export class NoteDetailsComponent implements OnInit {
  note: Note | null = null;
  loading = true;
  error = '';

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private authService: AuthService
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    const token = this.authService.getToken();
    console.log('Fetched token:', token);

    if (!id) {
      this.error = 'No note ID provided';
      this.loading = false;
      return;
    }
    if (!token) {
      this.error = 'You must be logged in to view notes';
      this.loading = false;
      return;
    }

    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    this.http
      .get<Note>(
        `https://task-react-auth-backend.eapi.joincoded.com/api/notes/${id}`,
        { headers }
      )
      .subscribe({
        next: (data) => {
          this.note = data;
          this.loading = false;
        },
        error: (err) => {
          console.error('Note fetch error:', err);
          this.error = err.error?.message || 'Failed to load note';
          this.loading = false;
        },
      });
  }
}
