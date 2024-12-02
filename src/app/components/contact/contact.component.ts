import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ContactService } from 'src/app/services/contact.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  contactForm!:FormGroup;
  contacts:any={};
  constructor(private contactService:ContactService,private router:Router) { }

  ngOnInit(): void {
  }
  sendMessage(){
    this.contactService.addcontact(this.contacts).subscribe((response)=>{
      this.router.navigate(['/tabContact']);

    });
  }

}
