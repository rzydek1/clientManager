import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.registerForm = new FormGroup({
      name: new FormControl(null, [Validators.required, Validators.pattern('[A-Za-zżźćńółęąśŻŹĆĄŚĘŁÓŃ]{3,}')]),
      lastName: new FormControl(null, [Validators.required, Validators.pattern('[A-Za-zżźćńółęąśŻŹĆĄŚĘŁÓŃ]{3,}')]),
      // tslint:disable-next-line:max-line-length
      email: new FormControl(null, [Validators.required, Validators.pattern('^[a-zA-Z0-9.!#$%&"*+/=?^_"{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$')]),
      password: new FormControl(null, [Validators.required, Validators.minLength(3)]),
      terms: new FormControl(null, Validators.required)
    });
  }

  register() {
    if (this.registerForm.valid) {
      this.authService.register({
        userKey: null,
        name: this.registerForm.value.name,
        lastName: this.registerForm.value.lastName,
        email: this.registerForm.value.email,
        clients: []
      }, this.registerForm.value.password);
      this.registerForm.reset();
    } else {
      console.log('niepoprawne dane');
    }
  }
}
