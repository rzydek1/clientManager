import { CommonModule } from '@angular/common';
import { NgModule, OnDestroy } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AddClientComponent, ClientListComponent, DashboardComponent } from '.';
import { DashboardRoutingModule } from './dashboard.routing.module';
import { UsersService } from './users.service';

@NgModule({
  declarations: [
    DashboardComponent,
    AddClientComponent,
    ClientListComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    DashboardRoutingModule
  ],
  providers: [UsersService]
})
export class DashboardModule implements OnDestroy {
  ngOnDestroy() {
    console.log('dashboard destroy!');
  }
}
