import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home/home.component';
import { LoginComponent } from './pages/auth/login/login.component';
import { RegisterComponent } from './pages/auth/register/register.component';
import { NoteDetailsComponent } from './pages/notes/note-details/note-details.component';
import { NotesComponent } from './pages/notes/notes/notes.component';
import { NoteFormComponent } from './pages/notes/note-form/note-form.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'notes', component: NotesComponent },
  { path: 'notes/new', component: NoteFormComponent },

  { path: 'notes/:id', component: NoteDetailsComponent },

  { path: '**', redirectTo: '' },
];
