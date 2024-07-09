import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IEvent } from 'src/app/core/interfaces/eventInterface';

import { EventService } from 'src/app/core/services/event.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-event-add-edit',
  templateUrl: './event-add-edit.component.html',
  styleUrls: ['./event-add-edit.component.scss']
})
export class EventAddEditComponent implements OnInit {
  eventForm!: FormGroup;
  eventId: string | null = null;
  isEditing: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private eventService: EventService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.initializeForm();
    this.route.paramMap.subscribe(params => {
      this.eventId = params.get('id');
      if (this.eventId) {
        this.isEditing = true;
        this.loadEventDetails(this.eventId);
      }
    });
  }

  initializeForm() {
    this.eventForm = this.formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      date: [null, Validators.required],
      location: ['', Validators.required],
    });
  }

  submitForm(): void {
    if (this.eventForm.valid) {
      if (this.isEditing) {
        this.updateEvent();
      } else {
        this.addEvent();
      }
    }
  }

  addEvent(): void {
    const event: any = {
      name: this.eventForm.get('name')?.value,
      description:this.eventForm.get('description')?.value,
      date:this.eventForm.get('date')?.value,
      location:this.eventForm.get('location')?.value,
    }
    this.eventService.createEvent(event).subscribe(
      response => {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Event Added Successfully",
          showConfirmButton: false,
          timer: 1000
        });
        this.router.navigate(['event/all-event']);
      },
      error => {
        console.error('Error adding Event:', error);
      }
    );
  }

  updateEvent(): void {
    if (this.eventId) {
      this.eventService.updateEvent(this.eventId, this.eventForm.value).subscribe(
        response => {
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Event Updated Successfully",
            showConfirmButton: false,
            timer: 1000
          });
          this.router.navigate(['event/all-event']);
        },
        error => {
          console.error('Error updating Event:', error);
        }
      );
    }
  }

  loadEventDetails(eventId: string): void {
    this.eventService.getEventById(eventId).subscribe(
      event => {
        this.eventForm.patchValue({
          name: event.name,
          description: event.description,
          date: new Date(event.date),
          location: event.location,
        });
      },
      error => {
        console.error('Error loading Event details:', error);
      }
    );
  }

  hasError(controlName: string, errorName: string): boolean {
    return this.eventForm.controls[controlName].touched && this.eventForm.controls[controlName].hasError(errorName);
  }
}
