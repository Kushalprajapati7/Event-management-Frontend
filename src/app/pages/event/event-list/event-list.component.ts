import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IEvent } from 'src/app/core/interfaces/eventInterface';
import { AuthService } from 'src/app/core/services/auth.service';
import { EventService } from 'src/app/core/services/event.service';

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.scss']
})
export class EventListComponent implements OnInit {
  eventList: IEvent[] = [];
  canAdd: boolean = false;

  constructor(
    private eventService:EventService,
    private authService:AuthService,
    private router: Router
  ){}

  ngOnInit(): void {
    this.loadEvents();
    const role = this.authService.getRole();
    this.canAdd= role === 'admin' || role ==='editor';
  }

  loadEvents(){
    this.eventService.getAllEvents().subscribe(
      (data:IEvent[])=>{
        this.eventList = data;
        console.log(this.eventList);
      },
      (error)=>{
        console.error(error)
      }
    )
  }

  viewDetails(id: string): void {
    this.router.navigate(['event/eventDetails', id]);
  }

  goToAddEvent(){
    this.router.navigate(['event/add-event']); 
  }

}
