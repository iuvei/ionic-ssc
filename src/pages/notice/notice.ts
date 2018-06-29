import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AppServiceProvider } from '../../providers/app-service/app-service';
/**
 * Generated class for the NoticePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-notice',
  templateUrl: 'notice.html',
})
export class NoticePage {
   public data=["重庆时时彩","天津时时彩","江苏快三","湖北快三","河北快三","广西快三","上海快三","安徽快三","江西快三","台湾五分彩"];
   public json=[{state:""},{state:""},{state:""},{state:""},{state:""},{state:""},{state:""},{state:""},{state:""},{state:""}];
  constructor(public navCtrl: NavController, public navParams: NavParams,public app:AppServiceProvider) {
    this.json[0]["state"] = localStorage.getItem("cqssc");
    this.json[1]["state"] = localStorage.getItem("tjssc");
    this.json[2]["state"] = localStorage.getItem("jsk3");
    this.json[3]["state"] = localStorage.getItem("hubeik3");
    this.json[4]["state"] = localStorage.getItem("hebeik3");
    this.json[5]["state"] = localStorage.getItem("gxk3");
    this.json[6]["state"] = localStorage.getItem("shk3");
    this.json[7]["state"] = localStorage.getItem("ahk3");
    this.json[8]["state"] = localStorage.getItem("jxk3");
    this.json[9]["state"] = localStorage.getItem("twwfc");
    this.app.hidden_tabs();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NoticePage');
  }
  ionViewWillUnload() {
    this.app.show_tabs();
  }
  change(index,state){
    if(index==0) localStorage.setItem("cqssc",state);
    if(index==1) localStorage.setItem("tjssc",state);
    if(index==2) localStorage.setItem("jsk3",state);
    if(index==3) localStorage.setItem("hubeik3",state);
    if(index==4) localStorage.setItem("hebeik3",state);
    if(index==5) localStorage.setItem("gxk3",state);
    if(index==6) localStorage.setItem("shk3",state);
    if(index==7) localStorage.setItem("ahk3",state);
    if(index==8) localStorage.setItem("jxk3",state);
    if(index==9) localStorage.setItem("twwfc",state);
    console.log(index)
    console.log(state)
  }
}
