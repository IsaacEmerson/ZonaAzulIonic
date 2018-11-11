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

  isEditable: boolean=false;
  imgFooter:any = false;
  price =0;
  constructor(public navCtrl: NavController, public navParams: NavParams,public storage:Storage) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BuyCreditsPage');
  }
  setPrice(price: number){
    this.price = price;
    this.isEditable=true;
  }
  getPrice(){
    return this.price;
  }
  ionViewDidEnter(){
    this.storage.get('footer').then((val) => {
      this.imgFooter = val;
    });
  }

  checkout(){
    this.navCtrl.push(CheckoutPage,{price:this.price});
  }

}
