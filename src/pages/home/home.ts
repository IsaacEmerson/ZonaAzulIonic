import { Component } from '@angular/core';
import { NavController, NavParams} from 'ionic-angular';
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
  plaques = [];

  private user = {
    name:'',
  }
  public cities: Array<{}>;
  actualCity='';
  
  constructor(public navCtrl: NavController,
    public authService:AuthProvider,
    public navParams: NavParams,
    public storage:Storage,
    public http:HttpServiceProvider) {}

  ionViewDidLoad(){
    this.getUserData();
    this.getPlaques();
    this.storage.get('city_actual').then((city)=>{
      this.actualCity = city;
      console.log(city);
    }).catch((error)=>{
      console.log(error);
    }); 
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

  getPlaques(){
    //this.http.presentLoading();
    this.http.get('client/plaques').subscribe((result:any)=>{
      console.log(result);
      this.plaques = result.plaques;
      //this.http.dismissLoading();
    },error=>{
      //this.http.dismissLoading();
      console.log(error);
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

  parkCar(){
    this.navCtrl.push(GeolocationPage);
  }

  geo(){
    this.navCtrl.push(GeolocationPage);
  }

  ionViewCanEnter(){
    console.log(this.authService.isUserAuth());
    return this.authService.isUserAuth();
  }

}
