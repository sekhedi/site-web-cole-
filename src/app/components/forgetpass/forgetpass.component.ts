import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup ,Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-forgetpass',
  templateUrl: './forgetpass.component.html',
  styleUrls: ['./forgetpass.component.css']
})
export class ForgetpassComponent implements OnInit {
  passwordForm!:FormGroup;
  constructor(private formBuilder: FormBuilder, private userService:UserService, private router:Router) { }

  ngOnInit(): void {
    
  }
  forgotPassword(){
    
  }
}
 