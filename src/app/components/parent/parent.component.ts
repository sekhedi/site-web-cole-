import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';


@Component({
  selector: 'app-parent',
  templateUrl: './parent.component.html',
  styleUrls: ['./parent.component.css']
})
export class ParentComponent implements OnInit {

  parentsTab: any = [];
  constructor(private router: Router, private userService:UserService) { }

  ngOnInit(): void {
    this.userService.getAlluserParents().subscribe((data) => {
      this.parentsTab = data.T;
    });
  }
}
