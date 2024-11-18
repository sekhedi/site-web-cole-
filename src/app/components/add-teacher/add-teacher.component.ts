import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { CourseService } from 'src/app/services/course.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-add-teacher',
  templateUrl: './add-teacher.component.html',
  styleUrls: ['./add-teacher.component.css']
})
export class AddTeacherComponent implements OnInit {
  teacherForm!:FormGroup;
  teacher:any={};
  photo:any;
  cv:any;
  tabCourses:any=[];
  
  constructor(private courseService:CourseService,private userService:UserService,private router:Router) { }

  ngOnInit(): void {
    this.courseService.getAllcourses().subscribe((response) => {
      this.tabCourses = response.T;
    });
    
    
  }
  addTeacher(){
    this.teacher.status='not valid';
    this.userService.adduserTeacher(this.teacher,this.photo,this.cv).subscribe((response)=>{
      this.router.navigate(['/tabTeacher']);

    });
  }
  selectPhoto(event: any) {

    // const file = (event.target as HTMLInputElement).files[0];
    const inputElement = event.target as HTMLInputElement;
    if (inputElement && inputElement.files && inputElement.files.length > 0) {
      this.photo = inputElement.files[0];
      //console.log("here file",this.pdf);
    }


  }
  
  selectCv(event: any) {

    // const file = (event.target as HTMLInputElement).files[0];
    const inputElement = event.target as HTMLInputElement;
    if (inputElement && inputElement.files && inputElement.files.length > 0) {
      this.cv = inputElement.files[0];
      //console.log("here file",this.pdf);
    }
  
 

}
}