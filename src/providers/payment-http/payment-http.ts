import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpServiceProvider } from '../http-service/http-service';

/*
  Generated class for the PaymentHttpProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class PaymentHttpProvider {
  
  constructor(public http: HttpServiceProvider) {
    console.log('Hello PaymentHttpProvider Provider');
  }

  getSession(){
    return this.http.get('client/session');
  }


  doPayment(data): Observable<Object>{
    return this.http.post('client/payment',data);
  }


}
