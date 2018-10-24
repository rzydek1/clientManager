import { Component } from '@angular/core';
import { AngularFirestoreCollection } from '@angular/fire/firestore';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import { UserInfo } from 'src/app/models/userInfo';

import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  userCollection: AngularFirestoreCollection<UserInfo>;
  users: Observable<UserInfo[]>;
  errMessage = '';

  constructor(private authService: AuthService ) {}

  // Zaloguj za pomocą servicu
  login (formData: NgForm) {
    this.authService.login(formData.value.email, formData.value.password).then(value => {
      value ? this.errMessage = '' : this.errMessage = 'Nieporawny email lub hasło';
    });
  }
}
