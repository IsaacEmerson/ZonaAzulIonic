import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { EmailComposer } from '@ionic-native/email-composer';
import { HttpServiceProvider } from '../../providers/http-service/http-service';
/**
 * Generated class for the BugReportPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-bug-report',
  templateUrl: 'bug-report.html',
})
export class BugReportPage {
  subjects = ['Reportar problema', 'Dúvida','Sugestão','Outro'];
  subject = "";
  isEnabled=false;
  email = {
    to: 'syszonasuporte@hotmail.com',
    subject: "",
    body: '',
    isHtml: true
  };
  
  sendEmail(){
    if(this.email.body.trim()=="" || this.email.subject==""){
      return;
    }
    console.log(this.email);
    this.http.presentLoading();
    this.emailComposer.isAvailable().then((available: boolean) =>{
      if(available) {
        //Now we know we can send
      }
     });
    this.emailComposer.open(this.email);
    this.http.dismissLoading();
  }
  constructor(public navCtrl: NavController, public navParams: NavParams,private emailComposer: EmailComposer,public http:HttpServiceProvider) {
  }

  setSubj(data){
    console.log(data);
    this.email.subject = data;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BugReportPage');
  }

}