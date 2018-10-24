import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';

import { Client } from '../models/client';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private user = new BehaviorSubject<any>({});
  private clientList = new BehaviorSubject<Array<Client>>([]);

  constructor(private authService: AuthService) {}

  getUserData() {
    this.authService.userInfo.pipe(
      ).subscribe(el => {
        if (el) {
          this.user.next(el);
          this.clientList.next(el.clients);
        }
      });
  }

  get Clients() {
    return this.clientList.asObservable();
  }

  get User() {
    this.getUserData();
    return this.user.asObservable();
  }

  addClient(client: Client) {
    let list = this.clientList.getValue();
    list ? list.push(client) : list = new Array<Client>(client);
    this.clientList.next(list);
    this.updateUser();
  }

  updateClient(client: Client, index: number) {
    this.clientList.getValue()[index] = client;
    this.updateUser();
  }

  updateUser() {
    this.user.getValue().clients = this.clientList.getValue();
    this.authService.updateUser(this.user.getValue());
  }
}
