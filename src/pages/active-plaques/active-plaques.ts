import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HttpServiceProvider } from '../../providers/http-service/http-service';

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
  color="secondary";
  constructor(public navCtrl: NavController, public http: HttpServiceProvider, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ActivePlaquesPage');
    this.getActivePlaques();
  }
  setCards() {
    // this.cards[0] = {
    //   imageUrl: '',
    //   name: 'Estacionou ' + 'Carro',
    //   ETA: '5 min restantes',
    //   distance: 2.6,
    //   color: this.color,
    //   places: [
    //     {
    //       name: 'Placa: ' + 'GAY-0800',
    //       address: 'Cidade: ' + 'Juazeiro',
    //       icon: 'car'
    //     }
    //   ]
    // }
    this.plaques.active_plaques.length == 0 ? this.none = "Nenhuma placa Ativa no momento" : this.none = "";
    for (let key in this.plaques.active_plaques) {
      let time_split = this.plaques.active_plaques[key].time_left.split(":");
      let hour;
      let minute;
      let time_left
      hour = time_split[0];
      minute = time_split[1];
      if (hour == '00' || hour=="-00") {
        if (+minute <= 20) {
          this.color = "warning";
        }
        else if (+minute <= 10) {
          this.color = "danger";
        }
        else {
          this.color = "secondary";
        }
        time_left = minute + "min";
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

      };
  }
}
