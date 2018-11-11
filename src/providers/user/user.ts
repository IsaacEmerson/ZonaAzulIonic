import { Injectable } from '@angular/core';
import { HttpServiceProvider } from '../http-service/http-service';
import { AuthProvider } from '../auth/auth';
import { Storage } from '@ionic/storage';

/*
  Generated class for the UserProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class UserProvider {

  constructor(public storage: Storage, public http: HttpServiceProvider, public auth: AuthProvider, ) {
    console.log('Hello UserProvider Provider');
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
