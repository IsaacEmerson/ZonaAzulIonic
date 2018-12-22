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
import { UniqueDeviceID } from '@ionic-native/unique-device-id';
import { AppFooterComponent } from '../components/app-footer/app-footer';
import { BackgroundGeolocationPage } from '../pages/background-geolocation/background-geolocation';
import { HistoricPage } from '../pages/historic/historic';
import { AppVersion } from '@ionic-native/app-version';
import { ChangePasswordPage } from '../pages/change-password/change-password';
import { PlaquesModalPage } from '../pages/plaques-modal/plaques-modal';
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
import { Market } from '@ionic-native/market';
import { LocalNotifications } from '@ionic-native/local-notifications';
import { VacanciesPage } from '../pages/vacancies/vacancies';
import { AccordionListComponent } from '../components/accordion-list/accordion-list';
import { FaqPage } from '../pages/faq/faq';
import { OrientationPage } from '../pages/orientation/orientation';
import { AlarmPage } from '../pages/alarm/alarm';
import { SmsPage } from '../pages/sms/sms';
import { TimerProgressComponent } from '../components/timer-progress/timer-progress';
import { DatePicker } from '@ionic-native/date-picker';
import { Keyboard } from '@ionic-native/keyboard';

@NgModule({
  declarations: [
    AppFooterComponent,
    TimerProgressComponent,
    AccordionListComponent,
    TimelineComponent,
    TimelineItemComponent,
    TimelineTimeComponent,
    MyApp,
    SignupPage,
    FogotPassPage,
    LoginPage,
    HomePage,
    AlarmPage,
    SmsPage,
    BuyCreditsPage,
    ChangePasswordPage,
    SlideTutorialPage,
    PlaquesModalPage,
    HistoricPage,
    PlaquesPage,
    ProfilePage,
    FaqPage,
    OrientationPage,
    ActivePlaquesPage,
    CheckoutPage,
    BugReportPage,
    GeolocationPage,
    CadsPage,
    CreditCardScanPage,
    AboutPage,
    BackgroundGeolocationPage,
    VacanciesPage,
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
    OrientationPage,
    CreditCardScanPage,
    ChangePasswordPage,
    BuyCreditsPage,
    AlarmPage,
    AboutPage,
    CadsPage,
    FaqPage,
    SmsPage,
    OrientationPage,
    VacanciesPage,
    ActivePlaquesPage,
    BugReportPage,
    PlaquesPage,
    ProfilePage,
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
    Keyboard,
    DatePicker,
    Camera,
    EmailComposer,
    CardIO,
    AppVersion,
    UserProvider,
    SpinnerProvider,
    LocalNotifications,
    UniqueDeviceID,
    Market
  ]
})
export class AppModule {}
