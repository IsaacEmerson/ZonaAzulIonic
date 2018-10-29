import { Component } from '@angular/core';
import { IonicPage, NavController, LoadingController , MenuController, AlertController, Events } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
import { SignupPage } from '../signup/signup';
import { HomePage } from '../home/home';
import { FogotPassPage } from '../fogot-pass/fogot-pass';
import {Storage} from '@ionic/storage';
import { HttpServiceProvider } from '../../providers/http-service/http-service';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  testRadioOpen = false;
  testRadioResult: any;
  imgFooter:any=false;
  cities:any;
  
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
    public http:HttpServiceProvider,
    public events:Events) {
  }

  ionViewDidLoad() {
    this.getCities();
  }

  getCities(){
    this.http.get('cities').subscribe((cities:any)=>{
      this.doRadio(cities.cities);
      console.log(cities.cities);
    },error=>{
      console.log(error);
    });
  }

  doRadio(cities) {
    const alert = this.alertCtrl.create({
      enableBackdropDismiss: false
    });
    alert.setTitle('Onde você está?');

    cities.forEach(element => {
      alert.addInput({
        checked: element.id==1?true:false,
        type: 'radio',
        label: element.name,
        value: element.name
      });
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
      this.imgFooter = false;
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
      this.http.presentLoading();

      this.authService.login(this.credentials).add(()=>{
        console.log('coisou');
        if(this.authService.isUserAuth()){
          this.events.publish('user:normal');
          this.navCtrl.setRoot(HomePage);
          this.http.dismissLoading();
        }else{
          console.log('não auth');
          this.http.dismissLoading();
        }
      });
    }
  }

  goToSignup() {
    this.navCtrl.push(SignupPage);
  }

  goToFogotPassword() {
    this.navCtrl.push(FogotPassPage);
  }

}
