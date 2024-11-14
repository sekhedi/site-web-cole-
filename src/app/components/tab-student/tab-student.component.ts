import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-tab-student',
  templateUrl: './tab-student.component.html',
  styleUrls: ['./tab-student.component.css']
})
export class TabStudentComponent implements OnInit {
  searchForm!: FormGroup;
  studentsTab: any = [];
  constructor(private router: Router, private userService:UserService,private formBuilder:FormBuilder) { }

  ngOnInit(): void {
    this.searchForm = this.formBuilder.group({
      search: ['', [Validators.required]]
    });
    this.userService.getAlluserStudents().subscribe((data) => {
      this.studentsTab = data.T;
    });
  }
  deleteStudent(id: number) {
    //faire un appel aun service 
    this.userService.deleteUserById(id).subscribe((response) => {
      console.log('is deleted valid', response);
      this.userService.getAlluserStudents().subscribe((data) => {
        this.studentsTab = data.T;
      });
    });
  }
  searchStudent(){
    this.userService.searchUser(this.searchForm.value).subscribe((data) => {
      this.studentsTab = data.user;
    });
  }
  goToInfo(id: number) {
    this.router.navigate([`studentDetails/${id}`]);
  }
  goToEdit(id: number) {
    this.router.navigate([`editStudent/${id}`]);

  }
  goToAdd() {
    this.router.navigate([`addStudent/`]);

  }

}
