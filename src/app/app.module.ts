import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { Response } from '../pages/response/response';
import { PasswordPage } from '../pages/password/password'

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HttpClientModule } from '@angular/common/http';
import { IonicStorageModule } from '@ionic/storage';
import { HostnameProvider } from '../providers/hostname/hostname'
import { HTTP } from '@ionic-native/http';


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    Response,
    PasswordPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpClientModule,
    IonicStorageModule.forRoot(),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    Response,
    PasswordPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    HostnameProvider,
    HTTP

  ]
})
export class AppModule {}
