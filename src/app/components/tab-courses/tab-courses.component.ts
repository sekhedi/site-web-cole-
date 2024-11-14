import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CourseService } from 'src/app/services/course.service';

@Component({
  selector: 'app-tab-courses',
  templateUrl: './tab-courses.component.html',
  styleUrls: ['./tab-courses.component.css']
})
export class TabCoursesComponent implements OnInit {
  searchForm!: FormGroup;
  coursesTab: any = [];
  constructor(private router:Router, private courseService:CourseService,private formBuilder:FormBuilder) { }

  ngOnInit(): void {
    this.searchForm = this.formBuilder.group({
      search: ['', [Validators.required]]
    });
    this.courseService.getAllcourses().subscribe((data) => {
      this.coursesTab = data.T;
    });
  }
  deleteCourse(id: number) {
    //faire un appel aun service 
    this.courseService.deletecourseById(id).subscribe((response) => {
      console.log('is deleted valid', response);
      this.courseService.getAllcourses().subscribe((data) => {
        this.coursesTab = data.T;
      });
    });
  }
  searchCourse(){
    this.courseService.searchCourse(this.searchForm.value).subscribe((data) => {
      this.coursesTab = data.course;
    });
  }
  goToInfo(id: number) {
    this.router.navigate ([`courseDetails/${id}`]);
  }
  goToEdit(id: number) {
    this.router.navigate([`editCourse/${id}`]);

  }
  goToAdd() {
    this.router.navigate([`addCourse/`]);

  }


}
