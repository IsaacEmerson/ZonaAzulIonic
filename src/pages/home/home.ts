import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController} from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
import { HttpServiceProvider } from '../../providers/http-service/http-service';
import { GeolocationPage } from '../geolocation/geolocation';
import {Storage} from '@ionic/storage';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {

  isDataComplet = true;

  private user = {
    name:'',
  }
  public cities: Array<{}>;
  
  constructor(public navCtrl: NavController,
    public authService:AuthProvider,
    public navParams: NavParams,
    public storage:Storage,
    public http:HttpServiceProvider) {}

  ionViewDidLoad(){
    this.getUserData();
  }

  getUserData(){
    this.http.presentLoading();
    this.http.get('client/user').subscribe((result:any)=>{
      console.log(result);
      this.user.name = result.name;
      this.isDataComplet = true;
      this.storage.set('user',result);
      this.http.dismissLoading();
    },error=>{
      console.log(error);
      if(error.error==""){

      }
      this.isDataComplet  = false;
      this.http.dismissLoading();
    });
  }

  ionViewDidEnter(){
  }

  refresh(){
    this.getUserData();
  }

  refreshToken(){
    this.authService.refreshToken().add(()=>{
      this.getUserData();
    });
  }

  geo(){
    this.navCtrl.push(GeolocationPage);
  }

  ionViewCanEnter(){
    console.log(this.authService.isUserAuth());
    return this.authService.isUserAuth();
  }

}
