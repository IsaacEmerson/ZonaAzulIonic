import { Component, NgZone } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
import { HttpServiceProvider } from '../../providers/http-service/http-service';
import { GeolocationPage } from '../geolocation/geolocation';
import { Storage } from '@ionic/storage';
import { LoginPage } from '../login/login';
import { MenuController } from 'ionic-angular';
import { ActivePlaquesPage } from '../active-plaques/active-plaques';
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
  plaque = {
    plaque: ""
  };
  activePlaques = [];
  rates = [];
  plaque_id: number = 0;
  rate_id: number = 0;
  plaqueActive: Array<any>;
  cards = {};

  quantActive = 0;

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
    public zone: NgZone,
    public alertCtrl: AlertController,
    public http: HttpServiceProvider,
    public menuCtrl: MenuController) { }

  ionViewDidLoad() {
  }

  ionViewDidEnter() {
    this.setAllData();
  }

  setAllData() {
    this.storage.get('token').then((token) => {
      this.http.setToken(token);
      this.getUserData();
      this.storage.get('city_actual').then((city) => {
        this.actualCity = city;
        console.log(city);
        if (this.actualCity.working_mode == 0) {
          this.getCards();
          this.getRates();
        }
        this.getActivePlaques();

        this.isDataComplet = true;
      }).catch((error) => {
        this.isDataComplet = false;
        console.log(error);
      });
    }).catch(() => {
      console.log('error get user');
    });
  }

  getCards() {
    this.http.get('client/cards').subscribe((result) => {
      console.log(result);
      this.cards = result;
    }, error => {
      this.verError(error);
      console.log(error);
      this.isDataComplet = false;
    });
  }

  getActivePlaques() {
    this.http.getParam('client/activePlaques', 'city_id=' + this.actualCity.id).subscribe((result: any) => {
      this.zone.run(() => {
        this.quantActive = result.total_active_plaques;
      });
      this.activePlaques = result.active_plaques;
      console.log(result);
    }),
      error => {
        this.verError(error);
        this.isDataComplet = false;
      };
  }

  verError(error) {
    if (error.error.error == "token_expired") {
      //this.refreshToken();
      this.storage.clear();
      this.navCtrl.setRoot(LoginPage);
    } else if (error.error.error == "token_invalid" || error.error.error == "token_not_provided") {
      console.log('invalid token');
      this.storage.clear();
      this.navCtrl.setRoot(LoginPage);
    } else if (error.error.error == "user_not_found") {
      this.storage.clear();
      this.navCtrl.setRoot(LoginPage);
    } else if (error.error.error == "not_a_customer") {
      this.storage.clear();
      this.navCtrl.setRoot(LoginPage);
    }
  }

  getRates() {
    this.http.getParam('client/rates', 'city_id=' + this.actualCity.id).subscribe((result: any) => {
      this.rates = result.rates;
      console.log(this.rates);
    }, error => {
      this.verError(error);
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
      this.verError(error);
      this.isDataComplet = false;
      this.http.dismissLoading();
    });
  }

  refreshToken() {
    this.http.post('refresh', {}).subscribe((result: any) => {
      console.log(result.token);
      this.storage.set('token', result.token).then(() => {
        this.setAllData();
        console.log('token added');
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
      //salvador
      for (let id_p of this.activePlaques) {
        if (id_p.plaque === this.plaque.plaque) {
          this.confirmParkOldPlaque(id_p);
          //this.confirmParkPlaque();
          return;
        }
      }

      this.parkCarLocation(0);
    }
  }

  
  //caso náo possa estacionar com a meesma placa
  confirmParkPlaque(){
    let alert = this.alertCtrl.create({
      title: 'Placa já ativa',
      message: 'Essa placa já possui uma ativação, verifique em Veículos estacionados.',
      buttons: [
        {
          text: 'OK',
          role: 'cancel',
          handler: () => {

          }
        }
      ]
    });
    alert.present();
  }

  //caso possa estacionar ainda
  confirmParkOldPlaque(plaque) {
    let alert = this.alertCtrl.create({
      title: 'ATENÇÃO, Confirmar nova Ativação',
      message: 'Uma nova ativação para essa placa acarretará o fim da anterior. Use a nova ativação se for se locomover para um local que possua regra diferente da ativacão atual ('+(plaque.time)/60+' Horas), Verifique a sinalização',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {

          }
        },
        {
          text: 'Confirmar',
          handler: () => {
            this.parkCarLocation(1);
          }
        }
      ]
    });
    alert.present();
  }

  checkPlaque(plaque) {
    console.log(plaque);
    this.plaque = plaque;
  }

  parkCarLocation(cancelOld) {
    if (this.plaque_id == 0) {
      this.authService.showToast('Selecione a Placa para estacionar', 3000);
    } else {
      this.navCtrl.push(GeolocationPage, { cancelOld: cancelOld, plaque: this.plaque, plaque_id: this.plaque_id, balance: this.user.balance.amount });
    }
  }

  ionViewCanEnter() {
    console.log(this.authService.isUserAuth());
    return this.authService.isUserAuth();
  }

}