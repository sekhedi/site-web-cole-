import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EventService } from 'src/app/services/event.service';

@Component({
  selector: 'app-tab-event',
  templateUrl: './tab-event.component.html',
  styleUrls: ['./tab-event.component.css']
})
export class TabEventComponent implements OnInit {
  eventsTab: any = [];
  constructor(private router:Router,private eventService:EventService) { }

  ngOnInit(): void {
    this.eventService.getAllevents().subscribe((data) => {
      this.eventsTab = data.T;
    });
  }
 
  goToEdit(id: number) {
    this.router.navigate([`editEvent/${id}`]);

  }
  goToAdd() {
    this.router.navigate([`addEvent/`]);

  }
  deleteEvent(id: number) {
    //faire un appel aun service 
    this.eventService.deleteeventById(id).subscribe((response) => {
      console.log('is deleted valid', response);
      this.eventService.getAllevents().subscribe((data) => {
        this.eventsTab = data.T;
      });
    });
  }

}
