import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CourseService } from 'src/app/services/course.service';


@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent implements OnInit {

  coursesTab: any = [];
  constructor(private router:Router, private courseService:CourseService) { }

  ngOnInit(): void {
    this.courseService.getAllcourses().subscribe((data) => {
      this.coursesTab = data.T;
    });
  
  }

}
