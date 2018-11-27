import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BackgroundGeolocationPage } from './background-geolocation';

@NgModule({
  declarations: [
    BackgroundGeolocationPage,
  ],
  imports: [
    IonicPageModule.forChild(BackgroundGeolocationPage),
  ],
})
export class BackgroundGeolocationPageModule {}
