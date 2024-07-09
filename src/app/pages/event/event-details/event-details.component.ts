import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IEvent } from 'src/app/core/interfaces/eventInterface';
import { AuthService } from 'src/app/core/services/auth.service';
import { EventService } from 'src/app/core/services/event.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-event-details',
  templateUrl: './event-details.component.html',
  styleUrls: ['./event-details.component.scss']
})
export class EventDetailsComponent implements OnInit {
  event!: IEvent;
  canEdit: boolean = false;
  canDelete: boolean = false;
  registrations: any[] = [];
  userId:string|null='';
  
  isAdmin: boolean = false;

  constructor(
    private eventService: EventService,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const eventId = params['id'];
      this.loadEventDetails(eventId);
      this.loadRegistrations(eventId);
    });

    const role = this.authService.getRole();
    this.isAdmin = role === 'admin'
    this.canDelete = role === 'admin';
    this.canEdit = role === 'admin';
    this.userId = this.authService.getUserId();
  }

  loadEventDetails(eventId: string) {
    this.eventService.getEventById(eventId).subscribe(
      (data: IEvent) => {
        this.event = data;
      },
      (error) => {
        console.error(error);
      }
    );
  }

  loadRegistrations(eventId: string) {
    this.eventService.getRegistrations(eventId).subscribe(
      (data: any) => {
        this.registrations = data.registrations;
      },
      (error) => {
        console.error(error);
      }
    );
  }

  updateEvent(event: IEvent): void {
    this.router.navigate(['event/edit-event', event._id]);
  }

  deleteEvent(event: IEvent): void {
    if (!event._id) {
      return;
    }
    this.eventService.deleteEvent(event._id).subscribe(
      () => {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Event Deleted Successfully",
          showConfirmButton: false,
          timer: 1000
        });
        this.router.navigate(['event/all-event']);
      },
      (error) => {
        console.error(error);
      }
    );
  }

  eventRegistration(eventId: string) {
    if (this.userId) {
      this.eventService.registerUser(eventId, this.userId).subscribe(
        response => {
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Registration Successful',
            showConfirmButton: false,
            timer: 1000
          });
          this.router.navigate(['event/eventDetails', eventId]);
        },
        error => {
          console.error('Error registering for event:', error);
        }
      );
    } else {
      console.error('User ID not found');
    }
  }
}
