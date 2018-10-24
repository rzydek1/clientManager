import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { UsersService } from '../users.service';
import { Client } from './../../models/client';

@Component({
  selector: 'app-client-list',
  templateUrl: './client-list.component.html',
  styleUrls: ['./client-list.component.css']
})
export class ClientListComponent {

  editClientForm: FormGroup;

  balance = 0;
  errMessage = '';
  clientList = Array<Client>();
  editMode = Array<boolean>();
  editTable = false;

  // Pobierz clientow
  constructor(private userService: UsersService) {
    this.userService.Clients.subscribe(clients => {
      if (clients) {
        this.balance = 0;
        clients.map(el => {
            this.balance += el.clientBalance;
        });
        this.clientList = clients;
      }
    });
  }

  // tryb edycji użykownika
  editClient(index: number) {
    this.editMode[index] = true;
    this.editTable = true;
    this.editClientForm = new FormGroup({
      name: new FormControl(this.clientList[index].clientName, [Validators.required, Validators.pattern('[A-Za-zżźćńółęąśŻŹĆĄŚĘŁÓŃ]{3,}')]),
      lastName: new FormControl(this.clientList[index].clientLastName, [Validators.required, Validators.minLength(3)]),
      // tslint:disable-next-line:max-line-length
      email: new FormControl(this.clientList[index].clientEmail, [Validators.required, Validators.pattern('^[a-zA-Z0-9.!#$%&"*+/=?^_"{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$')]),
      balance: new FormControl(this.clientList[index].clientBalance,
        [Validators.required, Validators.pattern('-{0,1}[0-9]*(\.[0-9]{0,2})')])
    });
  }

  // zaktualizuj clienta
  updateClient(index: number) {
    if (this.editClientForm.valid) {
      this.clientList[index] = {
        clientName: this.editClientForm.value.name,
        clientLastName: this.editClientForm.value.lastName,
        clientEmail: this.editClientForm.value.email,
        clientBalance: this.editClientForm.value.balance,
      };
      this.userService.updateClient(this.clientList[index], index);
      this.editMode[index] = false;
      this.editMode.find(el => el === true) ? this.editTable = true : this.editTable = false;
      this.errMessage = '';
    } else {
      this.errMessage = 'Nieporawne dane!';
    }
  }
}
