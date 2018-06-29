import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UserRegisterPage } from './user-register';
import { BackBtnComponentModule } from '../../components/back-btn/back-btn.module';
@NgModule({
  declarations: [
   UserRegisterPage,

  ],
  imports: [
    IonicPageModule.forChild(UserRegisterPage),
     BackBtnComponentModule
  ],
  exports: [
    UserRegisterPage
    
  ]
})
export class UserRegisterPageModule {}
