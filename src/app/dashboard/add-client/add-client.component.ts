import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { UsersService } from '../users.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-client',
  templateUrl: './add-client.component.html',
  styleUrls: ['./add-client.component.css']
})
export class AddClientComponent implements OnInit {

  addClientForm: FormGroup;
  errMessage = '';

  constructor(private userService: UsersService, private router: Router) { }

  // Zainicjalizuj formularz
  ngOnInit() {
    this.addClientForm = new FormGroup({
      name: new FormControl(null, [Validators.required, Validators.pattern('[A-Za-zżźćńółęąśŻŹĆĄŚĘŁÓŃ]{3,}')]),
      lastName: new FormControl(null, [Validators.required, Validators.pattern('[A-Za-zżźćńółęąśŻŹĆĄŚĘŁÓŃ]{3,}')]),
        // tslint:disable-next-line:max-line-length
      email: new FormControl(null, [Validators.required, Validators.pattern('^[a-zA-Z0-9.!#$%&"*+/=?^_"{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$')]),
      balance: new FormControl(null, [Validators.required, Validators.pattern('-{0,1}[0-9]*(\.[0-9]{0,2})')])
    });
    this.addClientForm.reset();
  }

  addClient() {
    // Dodaj clienta jeśli formularz został poprawnie wypełniony
    if (this.addClientForm.valid) {
      this.userService.addClient({
        clientName: this.addClientForm.value.name,
        clientLastName: this.addClientForm.value.lastName,
        clientEmail: this.addClientForm.value.email,
        clientBalance: this.addClientForm.value.balance
      });
      this.router.navigate(['/dashboard/client-list']);
    } else {
      // W przeciwnym razie wyświetl komunikat o złym wypełnieniu formularza
      this.errMessage = 'Niepoprawnie wypełniony formularz';
    }
  }
}
