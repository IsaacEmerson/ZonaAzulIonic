import { Component } from '@angular/core';
import { IonicPage, NavController, MenuController, AlertController, Events } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
import { SignupPage } from '../signup/signup';
import { HomePage } from '../home/home';
import { FogotPassPage } from '../fogot-pass/fogot-pass';
import { Storage } from '@ionic/storage';
import { HttpServiceProvider } from '../../providers/http-service/http-service';
import { AppVersion } from '@ionic-native/app-version';
import { UserProvider } from '../../providers/user/user';
import { Market } from '@ionic-native/market';
import { Platform } from 'ionic-angular';
import { SmsPage } from '../sms/sms';
@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  imgFooter: any = false;
  working_mode = 0;
  tutorial = true;
  cities:any;
  public backgroundImage = 'assets/imgs/login/background-1.jpg';

  private credentials: any = {
    email: '',
    password: ''
  };

  constructor(public navCtrl: NavController,
    public plt: Platform,
    public authService: AuthProvider,
    public alertCtrl: AlertController,
    public storage: Storage,
    public menu: MenuController,
    public userProvider:UserProvider,
    private market: Market,
    public appVersion: AppVersion,
    public http: HttpServiceProvider,
    public events: Events) {
  }

  ionViewDidLoad() {
   // this.presentPrompt();
    this.getCities();
    this.checkVersion();
  }

  //  presentPrompt(){
  //   let alert = this.alertCtrl.create({
  //     title: 'configurar ip',
  //     inputs: [
  //       {
  //         name: 'ip',
  //         placeholder: 'ip',
  //         type: 'text'
  //       }
  //     ],
  //     buttons: [
  //       {
  //         text: 'Cancelar',
  //         role: 'cancel',
  //         handler: data => {
  //           console.log('Cancel clicked');
  //           this.getCities();
  //           this.checkVersion();
  //         }
  //       },
  //       {
  //         text: 'Confirmar',
  //         handler: data => {
  //           this.http.setIp(data);
  //           this.getCities();
  //           this.checkVersion();
  //         }
  //       }
  //     ]
  //   });
  //  return alert.present();
  // }

  getCities() {
    this.http.presentLoading();
    this.http.get('cities').subscribe((cities: any) => {
      this.doRadioCities(cities.cities);
      console.log(cities.cities);
      this.cities = cities.cities;
      this.http.dismissLoading();
    }, error => {
      this.authService.showToast('Verifique a conexão com a internet',3000);
      this.http.dismissLoading();
      console.log(error);
    });
  }

  doRadioCities(cities) {
    const alert = this.alertCtrl.create({
      enableBackdropDismiss: false
    });
    alert.setTitle('Onde você está?');

    cities.forEach(element => {
      alert.addInput({
        checked: element.id == 1 ? true : false,
        type: 'radio',
        label: element.name,
        value: element
      });
    });

    alert.addButton({
      text: 'Ok',
      handler: (data: any) => {
        if(data==undefined){
          this.doRadioCities(this.cities);
          return;
        }
        console.log('Radio data:', data);
        this.storage.set('city_actual', data).then(() => {
          this.storage.get('token').then((token) => {
            console.log('token ' + token);
            if (token != null) {
              this.authService.setUserAuth();
              this.events.publish('working_mode:' + this.working_mode);
              this.navCtrl.setRoot(HomePage);
            } else {
              console.log('creeee');
            }
          });
        });
        this.working_mode = data.working_mode;
        this.chooseCity(data);
      }
    });

    alert.present();
  }

  chooseCity(city) {
    if (city.id === 2) {
      this.imgFooter = 'assets/imgs/rodapesalvador.png';
      this.storage.set('footer', 'assets/imgs/rodapesalvador.png');
    } else {
      this.imgFooter = false;
      this.storage.set('footer', false);
    }
  }

  ionViewDidEnter() {
    this.storage.remove("PagSession");
    this.menu.enable(false);
  }

  ionViewWillLeave() {
    this.menu.enable(true);
  }

  login() {
    this.credentials.email = this.credentials.email.trim();
    this.credentials.password = this.credentials.password.trim();
    if (this.credentials.email != "" && this.credentials.password != "" && this.credentials.email.search('@') != -1) {
      this.http.presentLoading();

      this.authService.login(this.credentials).subscribe((token: any) => {
        this.storage.set('token', token.token).then(() => {
          //console.log(token.token);
          this.authService.setUserAuth();
          this.http.setToken(token.token);
          this.events.publish('working_mode:' + this.working_mode);
          this.navCtrl.setRoot(HomePage);
          // this.userProvider.getUserData().then(()=>{
          //   this.navCtrl.setRoot(HomePage);
          // });
          this.http.dismissLoading();
        }).catch(error => {
          console.error(error);
          this.http.dismissLoading();
        });
      },error=>{
        this.authService.showToast(error.error.error,4000);
        this.http.dismissLoading();
      });

        //this.http.dismissLoading();
        // this.authService.login(this.credentials).add(() => {
        //   console.log('coisou');
        //   if (this.authService.isUserAuth().valueOf) {
        //     this.events.publish('working_mode:' + this.working_mode);
        //     this.storage.get('token').then((token) => {
        //       if (token=!null) {
        //         this.navCtrl.setRoot(HomePage);
        //       }
        //     });
        //     this.http.dismissLoading();
        //   } else {
        //     console.log('não auth');
        //     this.http.dismissLoading();
        //   }
        // });
      }
  }

    checkVersion() {
      // this.appVersion.getVersionNumber().then((version)=>{
      //   console.log(version);
      // });
      let isAndroid = this.plt.is('android');
      let plat = isAndroid?1:0;
      return this.http.getParam('checkVersion', "app=1&version=1.0.2&platform="+plat)
        .subscribe((result: any) => {
          console.log(result);
        }, error => {
          if (error.error.error == "old_version") {
            const alert = this.alertCtrl.create({
              enableBackdropDismiss: false
            });
            alert.setTitle('Versão antiga');
            alert.setMessage('Versão Antiga, baixe a nova versão em: \n' + error.error.link);
            alert.addButton({
              text: 'Ok',
              handler: (data: any) => {
                this.market.open('br.com.syszona.syszonazonaazulclienteapp');
                console.log(data);
              }
            });
            alert.present();
          }
        });
    }
    
    goToSignup() {
      this.navCtrl.push(SignupPage);
    }

    goToFogotPassword() {
      this.navCtrl.push(FogotPassPage);
    }

    infoSms(){
      this.navCtrl.push(SmsPage);
    }

  }
