import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';


@Component({
  selector: 'app-edit-teacher',
  templateUrl: './edit-teacher.component.html',
  styleUrls: ['./edit-teacher.component.css']
})
export class EditTeacherComponent implements OnInit {

  
  teacherId: any;
  teacher: any = {};
  teacherForm!:FormGroup ;
  photo:any;
  constructor(private activatedRoute: ActivatedRoute, private router: Router, private userService:UserService) { }

  ngOnInit() {
    this.teacherId = this.activatedRoute.snapshot.params['id'];
  
    this.userService.getUserById(this.teacherId).subscribe(
      (data) => {
        this.teacher = data.T
      }
    );

  }
  editTeacher() {
   
    this.userService.editUser(this.teacher).subscribe((response) => {
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
