import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { UserServiceProvider } from '../../providers/user-service/user-service';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {
  
  teste;

  constructor(public navCtrl: NavController, public userService:UserServiceProvider) {}

  ionViewDidLoad(){
    this.userService.userLogin()
    .subscribe(
      (data)=> {this.teste = data;},
      (error)=> {console.log(error);}
      );
  }

}
