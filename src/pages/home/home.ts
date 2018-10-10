import { Component } from '@angular/core';
import { NavController} from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
import { HttpServiceProvider } from '../../providers/http-service/http-service';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {

  public user: any;

  public cities: Array<{}>;
  
  constructor(public navCtrl: NavController,
    public authService:AuthProvider,
    public http:HttpServiceProvider) {}

  ionViewDidLoad(){
    this.http.getAll('client/user').
    subscribe(data=>{
      this.user = data;
      console.log(data);
    });
  }

  ionViewCanEnter(){
    //return this.authService.userIsLogged();
  }

}
