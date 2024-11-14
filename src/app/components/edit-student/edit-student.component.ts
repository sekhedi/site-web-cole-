import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';


@Component({
  selector: 'app-edit-student',
  templateUrl: './edit-student.component.html',
  styleUrls: ['./edit-student.component.css']
})
export class EditStudentComponent implements OnInit {

  studentId: any;
  student: any = {};
  studentForm!:FormGroup ;
  photo:any;
  constructor(private activatedRoute: ActivatedRoute, private router:Router, private userService:UserService) { }

  ngOnInit() {
    this.studentId = this.activatedRoute.snapshot.params['id'];
  
    this.userService.getUserById(this.studentId).subscribe(
      (data) => {
        this.student = data.T
      }
    );

  }
  editStudent() {
   
    this.userService.editUser(this.student).subscribe((response) => {
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
