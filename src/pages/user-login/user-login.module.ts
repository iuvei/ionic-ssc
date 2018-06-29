import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UserLoginPage } from './user-login';
import { BackBtnComponentModule } from '../../components/back-btn/back-btn.module';

@NgModule({
  declarations: [
    UserLoginPage,
   
  ],
  imports: [
    IonicPageModule.forChild(UserLoginPage),
     BackBtnComponentModule
  ],
  exports: [
    UserLoginPage,
    
  ]
})
export class UserloginPageModule {}
