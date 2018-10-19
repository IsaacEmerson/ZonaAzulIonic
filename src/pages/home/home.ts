import { Component } from '@angular/core';
import { NavController, NavParams} from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
import { HttpServiceProvider } from '../../providers/http-service/http-service';
import { GeolocationPage } from '../geolocation/geolocation';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {

  public user: any;
  public imgFooter:any;

  public cities: Array<{}>;
  
  constructor(public navCtrl: NavController,
    public authService:AuthProvider,
    public navParams: NavParams,
    public http:HttpServiceProvider) {}

  ionViewDidLoad(){

    this.imgFooter = this.navParams.get('city');

    console.log(this.imgFooter);

    this.http.getAll('client/user').
    subscribe(data=>{
      this.user = data;
      console.log(data);
    });
  }

  getFooter(){
    return this.imgFooter;
  }

  geo(){
    this.navCtrl.push(GeolocationPage);
  }

  ionViewCanEnter(){
    //return this.authService.userIsLogged();
  }

}
