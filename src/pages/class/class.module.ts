import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ClassPage } from './class';
import { BackBtnComponentModule } from '../../components/back-btn/back-btn.module';
@NgModule({
  declarations: [
    ClassPage,
  ],
  imports: [
    IonicPageModule.forChild(ClassPage),BackBtnComponentModule 
  ],
  exports: [
    ClassPage
  ]
})
export class ClassPageModule {}
