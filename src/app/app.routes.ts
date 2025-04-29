import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home/home.component';
import { LoginComponent } from './pages/auth/login/login.component';
import { RegisterComponent } from './pages/auth/register/register.component';
import { NotesComponent } from './pages/notes/notes/notes.component';
import { NotesDetailsComponent } from './pages/notes/notes-details/notes-details.component';
import { NewComponent } from './pages/notes/new/new.component';
import { loggedinGuard } from './guards/loggedin.guard';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'notes', component: NotesComponent, canActivate: [loggedinGuard] },
  { path: 'notes/new', component: NewComponent, canActivate: [loggedinGuard] },
  {
    path: 'notes/:id',
    component: NotesDetailsComponent,
    canActivate: [loggedinGuard],
  },
  { path: '**', redirectTo: '' },
];
