import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { VacanciesPage } from './vacancies';

@NgModule({
  declarations: [
    VacanciesPage,
  ],
  imports: [
    IonicPageModule.forChild(VacanciesPage),
  ],
})
export class VacanciesPageModule {}
