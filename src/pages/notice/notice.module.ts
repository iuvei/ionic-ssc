import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NoticePage } from './notice';
import { BackBtnComponentModule } from '../../components/back-btn/back-btn.module';
@NgModule({
  declarations: [
    NoticePage,
  ],
  imports: [
    IonicPageModule.forChild(NoticePage), BackBtnComponentModule
  ],
  exports: [
    NoticePage
  ]
})
export class NoticePageModule {}
