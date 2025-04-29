import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NotesService } from '../../../services/notes/notes.service';
import { Notes } from '../../../interfaces/notes/notes';
@Component({
  selector: 'app-notes-details',
  imports: [],
  templateUrl: './notes-details.component.html',
  styleUrl: './notes-details.component.css',
})
export class NotesDetailsComponent {
  noteId: string = '';
  note: Notes | null = null;
  constructor(
    private route: ActivatedRoute,
    private notesService: NotesService
  ) {
    this.route.params.subscribe((params) => {
      this.noteId = params['id'];
    });

    this.notesService.fetchNoteById(this.noteId).subscribe((note) => {
      this.note = note;
    });
  }
}
