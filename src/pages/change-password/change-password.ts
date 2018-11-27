import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HttpServiceProvider } from '../../providers/http-service/http-service';
import { AuthProvider } from '../../providers/auth/auth';
import {Storage} from '@ionic/storage';
/**
 * Generated class for the ChangePasswordPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-change-password',
  templateUrl: 'change-password.html',
})
export class ChangePasswordPage {
  constructor(public navCtrl: NavController, public navParams: NavParams,public storage:Storage,public http:HttpServiceProvider,public auth:AuthProvider) {
  }
  public password={
    password: '',
    password_confirmation:'',
    old_password:''
  }
  updatePassword(){
    if(this.password.password!='' && this.password.password_confirmation!='' && this.password.old_password!='' ){
      this.http.presentLoading();
      this.http.update('client/updatePassword',this.password).subscribe((result)=>{
        console.log(this.password);
        
        this.http.dismissLoading();
        this.auth.showToast('Senha Alterada com sucesso',3000);
      },error=>{
        this.auth.showToast(error.error.errors[0],3000);
        this.http.dismissLoading();
        console.log(error.error);
      });
    }else{
      this.auth.showToast("Campos vazios",3000);
    }
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad ChangePasswordPage');
  }

}
