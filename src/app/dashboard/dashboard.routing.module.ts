import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AddClientComponent, DashboardComponent } from '.';
import { ClientListComponent } from './client-list/client-list.component';


const dashboardRoutes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      {
        path: '',
        redirectTo: '/dashboard/client-list',
        pathMatch: 'full'
      },
      {
        path: 'client-list',
        component: ClientListComponent
      },
      {
        path: 'add-client',
        component: AddClientComponent
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(dashboardRoutes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule {}
