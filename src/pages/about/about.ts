import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

/**
 * Generated class for the AboutPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-about',
  templateUrl: 'about.html',
})
export class AboutPage {

  terms = 0;

  constructor(public navCtrl: NavController,public viewCtrl: ViewController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AboutPage');
    this.terms = this.navParams.get('terms');
  }

  dismiss() {
    this.viewCtrl.dismiss({read:0});
  }

  confirm(){
    this.viewCtrl.dismiss({read:1});
  }

}
