import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HttpServiceProvider } from '../../providers/http-service/http-service';
import { Storage } from '@ionic/storage';
import { AuthProvider } from '../../providers/auth/auth';

/**
 * Generated class for the CadsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-cads',
  templateUrl: 'cads.html',
})
export class CadsPage {

  rates = [];
  rate_id: number = 0;
  rate_index = 0;
  quant: number = 0;
  actualCity = {
    id: 1,
    name: '',
    working_mode: 0
  };

  price=0;

  constructor(public navCtrl: NavController, public auth: AuthProvider, public storage: Storage, public navParams: NavParams, public http: HttpServiceProvider) {
  }

  ionViewDidLoad() {
    this.storage.get('city_actual').then((city) => {
      console.log(city);
      this.actualCity = city;
      this.getRates();
    });
  }

  getRates() {
    this.http.presentLoading();
    this.http.getParam('client/rates', 'city_id=' + this.actualCity.id).subscribe((result: any) => {
      this.rates = result.rates;
      console.log(this.rates);
      this.http.dismissLoading();
    }, error => {
      this.http.dismissLoading();
      if(error.error=="token_not_provided"){
        console.log(this.auth.refreshToken());
      }
      console.log(error);
    });
  }

  creditToCards() {
    if (this.quant > 0 && this.quant % 2 == 0 && this.quant <= 10) {
      this.http.presentLoading();
      this.http.post('client/cards', { cards: +this.quant, city_id: this.actualCity.id, id: +this.rate_id })
        .subscribe((result: any) => {
          console.log(result);
          this.http.dismissLoading();
          this.auth.showToast(result.message, 3000);
        }, error => {
          this.http.dismissLoading();
          console.log(error.message);
          this.auth.showToast(error.message, 3000);
        });
    } else {
      console.log('nops');
    }
  }

  cadPrice(cad:any){
    console.log(+(this.rates[this.rate_index].rate));
    if(this.rate_id!=0){
    this.price = cad*this.rates[this.rate_index].rate; 
    console.log(cad*this.rates[this.rate_index].rate);
    }
  }

}
