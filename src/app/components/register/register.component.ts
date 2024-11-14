import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  signupForm!: FormGroup;
  path: any;
  msg:any;
  photo:any;
  constructor(private formBuilder:FormBuilder,private userservice:UserService, private router:Router) { }

  ngOnInit(): void {
    this.path = this.router.url;
    this.signupForm = this.formBuilder.group({
      firstName: ['', [Validators.required, Validators.minLength(3)]],
      lastName:  ['',[Validators.required,Validators.minLength(5)]],
      tel: ['',[Validators.required,Validators.minLength(8),Validators.maxLength(13)]],
      email: ['',[Validators.required,Validators.email]],
      adress: ['',[Validators.required]],
      pwd: ['',[Validators.required,Validators.minLength(6),Validators.maxLength(10)]]
    });
  }
  signup() {
    if (this.path == "/registerAdmin") {
      this.signupForm.value.role = "admin";
    } else if (this.path == "/registerStudent") {
      this.signupForm.value.role = "student";
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
  selectFile(event: any) {

    // const file = (event.target as HTMLInputElement).files[0];
    const inputElement = event.target as HTMLInputElement;
    if (inputElement && inputElement.files && inputElement.files.length > 0) {
      this.photo = inputElement.files[0];
      //console.log("here file",this.photo);
    }


  }
}
