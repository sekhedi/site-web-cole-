import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-add-student',
  templateUrl: './add-student.component.html',
  styleUrls: ['./add-student.component.css']
})
export class AddStudentComponent implements OnInit {

  studentForm!:FormGroup;
  student:any={};
  photo:any;
  tabParents:any=[];
  constructor(private userService:UserService,private router:Router) { }

  ngOnInit(): void {
    
    this.userService.getAlluserParents().subscribe((response) => {
      this.tabParents = response.T;
    });
    
  }
  addStudent(){
    this.userService.addUser(this.student,this.photo).subscribe((response)=>{
      this.router.navigate(['/tabStudent']);

    });
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
