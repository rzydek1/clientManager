import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AppRoutinModule } from './app.routing.module';
import { AuthService } from './services/auth.service';
import { AuthGuardService } from './services/auth-guard.service';
import { NotFoundComponent } from './not-found/not-found.component';
import { RegulaminComponent } from './regulamin/regulamin.component';


const config = {
  apiKey: 'AIzaSyAOSgFdcYeGF5K9032reOwsX4lbXiwelD8',
  authDomain: 'clientmanage-fdc16.firebaseapp.com',
  databaseURL: 'https://clientmanage-fdc16.firebaseio.com',
  projectId: 'clientmanage-fdc16',
  storageBucket: 'clientmanage-fdc16.appspot.com',
  messagingSenderId: '445047599447'
};

@NgModule({
  declarations: [
    AppComponent,
    NotFoundComponent,
    RegulaminComponent
  ],
  imports: [
    BrowserModule,
    AppRoutinModule,
    AngularFireModule.initializeApp(config),
    AngularFireAuthModule,
    AngularFirestoreModule
  ],
  providers: [AuthService, AuthGuardService],
  bootstrap: [AppComponent]
})
export class AppModule { }
