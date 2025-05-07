import { Injectable } from '@angular/core';
import { BaseService } from '../base/base.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Note, Notes } from '../../interfaces/notes/notes';

@Injectable({
  providedIn: 'root',
})
export class NotesService extends BaseService {
  private readonly baseUrl =
    'https://task-react-auth-backend.eapi.joincoded.com/api';

  constructor(_http: HttpClient) {
    super(_http);
  }

  fetchNotes(): Observable<Notes[]> {
    return this.get<Notes[]>(`${this.baseUrl}/notes`);
  }

  fetchNoteById(noteId: string): Observable<Notes> {
    return this.get<Notes>(`${this.baseUrl}/notes/${noteId}`);
  }

  createNote(note: Note): Observable<Notes> {
    return this.post<Notes, Note>(`${this.baseUrl}/notes`, note);
  }
}
