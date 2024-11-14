import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-add-parent',
  templateUrl: './add-parent.component.html',
  styleUrls: ['./add-parent.component.css']
})
export class AddParentComponent implements OnInit {

  parentForm!:FormGroup;
  parent:any={};
  photo:any;
  tabStudents:any=[];
  constructor(private userService:UserService,private router:Router) { }

  ngOnInit(): void {
    
    this.userService.getAlluserParents().subscribe((response) => {
      this.tabStudents = response.T;
    });
    
  }
  addParent(){
    this.userService.addUser(this.parent,this.photo).subscribe((response)=>{
      this.router.navigate(['/tabParent']);

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
