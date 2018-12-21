import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UserProvider } from '../../providers/user/user';
import { Storage } from '@ionic/storage';
import { AuthProvider } from '../../providers/auth/auth';

/**
 * Generated class for the AlarmPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-alarm',
  templateUrl: 'alarm.html',
})
export class AlarmPage {

  alarms = {
    um: false,
    dois: false,
    tres: true,
  }

  constructor(public navCtrl: NavController, public auth: AuthProvider, public storage: Storage, public navParams: NavParams, public user: UserProvider) {
  }

  ionViewDidLoad() {
    console.log(this.alarms);
    console.log('ionViewDidLoad AlarmPage');
    this.storage.get("alarms").then((alarms) => {
      if (alarms != null) {
        this.alarms = alarms;
      }
    }).catch((error) => {
      console.log(error);
    })
  }

  save() {
    this.storage.set("alarms", this.alarms).then((res) => {
      this.auth.showToast("Salvo com sucesso !", 5000);
    }).catch((error) => {
      this.auth.showToast("Falha ao salvar " + error, 5000);
    });
  }

  test() {
    this.user.notifi();
  }

}
