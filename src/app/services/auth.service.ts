import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { UserInfo } from './../models/userInfo';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user: Observable<UserInfo>;
  userList: AngularFirestoreCollection<UserInfo>;
  errMessage = '';

  constructor(private afa: AngularFireAuth, private afs: AngularFirestore, private router: Router) {
    // Sprawdz czy user jest zalogowany
    this.user = this.afa.authState.pipe(
      switchMap(user => {
        if (user) {
          // jeśli tak to pobierz jego dane z bazy danych
          this.userList = this.afs.collection('users', ref => {
            return ref.where('userKey', '==', user.uid);
          });
          return this.afs.doc<UserInfo>(`users/${user.uid}`).valueChanges();
        } else {
          // jeśli nie to ustaw usera na null
          return of(null);
        }
      })
    );
  }

  get userData() {
    return this.user;
  }

  get userInfo() {
    return this.user;
  }

  // zaloguj przez angularfireauth
  login (email: string, password: string): Promise<boolean> {
    return this.afa.auth
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        // jeśli uda się zalogować to przekieruj do panelu użytkownika
        this.router.navigate(['/dashboard/client-list']);
        return true;
      })
      .catch(() => {
        // jeśli się nie uda to zwroc false żeby loginComponent wyświetlił odpowiedni komentarz
        return false;
      });
  }

  logout() {
    this.afa.auth.signOut().then(() => {
      this.user = of(null);
      this.router.navigate(['/auth/login']);
    });
  }

  // Załoz konto z użyciem emailu i hasla
  register (user: UserInfo, password: string) {
    this.afa.auth.createUserWithEmailAndPassword(user.email, password)
    .then(data => {
      // Utworz miejsce w bazie danych dla nowego usera
      user.userKey = data.user.uid;
      this.afs.doc(`users/${data.user.uid}`).set(user, {merge: false});
      this.router.navigate(['/dashboard/client-list']);
    }, err => {
      console.log(err);
    });
  }

  // Zapisz dane usera
  updateUser (user: UserInfo) {
    this.afs.doc(`users/${user.userKey}`).set(user, {merge: true});
  }
}
