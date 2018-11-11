import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
import { HttpServiceProvider } from '../../providers/http-service/http-service';
import { GeolocationPage } from '../geolocation/geolocation';
import { Storage } from '@ionic/storage';
import { LoginPage } from '../login/login';
import { MenuController } from 'ionic-angular';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {

  vehicles = [
    {
      id: 1,
      name: 'Carro'
    },
    {
      id: 2,
      name: 'Moto'
    }
  ]

  isDataComplet = true;
  plaques = [];
  rates = [];
  plaque_id: number = 0;
  rate_id: number = 0;
  plaqueActive: Array<any>;
  cards = {};

  user = {
    name: '',
    balance: { amount: 0 }
  }
  actualCity = {
    id: 1,
    name: '',
    working_mode: 0
  };

  constructor(public navCtrl: NavController,
    public authService: AuthProvider,
    public navParams: NavParams,
    public storage: Storage,
    public http: HttpServiceProvider,
    public menuCtrl: MenuController) { }

  ionViewDidLoad() {

  }

  ionViewDidEnter() {
    this.setAllData();
  }

  setAllData() {
    this.storage.get('token').then(() => {
      this.getUserData();
    }).catch(() => {
      console.log('error get user');
    });
    this.storage.get('city_actual').then((city) => {
      this.actualCity = city;
      console.log(city);
      if (this.actualCity.working_mode == 0) {
        this.getCards();
        this.getRates();
      }

      this.isDataComplet = true;
    }).catch((error) => {
      this.isDataComplet = false;
      console.log(error);
    });
  }

  getCards() {
    this.http.get('client/cards').subscribe((result) => {
      console.log(result);
      this.cards = result;
    }, error => {
      console.log(error);
      this.isDataComplet = false;
    });
  }

  getRates() {
    this.http.getParam('client/rates', 'city_id=' + this.actualCity.id).subscribe((result: any) => {
      this.rates = result.rates;
      console.log(this.rates);
    }, error => {
      if (error.error.error == "token_invalid" || error.error.error == "token_expired" || error.error.error == "token_not_provided") {
        this.refreshToken();
      }
      this.isDataComplet = false;
      console.log(error);
    });
  }

  getUserData() {
    this.http.presentLoading();
    return this.http.get('client/user').subscribe((result: any) => {
      console.log(result);
      this.user = result;
      this.plaques = result.plaques;
      //this.plaqueActive = this.plaques.size();
      console.log("Plauqe teste");
      console.log(this.plaques);
      console.log(this.plaqueActive);
      this.storage.set('user', result);
      this.http.dismissLoading();
    }, error => {
      console.log(error);
      if (error.error.error == "token_invalid" || error.error.error == "token_expired" || error.error.error == "token_not_provided") {
        this.refreshToken();
      }
      if (error.error.error == "user_not_found") {
        this.navCtrl.setRoot(LoginPage);
        this.storage.clear();
      }
      this.isDataComplet = false;
      this.http.dismissLoading();
    });
  }

  refreshToken() {
    this.http.post('refresh', {}).subscribe((result: any) => {
      console.log(result.token);
      this.storage.set('token', result.token).then(() => {
        this.setAllData();
      });
    }, error => {
      console.log(error);
    });
  }

  refresh() {
    this.setAllData();
  }

  activeParking() {
    console.log(this.plaques);
    console.log(this.rates);
    if (this.actualCity.working_mode == 0) {
      if (this.plaque_id == 0 && this.rate_id == 0) {
        this.authService.showToast('Selecione Taxa e Placa para estacionar', 3000);
      } else {
        this.http.presentLoading();
        this.http.post('client/activeCard', {
          city_id: this.actualCity.id,
          rate_id: +this.rate_id,
          plaque_id: +this.plaque_id,
          working_mode: this.actualCity.working_mode
        }).subscribe((result: any) => {
          console.log(result);
          this.getCards();
          this.authService.showToast(result.message, 6000);
          this.http.dismissLoading();
        }, error => {
          this.authService.showToast(error.error.message, 3000);
          this.http.dismissLoading();
          console.log(error);
        });
      }
    } else if (this.actualCity.working_mode == 1) {
      this.parkCarLocation();
    }
  }


  parkCarLocation() {
    if (this.plaque_id == 0) {
      this.authService.showToast('Selecione a Placa para estacionar', 3000);
    } else {
      this.navCtrl.push(GeolocationPage,{plaque_id:this.plaque_id, balance: this.user.balance.amount});
    }
  }

  ionViewCanEnter() {
    console.log(this.authService.isUserAuth());
    return this.authService.isUserAuth();
  }

}