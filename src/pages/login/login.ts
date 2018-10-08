import { Component , ViewChild } from '@angular/core';
import { IonicPage, NavController, AlertController, LoadingController } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';

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
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
    public authService: AuthProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  login() {
    
    this.authService.login(this.credentials);

    // const loading = this.loadingCtrl.create({
    //   duration: 500
    // });

    // loading.onDidDismiss(() => {
    //   const alert = this.alertCtrl.create({
    //     title: 'Logged in!',
    //     subTitle: 'Thanks for logging in.',
    //     buttons: ['Dismiss']
    //   });
    //   alert.present();
    // });

    // loading.present();

  }

  goToSignup() {
    // this.navCtrl.push(SignupPage);
  }

  goToResetPassword() {
    // this.navCtrl.push(ResetPasswordPage);
  }

}
