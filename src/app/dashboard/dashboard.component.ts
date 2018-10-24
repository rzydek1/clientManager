import { UserInfo } from 'src/app/models/userInfo';
import { Component, ViewEncapsulation } from '@angular/core';

import { AuthService } from '../services/auth.service';
import { UsersService } from './users.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class DashboardComponent {

  user: UserInfo;

  constructor(private authService: AuthService, private userService: UsersService) {
    this.userService.User.subscribe(user => {
      this.user = user;
    });
  }

  logout() {
    this.authService.logout();
  }
}
