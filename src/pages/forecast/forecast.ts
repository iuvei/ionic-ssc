import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AppServiceProvider } from '../../providers/app-service/app-service';
import { AboutPage } from '.././about/about';
/**
 * Generated class for the ForecastPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-forecast',
  templateUrl: 'forecast.html',
})
export class ForecastPage {
  public datas = [];
  public title = "";
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.datas = [
      { name: "重庆时时彩", img_src: "assets/icon/cqssc.png" },
      { name: "天津时时彩", img_src: "assets/icon/tjssc.png" },
      { name: "QQ分分彩", img_src: "assets/icon/qqffc.png" },
      { name: "腾讯分分彩", img_src: "assets/icon/tx_ffc.png" },
      { name: "极速分分彩", img_src: "assets/icon/jsffc.png" },
      { name: "台湾五分彩", img_src: "assets/icon/twssc.png" },
      { name: "北京PK10", img_src: "assets/icon/pk10.png" },
      { name: "江苏快三彩", img_src: "assets/icon/jiangsu.png" },
      { name: "湖北快三彩", img_src: "assets/icon/hubei.png" },
      { name: "上海快三彩", img_src: "assets/icon/shanghai.png" },
      { name: "安徽快三彩", img_src: "assets/icon/anhui.png" },
      { name: "河北快三彩", img_src: "assets/icon/hebei.png" },
      { name: "广西快三彩", img_src: "assets/icon/guangxi.png" },
      { name: "江西快三彩", img_src: "assets/icon/jiangxi.png" }
    ];
  }
  nav(name) {
    let text = "";
    this.navCtrl.push(AboutPage, { title: name });
  }
}
