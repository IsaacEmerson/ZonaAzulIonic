import { Component } from '@angular/core';
import { IonicPage, NavController, MenuController, AlertController } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
import { SignupPage } from '../signup/signup';
import { HomePage } from '../home/home';
import { FogotPassPage } from '../fogot-pass/fogot-pass';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  testRadioOpen = false;
  testRadioResult: any;
  imgFooter:any=false;
  
  public backgroundImage = 'assets/imgs/login/background-1.jpg';

  private credentials:object = {
    email : '',
    password : ''
  };

  constructor(public navCtrl: NavController,
    public authService: AuthProvider,
    public alertCtrl: AlertController,
    public menu:MenuController) {
  }

  ionViewDidLoad() {
    this.doRadio();
  }

  doRadio() {
    const alert = this.alertCtrl.create({
      enableBackdropDismiss: false
    });
    alert.setTitle('Lightsaber color');

    alert.addInput({
      checked: true,
      type: 'radio',
      label: 'Salvador',
      value: 'Salvador'
    });

    alert.addInput({
      type: 'radio',
      label: 'Purple',
      value: 'purple'
    });

    alert.addInput({
      type: 'radio',
      label: 'White',
      value: 'white'
    });

    alert.addInput({
      type: 'radio',
      label: 'Black',
      value: 'black'
    });

    alert.addButton({
      text: 'Ok',
      handler: (data: any) => {
        console.log('Radio data:', data);
        this.testRadioOpen = false;
        this.testRadioResult = data;
        this.chooseCity(this.testRadioResult);
      }
    });

    alert.present();
  }

  chooseCity(city){
    if(city==="Salvador"){
      this.imgFooter = 'assets/imgs/rodapesalvador.png';
    }
  }

  ionViewDidEnter(){
    this.menu.enable(false);
  }

  ionViewWillLeave(){
    this.menu.enable(true);
  }

  login() {
    //this.authService.login(this.credentials);
    this.navCtrl.setRoot(HomePage,{city:this.imgFooter});
  }

  goToSignup() {
    this.navCtrl.push(SignupPage);
  }

  goToFogotPassword() {
    this.navCtrl.push(FogotPassPage);
  }

}
