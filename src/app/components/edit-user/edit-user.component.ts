import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {

  userId: any;
  user: any = {};
  userForm!: FormGroup;
  photo:any;
  constructor(private activatedRoute: ActivatedRoute, private router: Router, private userService: UserService) { }

  ngOnInit() {
    this.userId = this.activatedRoute.snapshot.params['id'];
  
    this.userService.getUserById(this.userId).subscribe(
      (data) => {
        this.user = data.T
      }
    );

  }
  editUser() {
   
    this.userService.editUser(this.user).subscribe((response) => {
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
