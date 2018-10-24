import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Storage} from '@ionic/storage';

@Injectable()
export class HttpServiceProvider {

  options = {
    headers: this.createAuthorizationHeader()
  };

  private token:string;

  private url: string = "http://192.168.1.10/estacionamento-zona-azul/public/api";
  //private url: string = "http://localhost/WebService/";
  
  constructor(public http: HttpClient,
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

  getParam(endpoint,params){
    return this.http.get(`${this.url}/${endpoint}`,params);
  }

  post(endpoint, data){
    return this.http.post(`${this.url}/${endpoint}`, data);
  }

  delete(endpoint, id){

  }

  update(endpoint, id, data){

  }

  

}
