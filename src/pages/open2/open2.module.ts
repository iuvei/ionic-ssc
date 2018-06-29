import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Open2Page } from './open2';
import { BackBtnComponentModule } from '../../components/back-btn/back-btn.module';
@NgModule({
  declarations: [
    Open2Page,
  ],
  imports: [
    IonicPageModule.forChild(Open2Page),BackBtnComponentModule
  ],
  exports: [
    Open2Page
  ]
})
export class Open2PageModule {}
