import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CourseService } from 'src/app/services/course.service';
import { UserService } from 'src/app/services/user.service';


@Component({
  selector: 'app-teacher-details',
  templateUrl: './teacher-details.component.html',
  styleUrls: ['./teacher-details.component.css']
})
export class TeacherDetailsComponent implements OnInit {

  teacherId: any;
  teacher: any = {};


  constructor(private activatedRoute: ActivatedRoute, private userService:UserService,private courseService:CourseService) { }

  ngOnInit() {

    this.teacherId = this.activatedRoute.snapshot.params['id'];
    this.userService.getUserById(this.teacherId).subscribe(
      (data)=>{
        this.teacher = data.T;
      }
    );
   

  }

}
