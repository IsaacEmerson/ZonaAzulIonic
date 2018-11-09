
import { Component, NgZone, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Segment } from 'ionic-angular';
import { PaymentHttpProvider } from '../../providers/payment-http/payment-http';
import scriptjs from 'scriptjs';
import { HttpServiceProvider } from '../../providers/http-service/http-service';
import { AuthProvider } from '../../providers/auth/auth';
import { FormBuilder, FormGroup,Validators} from '@angular/forms';
import { BuyCreditsPage } from '../buy-credits/buy-credits';
import {Storage} from '@ionic/storage';


declare let PagSeguroDirectPayment;

@IonicPage()
@Component({
  selector: 'page-checkout',
  templateUrl: 'checkout.html',
})
export class CheckoutPage {

  @ViewChild(Segment)segment:Segment;
  price :number = this.navParams.get('price');

  hasCardStored = false;

  creditCardStored = {
    num:'',
    senderName: '',
    senderCPF:'',
    cardNumber: '',
    cvv: '',
    expiryMonth: '',
    expiryYear: '',
    brand: '',
    token: ''
};

  creditCard = {
    senderName: '',
    senderCPF:'',
    cardNumber: '',
    cvv: '',
    expiryMonth: '',
    expiryYear: '',
    brand: '',
    token: ''
};

  ticket = {
    name:'Credito_Estacionamento',
    price: this.price
  }

  creditCardForm:FormGroup;

  paymentMethod = 'CREDIT_CARD';
  paymentMethods: Array<any> = [];

  constructor(public navCtrl: NavController,
    public storage:Storage,
    public formBuilder: FormBuilder,public http:HttpServiceProvider,public auth:AuthProvider, public navParams: NavParams, public paymentHttp: PaymentHttpProvider,
    public zone:NgZone) {
        this.creditCardForm = formBuilder.group({
            senderName: ['', [Validators.maxLength(100), Validators.required]],
            senderCPF: ['', [Validators.minLength(5), Validators.required]],
            cardNumber: ['', [Validators.maxLength(25), Validators.required]],
            cvv: ['', [Validators.maxLength(100), Validators.required]],
            expiryMonth: ['', [Validators.maxLength(100), Validators.required]],
            expiryYear: ['', [Validators.maxLength(100), Validators.required]]
        });
  }

  useCardStored(){
      this.creditCard = this.creditCardStored;
  }

  ionViewDidEnter(){
   this.getStoredCard();
  }

  getStoredCard(){
    this.storage.get('credit_card').then((card)=>{
        console.log(card);
        if(card!=null){
            this.hasCardStored = true;
            this.creditCardStored = card;
            this.creditCardStored.num = card.cardNumber.substr(2,2)+'**********'+card.cardNumber.substr(-4,4);
            console.log(this.creditCardStored);
        }
    });
  }

  ionViewDidLoad() {
    this.http.presentLoading();
    scriptjs('https://stc.sandbox.pagseguro.uol.com.br/pagseguro/api/v2/checkout/pagseguro.directpayment.js',()=>{
      this.paymentHttp.getSession().subscribe((data)=>{
        this.initSession(data);
        this.getPaymentMethods();
      });
    });
  }

  initSession(data){
      //sesssion id = id
    PagSeguroDirectPayment.setSessionId(data.id);
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
          this.http.dismissLoading();
        });
      }
    });
  }

  makePayment() {
    this.http.presentLoading();
    let data = {
        //items: this.ticket,
        senderHash: PagSeguroDirectPayment.getSenderHash(),
        senderName: this.creditCard.senderName,
        senderCPF: this.creditCard.senderCPF,
        //method: this.paymentMethod,
        value: this.ticket.price.toFixed(2)
    };

    let doPayment = () => {
        this.paymentHttp.doPayment(data).subscribe((result:any) => {
            console.log('deu certo');
            this.navCtrl.setRoot(BuyCreditsPage);
            this.http.dismissLoading();
            this.auth.showToast(result.success,5000);
            
        },error=>{
            this.auth.showToast(error,5000);
            this.http.dismissLoading();
        });
    };
    
    if(this.paymentMethod == 'CREDIT_CARD'){
        this.prepareCreditCard().then(() => {
            (<any>data).creditCardToken = this.creditCard.token;
            console.log(data);
            doPayment();
        },(error) => {
            console.log(error);
            this.auth.showToast("Erro com sua forma de pagamento. Verifique os dados e tente novamente",5000);
            this.http.dismissLoading();
        });
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
            cardBin: this.creditCard.cardNumber.substring(0, 6),
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
            cardNumber: this.creditCard.cardNumber,
            brand: this.creditCard.brand,
            cvv: this.creditCard.cvv,
            expirationMonth: this.creditCard.expiryMonth,
            expirationYear: '20'+this.creditCard.expiryYear,
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