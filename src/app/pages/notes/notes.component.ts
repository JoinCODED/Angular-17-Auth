import { CommonModule, NgFor } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-notes',
  imports: [NgFor, CommonModule],
  templateUrl: './notes.component.html',
  styleUrl: './notes.component.css'
})
export class NotesComponent {
  notes: any[] = [];

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    this.fetchNotes();
  }

  fetchNotes(): void {
    this.http.get<any[]>('https://task-react-auth-backend.eapi.joincoded.com/api/notes').subscribe(
      (data) => {
        this.notes = data;
      },
      (error) => {
        console.error('Error fetching notes', error);
      }
    );
  }

  viewNoteDetails(noteId: string): void {
    this.router.navigate([`/notes/${noteId}`]);
  }

}

