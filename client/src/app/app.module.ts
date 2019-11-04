import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { NotfoundComponent } from './notfound/notfound.component';
import { environment } from 'src/environments/environment';
import { AuthModule } from './auth/auth.module';
import { MAT_DATE_LOCALE, MAT_DATE_FORMATS, MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material';
import { registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';
import { AngularFireStorageModule } from '@angular/fire/storage';

registerLocaleData(localePt);

@NgModule({
   declarations: [
      AppComponent,
      NotfoundComponent,
     ],
   imports: [
      BrowserModule,
      BrowserAnimationsModule,
      MaterialModule,
      AngularFireModule.initializeApp(environment.firebaseConfig),
      AngularFireAuthModule,
      AngularFirestoreModule,
      AngularFireStorageModule,
      AuthModule,
      AppRoutingModule
   ],
   providers: [
      { provide: LOCALE_ID, useValue: 'pt-BR' },
   ],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
