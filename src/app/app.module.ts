import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { HttpClientModule } from '@angular/common/http';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
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
import { HistoricPage } from '../pages/historic/historic';
import { AppVersion } from '@ionic-native/app-version';
import { ChangePasswordPage } from '../pages/change-password/change-password';
import { PlaquesModalPage } from '../pages/plaques-modal/plaques-modal';
import { TransactionsPage } from '../pages/transactions/transactions';
import {SlideTutorialPage } from '../pages/slide-tutorial/slide-tutorial';

import { TimelineComponent } from '../components/timeline/timeline';
import { TimelineTimeComponent } from '../components/timeline/timeline';
import { TimelineItemComponent } from '../components/timeline/timeline';

import { Camera } from '@ionic-native/camera';
import { CardIO } from '@ionic-native/card-io';
import { CreditCardScanPage } from '../pages/credit-card-scan/credit-card-scan';
import { AboutPage } from '../pages/about/about';
import { BugReportPage } from '../pages/bug-report/bug-report';
import { EmailComposer } from '@ionic-native/email-composer';
import { CadsPage } from '../pages/cads/cads';
import { ActivePlaquesPage } from '../pages/active-plaques/active-plaques';
import { UserProvider } from '../providers/user/user';
import { SpinnerProvider } from '../providers/spinner/spinner';


@NgModule({
  declarations: [
    AppFooterComponent,
    TimelineComponent,
    TimelineItemComponent,
    TimelineTimeComponent,
    MyApp,
    SignupPage,
    FogotPassPage,
    LoginPage,
    HomePage,
    BuyCreditsPage,
    ChangePasswordPage,
    SlideTutorialPage,
    PlaquesModalPage,
    HistoricPage,
    PlaquesPage,
    ProfilePage,
    TransactionsPage,
    ActivePlaquesPage,
    IrregularitiesPage,
    CheckoutPage,
    BugReportPage,
    GeolocationPage,
    CadsPage,
    CreditCardScanPage,
    AboutPage,
    BackgroundGeolocationPage,
    TimelineComponent,
    TimelineItemComponent,
    TimelineTimeComponent
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
    FogotPassPage,
    LoginPage,
    HomePage,
    HistoricPage,
    PlaquesModalPage,
    SlideTutorialPage,
    TransactionsPage,
    CreditCardScanPage,
    ChangePasswordPage,
    BuyCreditsPage,
    AboutPage,
    CadsPage,
    ActivePlaquesPage,
    BugReportPage,
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
    Geolocation,
    Camera,
    EmailComposer,
    CardIO,
    AppVersion,
    UserProvider,
    SpinnerProvider
  ]
})
export class AppModule {}
