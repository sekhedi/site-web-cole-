import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CourseService } from 'src/app/services/course.service';


@Component({
  selector: 'app-edit-course',
  templateUrl: './edit-course.component.html',
  styleUrls: ['./edit-course.component.css']
})
export class EditCourseComponent implements OnInit {

  courseId: any;
  course: any = {};
  courseForm!:FormGroup;
  photo:any;
  constructor(private activatedRoute: ActivatedRoute, private router:Router, private courseService:CourseService) { }

  ngOnInit() {
    this.courseId = this.activatedRoute.snapshot.params['id'];
  
    this.courseService.getcourseById(this.courseId).subscribe(
      (data) => {
        this.course = data.T
      }
    );

  }
  editCourse() {
   
    this.courseService.editcourse(this.course).subscribe((response) => {
      console.log("here response after update", response.msg);
    });
    this.router.navigate(['admin']);

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
