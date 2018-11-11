import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HttpServiceProvider } from '../../providers/http-service/http-service';
/**
 * Generated class for the TransactionsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-transactions',
  templateUrl: 'transactions.html',
})
export class TransactionsPage {
  historic;
  constructor(public navCtrl: NavController, public navParams: NavParams, public http: HttpServiceProvider) {
  }
  setCards() {
    
    for (let key in this.historic.active_historic) {
      
      this.historic[key] = {
        title: "Compra de Cards",
        content: [
          { msg: "Você trocou seus créditos por cards" },
          {
            items: [
              ["Saldo Atual", this.historic[key].amount.toFixed(2)],
            ]
          },
        ],
        icon: "ios-cash",
        time: ''
      }
        
    }
  }
  getHistoricPerPage() {
    this.http.get('client/activehistoric').subscribe((result: any) => {
      console.log(result);

    }),
      error => {
        console.log(error.status);
        console.log(error.error); // error message as string
        console.log(error.headers);

      };
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad TransactionsPage');
  }

}
