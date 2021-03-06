import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {Storage} from '@ionic/storage';
import { ChangePasswordPage } from '../change-password/change-password';
import { HttpServiceProvider } from '../../providers/http-service/http-service';
import { AuthProvider } from '../../providers/auth/auth';
/**
 * Generated class for the ProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  isEditable = false;

  private user={
    name:'',
    email:'',
    data_user:{birth_date:''},
    cell_phone:'',
    cpf:''
  };

  constructor(public navCtrl: NavController, public navParams: NavParams,public storage:Storage,public http:HttpServiceProvider,
    public auth:AuthProvider) {
  }

  userEdit(){
    this.isEditable=true;
  }

  updateUser(){
    this.http.presentLoading();
    this.http.update('client/updateUser',this.user).subscribe((result)=>{
      console.log(this.user);
      this.storage.set('user',this.user);
      this.http.dismissLoading();
      this.auth.showToast('Usuário Editado com sucesso',3000);
    },error=>{
      this.auth.showToast(error.error.errors[0],3000);
      this.http.dismissLoading();
      console.log(error);
    });

  }
  updatePassword(){
    this.navCtrl.setRoot(ChangePasswordPage);
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePage');
    this.storage.get('user').then((user=>{
      this.user = user;
      console.log(this.user);
    }));
  }

}