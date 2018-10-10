import 'rxjs/add/operator/map';
import { Injectable } from '@angular/core';
import {Storage} from '@ionic/storage';
import { ToastController } from 'ionic-angular';
import { HttpServiceProvider } from '../http-service/http-service';

@Injectable()
export class AuthProvider {

  constructor(
    public http: HttpServiceProvider,
    public storage: Storage,
    public toastCtrl: ToastController
    ) {
    console.log('Hello AuthProvider Provider');
  }

  login(credentials){
    this.http.post("login",credentials).
    subscribe(data => {
      let userToken:any = data;
      console.log(userToken);
      this.storage.set('token',userToken.token);
      return true;
    },error=>{
      console.log(error.error);
      this.showToast(error.error,3000);
      return false;
    });
  }

  userIsLogged(){
    return this.storage.get('token').then(val => {
      if(val){
        return val;
      }else{
        this.showToast('É preciso logar para ter acesso ao sistema.',3000);
        return false;
      }
    });
  }

  logout(){
    this.storage.remove('token');
  }

  showToast(message:string,duration:number){
    let toast =  this.toastCtrl.create({
      message: message,
      duration: duration
    });
    toast.present();
  }

}
