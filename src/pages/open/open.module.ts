import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { OpenPage } from './open';
import { OpenDirective } from './open.directive';
import { BackBtnComponentModule } from '../../components/back-btn/back-btn.module';
@NgModule({
  declarations: [
    OpenPage,
    OpenDirective,
  ],
  imports: [
    IonicPageModule.forChild(OpenPage),
    BackBtnComponentModule
  ],
  exports: [
    OpenPage
  ]
})
export class OpenPageModule {}
