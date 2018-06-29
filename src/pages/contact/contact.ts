import { Component } from '@angular/core';
import { NavController ,ModalController,ViewController} from 'ionic-angular';
import { UserLoginPage } from '.././user-login/user-login';
import { UserRegisterPage }from '.././user-register/user-register';
import { NoticePage }from '.././notice/notice';
import { ActionSheetController } from 'ionic-angular';
@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage {
 public state = true;
 public username="";
 public admin = false;
  constructor(public navCtrl: NavController,public modal:ModalController,public view:ViewController,public actionSheetCtrl: ActionSheetController) {
   this.change_state();
   console.log("进入222！")
  }
  ionViewWillEnter(){
    this.change_state();
    console.log("进入！")
  }
  ionViewDidEnter(){
    console.log("进入111！")
  }
  change_state(){
    if(localStorage.getItem("username")&&localStorage.getItem("userpassword")&&localStorage.getItem("logintime")){
      if(localStorage.getItem("admin")=="true"){
           this.admin = true;
      }
       this.state = false;
       this.username = localStorage.getItem("username");
    }
  }
  cancel(){
    localStorage.clear();
    this.state = true;
    this.admin = false;
  }
  NavLoginPage(){
     this.navCtrl.push(UserLoginPage);

  }
  NavRegisterPage(){
     this.navCtrl.push(UserRegisterPage);
  }
  localNotifications(){
      this.navCtrl.push(NoticePage);
  }
  contact(){
    let actionSheet = this.actionSheetCtrl.create({
      buttons: [
        {
          text: 'QQ咨询',
          role: 'cancel',
          handler: () => {
            window.open("http://wpa.qq.com/msgrd?v=3&uin=842101237&site=qq&menu=yes")
            console.log('Destructive clicked');
          }
        },{
          text: '微信咨询',
          handler: () => {
            console.log('Archive clicked');
          }
        }
      ]
    });
    actionSheet.present();
  }
}
