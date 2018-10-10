import { Component } from '@angular/core';
import { IonicPage, NavController, MenuController } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
import { SignupPage } from '../signup/signup';
import { HomePage } from '../home/home';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  
  public backgroundImage = 'assets/imgs/login/background-1.jpg';

  private credentials:object = {
    email : '',
    password : ''
  };

  constructor(public navCtrl: NavController,
    public authService: AuthProvider,
    public menu:MenuController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  ionViewDidEnter(){
    this.menu.enable(false);
  }

  ionViewWillLeave(){
    this.menu.enable(true);
  }

  login() {
    //this.authService.login(this.credentials);
    this.navCtrl.setRoot(HomePage);
  }

  goToSignup() {
    this.navCtrl.push(SignupPage);
  }

  goToResetPassword() {
    // this.navCtrl.push(ResetPasswordPage);
  }

}
