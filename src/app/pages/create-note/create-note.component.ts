import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-create-note',
  imports: [NgIf,ReactiveFormsModule],
  templateUrl: './create-note.component.html',
  styleUrl: './create-note.component.css'
})
export class CreateNoteComponent {

  noteForm!: FormGroup;
  topics: string[] = []; 
  
  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.createForm();
  }

  canDeactivate(): boolean {
    if (this.noteForm.dirty) {
      return confirm('You have unsaved changes. Are you sure you want to leave?');
    }
    return true;
  }

  createForm(): void {
    this.noteForm = this.fb.group({
      title: ['', Validators.required],
      body: ['', Validators.required],
      topics: ['', Validators.required]
    });
  }


  onSubmit(): void {
    if (this.noteForm?.valid) {
      const noteData = this.noteForm?.value;
      
      
      const token = this.authService.getToken();
      
     
      this.http.post<any>('https://api.escuelajs.co/api/v1/auth', noteData, {
        headers: { Authorization: `Bearer ${token}` }
      }).subscribe(
        (response) => {
          console.log('Note created:', response);
          this.router.navigate(['/notes']);  
        },
        (error) => {
          console.error('Error creating note:', error);
        }
      );
    }
  }


}
