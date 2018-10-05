import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the UserServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class UserServiceProvider {

  private url: string = "http://zona-azul-teste.herokuapp.com";

  constructor(private http: HttpClient) {
    console.log('Hello UserServiceProvider Provider');
  }

  userLogin(){
    return this.http.get(this.url);
  }

}
