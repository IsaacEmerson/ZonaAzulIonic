import { Component, ViewChild} from '@angular/core';
import { IonicPage, NavController,MenuController } from 'ionic-angular';
import {Validators, FormBuilder, FormGroup } from '@angular/forms';
import { LoginPage } from '../login/login';
import { HttpServiceProvider } from '../../providers/http-service/http-service';

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {

  @ViewChild('signupSlider') signupSlider: any;

  tokenEmailConfirm = '';

  seePass: boolean;
  signInitial: FormGroup;
  signFinal: FormGroup;
  
  constructor(public navCtrl: NavController, public menu:MenuController, public formBuilder: FormBuilder,
    public http:HttpServiceProvider) {
    this.signInitial = formBuilder.group({
      user_name: ['', [Validators.maxLength(100), Validators.required]],
      user_pass: ['', [Validators.minLength(5), Validators.required]],
      user_email: ['', [Validators.maxLength(100), Validators.required]]
  });

  this.signFinal = formBuilder.group({
    user_cpf_cnpj: ['', [Validators.maxLength(21), Validators.required]],
    user_plaque: ['', [Validators.maxLength(100), Validators.required]],
    user_contact: ['', [Validators.maxLength(100)]]
});

  }

  changeSeePass(){
    this.seePass = !this.seePass;
  }

  registerInitial(){
    this.http.post('register',{
      email: this.signInitial.controls['user_email'].value,
      password: this.signInitial.controls['user_pass'].value,
      name: this.signInitial.controls['user_name'].value
  }).subscribe((result)=>{
    console.log(result);
  });
  }

  valAccount(){
    //valida a conta e entra no cadastro final
    this.http.post('register/confirm/account',{token:this.tokenEmailConfirm}).subscribe((result)=>{
      console.log(result);
    });
    if(true){
    this.signupSlider.lockSwipes(false);
    //this.signupSlider.slideNext();  
    this.signupSlider.lockSwipes(true);
    }
  }

  registerFinal(){

  }

  goToLogin(){
    this.navCtrl.setRoot(LoginPage);
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

}
