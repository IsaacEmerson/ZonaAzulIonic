import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BugReportPage } from './bug-report';
import { IonicPageModule } from 'ionic-angular';
@NgModule({
  declarations: [
    BugReportPage,
  ],
  imports: [
    IonicPageModule.forChild(BugReportPage),
  ],
})
export class BugReportPageModule {}
