import { Component, Input, Output, EventEmitter } from '@angular/core';
import {Storage} from '@ionic/storage';

/**
 * Generated class for the AppFooterComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'app-footer',
  templateUrl: 'app-footer.html'
})
export class AppFooterComponent {

  //@Input('myText') TextToUse;
 //@Output() fezAlgo = new EventEmitter();

  //text: string;
  imgFooter:any = false;

  constructor(private storage:Storage) {
    // console.log('Hello AppFooterComponent Component');
    // this.text = 'Hello World';
  }

  //<app-footer myText="fdf" (fezAlgo)="chamafuncao()" ></app-footer>

  ngAfterViewInit(){

    this.storage.get('footer').then((val) => {
      this.imgFooter = val;
    });

    //this.text = this.TextToUse;

    // let interval = setInterval(()=>{
    //   this.fezAlgo.emit("its time");
    // },3000);
  }
   

}
