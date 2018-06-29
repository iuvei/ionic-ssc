import { Component,ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams,ModalController } from 'ionic-angular';
import { ContactPage }from '.././contact/contact';
import { AppServiceProvider } from '../../providers/app-service/app-service';
/**
 * Generated class for the UserloginPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-userlogin',
  templateUrl: 'user-login.html'
})
export class UserLoginPage {
  @ViewChild("input")input;
  public user = {name:"",password:""};
  constructor(public navCtrl: NavController, public navParams: NavParams,public app:AppServiceProvider,public modal:ModalController) {
    this.app.hidden_tabs();
  }
  ionViewDidLoad() {
    setTimeout(() => {
      this.input.setFocus();
    },1000)
  }
  ionViewWillUnload() {
    this.app.show_tabs();
  }
 login(){
  if(/^[\d]+$/.test(this.user.name) || !this.user.name || !this.user.password){
     if(this.user.name!='' &&this.user.name.length==11 &&this.user.password != '' && /^1[3|4|5|7|8][0-9]{9}$/.test(this.user.name) &&/^(\w){6,25}$/.test(this.user.password)){
        let obj=this.app.Loading()
        this.app.http_post('/php/user_login.php',"username=" + this.user.name + "&userpassword=" + this.user.password,"json").subscribe(data=>{
         obj.dismiss();
         if(data.msg=="登录成功"){
         if(data.admin=="true"){
           localStorage.setItem("admin","true");
           }
          localStorage.setItem("username",this.user.name);
          localStorage.setItem("userpassword",this.user.password);
          localStorage.setItem("logintime",data.logintime);
          this.navCtrl.pop(ContactPage);
         }else{
           this.app.Alert(data.msg);
         }
        },error=>this.app.Alert(error));
        }else{if(this.user.name==''){
        this.app.Alert("用户名不能为空！");
        }else if(this.user.name.length!=11){
        this.app.Alert("用户名格式不正确,手机号码为11位!");
        }else if(this.user.password==''){
        this.app.Alert("密码不能为空！");
        }else if(this.user.password.length<6 || this.user.password.length>25){
        this.app.Alert("密码格式不正确，请输入6-25位数字/字母！");
        }else if(/^1[3|4|5|7|8][0-9]{9}$/.test(this.user.name)==false){
        this.app.Alert("手机号码不正确，请输入正确的手机号！");
        }else if(/^(\w){6,25}$/.test(this.user.password)==false){
        this.app.Alert("密码格式不正确，请输入6-25位数字/字母！");
        } 
        }

    }else if(/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/.test(this.user.name)){
          if(/^(\w){6,25}$/.test(this.user.password)){
            let obj=this.app.Loading()
            this.app.http_post('/php/user_login.php',"username=" + this.user.name + "&userpassword=" + this.user.password,"json").subscribe(data=>{
            obj.dismiss();  this.app.Alert(data.msg)
            },error=>this.app.Alert(error))
          }else{if(this.user.password==''){
           this.app.Alert("密码不能为空！");
          }else if(this.user.password.length<6 && this.user.password.length>25 || /^(\w){6,25}$/.test(this.user.password)==false){
           this.app.Alert("密码格式不正确，请输入6-25位数字/字母！");
          }else if(/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/.test(this.user.name)==false){
           this.app.Alert("用户名格式不合法！");
          }
         }
      }else{
         this.app.Alert("用户名/密码输入不合法！");
      }
    }
  }