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

import {BackgroundGeolocation} from '@ionic-native/background-geolocation';
import { GeolocationPage } from '../pages/geolocation/geolocation';


@NgModule({
  declarations: [
    MyApp,
    SignupPage,
    FogotPassPage,
    LoginPage,
    HomePage,
    ListPage,
    BuyCreditsPage,
    PlaquesPage,
    ProfilePage,
    IrregularitiesPage,
    CheckoutPage,
    GeolocationPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot({name:'_mydb'}),
    HttpClientModule,
    BrMaskerModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    SignupPage,
    FogotPassPage,
    LoginPage,
    HomePage,
    ListPage,
    BuyCreditsPage,
    PlaquesPage,
    ProfilePage,
    IrregularitiesPage,
    CheckoutPage,
    GeolocationPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthProvider,
    HttpServiceProvider,
    PaymentHttpProvider,
    BackgroundGeolocation
  ]
})
export class AppModule {}
