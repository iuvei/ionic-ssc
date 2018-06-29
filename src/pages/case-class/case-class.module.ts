import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CaseClassPage } from './case-class';
import { BackBtnComponentModule } from '../../components/back-btn/back-btn.module';
@NgModule({
  declarations: [
    CaseClassPage,
  ],
  imports: [
    IonicPageModule.forChild(CaseClassPage),BackBtnComponentModule
  ],
  exports: [
    CaseClassPage
  ]
})
export class CaseClassPageModule {}
