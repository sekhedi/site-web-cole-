import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CourseService } from 'src/app/services/course.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-register-teacher',
  templateUrl: './register-teacher.component.html',
  styleUrls: ['./register-teacher.component.css']
})
export class RegisterTeacherComponent implements OnInit {
  signupForm!: FormGroup;
  path: any;
  msg:any;
  photo:any;
  cv:any;
  tabCourses:any=[];
  constructor(private formBuilder:FormBuilder,private userservice:UserService,private courseService:CourseService, private router:Router) { }

  ngOnInit(): void {
    this.path = this.router.url;
    this.signupForm = this.formBuilder.group({
      firstName: ['', [Validators.required, Validators.minLength(3)]],
      lastName:  ['',[Validators.required,Validators.minLength(5)]],
      tel: ['',[Validators.required,Validators.minLength(8),Validators.maxLength(13)]],
      email: ['',[Validators.required,Validators.email]],
      adress: ['',[Validators.required]],
      pwd: ['',[Validators.required,Validators.minLength(6),Validators.maxLength(10)]],
      specialité: ['',[Validators.required]],
    });
    this.courseService.getAllcourses().subscribe((response) => {
      this.tabCourses = response.T;
    });
  }
  signup() {
    if (this.path == "/registerTeacher") {
      this.signupForm.value.role = "teacher";
      this.signupForm.value.status = "not Valid";
      this.userservice.adduserTeacher(this.signupForm.value,this.photo,this.cv).subscribe((response) => {
        console.log("here response after signup", response);
          if (response.msg=="is added valid") {
            this.router.navigate(['login']);
          } else {
                this.msg='tel exist';
  
            
          }
      });
    } 
    
    this.userservice.addUser(this.signupForm.value,this.photo).subscribe((response) => {
      console.log("here response after signup", response);
        if (response.msg=="is added valid") {
          this.router.navigate(['login']);
        } else {
              this.msg='tel exist';

          
        }
    });

  }
  selectPhoto(event: any) {

    // const file = (event.target as HTMLInputElement).files[0];
    const inputElement = event.target as HTMLInputElement;
    if (inputElement && inputElement.files && inputElement.files.length > 0) {
      this.photo = inputElement.files[0];
      //console.log("here file",this.pdf);
    }


  }
  
  selectCv(event: any) {

    // const file = (event.target as HTMLInputElement).files[0];
    const inputElement = event.target as HTMLInputElement;
    if (inputElement && inputElement.files && inputElement.files.length > 0) {
      this.cv = inputElement.files[0];
      //console.log("here file",this.pdf);
    }


  }
}
