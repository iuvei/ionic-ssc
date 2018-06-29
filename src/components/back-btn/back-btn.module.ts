import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BackBtnComponent } from './back-btn';

@NgModule({
  declarations: [
    BackBtnComponent,
  ],
  imports: [
    IonicPageModule.forChild(BackBtnComponent),
  ],
  exports: [
    BackBtnComponent
  ]
})
export class BackBtnComponentModule {}
