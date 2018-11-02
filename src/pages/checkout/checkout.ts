import { Component, NgZone, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Segment } from 'ionic-angular';
import { PaymentHttpProvider } from '../../providers/payment-http/payment-http';
import scriptjs from 'scriptjs';

declare let PagSeguroDirectPayment;

@IonicPage()
@Component({
  selector: 'page-checkout',
  templateUrl: 'checkout.html',
})
export class CheckoutPage {

  @ViewChild(Segment)segment:Segment;
  price :number = this.navParams.get('price');
  creditCard = {
    num: '',
    cvv: '',
    monthExp: '',
    yearExp: '',
    brand: '',
    token: ''
};

  ticket = {
    name:'Credito_Estaconamento',
    price: 90.00
  }

  paymentMethod = 'CREDIT_CARD';
  paymentMethods: Array<any> = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, public paymentHttp: PaymentHttpProvider,
    public zone:NgZone) {
  }

  ionViewDidLoad() {
    scriptjs('https://stc.sandbox.pagseguro.uol.com.br/pagseguro/api/v2/checkout/pagseguro.directpayment.js',()=>{
      this.paymentHttp.getSession().subscribe((data)=>{
        this.initSession(data);
        this.getPaymentMethods();
      });
    });
  }

  initSession(data){
    PagSeguroDirectPayment.setSessionId(data.sessionId);
  }

  getPaymentMethods(){
    PagSeguroDirectPayment.getPaymentMethods({
      amount:this.ticket.price,
      success: (response) => {
        this.zone.run(()=>{
          let paymentMethods = response.paymentMethods;
          this.paymentMethods = Object.keys(paymentMethods).map((key)=>paymentMethods[key]);
          
          setTimeout(()=>{
            this.segment._inputUpdated();
            this.segment.ngAfterContentInit();
          });

          console.log(response.paymentMethods);

        });
      }
    });
  }

  makePayment() {
    let data = {
        items: this.ticket,
        hash: PagSeguroDirectPayment.getSenderHash(),
        method: this.paymentMethod,
        total: this.ticket.price
    };

    let doPayment = () => {
        this.paymentHttp.doPayment(data).subscribe(() => {
            console.log('deu certo')
        });
    };
    if(this.paymentMethod == 'CREDIT_CARD'){
        this.prepareCreditCard().then(() => {
            (<any>data).token = this.creditCard.token;
            doPayment();
        },(error) => console.log(error));
        return;
    }

    doPayment();
}

prepareCreditCard(): Promise<any> {
    return this.getCreditCardBrand().then(() => {
        return this.getCreditCardToken();
    });
}

getCreditCardBrand(): Promise<any> {
    return new Promise((resolve,reject) => {
        PagSeguroDirectPayment.getBrand({
            cardBin: this.creditCard.num.substring(0, 6),
            success: (response) => {
                this.zone.run(() => {
                    this.creditCard.brand = response.brand.name;
                    console.log(response);
                    resolve({brand: response.brand.name});
                });
            },
            error(error){
                reject(error)
            }
        });
    });
}

getCreditCardToken(): Promise<any> {
    return new Promise((resolve,reject) => {
        PagSeguroDirectPayment.createCardToken({
            cardNumber: this.creditCard.num,
            brand: this.creditCard.brand,
            cvv: this.creditCard.cvv,
            expirationMonth: this.creditCard.monthExp,
            expirationYear: this.creditCard.yearExp,
            success: (response) => {
                this.zone.run(() => {
                    this.creditCard.token = response.card.token;
                    resolve({token: response.card.token});
                    console.log(response);
                });
            },
            error(error){
                reject(error)
            }
        })
    });
}

}
