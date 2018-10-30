import { Component } from '@angular/core';
import { IonicPage, NavController, Item, ItemSliding, AlertController } from 'ionic-angular';
import { HttpServiceProvider } from '../../providers/http-service/http-service';
import { AuthProvider } from '../../providers/auth/auth';

/**
 * Generated class for the PlaquesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-plaques',
  templateUrl: 'plaques.html',
})
export class PlaquesPage {

  
  activeItemSliding: ItemSliding = null;

  plaques = [];
  newPlaque ='';
  vehicles = [
    {
      id: '1',
      name: 'Carro'
    },
    {
      id: '2',
      name: 'Moto'
    },
    {
      id: '3',
      name: 'Caminhão'
    }
  ]

  constructor(public navCtrl: NavController,
    public auth:AuthProvider,
    public alertCtrl:AlertController,public http:HttpServiceProvider) { }

  ionViewDidLoad(){
    this.getPlaques()
  }

  addPlaque(type) {
    this.presentPrompt(type);
  	console.log('add Plaque');
  	//this.things.push({ title: 'Thing ' + (this.things.length + 1) });
  }

  getPlaques(){
    this.http.presentLoading();
    this.http.get('client/plaques').subscribe((result:any)=>{
      console.log(result);
      this.plaques = result.plaques;
      this.http.dismissLoading();
    },error=>{
      this.http.dismissLoading();
      console.log(error);
    });
  }

  postPlaque(plaque){
    this.http.presentLoading();
    console.log(plaque);
    this.http.post('client/plaques',{plaque:plaque.plaque,vehicle_id:plaque.id_vehicle}).subscribe((result:any)=>{
      console.log(result);
      this.plaques = result.plaques;
      this.http.dismissLoading();
      this.getPlaques();
      this.auth.showToast(result.message,3000);
      //this.plaques.push({plaque:plaque.plaque,vehicle_id:plaque.id_vehicle});
    },error=>{
      this.http.dismissLoading();
      console.log(error);
    });
  }

  deletePlaque(list, index) {
    this.http.presentLoading();
    this.http.delete('client/plaques','id='+this.plaques[index].id).subscribe((result)=>{
      console.log(result);
      // list.splice(index,1);
      this.http.dismissLoading();
      this.getPlaques();
    },error=>{
      this.http.dismissLoading();
      console.log(error);
      this.auth.showToast(error.error.errors[0],3000);
    });
  }

  openOption(itemSlide: ItemSliding, item: Item, event) {
    console.log('opening item slide..');
    event.stopPropagation(); // here if you want item to be tappable
    if (this.activeItemSliding) { // use this so that only one active sliding item allowed
      this.closeOption();
    }

    this.activeItemSliding = itemSlide;
    const swipeAmount = 33; // set your required swipe amount

    console.log('swipe amount ', swipeAmount);
    itemSlide.startSliding(swipeAmount);
    itemSlide.moveSliding(swipeAmount);

    itemSlide.setElementClass('active-slide', true);
    itemSlide.setElementClass('active-options-right', true);
    item.setElementStyle('transition', null);
    item.setElementStyle('transform', 'translate3d(-' + swipeAmount + 'px, 0px, 0px)');
  }

  closeOption() {
    console.log('closing item slide..');

    if (this.activeItemSliding) {
      this.activeItemSliding.close();
      this.activeItemSliding = null;
    }
  }

  presentPrompt(plaqueType) {
    let alert = this.alertCtrl.create({
      title: 'Cadastrar '+this.vehicles[plaqueType-1].name,
      inputs: [
        {
          name: 'plaque',
          placeholder: 'XXX-0000',
          type: 'text',
          max:8,
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Cadastrar',
          handler: data => {
            this.postPlaque({
              plaque:data.plaque,
              id_vehicle:plaqueType
            });
          }
        }
      ]
    });
    alert.present();
  }



}
