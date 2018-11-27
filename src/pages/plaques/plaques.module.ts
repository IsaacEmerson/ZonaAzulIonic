import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PlaquesPage } from './plaques';

@NgModule({
  declarations: [
    PlaquesPage,
  ],
  imports: [
    IonicPageModule.forChild(PlaquesPage),
  ],
})
export class PlaquesPageModule {}
