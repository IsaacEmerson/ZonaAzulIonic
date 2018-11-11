import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ActivePlaquesPage } from './active-plaques';

@NgModule({
  declarations: [
    ActivePlaquesPage,
  ],
  imports: [
    IonicPageModule.forChild(ActivePlaquesPage),
  ],
})
export class ActivePlaquesPageModule {}
