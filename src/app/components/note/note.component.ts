import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { CourseService } from 'src/app/services/course.service';
import { NoteService } from 'src/app/services/note.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.css']
})
export class NoteComponent implements OnInit {

  
  evaluationForm!:FormGroup;
  evaluation:any={};
  tabTeachers:any=[];
  tabStudents:any=[];
  tabCourses:any=[];
  constructor(private noteService:NoteService,private userService:UserService,private courseService:CourseService, private router:Router) { }

  ngOnInit(): void {
    this.userService.getAlluserTeachers().subscribe((response) => {
      this.tabTeachers = response.T;
    });
    this.userService.getAlluserStudents().subscribe((response) => {
      this.tabStudents = response.T;
    });
    this.courseService.getAllcourses().subscribe((response) => {
      this.tabCourses = response.T;
    });
    
  }
  addEvaluation(){
    this.noteService.addnote(this.evaluation).subscribe((response)=>{
      this.router.navigate(['/tabNote']);

    });
  }

}
