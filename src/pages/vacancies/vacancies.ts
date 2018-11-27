import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HttpServiceProvider } from '../../providers/http-service/http-service';
import { Storage } from '@ionic/storage';
/**
 * Generated class for the VacanciesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-vacancies',
  templateUrl: 'vacancies.html',
})
export class VacanciesPage {
  vacancies = [];
  constructor(public navCtrl: NavController, public navParams: NavParams, public http:HttpServiceProvider,public storage:Storage) {
  }
  ionViewDidLoad() { 
    this.storage.get('city_actual').then((city:any)=>{
      this.getVacancies(city.id);
    });
  }
  getVacancies(city_id){
    this.http.getParam('client/addresses','city_id='+city_id).subscribe((res:any)=>{
      console.log(res);
      this.vacancies = res.addresses;
    },error=>{
      console.log(error);
    });
  }
}