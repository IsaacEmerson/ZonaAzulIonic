import 'rxjs/add/operator/map';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import {Storage} from '@ionic/storage';
import { ToastController} from 'ionic-angular';
import { HttpServiceProvider } from '../http-service/http-service';

@Injectable()
export class AuthProvider {

  private userAuth = false;

  constructor(
    public http: HttpServiceProvider,
    public storage: Storage,
    public toastCtrl: ToastController
    ) {
    console.log('Hello AuthProvider Provider');
  }

  login(credentials):Observable<Object>{
    return this.http.post('login',credentials);
  }

  isUserAuth(){
    return this.userAuth;
  }

  setUserAuth(){
    this.userAuth = !this.userAuth;
  }

  logout(){
    return this.storage.clear().then(()=>{
      console.log('limpou');
      this.setUserAuth();
    },error=>{
      console.log('nao limpou');
    });
  }

  refreshToken():Observable<Object> {
    return this.http.post('refresh', {});
  }


  showToast(message:string,duration:number){
    let toast =  this.toastCtrl.create({
      message: message,
      duration: duration
    });
    toast.present();
  }

}
