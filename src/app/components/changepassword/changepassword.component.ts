import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup ,Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-changepassword',
  templateUrl: './changepassword.component.html',
  styleUrls: ['./changepassword.component.css']
})
export class ChangepasswordComponent implements OnInit {

  passwordForm!:FormGroup;
  msg:any;
  user:any;
  decoded:any;
  constructor(private formBuilder: FormBuilder, private userService:UserService, private router:Router) { }

  ngOnInit(): void {
    this.passwordForm = this.formBuilder.group({
      oldPassword: ['', [Validators.required]],
      newPassword: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]],
    });
  }
  changePassword() {
    this.user=sessionStorage.getItem('token');
    this.decoded=jwtDecode(this.user);
    const userId =this.decoded.id; // Supposons que l'ID utilisateur est stocké localement
    const oldPassword = this.passwordForm.value.oldPassword;
    const newPassword = this.passwordForm.value.newPassword;

    if (newPassword !== this.passwordForm.value.confirmPassword) {
      this.msg = 'Les mots de passe ne correspondent pas';
      return;
    }
    this.userService.changePassword(userId, oldPassword, newPassword).subscribe(
      (response) => {

        this.msg = response.msg;
        this.router.navigate(['/login']); // Redirige après modification
      },
      
    );
  }
}



