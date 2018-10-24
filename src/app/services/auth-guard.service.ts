import { Injectable } from '@angular/core';
import { CanActivate, CanLoad, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, take, tap } from 'rxjs/operators';

import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate, CanLoad {

  constructor (private auth: AuthService, private router: Router) { }

  canActivate (): Observable<boolean> | boolean {
    return this.metoda(true, '/dashboard/client-list');
  }

  canLoad () {
    return this.metoda(false, '/auth/login');
  }

  metoda(type: boolean, route: string) {
    return this.auth.user.pipe(
      take(1),
      map(user => {
        if (type) { return !user; } else {return !!user; }
      }),
      tap(loggedIn => {
        if (!loggedIn) {
          this.router.navigate([route]);
          return false;
        }
      })
    );
  }
}
