import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RoleGuard } from '../core/guards/role.guard';
import { AuthGuard } from '../core/guards/auth.guard';
import { EventListComponent } from './event/event-list/event-list.component';

const routes: Routes = [
  {
    path: '',
    component: EventListComponent
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    // canActivate: [RoleGuard],
    // data: { role: 'admin' }
  },
  {
    path: 'event',
    loadChildren: () => import('./event/event.module').then(m => m.EventModule),
    // canActivate: [AuthGuard]
  },
  {
    path: 'users',
    loadChildren: () => import('./user/user.module').then(m => m.UserModule),
    // canActivate: [AuthGuard]
  },
 

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PageRoutingModule { }
