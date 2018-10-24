import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuardService } from './services/auth-guard.service';
import { RegulaminComponent } from './regulamin/regulamin.component';
import { NotFoundComponent } from './not-found/not-found.component';

const appRoutes: Routes = [
  {
    path: '',
    redirectTo: '/auth/login',
    pathMatch: 'full'
  },
  {
    path: 'dashboard',
    loadChildren: './dashboard/dashboard.module#DashboardModule',
    canLoad: [AuthGuardService]
  },
  {
    path: 'auth',
    loadChildren: './auth/auth.module#AuthModule',
    canActivate: [AuthGuardService]
  },
  {
    path: 'regulamin',
    component: RegulaminComponent
  },
  {
    path: '**',
    component: NotFoundComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
})
export class AppRoutinModule { }
