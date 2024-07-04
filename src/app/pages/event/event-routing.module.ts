import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EventListComponent } from './event-list/event-list.component';
import { EventAddEditComponent } from './event-add-edit/event-add-edit.component';
import { EventDetailsComponent } from './event-details/event-details.component';
import { EventRegistraionComponent } from './event-registraion/event-registraion.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'all-event',
    pathMatch: 'full'
  },
  {
    path: 'all-event',
    component: EventListComponent
  },
  {
    path: 'add-event',
    component: EventAddEditComponent
  },
  {
    path: 'eventDetails/:id',
    component: EventDetailsComponent
  },
  {
    path: 'edit-event/:id',
    component: EventAddEditComponent
  },
  {
    path:'register-event/:id',
    component:EventRegistraionComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EventRoutingModule { }
