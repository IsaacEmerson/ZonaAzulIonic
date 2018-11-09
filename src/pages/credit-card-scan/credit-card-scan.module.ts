import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CreditCardScanPage } from './credit-card-scan';

@NgModule({
  declarations: [
    CreditCardScanPage,
  ],
  imports: [
    IonicPageModule.forChild(CreditCardScanPage),
  ],
})
export class CreditCardScanPageModule {}
