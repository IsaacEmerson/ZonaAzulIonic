import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SmsPage } from './sms';

@NgModule({
  declarations: [
    SmsPage,
  ],
  imports: [
    IonicPageModule.forChild(SmsPage),
  ],
})
export class SmsPageModule {}
