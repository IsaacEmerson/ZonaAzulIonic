import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CheckoutPage } from '../checkout/checkout';
import {Storage} from '@ionic/storage';
/**
 * Generated class for the BuyCreditsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-buy-credits',
  templateUrl: 'buy-credits.html',
})
export class BuyCreditsPage {

  imgFooter:any = false;

  constructor(public navCtrl: NavController, public navParams: NavParams,public storage:Storage) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BuyCreditsPage');
  }

  ionViewDidEnter(){
    this.storage.get('footer').then((val) => {
      this.imgFooter = val;
    });
  }

  checkout(){
    this.navCtrl.push(CheckoutPage);
  }

}
