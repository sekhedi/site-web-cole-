import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-tab-parent',
  templateUrl: './tab-parent.component.html',
  styleUrls: ['./tab-parent.component.css']
})
export class TabParentComponent implements OnInit {
  searchForm!: FormGroup;
  parentsTab: any = [];
  constructor(private router: Router, private userService:UserService,private formBuilder:FormBuilder) { }

  ngOnInit(): void {
    this.searchForm = this.formBuilder.group({
      search: ['', [Validators.required]]
    });
    this.userService.getAlluserParents().subscribe((data) => {
      this.parentsTab = data.T;
    });
  }
  deleteParent(id: number) {
    //faire un appel aun service 
    this.userService.deleteUserById(id).subscribe((response) => {
      console.log('is deleted valid', response);
      this.userService.getAlluserParents().subscribe((data) => {
        this.parentsTab = data.T;
      });
    });
  }
  searchParent(){
    this.userService.searchUser(this.searchForm.value).subscribe((data) => {
      this.parentsTab = data.user;
    });
  }
  goToInfo(id: number) {
    this.router.navigate([`parentDetails/${id}`]);
  }
  goToEdit(id: number) {
    this.router.navigate([`editParent/${id}`]);

  }
  goToAdd() {
    this.router.navigate([`addParent/`]);

  }



}
