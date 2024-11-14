import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { jwtDecode } from "jwt-decode";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  user: any ={};
  decoded:any={};
  msg: any;
  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
  }
  login() {
    console.log("here objet", this.user);
    this.userService.login(this.user).subscribe((data) => {
      if (data.user) {
        sessionStorage.setItem("token",data.user);
        this.decoded = jwtDecode(data.user);
        console.log("here data after coded", this.decoded);
        if (this.decoded.role == "parent") {
          this.router.navigate(['']);

        } else if (this.decoded.role == "student") {
          this.router.navigate(['']);
        } else if (this.decoded.role == "admin") {
          this.router.navigate(['admin']);
        } else if (this.decoded.role == "teacher") {
          if (this.decoded.status=="valid") {
            this.router.navigate(['']);
          } else {
            console.log("teacher not valid in admin",this.decoded.status);
            this.msg="teacher not valid in admin";
          }
          
        }

      } else {
        this.msg = "please check tel/pwd"
      }
    })
  }


}
