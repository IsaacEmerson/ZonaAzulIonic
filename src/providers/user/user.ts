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

  notification(time: string) {
    //var time = "34:26:00";
    var timeParts = time.split(":");
    var time_noti = (+timeParts[0] * (60000 * 60)) + (+timeParts[1] * 60000) + (+timeParts[2] * 1000);
    
    let key = 'isaac';

    let isAndroid = this.plt.is('android');

    // Schedule delayed notification
    this.localNotifications.schedule({
      id: 1,
      text: 'Seu tempo de estacionamento esta acabando..',
      trigger: { at: new Date(new Date().getTime() + time_noti-600000) },
      led: 'FF0000',
      sound: isAndroid ? 'file://sound.mp3' : 'file://beep.caf',
      data: { secret: key }
    });
  }

  notifi(){
    let isAndroid = this.plt.is('android');

    this.localNotifications.schedule({
      id: 1,
      text: 'Notificacão teste',
      sound: isAndroid? 'file://sound.mp3': 'file://beep.caf',
      data: { secret: 'isaac' }
    });
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
