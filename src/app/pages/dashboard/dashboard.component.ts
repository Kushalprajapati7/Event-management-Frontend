import { Component, OnInit } from '@angular/core'
import { IEvent } from 'src/app/core/interfaces/eventInterface';
import { IUser } from 'src/app/core/interfaces/userInterface';
import { EventService } from 'src/app/core/services/event.service';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  totalUsers: number = 0;
  totalEvents: number = 0;
  constructor (
    private userService:UserService,
    private eventService:EventService
  ){}
  ngOnInit(): void {
    this.loadTotalUsers()
    this.loadTotalEvents();
  }
  loadTotalUsers(): void {
    this.userService.allUser().subscribe(
      (users: IUser[]) => {
        this.totalUsers = users.length;
      },
      (error) => {
        console.error('Error loading total users:', error);
      }
    );
  }
  loadTotalEvents(): void {
    this.eventService.getAllEvents().subscribe(
      (events: IEvent[]) => {
        this.totalEvents = events.length;
      },
      (error) => {
        console.error('Error loading total events:', error);
      }
    );
  }
  

  
}
