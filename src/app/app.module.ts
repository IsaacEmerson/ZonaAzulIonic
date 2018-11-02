import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { HttpClientModule } from '@angular/common/http';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { BuyCreditsPage } from '../pages/buy-credits/buy-credits';
import { SignupPage } from '../pages/signup/signup';
import { LoginPage } from '../pages/login/login';
import { PlaquesPage } from '../pages/plaques/plaques';
import { ProfilePage } from '../pages/profile/profile';
import { IrregularitiesPage } from '../pages/irregularities/irregularities';
import { FogotPassPage } from '../pages/fogot-pass/fogot-pass';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AuthProvider } from '../providers/auth/auth';
import { IonicStorageModule } from '@ionic/storage';
import { HttpServiceProvider } from '../providers/http-service/http-service';

import { BrMaskerModule } from 'brmasker-ionic-3';
import { PaymentHttpProvider } from '../providers/payment-http/payment-http';
import { CheckoutPage } from '../pages/checkout/checkout';

import { Geolocation } from '@ionic-native/geolocation';
import {BackgroundGeolocation} from '@ionic-native/background-geolocation';
import { GeolocationPage } from '../pages/geolocation/geolocation';
import { AppFooterComponent } from '../components/app-footer/app-footer';
import { BackgroundGeolocationPage } from '../pages/background-geolocation/background-geolocation';
import { ChangePasswordPage } from '../pages/change-password/change-password';


@NgModule({
  declarations: [
    AppFooterComponent,
    MyApp,
    SignupPage,
    ChangePasswordPage,
    FogotPassPage,
    LoginPage,
    HomePage,
    ListPage,
    BuyCreditsPage,
    PlaquesPage,
    ProfilePage,
    IrregularitiesPage,
    CheckoutPage,
    GeolocationPage,
    BackgroundGeolocationPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot({
      name: '__mydb',
         driverOrder: ['indexeddb', 'sqlite', 'websql']
    }),
    HttpClientModule,
    BrMaskerModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    SignupPage,
    ChangePasswordPage,
    FogotPassPage,
    LoginPage,
    HomePage,
    ListPage,
    BuyCreditsPage,
    PlaquesPage,
    ProfilePage,
    IrregularitiesPage,
    CheckoutPage,
    GeolocationPage,
    BackgroundGeolocationPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthProvider,
    HttpServiceProvider,
    PaymentHttpProvider,
    BackgroundGeolocation,
    Geolocation
  ]
})
export class AppModule {}
