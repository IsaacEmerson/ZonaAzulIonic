import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { LoginPage } from '../pages/login/login';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { BuyCreditsPage } from '../pages/buy-credits/buy-credits';
import { ProfilePage } from '../pages/profile/profile';
import { PlaquesPage } from '../pages/plaques/plaques';
import { IrregularitiesPage } from '../pages/irregularities/irregularities';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = LoginPage;

  pages: Array<{icon: string, title: string, component: any}>;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { icon: 'home', title: 'Inicio', component: HomePage},
      { icon: 'person', title: 'Meus Dados', component: ProfilePage},
      { icon: 'car', title: 'Minhas Placas', component: PlaquesPage},
      { icon: 'wifi', title: 'List', component: ListPage },
      { icon: 'cart', title: 'Comprar Créditos', component: BuyCreditsPage},
      { icon: 'chatbubbles', title: 'Irregularidades', component: IrregularitiesPage},
      { icon: 'logout', title: 'Sair', component: LoginPage}
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}
