import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ContactService } from 'src/app/services/contact.service';

@Component({
  selector: 'app-tabcontact',
  templateUrl: './tabcontact.component.html',
  styleUrls: ['./tabcontact.component.css']
})
export class TabcontactComponent implements OnInit {
  contactsTab: any = [];
  contacts:any={};
  constructor(private router:Router, private contactService:ContactService) { }

  ngOnInit(): void {
    this.contactService.getAllcontacts().subscribe((data) => {
      this.contactsTab = data.T;
    });
    
  }
  deleteContact(id: number) {
    //faire un appel aun service 
    this.contactService.deletecontactById(id).subscribe((response) => {
      console.log('is deleted valid', response);
      this.contactService.getAllcontacts().subscribe((data) => {
        this.contactsTab = data.T;
      });
    });
    location.reload();
  }
  sendMessage(id: number) {
    
    
  }

}
