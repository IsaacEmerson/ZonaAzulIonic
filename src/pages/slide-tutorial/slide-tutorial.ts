import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams,Slides } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { Storage } from '@ionic/storage';
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
        id:1,
        title: 'Bem Vindo ao Syszona',
        imageUrl: 'assets/imgs/tutorial/welcome.png',
        description: 'A melhor forma de estacionar seu veículo',
      },
      {
        id:2,
        title: 'Compre créditos e troque por cards para estacionar',
        imageUrl: 'assets/imgs/tutorial/slide1.png',
        description: '',
      },
      {
        id:3,
        title: 'Menu para facilitar o uso do app',
        imageUrl: 'assets/imgs/tutorial/slide2.png',
        description: 'Ultilize as opções do menu para comprar créditos, estacionar, ver seu histórico...',
      },
      {
        id:3,
        title: 'Aproveite o Syszona',
        imageUrl: 'assets/imgs/tutorial/welcome.png',
        description: 'Compre seus créditos e estacione seu veículo',
      }
    ];
  constructor(
    public storage: Storage,public navCtrl: NavController, public navParams: NavParams) {
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
    this.goToApp();
  }
  ionViewDidEnter() {
    this.storage.get('token').then((token) => {
      console.log('token ' + token);
      if (token != null) {
        this.navCtrl.setRoot(LoginPage);
      } else {
        console.log('creeee');
      }
    });
  }

}
