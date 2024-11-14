import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';


@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent implements OnInit {

  
  studentsTab: any = [];
  constructor(private router:Router, private userService:UserService) { }

  ngOnInit(): void {
    this.userService.getAlluserStudents().subscribe((data) => {
      this.studentsTab = data.T;
    });
  }

}
