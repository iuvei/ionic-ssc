import { Component,ViewChild} from '@angular/core';
import {IonicPage, NavController ,NavParams } from 'ionic-angular';
import { AppServiceProvider } from '../../providers/app-service/app-service';
@IonicPage()
@Component({
  selector: 'page-open',
  templateUrl: 'open.html',
})
export class OpenPage {
 @ViewChild("content") content;
  public datas = [];
  public state = true;
  public state1 = true;
  public title:string;
  public get_url:string;
  public update_url:string;
  public newtime:any = { hour:"",minute:"",second:"" };
  public timer:any;
  public date_select;
  public dates=[];
  public object;
  public object2;
  public buff = false;
  constructor(public navCtrl: NavController,public app:AppServiceProvider,public navParams:NavParams,
 
  ){
    this.title = this.navParams.get("title")
    this.get_url = this.navParams.get("get_url")
    this.update_url = this.navParams.get("update_url")
    if(this.navParams.get("hidden")==true){
      this.app.hidden_tabs();
    }
    this.pushdata();
      
  }
   //退出页面时
 ionViewWillUnload() {
  if(this.navParams.get("hidden")==true){
      this.app.show_tabs();
    }
   clearInterval(this.timer) ;
   console.log('关闭定时器！');
   this.buff = true;
  }
  //上拉加载
 loading(infiniteScroll){
    if(this.state==true){
       this.state=false;
       console.log(this.datas[this.datas.length-1]["date"]);
       this.app.http_get(this.update_url +"&date="+ this.datas[this.datas.length-1]["date"],"json").subscribe(data =>{
       this.state = true;
       infiniteScroll.complete();
       if(data.msg!=""){
            this.split_data(data.msg);
      }else{
        this.object2 = infiniteScroll;
        infiniteScroll.enable(false);
        console.log("没有更多数据了！");
      }
     },error=>{
       infiniteScroll.complete();
       infiniteScroll.enable(false);
       setTimeout(()=>{
        infiniteScroll.enable(true);
        this.state = true;
       },3000)
      })
    }
  }
  pushdata(obj?){
      if(this.state1==true){
         this.state1=false;
         this.app.http_get(this.get_url,"json").subscribe(data => {
               this.state1 = true;
               if(this.object) this.object.dismiss();
               this.datas = [];
               this.split_data(data.msg);
               let times = data.dates.split("|");
               this.dates = [];
               for(let i=0;i<times.length;i++){
                 this.dates.push(times[i]);
               }
               this.date_select = this.dates[0];
              let opentime = this.title=="北京PK10"? new Date((this.datas[0]["date"].substr(0,4)+"/" + this.datas[0]["date"].substr(4,2)+"/" + this.datas[0]["date"].substr(6,2)+"/"+ "   " + this.datas[0]["date3"]).replace(/-/g, "/")) : new Date((this.datas[0]["date2"] + "   " + this.datas[0]["date3"]).replace(/-/g, "/"));
              console.log("open_time:" + opentime);
              let new_open_time;
          
              if(data.name=="cqssc"){
              if(opentime.getHours()>=1 && opentime.getHours()<10 && opentime.getMinutes()>=55){
                 new_open_time = new Date(opentime.getFullYear(),opentime.getMonth(),opentime.getDate(),10,1,59)
               }else if(opentime.getHours()>=10 && opentime.getHours()<22){
                 if(opentime.getMinutes()>=50){
                     let arr = opentime.getMinutes().toString().split("")[1];
                     new_open_time = new Date(opentime.getFullYear(),opentime.getMonth(),opentime.getDate(),opentime.getHours()+1,Number(arr),opentime.getSeconds()+20)
                 }else{
                     new_open_time = new Date(opentime.getFullYear(),opentime.getMonth(),opentime.getDate(),opentime.getHours(),opentime.getMinutes()+10,opentime.getSeconds()+20)
                 }
               }else if(opentime.getHours()>=22 || opentime.getHours()<2){
                     new_open_time = new Date(opentime.getFullYear(),opentime.getMonth(),opentime.getDate(),opentime.getHours(),opentime.getMinutes()+5,opentime.getSeconds()+20)
               }
               console.log("newtime:" + new_open_time);
              }else if(data.name=="tjssc"){
                if(opentime.getHours()>=22 && opentime.getMinutes()>=55 || opentime.getHours()>=23){
                   new_open_time = new Date(opentime.getFullYear(),opentime.getMonth(),opentime.getDate()+1,9,11,55)
                }else if(opentime.getHours()>=9 && opentime.getHours()<=22){
                     if(opentime.getMinutes()>=50){
                        let arr = opentime.getMinutes().toString().split("")[1];
                        new_open_time = new Date(opentime.getFullYear(),opentime.getMonth(),opentime.getDate(),opentime.getHours()+1,Number(arr),opentime.getSeconds()+20)
                     }else{
                       new_open_time = new Date(opentime.getFullYear(),opentime.getMonth(),opentime.getDate(),opentime.getHours(),opentime.getMinutes()+10,opentime.getSeconds()+20)
                     }
                }
               console.log("newtime:" + new_open_time);
              }else if(data.name=="jsk3"){
                if(opentime.getHours()>=22 && opentime.getMinutes()>=5){
                   new_open_time = new Date(opentime.getFullYear(),opentime.getMonth(),opentime.getDate()+1,8,41,55);
                }else if(opentime.getHours()>=8 && opentime.getHours()<=22){
                     if(opentime.getMinutes()>=50){
                        let arr = opentime.getMinutes().toString().split("")[1];
                        new_open_time = new Date(opentime.getFullYear(),opentime.getMonth(),opentime.getDate(),opentime.getHours()+1,Number(arr),opentime.getSeconds()+20);
                     }else{
                       new_open_time = new Date(opentime.getFullYear(),opentime.getMonth(),opentime.getDate(),opentime.getHours(),opentime.getMinutes()+10,opentime.getSeconds()+20);
                     }
                 }
              }else if(data.name=="jxk3"){
                if(opentime.getHours()>=22 && opentime.getMinutes()>=50){
                   new_open_time = new Date(opentime.getFullYear(),opentime.getMonth(),opentime.getDate()+1,9,7,55);
                }else if(opentime.getHours()>=9 && opentime.getHours()<=22){
                     if(opentime.getMinutes()>=50){
                        let arr = opentime.getMinutes().toString().split("")[1];
                        new_open_time = new Date(opentime.getFullYear(),opentime.getMonth(),opentime.getDate(),opentime.getHours()+1,Number(arr),opentime.getSeconds()+20);
                     }else{
                       new_open_time = new Date(opentime.getFullYear(),opentime.getMonth(),opentime.getDate(),opentime.getHours(),opentime.getMinutes()+10,opentime.getSeconds()+20);
                     }
                 }
              }else if(data.name=="gxk3"){
                if(opentime.getHours()>=22 && opentime.getMinutes()>=25){
                   new_open_time = new Date(opentime.getFullYear(),opentime.getMonth(),opentime.getDate()+1,9,39,55);
                }else if(opentime.getHours()>=9 && opentime.getHours()<=22){
                     if(opentime.getMinutes()>=50){
                        let arr = opentime.getMinutes().toString().split("")[1];
                        new_open_time = new Date(opentime.getFullYear(),opentime.getMonth(),opentime.getDate(),opentime.getHours()+1,Number(arr),opentime.getSeconds()+20);
                     }else{
                       new_open_time = new Date(opentime.getFullYear(),opentime.getMonth(),opentime.getDate(),opentime.getHours(),opentime.getMinutes()+10,opentime.getSeconds()+20);
                     }
                 }
              }else if(data.name=="shk3"){
                if(opentime.getHours()>=22 && opentime.getMinutes()>=25){
                   new_open_time = new Date(opentime.getFullYear(),opentime.getMonth(),opentime.getDate()+1,9,0,55);
                }else if(opentime.getHours()>=8 && opentime.getHours()<=22){
                     if(opentime.getMinutes()>=50){
                        let arr = opentime.getMinutes().toString().split("")[1];
                        new_open_time = new Date(opentime.getFullYear(),opentime.getMonth(),opentime.getDate(),opentime.getHours()+1,Number(arr),opentime.getSeconds()+20);
                     }else{
                       new_open_time = new Date(opentime.getFullYear(),opentime.getMonth(),opentime.getDate(),opentime.getHours(),opentime.getMinutes()+10,opentime.getSeconds()+20);
                     }
                 }
              }else if(data.name=="ahk3"){
                if(opentime.getHours()>=22 && opentime.getMinutes()>=0 || opentime.getHours()>=21 && opentime.getMinutes()>=58){
                   new_open_time = new Date(opentime.getFullYear(),opentime.getMonth(),opentime.getDate()+1,8,51,55);
                }else if(opentime.getHours()>=8 && opentime.getHours()<=22){
                     if(opentime.getMinutes()>=50){
                        let arr = opentime.getMinutes().toString().split("")[1];
                        new_open_time = new Date(opentime.getFullYear(),opentime.getMonth(),opentime.getDate(),opentime.getHours()+1,Number(arr),opentime.getSeconds()+20);
                     }else{
                       new_open_time = new Date(opentime.getFullYear(),opentime.getMonth(),opentime.getDate(),opentime.getHours(),opentime.getMinutes()+10,opentime.getSeconds()+20);
                     }
                 }
              }else if(data.name=="hebeik3"){
                if(opentime.getHours()>=22 && opentime.getMinutes()>=0 || opentime.getHours()>=21 && opentime.getMinutes()>=57){
                   new_open_time = new Date(opentime.getFullYear(),opentime.getMonth(),opentime.getDate()+1,8,41,55);
                }else if(opentime.getHours()>=8 && opentime.getHours()<=22){
                     if(opentime.getMinutes()>=50){
                        let arr = opentime.getMinutes().toString().split("")[1];
                        new_open_time = new Date(opentime.getFullYear(),opentime.getMonth(),opentime.getDate(),opentime.getHours()+1,Number(arr),opentime.getSeconds()+20);
                     }else{
                       new_open_time = new Date(opentime.getFullYear(),opentime.getMonth(),opentime.getDate(),opentime.getHours(),opentime.getMinutes()+10,opentime.getSeconds()+20);
                     }
                 }
              }else if(data.name=="hubeik3"){
                if(opentime.getHours()>=22 && opentime.getMinutes()>=0 || opentime.getHours()>=21 && opentime.getMinutes()>=57){
                   new_open_time = new Date(opentime.getFullYear(),opentime.getMonth(),opentime.getDate()+1,9,11,55);
                }else if(opentime.getHours()>=9 && opentime.getHours()<=22){
                     if(opentime.getMinutes()>=50){
                        let arr = opentime.getMinutes().toString().split("")[1];
                        new_open_time = new Date(opentime.getFullYear(),opentime.getMonth(),opentime.getDate(),opentime.getHours()+1,Number(arr),opentime.getSeconds()+20);
                     }else{
                       new_open_time = new Date(opentime.getFullYear(),opentime.getMonth(),opentime.getDate(),opentime.getHours(),opentime.getMinutes()+10,opentime.getSeconds()+20);
                     }
                 }
              }else if(data.name=="bjssc"){
                if(opentime.getHours()>=23 && opentime.getMinutes()>=55 || opentime.getHours()<9){
                   new_open_time = new Date(opentime.getFullYear(),opentime.getMonth(),opentime.getDate()+1,9,6,20)
                }else if(opentime.getHours()>=9 && opentime.getHours()<=23){
                       new_open_time = new Date(opentime.getFullYear(),opentime.getMonth(),opentime.getDate(),opentime.getHours(),opentime.getMinutes()+5,opentime.getSeconds()+20)
                }
               console.log("newtime:" + new_open_time);
              }else if(data.name=="twssc"){
                if(opentime.getHours()>=23 && opentime.getMinutes()>=55 || opentime.getHours()<7){
                   new_open_time = new Date(opentime.getFullYear(),opentime.getMonth(),opentime.getDate()+1,7,6,20)
                }else if(opentime.getHours()>=7 && opentime.getHours()<=23){
                       new_open_time = new Date(opentime.getFullYear(),opentime.getMonth(),opentime.getDate(),opentime.getHours(),opentime.getMinutes()+5,opentime.getSeconds()+20)
                }
               console.log("newtime:" + new_open_time);
              }else if(data.name=="txffc" || data.name=="jsffc" || data.name=="qqffc" ){
                new_open_time = new Date(opentime.getFullYear(),opentime.getMonth(),opentime.getDate(),opentime.getHours(),opentime.getMinutes()+2,opentime.getSeconds())
                console.log("newtime:" + new_open_time);
              }else if(data.name=="pk10"){
                if(opentime.getHours()>=23 && opentime.getMinutes()>=55 || opentime.getHours()<9){
                   new_open_time = new Date(opentime.getFullYear(),opentime.getMonth(),opentime.getDate()+1,9,6,20)
                }else if(opentime.getHours()>=9 && opentime.getHours()<=23){
                       new_open_time = new Date(opentime.getFullYear(),opentime.getMonth(),opentime.getDate(),opentime.getHours(),opentime.getMinutes()+5,opentime.getSeconds()+20)
                }
                console.log("newtime:" + new_open_time);
              }
               let time = this.app.back_date(new_open_time, new Date(data.date)); 
            
               if(time.second>0 || time.minute>0 || time.hour>0) {
                  if(this.buff) return;
                  console.log("进入time");
                  this.newtime.hour = time.hour;
                  this.newtime.second = time.second;
                  this.newtime.minute = time.minute;
                  clearInterval(this.timer);
                  this.timer = setInterval(()=>this.count_down(),1000);
               }else{
                  if(this.buff) return;
                  console.log("进入time1");
                  this.newtime.hour = "00";
                  this.newtime.second = "00";
                  this.newtime.minute = "00";
                  clearInterval(this.timer);
                  this.timer = setInterval(()=>this.count_down(),1000);
               }
        
            },error=>{
               this.state1 = true;
               if(this.object) this.object.dismiss();
               clearInterval(this.timer);
               this.timer = setInterval(()=>this.count_down(),1000);
               console.log("加载失败，请检查网络环境！");
            });
       }
    }
Change(e){
  if(this.content.scrollTop==0){
     this.object=this.app.Loading("刷新中...");
     this.pushdata(); 
     console.log("正在刷新...");
    }
  }
split_data(data){
        let arr = data.split("*");
        console.log("arr:" + arr.length);
    for(let i=0; i<arr.length; i++){
        let item = arr[i].split("_")
        console.log( "item:" + item.length);
        let json={}
        json["date"] = item[0];
        if(this.title=="北京时时彩"){
          json["date1"] = item[0].substr(4,2);
        }else if(this.title=="北京PK10"){
          json["date1"] = item[0].substr(8,14);
        }else{
          json["date1"] = item[0].substr(11,14);
        }
       
        json["num"]  = item[1].split(",");
        let num:any = 0;
        for(let j=0;j<json["num"].length;j++){
              num += Number(json["num"][j]);
        } 
        if(num<10){
           num = "0" + num;
        }
          json["num3"]=num;
          this.title=="北京PK10"?json["date2"] = item[2].substr(0,8):json["date2"] = item[2].substr(0,10);
          this.title=="北京PK10"?json["date3"] = item[2]:json["date3"] = item[2].substr(11,19);
          this.datas.push(json);
     }
}

count_down(){
   if(this.newtime.second=="00" && this.newtime.minute=="00" && this.newtime.hour =="00"){
      clearInterval(this.timer);
      this.pushdata();
      return;
   }
    if(this.newtime.second=="00" && Number(this.newtime.hour)>0 || this.newtime.second=="00" && Number(this.newtime.minute)>0){
       this.newtime.second = "59";

    if(this.newtime.minute=="00" && Number(this.newtime.hour)>0){
       this.newtime.minute = "59";
    if(Number(this.newtime.hour)<11 && Number(this.newtime.hour)>0){
       this.newtime.hour =  "0" + (Number(this.newtime.hour) - 1);
       }else{
        this.newtime.hour = Number(this.newtime.hour) - 1;
       }
      }else if(Number(this.newtime.minute)<11 && Number(this.newtime.minute)>0){
            this.newtime.minute = "0" + (Number(this.newtime.minute) - 1);
      }else{
            this.newtime.minute = Number(this.newtime.minute) - 1;
            } 
    }else{
      if(Number(this.newtime.second)<11 && Number(this.newtime.second)>0){
          this.newtime.second = "0" + (Number(this.newtime.second) - 1);
      }else{
          this.newtime.second = Number(this.newtime.second) - 1;
      }
    }
  }

select_event(e){
  let obj=this.app.Loading();
  let name="";
  switch(this.title){
   case "重庆时时彩":name = "cqssc";
   break;
   case "天津时时彩":name = "tjssc";
   break;
   case "江苏快三":name = "jsk3";
   break;
   case "上海快三":name = "shk3";
   break;
   case "广西快三":name = "gxk3";
   break;
   case "北京快三":name = "bjk3";
   break;
   case "安徽快三":name = "ahk3";
   break;
   case "河北快三":name = "hebeik3";
   break;
   case "湖北快三":name = "hubeik3";
   break;
   case "江西快三":name = "jxk3";
   break;
   case "北京时时彩":name = "bjssc";
   break;
   case "台湾五分彩":name = "twssc";
   break;
   case "腾讯分分彩":name = "txffc";
   break;
   case "QQ分分彩":name = "qqffc";
   break;
   case "北京PK10":name = "pk10";
   break;
   case "极速分分彩":name = "jsffc";
   break;
  }
  let url = name == "pk10"? '/php/get_pk10.php?': '/php/get_cp.php?';
  this.app.http_get('/php/get_pk10.php?' + 'name=' + name + '&init=false' + '&date=' + this.date_select ,"json").subscribe(
    data=>{
      obj.dismiss();
      this.datas=[];
      this.split_data(data.msg);
      if(this.object2) this.object2.enable(true);
    }
  )
  console.log(e);
}
today(){
  if(this.date_select != this.dates[0]){
     this.date_select = this.dates[0];
     this.select_event(this.dates[0]);
    
  }
}
yesterday(){
  if(this.date_select != this.dates[1]){
     this.date_select = this.dates[1];
     this.select_event(this.dates[1]);
   }
 }
}
