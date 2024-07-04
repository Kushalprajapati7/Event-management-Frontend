import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PageRoutingModule } from './page-routing.module';
import { HomeComponent } from './home/home.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EventListComponent } from './event/event-list/event-list.component';
import { EventAddEditComponent } from './event/event-add-edit/event-add-edit.component';


@NgModule({
  declarations: [
    HomeComponent,
    DashboardComponent,
  ],
  imports: [
    CommonModule,
    PageRoutingModule,
  ]
})
export class PageModule { }
