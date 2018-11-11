import { Component } from '@angular/core';
import { IonicPage, NavController, ToastController} from 'ionic-angular';
import { CardIO } from '@ionic-native/card-io';
import {Storage} from '@ionic/storage';

/**
 * Generated class for the CreditCardScanPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-credit-card-scan',
  templateUrl: 'credit-card-scan.html',
})
export class CreditCardScanPage {

  constructor(public navCtrl: NavController, 
    public toastCtrl: ToastController,
    public storage:Storage, public cardIO: CardIO) { }

  ionViewDidLoad() {
    console.log('Hello CreditCardScan Page');
  }

  //listCards:Array<any>=[{}];
  switch: string = "card";

  cardNum = '';

  cardImage = 'assets/imgs/credit-card.png';

  card:any = {
    senderCPF:'',
    senderName:'',
    cardType: '',
    cardNumber: '',
    redactedCardNumber: '',
    expiryMonth: null,
    expiryYear: null,
    cvv: '',
    postalCode: ''
  };

  scanAndStoreCard(){

  }

  scanCard() {
    this.cardIO.canScan()
      .then(
      (res: boolean) => {
        if (res) {
          const options = {
            scanExpiry: true,
            hideCardIOLogo: true,
            scanInstructions: 'Por favor posicione seu cartão dentro do quadro',
            keepApplicationTheme: true,
            requireCCV: true,
            requireExpiry: true,
            requirePostalCode: false
          };
          this.cardIO.scan(options).then(response => {
            console.log('Scan complete');

            const {cardType, cardNumber, redactedCardNumber,
                    expiryMonth, expiryYear, cvv, postalCode } = response;

            this.card = {
              cardType,
              cardNumber,
              redactedCardNumber,
              expiryMonth,
              expiryYear,
              cvv,
              postalCode
            };
          });
        }
      });
  }

  saveCard(){
    if(this.card.cardNumber!=''){
      //this.storage.get('credit_card').then((cards)=>{
        //if(cards==undefined){
          //this.storage.set('credit_card',[this.card]);
          this.storage.set('credit_card',this.card);
  
          this.toastCtrl.create({
            message: 'Primeiro cartão cadastrado com sucesso',
            duration: 4000
          }).present();
         
        // }else{
        //   let aux:Array<any> = cards;
        //   aux.push(this.card);
        //   this.toastCtrl.create({
        //     message: 'Cartão adicionado com sucesso',
        //     duration: 4000
        //   }).present();
         
        // }
     // });
    }
  }

  getCardsList(){
    this.storage.get('credit_card').then((cards)=>{
      if(cards!=null){
        console.log(cards);
        //this.listCards = cards;
        this.cardNum = cards.cardNumber.substr(2,2)+'**********'+cards.cardNumber.substr(-4,4);
      }
    });
  }

  // Just to animate the fab
  fabGone = false;
  ionViewWillEnter() {
    this.getCardsList();
    this.fabGone = false;
  }

  ionViewWillLeave() {
    this.fabGone = true;
  }

}
