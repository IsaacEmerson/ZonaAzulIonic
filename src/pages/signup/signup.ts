import { Component, ViewChild} from '@angular/core';
import { IonicPage, NavController,MenuController, ToastController, AlertController } from 'ionic-angular';
import {Validators, FormBuilder, FormGroup } from '@angular/forms';
import { LoginPage } from '../login/login';
import { HttpServiceProvider } from '../../providers/http-service/http-service';
import {Storage} from '@ionic/storage';
import { AboutPage } from '../about/about';

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {

  @ViewChild('signupSlider') signupSlider: any;

  tokenEmailConfirm = '';
  plaque = '';
  user = {
    name:'',
    token:''
  }
  vehicles = [
    {
      id: '1',
      name: 'Carro'
    },
    {
      id: '2',
      name: 'Moto'
    },
    {
      id: '3',
      name: 'Caminhão'
    }
  ];
  vehicle_id = 1;

  seePass: boolean;
  signInitial: FormGroup;
  signFinal: FormGroup;
  
  constructor(public navCtrl: NavController, public menu:MenuController, public formBuilder: FormBuilder,
    public http:HttpServiceProvider,
    public storage:Storage,
    public alertCtrl: AlertController,
    public toastCtrl: ToastController) {
    this.signInitial = formBuilder.group({
      user_name: ['', [Validators.maxLength(100), Validators.required]],
      user_pass: ['', [Validators.minLength(5), Validators.required]],
      user_email: ['', [Validators.maxLength(100), Validators.required]]
  });

  this.signFinal = formBuilder.group({
    user_cpf: ['', [Validators.maxLength(100), Validators.required]],
    user_plaque: ['', [Validators.maxLength(100), Validators.required]],
    user_birth: ['', [Validators.maxLength(100), Validators.required]],
    user_contact: ['', [Validators.maxLength(100), Validators.required]],
    vehicle_id : ['', [Validators.maxLength(10), Validators.required]]
});
  }

  changeSeePass(){
    this.seePass = !this.seePass;
  }
  terms(){
    this.navCtrl.push(AboutPage);
  }
  registerInitial(){
    this.http.presentLoading();
    this.http.post('register',{
      email: this.signInitial.controls['user_email'].value,
      password: this.signInitial.controls['user_pass'].value,
      password_confirmation: this.signInitial.controls['user_pass'].value,
      name: this.signInitial.controls['user_name'].value
  }).subscribe(
    (result:any)=>{
    console.log(result.success);
    this.showToast(result.success,6000);
    this.signupSlider.lockSwipes(false);
    this.signupSlider.slideNext();  
    this.signupSlider.lockSwipes(true);
    this.http.dismissLoading();
  },error=>{
    console.log(error);
    this.showToast(error.error.errors[0],3000);
    this.http.dismissLoading();
  });
  }

  valAccount(){
    this.http.presentLoading();
    console.log(this.tokenEmailConfirm);
    //valida a conta e entra no cadastro final
    this.http.getParam('register/confirm/account','token='+this.tokenEmailConfirm.trim()).
    subscribe((result:any)=>{
      console.log(result);
      this.signupSlider.lockSwipes(false);
      this.signupSlider.slideNext();  
      this.signupSlider.lockSwipes(true);
      this.showToast('Código de validação aceito.',5000);
      this.user.name = result.name;
      this.user.token = this.tokenEmailConfirm;
      this.http.dismissLoading();
    },error=>{
      console.log(error);
      this.showToast(error.error.message,3000);      
      this.http.dismissLoading();
    });
  }

  registerFinal(){
    //let id_city;
    this.storage.get('city_actual').then((city)=>{
      //id_city = city.id;
      this.http.presentLoading();
    this.http.post('register/confirm/account',{
      token:this.user.token,
      vehicle_id:this.signFinal.controls['vehicle_id'].value,
      cell_phone:this.signFinal.controls['user_contact'].value,
      plaque:this.signFinal.controls['user_plaque'].value,
      cpf: this.signFinal.controls['user_cpf'].value,
      birth_date: this.signFinal.controls['user_birth'].value,
      city_actual: city.id,
  }).subscribe(
    (result:any)=>{
    console.log(result.message);
    this.showToast(result.message,5000);
    this.navCtrl.setRoot(LoginPage);
    this.http.dismissLoading();
  },error=>{
    console.log(error);
    console.log(error.error.error);
    this.showToast(error.error.errors[0],3000);
    this.http.dismissLoading();
  });
    });
  }

  goToLogin(){
    this.navCtrl.setRoot(LoginPage);
  }

  doRadio() {
    const alert = this.alertCtrl.create({
      enableBackdropDismiss: false
    });
    alert.setTitle('Tipo do veículo?');

    this.vehicles.forEach(element => {
      alert.addInput({
        checked: element.id=='1'?true:false,
        type: 'radio',
        label: element.name,
        value: element.name
      });
    });

    alert.addButton({
      text: 'Ok',
      handler: (data: any) => {
        this.vehicle_id = data.id;
      }
    });

    alert.present();
  }

  goActivation(){
    this.signupSlider.lockSwipes(false);
    this.signupSlider.slideNext();  
    this.signupSlider.lockSwipes(true);
  }

  goSignup(){
    this.signupSlider.lockSwipes(false);
    this.signupSlider.slidePrev();  
    this.signupSlider.lockSwipes(true);
  }

  ionViewDidEnter(){
    this.menu.enable(false);
    this.signupSlider.lockSwipes(true);
  }

  ionViewWillLeave(){
    this.menu.enable(true);
  }

  showToast(message:string,duration:number){
    let toast =  this.toastCtrl.create({
      message: message,
      duration: duration
    });
    toast.present();
  }

}