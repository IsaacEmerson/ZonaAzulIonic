import { NgModule } from '@angular/core';
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
