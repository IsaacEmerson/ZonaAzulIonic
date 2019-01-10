import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { HttpServiceProvider } from '../../providers/http-service/http-service';
import { Storage } from '@ionic/storage';
import { AuthProvider } from '../../providers/auth/auth';

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
    id: 0,
    name: '',
    working_mode: 0,
    time_tolerance: 0
  };
  constructor(public navCtrl: NavController,
    public alertCtrl: AlertController,
    public authService: AuthProvider,
    public storage: Storage, public http: HttpServiceProvider, public navParams: NavParams, ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ActivePlaquesPage');
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
      if (hour == '00' || hour == "-00") {
        if (+minute <= 10) {
          this.color = "warning";
        } else if (+minute <= 20) {
          this.color = "danger";
        } else {
          this.color = "secondary";
        }
        time_left = "Tempo restante " + minute + "min";
      }
      else {
        this.color = "secondary";
        time_left = "Tempo restante " + hour + ":" + minute + "hs";
      }
      this.cards[key] = {
        id: [this.plaques.active_plaques[key].id, this.plaques.active_plaques[key].id_logradouro],
        imageUrl: '',
        name: 'Estacionou ' + this.plaques.active_plaques[key].vehicle,
        ETA: time_left,
        distance: 2.6,
        city_id: this.plaques.active_plaques[key].city_id,
        color: this.color,
        places: [
          {
            name: 'Placa: ' + this.plaques.active_plaques[key].plaque,
            address: this.plaques.active_plaques[key].log_nome,
            address_des: this.plaques.active_plaques[key].log_descricao_estacionamento,
            icon: 'car',
            past: 'Tempo decorrido ' + this.plaques.active_plaques[key].time_past,
          }
        ]
      }
      console.log(this.cards[key]);
    }
  }

  getCity() {
    this.storage.get('city_actual').then((city) => {
      this.actualCity = city;
      console.log(city);
      this.getActivePlaques();
    }).catch((error) => {
      console.log(error);
    });
  }

  presentConfirm(id_plaque, city_work) {
    if (city_work != 1) {
      return;
    }
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

  cancelParking(id) {
    this.http.presentLoading();
    this.http.post('client/desistencia', { id: id[0], id_logradouro:id[1] }).subscribe((result: any) => {
      this.http.dismissLoading();
      console.log(result);
      this.authService.showToast(result.success, 3000);
    }, error => {
      this.http.dismissLoading();
      this.authService.showToast(error.error.error, 3000);
      console.log(error);
    });
  }

  getActivePlaques() {
    this.http.presentLoading();
    this.http.getParam('client/activePlaques', 'city_id=' + this.actualCity.id).subscribe((result: any) => {
      console.log(result);
      this.plaques = result;
      this.setCards();
      this.http.dismissLoading();
    }, error => {
      console.log(error.status);
      console.log(error.error); // error message as string
      console.log(error.headers);
      this.http.dismissLoading();
    });
  }
}
