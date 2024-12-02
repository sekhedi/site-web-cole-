import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NoteService } from 'src/app/services/note.service';

@Component({
  selector: 'app-tab-note',
  templateUrl: './tab-note.component.html',
  styleUrls: ['./tab-note.component.css']
})
export class TabNoteComponent implements OnInit {

  notesTab: any = [];
  constructor(private router:Router, private noteService:NoteService) { }

  ngOnInit(): void {
    
    this.noteService.getAllnotes().subscribe((data) => {
      this.notesTab = data.T;
    });
  }
  deleteEvaluation(id: number) {
    //faire un appel aun service 
    this.noteService.deletenoteById(id).subscribe((response) => {
      console.log('is deleted valid', response);
      this.noteService.getAllnotes().subscribe((data) => {
        this.notesTab = data.T;
      });
    });
  }
 
 
  goToEdit(id: number) {
    this.router.navigate([`editNote/${id}`]);

  }
  goToAdd() {
    this.router.navigate([`Note/`]);

  }



}
