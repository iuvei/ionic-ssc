import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { TabsPage } from '../pages/tabs/tabs';
import { AppVersion } from '@ionic-native/app-version';
import { ScreenOrientation } from '@ionic-native/screen-orientation';
import { LocalNotifications } from '@ionic-native/local-notifications';
import { JPushService  } from 'ionic2-jpush';
@Component({
  templateUrl: 'app.html',
})
export class MyApp {
 
  rootPage:any = TabsPage;
  constructor(
  private platform: Platform, 
  private statusBar: StatusBar, 
  private splashScreen: SplashScreen,
  private appversion: AppVersion,
  private screenOrientation: ScreenOrientation,
  private localNotifications: LocalNotifications,
  private JPush:JPushService,
  ) {
    platform.ready().then(() => {
      //  this.appversion.getVersionNumber().then((value: string) => {
      //   alert(value);
      //   })


      this.splashScreen.hide();
      this.statusBar.backgroundColorByHexString('#191818');
      this.screenOrientation.lock("portrait");   //锁定竖屏
     
      this.JPush.init();
      this.JPush.receiveMessage().subscribe(data=>{
        let state;
        let name;
        let names = ["重庆时时彩","天津时时彩","江苏快三","湖北快三","河北快三","广西快三","上海快三","安徽快三","江西快三","台湾五分彩"]
        for(let i=0; i<names.length;i++){
            if(i==0) name = "cqssc";
            if(i==1) name = "tjssc";
            if(i==2) name = "jsk3";
            if(i==3) name = "hubeik3";
            if(i==4) name = "hebeik3";
            if(i==5) name = "gxk3";
            if(i==6) name = "shk3";
            if(i==7) name = "ahk3";
            if(i==8) name = "jxk3";
            if(i==9) name = "twwfc";
          if(data.message.indexOf(names[i])>=0){
             state = (localStorage.getItem(name)=="true") ? true : false;
          }
        }
       if(state){
          this.localNotifications.schedule({id: 1,text:data.message,sound:'file://assets/sounds/sound.mp3',icon:"res://small_logo.png"})
        }
      }
      );
    
   
 })}
}
