import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { HttpServiceProvider } from '../../providers/http-service/http-service';
import { Storage } from '@ionic/storage';

/**
 * Generated class for the ActivePlaquesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-active-plaques',
  templateUrl: 'active-plaques.html',
})
export class ActivePlaquesPage {
  plaques;
  cards = [];
  none = null;
  color = "secondary";
  actualCity = {
    id: 1,
    name: '',
    working_mode: 0
  };
    constructor(public navCtrl: NavController,
      public alertCtrl: AlertController,
      public storage: Storage, public http: HttpServiceProvider, public navParams: NavParams,) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ActivePlaquesPage');
    this.getActivePlaques();
    this.getCity();
  }
  setCards() {
    this.plaques.active_plaques.length == 0 ? this.none = "Nenhuma placa Ativa no momento" : this.none = "";
    for (let key in this.plaques.active_plaques) {
      let time_split = this.plaques.active_plaques[key].time_left.split(":");
      let hour;
      let minute;
      let time_left
      hour = time_split[0];
      minute = time_split[1];
      if (hour == '00' || hour=="-00") {
        if (+minute <= 10) {
          this.color = "warning";
        }else if (+minute <= 20) {
          this.color = "danger";
        }else {
          this.color = "secondary";
        }
        time_left = "Tempo restante "+ minute + "min";
      }
      else {
        this.color = "secondary";
        time_left = "Tempo restante " + hour + ":"+ minute + "hs";
      }
        this.cards[key] = {
          imageUrl: '',
          name: 'Estacionou ' + this.plaques.active_plaques[key].vehicle,
          ETA: time_left,
          distance: 2.6,
          color: this.color,
          places: [
            {
              name: 'Placa: ' + this.plaques.active_plaques[key].plaque,
              address: 'Cidade: ' + this.plaques.active_plaques[key].city,
              icon: 'car'
            }
          ]
        }
        console.log(this.cards[key]);
    }
  }

  getCity(){
    this.storage.get('city_actual').then((city) => {
      this.actualCity = city;
      console.log(city);
    }).catch((error) => {
      console.log(error);
    });
  }

  presentConfirm(id_plaque) {
    let alert = this.alertCtrl.create({
      title: 'Confirmar Cancelar ativacão?',
      message: 'A ativação só será cancelada se estiver dentro da tolerância. Seu saldo voltará para sua conta',
      buttons: [
        {
          text: 'Não',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Confirmar',
          handler: () => {
            this.cancelParking(id_plaque);
          }
        }
      ]
    });
    alert.present();
  }

  cancelParking(id_plaque){
    this.http.presentLoading();
    this.http.post('cancel', {id_plaque:id_plaque}).subscribe((result: any) => {
      this.http.dismissLoading();
      console.log(result);
    }, error => {
      this.http.dismissLoading();
      console.log(error);
    });
  }

  getActivePlaques() {
    this.http.presentLoading();
    this.http.get('client/activePlaques').subscribe((result: any) => {
      console.log(result);
      this.plaques = result;
      console.log(this.plaques);
      this.setCards();
      this.http.dismissLoading();

    }),
      error => {
        console.log(error.status);
        console.log(error.error); // error message as string
        console.log(error.headers);
        this.http.dismissLoading();
      };
  }
}
