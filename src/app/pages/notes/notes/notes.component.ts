import { Component, inject } from '@angular/core';
import { NotesService } from '../../../services/notes/notes.service';
import { Notes } from '../../../interfaces/notes/notes';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth/auth.service';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-notes',
  imports: [AsyncPipe],
  templateUrl: './notes.component.html',
  styleUrl: './notes.component.css',
})
export class NotesComponent {
  notes: Notes[] = [];
  authService = inject(AuthService);
  token = this.authService.token$;

  constructor(private notesService: NotesService, private router: Router) {
    this.notesService.fetchNotes().subscribe((notes) => {
      this.notes = notes;
    });
  }

  showDetails(noteId: string) {
    console.log(noteId);
    this.router.navigate(['/notes', noteId]);
  }

  createNote() {
    this.router.navigate(['/notes/new']);
  }
}
