import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';


@Component({
  selector: 'app-edit-parent',
  templateUrl: './edit-parent.component.html',
  styleUrls: ['./edit-parent.component.css']
})
export class EditParentComponent implements OnInit {

   
  parentId: any;
  parent: any = {};
  parentForm!:FormGroup ;
  photo:any;
  constructor(private activatedRoute: ActivatedRoute, private router: Router, private userService:UserService) { }

  ngOnInit() {
    this.parentId = this.activatedRoute.snapshot.params['id'];
  
    this.userService.getUserById(this.parentId).subscribe(
      (data) => {
        this.parent = data.T
      }
    );

  }
  editParent() {
   
    this.userService.editUser(this.parent).subscribe((response) => {
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
