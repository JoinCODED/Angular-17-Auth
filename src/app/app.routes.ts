import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home/home.component';
import { LoginComponent } from './pages/auth/login/login.component';
import { RegisterComponent } from './pages/auth/register/register.component';
import { NotesComponent } from './pages/notes/notes.component';
import { NoteDetailsComponent } from './shared/components/note-details/note-details.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'notes', component: NotesComponent },
  { path: 'notes/:id', component: NoteDetailsComponent },
  { path: '**', redirectTo: '' },
];
