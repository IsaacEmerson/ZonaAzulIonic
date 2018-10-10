import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { IrregularitiesPage } from './irregularities';

@NgModule({
  declarations: [
    IrregularitiesPage,
  ],
  imports: [
    IonicPageModule.forChild(IrregularitiesPage),
  ],
})
export class IrregularitiesPageModule {}
