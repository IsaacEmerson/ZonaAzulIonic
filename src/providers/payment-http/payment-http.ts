import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

/*
  Generated class for the PaymentHttpProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class PaymentHttpProvider {

  constructor(public http: HttpClient) {
    console.log('Hello PaymentHttpProvider Provider');
  }

  getSession(){
    return this.http.get('http://localhost/syszonaIonic/session.php');
  }


  doPayment(data): Observable<Object>{
    return this.http.post('http://localhost/syszonaIonic/payment.php',data);
  }


}
