import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CasePage } from'.././case/case';
/**
 * Generated class for the CaseClassPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-case-class',
  templateUrl: 'case-class.html',
})
export class CaseClassPage {
  public title;
  public cases;
  public name;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
     this.title = this.navParams.get("name");
    this.cases = this.title=="北京PK10" ? ["第五名","第六名","第二名","第九名","优先","前六345678","后六345678","前六012589","后六012589", "前七3456789","后七3456789","前七0123689","后七0123689","前八03456789","后八03456789","前八01234689","后八01234689","前九013456789","后九013456789","前九012345689","后九012345689"]:["任选3万千百5码","任选3万千十5码","任选3万千个5码","任选3千百十5码","任选3千百个5码","任选3百十个5码","任选2万千5码","任选2万百5码","任选2万十5码","任选2万个5码","任选2千百5码","任选2千十5码","任选2千个5码","任选2百十5码","任选2百个5码","任选2十个5码","定胆万位3码","定胆千位3码","定胆百位3码","定胆十位3码","定胆个位3码","一帆风顺1码","一帆风顺2码","一帆风顺3码","一帆风顺4码","一帆风顺5码","任选3万千百6码","任选3万千十6码","任选3万千个6码","任选3千百十6码","任选3千百个6码","任选3百十个6码","任选2万千6码","任选2万百6码","任选2万十6码","任选2万个6码","任选2千百6码","任选2千十6码","任选2千个6码","任选2百十6码","任选2百个6码","任选2十个6码","任选3万千百7码","任选3万千十7码","任选3万千个7码","任选3千百十7码","任选3千百个7码","任选3百十个7码","任选2万千7码","任选2万百7码","任选2万十7码","任选2万个7码","任选2千百7码","任选2千十7码","任选2千个7码","任选2百十7码","任选2百个7码","任选2十个7码","定胆个位9码","定胆十位9码","定胆百位9码","定胆千位9码","定胆万位9码","万千百3码","万千十3码","万千个3码","千百十3码","千百个3码","百十个3码","定胆万位4码","定胆千位4码","定胆百位4码","定胆十位4码","定胆个位4码","定胆万位7码","定胆千位7码","定胆百位7码","定胆十位7码","定胆个位7码","定胆万位8码","定胆千位8码","定胆百位8码","定胆十位8码","定胆个位8码","定胆万位5码","定胆千位5码","定胆百位5码","定胆十位5码","定胆个位5码","定胆万位6码","定胆千位6码","定胆百位6码","定胆十位6码","定胆个位6码","一帆风顺6码","一帆风顺7码","一帆风顺8码","一帆风顺9码","一帆风顺10码","一帆风顺1-2码","一帆风顺1-9码","一帆风顺1-10码","一帆风顺2-9码","一帆风顺2-10码","一帆风顺9-10码","好事成双3球","好事成双4球","好事成双5球","好事成双6球","和值大小","万位大小",'千位大小','百位大小','十位大小','个位大小',"和值单双","万位单双",'千位单双','百位单双','十位单双','个位单双'];
  }

  ionViewDidLoad() {
    if(this.title=="重庆时时彩") this.name = "cqssc";
    if(this.title=="天津时时彩") this.name = "tjssc";
    if(this.title=="北京时时彩") this.name = "bjssc";
    if(this.title=="台湾五分彩") this.name = "twssc";
    if(this.title=="腾讯分分彩") this.name = "txffc";
    if(this.title=="QQ分分彩")  this.name = "qqffc";
    if(this.title=="北京PK10")  this.name = "pk10";
    if(this.title=="极速分分彩")  this.name = "jsffc";
    console.log('ionViewDidLoad CaseClassPage');
  }
  nav_case_page(case_index){
   this.navCtrl.push(CasePage,{case:case_index,name:this.name});
  }
}
