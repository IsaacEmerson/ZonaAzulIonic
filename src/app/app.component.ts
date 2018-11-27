import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, Events } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { LoginPage } from '../pages/login/login';
import { HomePage } from '../pages/home/home';
import { BuyCreditsPage } from '../pages/buy-credits/buy-credits';
import { ProfilePage } from '../pages/profile/profile';
import { PlaquesPage } from '../pages/plaques/plaques';
import { AuthProvider } from '../providers/auth/auth';
import { HistoricPage } from '../pages/historic/historic';
import { CreditCardScanPage } from '../pages/credit-card-scan/credit-card-scan';
import { AboutPage } from '../pages/about/about';
import { BugReportPage } from '../pages/bug-report/bug-report';
import { CadsPage } from '../pages/cads/cads';
import { ActivePlaquesPage } from '../pages/active-plaques/active-plaques';
import { SlideTutorialPage } from '../pages/slide-tutorial/slide-tutorial';
import { VacanciesPage } from '../pages/vacancies/vacancies';
import { ThreeDeeTouch, ThreeDeeTouchQuickAction } from '@ionic-native/three-dee-touch';
@Component({
  templateUrl: 'app.html'

})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = SlideTutorialPage;
  actions: Array<ThreeDeeTouchQuickAction> = [
    {
      type: 'home',
      title: 'Estacionar',
      subtitle: 'Estacione seu veículo',
      iconType: 'Location'
    },
    {
      type: 'active_plaques',
      title: 'Placas Ativas',
      subtitle: 'Nenhuma Ativa',
      iconType: 'Time'
    }
  ];
  pages: Array<{ icon: string, title: string, component: any }>;
  tutorial;
  treedTouch() {
    this.threeDeeTouch.isAvailable().then(isAvailable => {
      this.threeDeeTouch.configureQuickActions(this.actions);
      this.threeDeeTouch.onHomeIconPressed().subscribe(
        (payload) => {
          // returns an object that is the button you presed
          if (payload.type == 'home') {
            this.nav.setRoot(HomePage);
          } else if (payload.type == 'active_plaques') {
            this.nav.setRoot(ActivePlaquesPage);

            console.log('Pressed the ${payload.title} button');
            console.log(payload.type);

          }
        });
    });
  }
  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen,
    events: Events, public auth: AuthProvider, private threeDeeTouch: ThreeDeeTouch) {



    this.initializeApp();


    // used for an example of ngFor and navigation

    this.pages = [];

    events.subscribe('working_mode:0', () => {
      this.pages = [
        { icon: 'home', title: 'Inicio', component: HomePage },
        { icon: 'person', title: 'Meus Dados', component: ProfilePage },
        { icon: 'car', title: 'Minhas Placas', component: PlaquesPage },
        { icon: 'ios-checkbox', title: 'Placas Ativas', component: ActivePlaquesPage },
        { icon: 'cart', title: 'Comprar Créditos', component: BuyCreditsPage },
        { icon: 'paper', title: 'Cartões Estacionamento', component: CadsPage },
        { icon: 'card', title: 'Meus Cartões', component: CreditCardScanPage },
        { icon: 'md-calendar', title: 'Meu Histórico', component: HistoricPage },
        { icon: 'compass', title: 'Vagas por rua', component: VacanciesPage },
        //{ icon: 'ios-cash', title: 'Transações', component: TransactionsPage},
        //{ icon: 'chatbubbles', title: 'Irregularidades', component: IrregularitiesPage},
        { icon: 'ios-help-circle', title: 'Fale Conosco', component: BugReportPage },
        { icon: 'ios-information-circle', title: 'Sobre', component: AboutPage },
        { icon: 'log-out', title: 'Sair', component: null }
      ]
    });

    events.subscribe('working_mode:1', () => {
      this.pages = [
        { icon: 'home', title: 'Inicio', component: HomePage },
        { icon: 'person', title: 'Meus Dados', component: ProfilePage },
        { icon: 'car', title: 'Minhas Placas', component: PlaquesPage },
        { icon: 'ios-checkbox', title: 'Placas Ativas', component: ActivePlaquesPage },
        { icon: 'cart', title: 'Comprar Créditos', component: BuyCreditsPage },
        { icon: 'card', title: 'Meus Cartões', component: CreditCardScanPage },
        { icon: 'md-calendar', title: 'Meu Histórico', component: HistoricPage },
        { icon: 'compass', title: 'Vagas por rua', component: VacanciesPage },
        // { icon: 'ios-cash', title: 'Transações', component: TransactionsPage},
        // { icon: 'chatbubbles', title: 'Irregularidades', component: IrregularitiesPage},
        { icon: 'ios-help-circle', title: 'Fale Conosco', component: BugReportPage },
        { icon: 'ios-information-circle', title: 'Sobre', component: AboutPage },
        { icon: 'log-out', title: 'Sair', component: null }
      ]
    });

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.treedTouch();
      this.statusBar.styleDefault();
      this.splashScreen.hide();

    });
  }

  openPage(page) {
    if (page.component) {
      // Reset the content nav to have just this page
      // we wouldn't want the back button to show in this scenario
      this.nav.setRoot(page.component);
    } else {

      this.auth.logout().then((res) => {
        console.log(res);
        this.nav.setRoot(LoginPage);
      });

    }
  }




}
