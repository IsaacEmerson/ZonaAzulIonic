import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PlaquesModalPage } from './plaques-modal';

@NgModule({
  declarations: [
    PlaquesModalPage,
  ],
  imports: [
    IonicPageModule.forChild(PlaquesModalPage),
  ],
})
export class PlaquesModalPageModule {}
