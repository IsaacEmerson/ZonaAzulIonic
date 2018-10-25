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

  private user = {
    name:''
  }
  public cities: Array<{}>;
  
  constructor(public navCtrl: NavController,
    public authService:AuthProvider,
    public navParams: NavParams,
    public http:HttpServiceProvider) {}

  ionViewDidLoad(){
    this.http.get('client/user').
    subscribe((data:any)=>{
      this.user.name = data.name;
      console.log(data);
    });
  }

  ionViewDidEnter(){
  }

  geo(){
    this.navCtrl.push(GeolocationPage);
  }

  ionViewCanEnter(){
    return this.authService.userIsLogged();
  }

}
