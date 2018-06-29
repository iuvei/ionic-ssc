import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AppServiceProvider } from '../../providers/app-service/app-service';
import { OpenPage } from'.././open/open';
/**
 * Generated class for the ClassPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-class',
  templateUrl: 'class.html',
})
export class ClassPage {
  public datas = [];
  public title = "";
  constructor(public navCtrl: NavController,public app:AppServiceProvider,public params:NavParams){
       if(this.params.get("name")=="ssc"){
          this.title = "时时彩系列";
          this.datas = [
          {name:"重庆时时彩",img_src:"assets/icon/cqssc.png"},
          {name:"天津时时彩",img_src:"assets/icon/tjssc.png"},
          {name:"北京时时彩",img_src:"assets/icon/bj_ssc.png"},
          {name:"腾讯分分彩",img_src:"assets/icon/tx_ffc.png"},
          {name:"QQ分分彩",img_src:"assets/icon/qqffc.png"},
          {name:"极速分分彩",img_src:"assets/icon/jsffc.png"},
          {name:"台湾五分彩",img_src:"assets/icon/twssc.png"},
          {name:"北京PK10",img_src:"assets/icon/pk10.png"}
          ];
       }else if(this.params.get("name")=="k3"){
          this.title = "快三系列";
          this.datas = [
          {name:"江苏快三",img_src:"assets/icon/jiangsu.png"},{name:"湖北快三",img_src:"assets/icon/hubei.png"},
          {name:"上海快三",img_src:"assets/icon/shanghai.png"},{name:"安徽快三",img_src:"assets/icon/anhui.png"},
          {name:"河北快三",img_src:"assets/icon/hebei.png"},{name:"广西快三",img_src:"assets/icon/guangxi.png"},
          {name:"江西快三",img_src:"assets/icon/jiangxi.png"},{name:"北京快三",img_src:"assets/icon/beijing.png"},
          {name:"河南快三",img_src:"assets/icon/henan.png"},{name:"甘肃快三",img_src:"assets/icon/gansu.png"}
          ];
       }
      
    }
  nav(name){
    if(name=="重庆时时彩"){
       this.navCtrl.push(OpenPage,{title:"重庆时时彩",get_url:"/php/get_cp.php?name=cqssc&init=true&date=false",update_url:"/php/update_cp.php?name=cqssc"});
    }else if(name=="天津时时彩"){
       this.navCtrl.push(OpenPage,{title:"天津时时彩",get_url:"/php/get_cp.php?name=tjssc&init=true&date=false",update_url:"/php/update_cp.php?name=tjssc"});
    }else if(name=="江苏快三"){
       this.navCtrl.push(OpenPage,{title:"江苏快三",get_url:"/php/get_cp.php?name=jsk3&init=true&date=false",update_url:"/php/update_cp.php?name=jsk3"});
    }else if(name=="上海快三"){
       this.navCtrl.push(OpenPage,{title:"上海快三",get_url:"/php/get_cp.php?name=shk3&init=true&date=false",update_url:"/php/update_cp.php?name=shk3"});
    }else if(name=="安徽快三"){
       this.navCtrl.push(OpenPage,{title:"安徽快三",get_url:"/php/get_cp.php?name=ahk3&init=true&date=false",update_url:"/php/update_cp.php?name=ahk3"});
    }else if(name=="广西快三"){
       this.navCtrl.push(OpenPage,{title:"广西快三",get_url:"/php/get_cp.php?name=gxk3&init=true&date=false",update_url:"/php/update_cp.php?name=gxk3"});
    }else if(name=="江西快三"){
       this.navCtrl.push(OpenPage,{title:"江西快三",get_url:"/php/get_cp.php?name=jxk3&init=true&date=false",update_url:"/php/update_cp.php?name=jxk3"});
    }else if(name=="湖北快三"){
       this.navCtrl.push(OpenPage,{title:"湖北快三",get_url:"/php/get_cp.php?name=hubeik3&init=true&date=false",update_url:"/php/update_cp.php?name=hubeik3"});
    }else if(name=="河北快三"){
       this.navCtrl.push(OpenPage,{title:"河北快三",get_url:"/php/get_cp.php?name=hebeik3&init=true&date=false",update_url:"/php/update_cp.php?name=hebeik3"});
    }else if(name=="北京时时彩"){
       this.navCtrl.push(OpenPage,{title:"北京时时彩",get_url:"/php/get_cp.php?name=bjssc&init=true&date=false",update_url:"/php/update_cp.php?name=bjssc"});
    }else if(name=="台湾五分彩"){
       this.navCtrl.push(OpenPage,{title:"台湾五分彩",get_url:"/php/get_cp.php?name=twssc&init=true&date=false",update_url:"/php/update_cp.php?name=twssc"});
    }else if(name=="腾讯分分彩"){
       this.navCtrl.push(OpenPage,{title:"腾讯分分彩",get_url:"/php/get_cp.php?name=txffc&init=true&date=false",update_url:"/php/update_cp.php?name=txffc"});
    }else if(name=="QQ分分彩"){
       this.navCtrl.push(OpenPage,{title:"QQ分分彩",get_url:"/php/get_cp.php?name=qqffc&init=true&date=false",update_url:"/php/update_cp.php?name=qqffc"});
    }else if(name=="北京PK10"){
       this.navCtrl.push(OpenPage,{title:"北京PK10",get_url:"/php/get_pk10.php?name=pk10&init=true&date=false",update_url:"/php/update_pk10.php?name=pk10"});
    }else if(name=="极速分分彩"){
       this.navCtrl.push(OpenPage,{title:"极速分分彩",get_url:"/php/get_cp.php?name=jsffc&init=true&date=false",update_url:"/php/update_cp.php?name=jsffc"});
    }
    
  }

}
