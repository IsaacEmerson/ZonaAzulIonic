import { Injectable } from '@angular/core';
import { HttpServiceProvider } from '../http-service/http-service';
import { AuthProvider } from '../auth/auth';
import { Storage } from '@ionic/storage';
import { LocalNotifications } from '@ionic-native/local-notifications';
import { Platform } from 'ionic-angular';
/*
  Generated class for the UserProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class UserProvider {

  constructor(public storage: Storage,
    public plt: Platform,
    private localNotifications: LocalNotifications, public http: HttpServiceProvider, public auth: AuthProvider, ) {
    console.log('Hello UserProvider Provider');
  }

  notification(time: string, minutes_before: number) {
    //var time = "34:26:00";
    var timeParts = time.split(":");
    var time_noti = (+timeParts[0] * (60000 * 60)) + (+timeParts[1] * 60000) + (+timeParts[2] * 1000);
    //time noti em milisegundos
    //minutes_befere tempo antes de vencer para alertar
    let minutes = minutes_before * 60000;

    let key = 'isaac';

    this.localNotifications.hasPermission().then(() => {
      // Schedule delayed notification
      this.localNotifications.schedule({
        vibrate: true,
        text: 'Seu tempo de estacionamento esta acabando..',
        trigger: { at: new Date(new Date().getTime() + time_noti - minutes) },
        led: 'FF0000',
        sound: this.setSound(),
        data: { secret: key }
      });
    }, error => {
      this.auth.showToast(error, 5000);
    })
  }

  setAlarms(time) {
    this.storage.get("alarms").then((alarm) => {
      if (alarm.um) {
        this.notification(time, 20);
      }
      if (alarm.dois) {
        this.notification(time, 10);
      }
      if (alarm.tres) {
        this.notification(time, 0);
      }
    }).catch((error) => {
      console.log(error);
    });
  }

  notifi() {
    let isAndroid = this.plt.is('android');
    this.localNotifications.hasPermission().then(() => {
      this.localNotifications.schedule({
        vibrate: true,
        text: 'Notificacão teste',
        sound: this.setSound(),
        data: { secret: 'isaaac' }
      });
    }, error => {
      this.auth.showToast(error, 5000);
    })
  }

  setSound() {
    if (this.plt.is('android')) {
      return 'file://assets/sounds/Rooster.mp3'
    } else {
      return 'file://assets/sounds/Rooster.caf'
    }
  }

  getUserData() {
    return this.storage.get('token').then((token) => {
      console.log(token);
      this.http.get('client/user').subscribe((user) => {
        console.log(user);
      }, error => {
        console.log(error);
      });
    });
  }

}
