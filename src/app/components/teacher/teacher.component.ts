import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CourseService } from 'src/app/services/course.service';
import { UserService } from 'src/app/services/user.service';


@Component({
  selector: 'app-teacher',
  templateUrl: './teacher.component.html',
  styleUrls: ['./teacher.component.css']
})
export class TeacherComponent implements OnInit {
  teachersTab: any = [];
  coursesTab: any = [];
  constructor( private userService:UserService,private courseService:CourseService,private router:Router) { }

  ngOnInit(): void {
    this.userService.getAlluserTeachers().subscribe((data) => {
      this.teachersTab = data.T;
    });
    this.courseService.getAllcourses().subscribe((data) => {
      this.coursesTab = data.T;
    });
  }
  

}
