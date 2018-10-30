import 'rxjs/add/operator/map';
import { Injectable } from '@angular/core';
import {Storage} from '@ionic/storage';
import { ToastController } from 'ionic-angular';
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

  login(credentials){
    return this.http.post('login',credentials).subscribe((result:any)=>{
      this.storage.set('token',result.token);
      this.userAuth = true;
    },error=>{
      this.showToast(error.error.error,3000);
      this.userAuth = false;
    });
  }

  isUserAuth(){
    return this.userAuth;
  }

  refreshToken(){
    return this.http.post('refresh',{}).subscribe((result:any)=>{
      this.storage.set('token',result.token);
    },(error)=>{
      this.showToast(error.error,4000);
    });
  }

  userIsLogged(){
    // this.storage.get('token').then((token)=>{

    // });
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
