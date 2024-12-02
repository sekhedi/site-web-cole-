import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-tab-user',
  templateUrl: './tab-user.component.html',
  styleUrls: ['./tab-user.component.css']
})
export class TabUserComponent implements OnInit {
  searchForm!: FormGroup;
  usersTab: any = [];
  constructor(private router:Router, private userService:UserService,private formBuilder:FormBuilder) { }

  ngOnInit(): void {
    this.searchForm = this.formBuilder.group({
      search: ['', [Validators.required]]
    });
    this.userService.getAllUsers().subscribe((data) => {
      this.usersTab = data.T;
    });
  }
  deleteUser(id: number) {
    //faire un appel aun service 
    this.userService.deleteUserById(id).subscribe((response) => {
      console.log('is deleted valid', response);
      this.userService.getAllUsers().subscribe((data) => {
        this.usersTab = data.T;
      });
    });
    location.reload();
  }
  searchUser(){
    this.userService.searchUser(this.searchForm.value).subscribe((data) => {
      console.log('user rechercher',data);
      this.usersTab = data.user;
    });
  }
  goToInfo(id: number) {

    this.router.navigate([`userDetails/${id}`]);
  }
  goToEdit(id: number) {
    
    this.router.navigate([`editUser/${id}`]);

  }

  
  validateUser(id:number){
    //faire un appel aun service 
    this.userService.validateUserById(id,this.usersTab).subscribe((response) => {
      console.log('is user valid', response);
      });
    location.reload();

  }

}
