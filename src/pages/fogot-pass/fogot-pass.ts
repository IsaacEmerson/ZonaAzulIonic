import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { HttpServiceProvider } from '../../providers/http-service/http-service';
import { EmailComposer } from '@ionic-native/email-composer';
import { AuthProvider } from '../../providers/auth/auth';
import { LoginPage } from '../login/login';
/**
 * Generated class for the FogotPassPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
//password/email
//asset
@IonicPage()
@Component({
  selector: 'page-fogot-pass',
  templateUrl: 'fogot-pass.html',
})
export class FogotPassPage {

  constructor(public navCtrl: NavController, public menu: MenuController, public navParams: NavParams, public storage: Storage, public http: HttpServiceProvider,
    public auth:AuthProvider) {
  }
  email;
  errorGet=true;
  public backgroundImage = 'assets/imgs/login';
  passwordReset() {
    this.http.presentLoading();
    this.http.post('password/email', {email:this.email}).subscribe((result: any) => {
      this.http.dismissLoading();
      this.errorGet=false;
      this.navCtrl.setRoot(LoginPage);
      this.auth.showToast('Email enviado com sucesso. Por favor verifique sua caixa de entrada ou de spam.',4000);
    }, error => { 
      this.http.dismissLoading();
      this.auth.showToast(error.error.message,4000);
      });
    }
      
      
  
  ionViewDidLoad() {
    console.log('ionViewDidLoad FogotPassPage');
    
  }

  ionViewDidEnter() {
    this.menu.enable(false);
  }

  ionViewWillLeave() {
    this.menu.enable(true);

  }

}
