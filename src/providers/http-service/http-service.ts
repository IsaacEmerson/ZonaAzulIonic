import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Storage} from '@ionic/storage';
import { Observable } from 'rxjs/Observable';
import { LoadingController } from 'ionic-angular';

@Injectable()
export class HttpServiceProvider {

  options = {
    headers: null
  };

  loader:any;

  private token:string;

  private url: string = "http://zona-azul-teste.herokuapp.com/api";
  //private url: string = "http://192.168.3.6/estacionamento-zona-azul/public/api";
  //private url: string = "http://localhost/estacionamento-zona-azul/public/api";
  //private url: string = "https://syszona.com.br/api";
  //private url: string = "http://172.20.10.3/estacionamento-zona-azul/public/api";
  
  constructor(public http: HttpClient,
    public loadingCtrl: LoadingController,
    public storage:Storage) {
    console.log('Hello HttpServiceProvider Provider');
  }

  createAuthorizationHeader() {
    this.storage.get('token').then(
      (data)=>{this.token=data;
      console.log(data)}
      ),error=>{
        console.log('deu ruim');
      };

    let headers = new HttpHeaders()
            .set("Authorization", "Bearer "+this.token).set("Accept","application/json");
    this.options.headers = headers;
  }

  setToken(token){
    this.options.headers = new HttpHeaders()
    .set("Authorization", "Bearer "+token).set("Accept","application/json");
    
  }

  public setIp(ip){
    this.url = "http://"+ip.ip+"/estacionamento-zona-azul/public/api";
    console.log(this.url);
  }

  getAll(endpoint): Observable<Object>{
    return this.http.get(`${this.url}/${endpoint}`,this.options);
  }

  getById(endpoint, id): Observable<Object>{
    return this.http.get(`${this.url}/${endpoint}/${id}`);
  }

  get(endpoint): Observable<Object>{
    return this.http.get(`${this.url}/${endpoint}`,this.options);
  }

  getParam(endpoint,params): Observable<Object>{
    return this.http.get(`${this.url}/${endpoint}?${params}`,this.options);
  }

  post(endpoint, data): Observable<Object>{
    return this.http.post(`${this.url}/${endpoint}`, data, this.options);
  }

  delete(endpoint, params): Observable<Object>{
    return this.http.delete(`${this.url}/${endpoint}?${params}`,this.options);
  }

  update(endpoint, data): Observable<Object>{
    return this.http.put(`${this.url}/${endpoint}`,data,this.options);
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
