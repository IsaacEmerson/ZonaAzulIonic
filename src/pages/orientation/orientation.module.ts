import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { OrientationPage } from './orientation';

@NgModule({
  declarations: [
    OrientationPage,
  ],
  imports: [
    IonicPageModule.forChild(OrientationPage),
  ],
})
export class OrientationPageModule {}
