import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-tab-teacher',
  templateUrl: './tab-teacher.component.html',
  styleUrls: ['./tab-teacher.component.css']
})
export class TabTeacherComponent implements OnInit {
  searchForm!: FormGroup;
  teachersTab: any = [];
  constructor(private router: Router,private userService:UserService,private formBuilder:FormBuilder) { }

  ngOnInit(): void {
    this.searchForm = this.formBuilder.group({
      search: ['', [Validators.required]]
    });
    this.userService.getAlluserTeachers().subscribe((data) => {
      this.teachersTab = data.T;
    });
   
  }
  deleteTeacher(id: number) {
    //faire un appel aun service 
    this.userService.deleteUserById(id).subscribe((response) => {
      console.log('is deleted valid', response);
      this.userService.getAlluserTeachers().subscribe((data) => {
        this.teachersTab = data.T;
      });
    });
  }
  searchTeacher(){
    this.userService.searchUser(this.searchForm.value).subscribe((data) => {
      this.teachersTab = data.user;
    });
  }
  goToInfo(id: number) {
    this.router.navigate([`teacherDetails/${id}`]);
  }
  goToEdit(id: number) {
    this.router.navigate([`editTeacher/${id}`]);

  }
  goToAdd() {
    this.router.navigate([`addTeacher/`]);

  }


}
