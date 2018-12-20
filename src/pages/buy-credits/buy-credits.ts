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
  price = 0;
  balance = 0;
  
  values_work1 = [3,6,9,18,30,60];
  values_work0 = [3,6,9,18,30,60];

  rates = [
    {
      role:"Curta duração",
      time:"2 Horas",
      price:"R$ 3,00"
    },
    {
      role:"Média duração",
      time:"6 Horas",
      price:"R$ 6,00"
    },
    {
      role:"Longa duração",
      time:"12 Horas",
      price:"R$ 9,00"
    },
    {
      role:"Eventos",
      time:"Varia de acordo com o evento",
      price:"R$ 10,00 - R$ 20,00"
    }
  ]

  constructor(public navCtrl: NavController, public navParams: NavParams,public storage:Storage) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BuyCreditsPage');
    this.storage.get('user').then((data)=>{
      this.balance = data.balance.amount;
      console.log(data);
    }).catch((error)=>{
      console.log(error);
    });    
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
