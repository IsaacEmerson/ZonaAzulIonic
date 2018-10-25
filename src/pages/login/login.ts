import { Component } from '@angular/core';
import { IonicPage, NavController, MenuController, AlertController, Events } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
import { SignupPage } from '../signup/signup';
import { HomePage } from '../home/home';
import { FogotPassPage } from '../fogot-pass/fogot-pass';
import {Storage} from '@ionic/storage';

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

  private credentials:any = {
    email : '',
    password : ''
  };

  constructor(public navCtrl: NavController,
    public authService: AuthProvider,
    public alertCtrl: AlertController,
    public storage: Storage,
    public menu:MenuController,
    public events:Events) {
  }

  ionViewDidLoad() {
    this.doRadio();
  }

  doRadio() {
    const alert = this.alertCtrl.create({
      enableBackdropDismiss: false
    });
    alert.setTitle('Onde você está?');

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
      this.storage.set('footer','assets/imgs/rodapesalvador.png');
    }else{
      this.storage.set('footer',false);
    }
  }

  ionViewDidEnter(){
    this.menu.enable(false);
  }

  ionViewWillLeave(){
    this.menu.enable(true);
  }

  login() {
    this.credentials.email = this.credentials.email.trim();
    this.credentials.password = this.credentials.password.trim();
    if(this.credentials.email!="" && this.credentials.password!="" && this.credentials.email.search('@')!=-1){
      if(this.authService.login(this.credentials)){
        this.events.publish('user:salvador');
        this.navCtrl.setRoot(HomePage);
      }
    }
  }

  goToSignup() {
    this.navCtrl.push(SignupPage);
  }

  goToFogotPassword() {
    this.navCtrl.push(FogotPassPage);
  }

}
