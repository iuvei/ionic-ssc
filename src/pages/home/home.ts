import { Component, ViewChild} from '@angular/core';
import { NavController} from 'ionic-angular';
import { AppServiceProvider } from '../../providers/app-service/app-service';
import { OpenPage } from'.././open/open';
import { ClassPage } from'.././class/class';
import { Slides } from 'ionic-angular';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
  
})

export class HomePage {
  @ViewChild("Slides") slides: Slides;
  constructor(public navCtrl: NavController,public app:AppServiceProvider){
      
  }
  ssc(){
   this.navCtrl.push(ClassPage,{name:'ssc'});
  }
  k3(){
   this.navCtrl.push(ClassPage,{name:'k3'});
  }
  nav(){
    this.navCtrl.push(OpenPage,{title:"重庆时时彩",get_url:"/php/get_cqssc.php",update_url:"/php/update_cqssc.php?"});
  }
  nav1(){
    this.navCtrl.push(OpenPage,{title:"天津时时彩",get_url:"/php/get_tjssc.php",update_url:"/php/update_tjssc.php?"});
  }
  slides_end(){
    this.slides.startAutoplay();
  }
  // gopage2(){
  //   this.navCtrl.parent().select(1);
  // }
}