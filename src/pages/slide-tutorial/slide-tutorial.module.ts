import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SlideTutorialPage } from './slide-tutorial';

@NgModule({
  declarations: [
    SlideTutorialPage,
  ],
  imports: [
    IonicPageModule.forChild(SlideTutorialPage),
  ],
})
export class SlideTutorialPageModule {}
