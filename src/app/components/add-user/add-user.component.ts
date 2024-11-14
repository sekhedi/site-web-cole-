import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {

  userForm!: FormGroup;
  user: any = {};
  photo: any;
  cvPdf:any

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {


  }
  addUser() {
    if (this.user.role == 'teacher') {
      this.user.status='not valid';
      this.userService.addUser(this.user,this.photo).subscribe((response) => {
        this.router.navigate(['/admin']);

      });

    } 
     else {
      this.userService.addUser(this.user,this.photo).subscribe((response) => {
        this.router.navigate(['/admin']);
      });
    }

  }
  selectFile(event: any) {

    // const file = (event.target as HTMLInputElement).files ;
    const inputElement = event.target as HTMLInputElement;
    if (inputElement && inputElement.files && inputElement.files.length > 0) {
      if (inputElement.files[0].type==='aplication/pdf') {
        this.cvPdf = inputElement.files[0];
      } else if(inputElement.files[0].type==='image/') {
        this.photo = inputElement.files[0];
      }
      else{
        console.error('Unsupported file type');
      }
    }


  }


}
