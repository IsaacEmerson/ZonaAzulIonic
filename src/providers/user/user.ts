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

  notification() {

    let key = 'isaac';

    let isAndroid = this.plt.is('android');
    
    // Schedule delayed notification
    this.localNotifications.schedule({
      id: 1,
      text: 'Seu tempo de estacionamento esta acabando..',
      trigger: { at: new Date(new Date().getTime() + 3200) },
      led: 'FF0000',
      sound: isAndroid ? 'file://sound.mp3' : 'file://beep.caf',
      data: { secret: key }
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
