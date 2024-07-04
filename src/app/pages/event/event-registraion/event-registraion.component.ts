import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
import { EventService } from 'src/app/core/services/event.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-event-registraion',
  templateUrl: './event-registraion.component.html',
  styleUrls: ['./event-registraion.component.scss']
})
export class EventRegistraionComponent {
  eventId!: string;
  userId!: string | null;

  constructor(
    private eventService: EventService,
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.eventId = params['id'];
    });

    this.userId = this.authService.getUserId();
  }

  registerForEvent(): void {
    if (this.userId) {
      this.eventService.registerUser(this.eventId, this.userId).subscribe(
        response => {
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Registration Successful',
            showConfirmButton: false,
            timer: 1000
          });
          this.router.navigate(['event/eventDetails', this.eventId]);
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

