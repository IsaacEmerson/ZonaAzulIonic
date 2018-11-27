import { Component } from '@angular/core';
import { IonicPage, NavController, Item, ItemSliding, AlertController, ModalController } from 'ionic-angular';
import { HttpServiceProvider } from '../../providers/http-service/http-service';
import { AuthProvider } from '../../providers/auth/auth';
import { PlaquesModalPage } from '../plaques-modal/plaques-modal';

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
    }
  ]

  constructor(public navCtrl: NavController,
    public auth:AuthProvider,
    public modalCtrl:ModalController,
    public alertCtrl:AlertController,public http:HttpServiceProvider) { }

  ionViewDidLoad(){
    this.getPlaques()
  }

  addPlaque(type) {
    //this.presentPrompt(type);
    this.showPlaquesModal(type);
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
      this.auth.showToast(error.error.errors[0],3000);
      console.log(error);
    });
  }

  deletePlaque(index) {
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

  alertConfirm(index){
    let alert = this.alertCtrl.create({
      title: 'Excluir',
      message: 'Deseja realmente excluir?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Deletar',
          handler: () => {
            this.deletePlaque(index);
          }
        }
      ]
    });
    alert.present();
  }

  showPlaquesModal(type){
    let plaquesModal = this.modalCtrl.create(PlaquesModalPage,{type:type}, { cssClass: 'inset-modal' });
    plaquesModal.present();
    plaquesModal.onDidDismiss(data => {
      if(data.plaque!=null){
        this.postPlaque({
          plaque: data.plaque.toUpperCase(),
          id_vehicle:type
        });
      }  
      console.log(data);
    });
  }

}

