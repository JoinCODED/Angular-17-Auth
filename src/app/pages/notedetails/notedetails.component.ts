import { NgIf } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-notedetails',
  imports: [NgIf],
  templateUrl: './notedetails.component.html',
  styleUrl: './notedetails.component.css'
})
export class NotedetailsComponent {
  note: any = {};  
  
    constructor(
      private route: ActivatedRoute,  
      private http: HttpClient       
    ) {}
  
    ngOnInit(): void {
      this.getNoteDetails();  
    }
  
    getNoteDetails(): void {
      const noteId = this.route.snapshot.paramMap.get('id');  
      if (noteId) {
        this.http.get<any>(`https://task-react-auth-backend.eapi.joincoded.com/api/notes/${noteId}`).subscribe(
          (data) => {
            this.note = data;  
          },
          (error) => {
            console.error('Error fetching note details:', error);  
          }
        );
      }
    }
  }
