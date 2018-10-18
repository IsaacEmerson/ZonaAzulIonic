import { Component,NgZone } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {BackgroundGeolocation,BackgroundGeolocationResponse,BackgroundGeolocationConfig} from '@ionic-native/background-geolocation';
@IonicPage()
@Component({
  selector: 'page-geolocation',
  templateUrl: 'geolocation.html',
})
export class GeolocationPage {

  location : any;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private backGeolocation: BackgroundGeolocation,public zone:NgZone) {
  }

  ionViewDidLoad() {
    this.getLocation();
  }

  getLocation(){
    const config: BackgroundGeolocationConfig = {
      desiredAccuracy: 10,
      stationaryRadius: 20,
      distanceFilter: 30,
      interval: 5000, //5 segundos para reload
      debug : true, //emite som
      stopOnTerminate: false, //quando parar de executar limpar localização
    }

    this.zone.run(() => {
        this.backGeolocation.configure(config).
      subscribe((location: BackgroundGeolocationResponse)=>{
        this.location = location;
      });
    });
    

    this.backGeolocation.start();
    //this.backGeolocation.stop();
    //this.backGeolocation.finish(); para ios
  }

}
