import { Component} from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import {Validators, FormBuilder, FormGroup } from '@angular/forms';
import { LoginPage } from '../login/login';

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {
 
  userData: FormGroup;
  
  constructor(public navCtrl: NavController, public formBuilder: FormBuilder) {
    this.userData = formBuilder.group({
      user_cpf_cnpj: ['', [Validators.maxLength(21), Validators.required]],
      user_name: ['', [Validators.maxLength(100), Validators.required]],
      user_email: ['', [Validators.maxLength(100), Validators.required]],
      user_plaque: ['', [Validators.maxLength(100), Validators.required]],
      user_contact: ['', [Validators.maxLength(100)]]
  });
  }

  register(){
    
  }

  goToLogin(){
    this.navCtrl.setRoot(LoginPage);
  }


}
