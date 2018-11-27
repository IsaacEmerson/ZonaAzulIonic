import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

/**
 * Generated class for the PlaquesModalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-plaques-modal',
  templateUrl: 'plaques-modal.html',
})
export class PlaquesModalPage {

  plaque = '';
  vehicles = [
    {
      id: '1',
      name: 'Carro'
    },
    {
      id: '2',
      name: 'Moto'
    }
  ];

  plaqueType;
  vehicle;
  error='';

  constructor(public navCtrl: NavController,
    public viewCtrl: ViewController,public navParams: NavParams) {
  }

  addPlaque(plaque) {
    this.plaque;
    if(this.plaque.length>=8){
      this.viewCtrl.dismiss({plaque:plaque});
    }else{
      this.error = 'A placa não está completa';
    }
  }

  dismiss() {
    this.viewCtrl.dismiss({plaque:null});
  }

  ionViewDidLoad() {
    this.error = '';
    this.plaqueType = this.navParams.get('type');
    this.vehicle = this.vehicles[this.plaqueType-1].name;
    // console.log('ionViewDidLoad PlaquesModalPage');
  }

}
