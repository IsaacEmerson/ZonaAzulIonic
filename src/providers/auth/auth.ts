import { Http, RequestOptions, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { Injectable } from '@angular/core';
import {Storage} from '@ionic/storage';

@Injectable()
export class AuthProvider {

  private url: string = "http://zona-azul-teste.herokuapp.com/api/";

  constructor(
    public http: Http,
    public storage: Storage
    ) {
    console.log('Hello AuthProvider Provider');
  }

  login(credentials){
    this.http.post(this.url+"login",credentials).
    subscribe(data => {console.log(data)});
  }

  userIsLogged(){
    return this.storage.get('token').then(val => {
      if(val != undefined){
        return val;
      }else{
        return false;
      }
    });
  }

  logout(){
    this.storage.remove('token');
  }

}
