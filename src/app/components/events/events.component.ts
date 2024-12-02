import { Component, OnInit } from '@angular/core';
import { EventService } from 'src/app/services/event.service';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnInit {
  eventsTab: any = [];
  constructor( private eventService:EventService) { }

  ngOnInit(): void {
    this.eventService.getAllevents().subscribe((data) => {
      this.eventsTab = data.T;
    });
  }

}
