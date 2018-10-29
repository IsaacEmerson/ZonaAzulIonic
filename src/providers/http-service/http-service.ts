import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Storage} from '@ionic/storage';
import { LoadingController } from 'ionic-angular';

@Injectable()
export class HttpServiceProvider {

  options = {
    headers: this.createAuthorizationHeader()
  };

  loader:any;

  private token:string;

  //private url: string = "http://zona-azul-teste.herokuapp.com/api";
  private url: string = "http://192.168.3.2/estacionamento-zona-azul/public/api";
  //private url: string = "http://localhost/WebService/";
  
  constructor(public http: HttpClient,
    public loadingCtrl: LoadingController,
    public storage:Storage) {
    console.log('Hello HttpServiceProvider Provider');
  }

  createAuthorizationHeader() {
    this.storage.get('token').then(
      (data)=>{this.token=data;}
      );

    const headers = new HttpHeaders()
            .set("Authorization", "Bearer "+this.token);
    return headers
  }

  getAll(endpoint){
    return this.http.get(`${this.url}/${endpoint}`,this.options);
  }

  getById(endpoint, id){
    return this.http.get(`${this.url}/${endpoint}/${id}`);
  }

  get(endpoint){
    this.options.headers = this.createAuthorizationHeader();
    return this.http.get(`${this.url}/${endpoint}`,this.options);
  }

  getParam(endpoint,params){
    return this.http.get(`${this.url}/${endpoint}?${params}`);
  }

  post(endpoint, data){
    return this.http.post(`${this.url}/${endpoint}`, data, this.options);
  }

  delete(endpoint, params){
    return this.http.delete(`${this.url}/${endpoint}?${params}`,this.options);
  }

  update(endpoint, id, data){

  }

  presentLoading() {
    this.loader = this.loadingCtrl.create({
      content: "Carregando..."
    });
    this.loader.present();
  }
  dismissLoading(){
    this.loader.dismiss();
  }

}
