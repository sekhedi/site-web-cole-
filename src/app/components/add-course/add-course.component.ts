import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { CourseService } from 'src/app/services/course.service';
import { UserService } from 'src/app/services/user.service';


@Component({
  selector: 'app-add-course',
  templateUrl: './add-course.component.html',
  styleUrls: ['./add-course.component.css']
})
export class AddCourseComponent implements OnInit {

  courseForm!:FormGroup;
  course:any={};
  photo:any;
  tabTeachers:any=[];
  tabStudents:any=[];
  constructor(private courseService:CourseService,private userService:UserService,private router:Router) { }

  ngOnInit(): void {
    this.userService.getAlluserTeachers().subscribe((response) => {
      this.tabTeachers = response.T;
    });
    this.userService.getAlluserStudents().subscribe((response) => {
      this.tabStudents = response.T;
    });
    
  }
  addCourse(){
    this.courseService.addcourse(this.course,this.photo).subscribe((response)=>{
      this.router.navigate(['/tabCourse']);

    });
  }
  selectFile(event: any) {

    // const file = (event.target as HTMLInputElement).files ;
    const inputElement = event.target as HTMLInputElement;
    if (inputElement && inputElement.files && inputElement.files.length > 0) {
      this.photo = inputElement.files[0];
      //console.log("here file",this.photo);
    }


  }


}
