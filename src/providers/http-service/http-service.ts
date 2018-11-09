import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Storage} from '@ionic/storage';
import { Observable } from 'rxjs/Observable';
import { LoadingController } from 'ionic-angular';

@Injectable()
export class HttpServiceProvider {

  options = {
    headers: this.createAuthorizationHeader()
  };

  loader:any;

  private token:string;

  //private url: string = "http://zona-azul-teste.herokuapp.com/api";
  private url: string = "http://192.168.1.14/estacionamento-zona-azul/public/api";
  //private url: string = "http://localhost/WebService/";
  
  constructor(public http: HttpClient,
    public loadingCtrl: LoadingController,
    public storage:Storage) {
    console.log('Hello HttpServiceProvider Provider');
  }

  createAuthorizationHeader() {
    this.storage.get('token').then(
      (data)=>{this.token=data;}
      ),error=>{
        console.log('deu ruim');
      };

    const headers = new HttpHeaders()
            .set("Authorization", "Bearer "+this.token).set("Accept","application/json");
    return headers
  }

  getAll(endpoint): Observable<Object>{
     this.options.headers = this.createAuthorizationHeader();
    return this.http.get(`${this.url}/${endpoint}`,this.options);
  }

  getById(endpoint, id): Observable<Object>{
     this.options.headers = this.createAuthorizationHeader();
    return this.http.get(`${this.url}/${endpoint}/${id}`);
  }

  get(endpoint): Observable<Object>{
     this.options.headers = this.createAuthorizationHeader();
    return this.http.get(`${this.url}/${endpoint}`,this.options);
  }

  getParam(endpoint,params): Observable<Object>{
     this.options.headers = this.createAuthorizationHeader();
    return this.http.get(`${this.url}/${endpoint}?${params}`,this.options);
  }

  post(endpoint, data): Observable<Object>{
     this.options.headers = this.createAuthorizationHeader();
    return this.http.post(`${this.url}/${endpoint}`, data, this.options);
  }

  delete(endpoint, params): Observable<Object>{
     this.options.headers = this.createAuthorizationHeader();
    return this.http.delete(`${this.url}/${endpoint}?${params}`,this.options);
  }

  update(endpoint, data): Observable<Object>{
     this.options.headers = this.createAuthorizationHeader();
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
