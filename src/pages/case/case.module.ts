import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CasePage } from './case';
import { BackBtnComponentModule } from '../../components/back-btn/back-btn.module';

@NgModule({
  declarations: [
    CasePage,
  ],
  imports: [
    IonicPageModule.forChild(CasePage),BackBtnComponentModule
  ],
  exports: [
    CasePage
  ]
})
export class CasePageModule {}
