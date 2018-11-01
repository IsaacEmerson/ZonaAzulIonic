import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, Events } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { LoginPage } from '../pages/login/login';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { BuyCreditsPage } from '../pages/buy-credits/buy-credits';
import { ProfilePage } from '../pages/profile/profile';
import { PlaquesPage } from '../pages/plaques/plaques';
import { IrregularitiesPage } from '../pages/irregularities/irregularities';
import { AuthProvider } from '../providers/auth/auth';



@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = LoginPage;

  pages: Array<{icon: string, title: string, component: any}>;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen,
    events:Events,public auth:AuthProvider) {
    this.initializeApp();

    // used for an example of ngFor and navigation

    this.pages = [];

    events.subscribe('working_mode:0',()=>{
      this.pages = [
      { icon: 'home', title: 'Inicio', component: HomePage},
      { icon: 'person', title: 'Meus Dados', component: ProfilePage},
      { icon: 'car', title: 'Minhas Placas', component: PlaquesPage},
      { icon: 'wifi', title: 'List', component: ListPage },
      { icon: 'cart', title: 'Comprar Créditos', component: BuyCreditsPage},
      { icon: 'wifi', title: 'Meu Histórico', component: ListPage },
      { icon: 'wifi', title: 'List', component: ListPage },
      { icon: 'chatbubbles', title: 'Irregularidades', component: IrregularitiesPage},
      { icon: 'logout', title: 'Sair', component: LoginPage}
      ]
    });

    events.subscribe('working_mode:1',()=>{
      this.pages = [
      { icon: 'home', title: 'Salvador', component: HomePage},
      { icon: 'home', title: 'Inicio', component: HomePage},
      { icon: 'person', title: 'Meus Dados', component: ProfilePage},
      { icon: 'car', title: 'Minhas Placas', component: PlaquesPage},
      { icon: 'wifi', title: 'List', component: ListPage },
      { icon: 'cart', title: 'Comprar Créditos', component: BuyCreditsPage},
      { icon: 'chatbubbles', title: 'Irregularidades', component: IrregularitiesPage},
      { icon: 'logout', title: 'Sair', component: null}
      ]
    });

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
    if(page.component){
      // Reset the content nav to have just this page
      // we wouldn't want the back button to show in this scenario
      this.nav.setRoot(page.component);
    }else{
      this.auth.logout();
      this.nav.setRoot(LoginPage);
    }
  }
}
