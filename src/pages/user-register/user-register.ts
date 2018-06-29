import { Component,ViewChild} from '@angular/core';
import { IonicPage,NavController,NavParams} from 'ionic-angular';
import { AppServiceProvider } from '../../providers/app-service/app-service';
/**
 * Generated class for the UserRegisterPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-user-register',
  templateUrl: 'user-register.html',
})
export class UserRegisterPage {
  @ViewChild("input")input;
  public user = { name:"",password:"",password1:""};

  constructor(public navCtrl: NavController, public navParams: NavParams,public app:AppServiceProvider) {
      this.app.hidden_tabs();
  }
  ionViewDidLoad() {
     setTimeout(() => {
      this.input.setFocus();
    },1000);
  }
  ionViewWillUnload() {
    this.app.show_tabs();
  }
  register(){
     if(/^[\d]+$/.test(this.user.name) || !this.user.name || !this.user.password || !this.user.password1){
        if(this.user.name.length==11 && this.user.password === this.user.password1 && /^1[3|4|5|7|8][0-9]{9}$/.test(this.user.name) && /^(\w){6,25}$/.test(this.user.password)){
          let obj = this.app.Loading();
          this.app.http_post("/php/user_register.php", 
          "username=" + this.user.name + "&userpassword=" + this.user.password  + "&userpassword1=" + this.user.password1,"json").subscribe(data=>{
           obj.dismiss();
           this.app.Alert(data.msg);
          },error => this.app.Alert(error)
         )
       }else{
          if(this.user.name==''){
             this.app.Alert("用户名不能为空！")
            }else if(this.user.name.length!=11 || /^1[3|4|5|7|8][0-9]{9}$/.test(this.user.name)==false){
            this.app.Alert("用户名格式不合法！")
            }else if(this.user.password=='' || this.user.password1==''){
            this.app.Alert("密码不能为空！")
            }else if( this.user.password != this.user.password1){
            this.app.Alert("2次密码输入不一致，请重新输入！")
            }else if(this.user.password.length<6 && this.user.password.length>25){
            this.app.Alert("密码格式不正确，请输入6-25位数字/字母！")
            }else if(/^(\w){6,25}$/.test(this.user.password)==false){
            this.app.Alert("密码格式不正确，请输入6-25位数字/字母！")
          } 
       }
    }else if(/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/.test(this.user.name)){
        if(this.user.password === this.user.password1 && /^(\w){6,25}$/.test(this.user.password)){
          let obj = this.app.Loading();
          this.app.http_post("/php/user_register.php", 
          "username=" + this.user.name + "&userpassword=" + this.user.password  + "&userpassword1=" + this.user.password1,"json").subscribe(data=>{
           obj.dismiss();
           this.app.Alert(data.msg);
          },error => this.app.Alert(error)
          )
         }else if( this.user.password != this.user.password1){
          this.app.Alert("2次密码输入不一致，请重新输入！")
        }else if(this.user.password.length<6 && this.user.password.length>25){
         this.app.Alert("密码格式不正确，请输入6-25位数字/字母！")
        }else if(/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/.test(this.user.name)==false){
          this.app.Alert("用户名格式不合法！")
        }else if(/^(\w){6,25}$/.test(this.user.password)==false){
          this.app.Alert("密码格式不正确，请输入6-25位数字/字母！")
        }
      }else{
      this.app.Alert("用户名/密码输入不合法！")
    }
  }


}
