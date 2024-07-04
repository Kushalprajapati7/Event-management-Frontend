import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EventRoutingModule } from './event-routing.module';
import { EventDetailsComponent } from './event-details/event-details.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EventAddEditComponent } from './event-add-edit/event-add-edit.component';
import { EventListComponent } from './event-list/event-list.component';
import { EventRegistraionComponent } from './event-registraion/event-registraion.component';


@NgModule({
  declarations: [
    EventDetailsComponent,
    EventAddEditComponent,
    EventListComponent,
    EventRegistraionComponent
  ],
  imports: [
    CommonModule,
    EventRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class EventModule { }
