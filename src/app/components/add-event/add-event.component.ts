import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { EventService } from 'src/app/services/event.service';

@Component({
  selector: 'app-add-event',
  templateUrl: './add-event.component.html',
  styleUrls: ['./add-event.component.css']
})
export class AddEventComponent implements OnInit {

  eventForm!:FormGroup;
  events:any={};
  photo:any;
  constructor(private eventService:EventService,private router:Router) { }

  ngOnInit(): void {
   
    
  }
  addEvent(){
    this.eventService.addevent(this.events,this.photo).subscribe((response)=>{
      this.router.navigate(['/tabevent']);

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
