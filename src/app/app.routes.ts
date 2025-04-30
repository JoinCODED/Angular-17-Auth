import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home/home.component';
import { LoginComponent } from './pages/auth/login/login.component';
import { RegisterComponent } from './pages/auth/register/register.component';
import { NotesComponent } from './pages/notes/notes.component';
import { NotedetailsComponent } from './pages/notedetails/notedetails.component';
import { CreateNoteComponent } from './pages/create-note/create-note.component';
import { canDeactivateGuard } from './can-deactivate.guard';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'notes', component: NotesComponent },
  { path: 'notes/:id', component: NotedetailsComponent },
  {path: 'notes/new',component: CreateNoteComponent,canActivate: [authGuard],canDeactivate: [canDeactivateGuard] },

  
  
  { path: '**', redirectTo: '' },
];
