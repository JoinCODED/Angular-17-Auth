import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NotesService } from '../../../services/notes/notes.service';
import { Router } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { FormErrorComponent } from '../../../shared/form-error/form-error.component';
import { Note, Notes } from '../../../interfaces/notes/notes';

@Component({
  selector: 'app-new',
  imports: [ReactiveFormsModule, FormErrorComponent],
  templateUrl: './new.component.html',
  styleUrl: './new.component.css',
})
export class NewComponent {
  newNoteForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private notesService: NotesService,
    private router: Router
  ) {
    this.newNoteForm = this.fb.group({
      title: ['', Validators.required],
      body: ['', Validators.required],
      topic: ['', Validators.required],
    });
  }

  onSubmit() {
    const topics = this.newNoteForm.value.topic.split(',');

    const note: Note = {
      title: this.newNoteForm.value.title,
      body: this.newNoteForm.value.body,
      topic: topics,
    };

    this.notesService.createNote(note).subscribe({
      next: (note) => {
        console.log(note);
        this.router.navigate(['/notes']);
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
}
