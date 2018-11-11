import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams,Slides } from 'ionic-angular';
import { LoginPage } from '../login/login';
/**
 * Generated class for the SlideTutorialPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-slide-tutorial',
  templateUrl: 'slide-tutorial.html',
})
export class SlideTutorialPage {

  @ViewChild('slider') slider: Slides;
    slideIndex = 0;
    slides = [
      {
        title: 'Bem Vindo ao Syszona',
        imageUrl: 'assets/imgs/tutorial/welcome.png',
        description: 'A melhor forma de estacionar seu veículo em zona azul',
      },
      {
        title: 'Compre créditos e troque por cards para estacionar na cidade de Juazeiro',
        imageUrl: 'assets/imgs/tutorial/slide1.png',
        description: '',
      },
      {
        title: 'Menu para facilitar o uso do app',
        imageUrl: 'assets/imgs/tutorial/slide2.png',
        description: 'Ultilize as opções do menu para comprar créditos,estacionar, ver seu histórico...',
      },
      {
        title: 'Aproveite o Syszona',
        imageUrl: 'assets/imgs/tutorial/welcome.png',
        description: 'Compre seus créditos e estacione seu veículo',
      }
    ];
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }
  onSlideChanged() {
    this.slideIndex = this.slider.getActiveIndex();
    console.log('Slide changed! Current index is', this.slideIndex);
  }

  goToApp() {
    console.log('Go to App clicked');
    this.navCtrl.setRoot(LoginPage);
  }
  skip() {
    this.navCtrl.setRoot(LoginPage);
    console.log('Skip clicked');
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad SlideTutorialPage');
  }

}
