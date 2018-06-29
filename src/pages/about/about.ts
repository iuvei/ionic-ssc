import { Component, } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AppServiceProvider } from '../../providers/app-service/app-service';
import { Open2Page } from '../../pages/open2/open2';
import { OpenPage } from '../../pages/open/open';
import { Insomnia } from '@ionic-native/insomnia';
@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {
  public datas: any = { name: "", date: "00", hour: "00", minute: "00", second: "00", a: "暂无", b: "暂无", c: "暂无", d: "暂无", e: "暂无", f: "暂无" };
  public title;
  public timer;
  public enable = false;
  public state = 0;
  public new_text = "";
  public buff = false;
  constructor(
    public navCtrl: NavController,
    public app: AppServiceProvider,
    public params: NavParams,
    private insomnia: Insomnia,
  ) {
    this.insomnia.keepAwake().then(() => console.log('success'), () => console.log('error'));
    this.title = this.params.get("title");
    this.datas.name = this.title;
    this.new_text = this.title != "重庆时时彩" && this.title != "天津时时彩" && this.title != "腾讯分分彩" && this.title != "QQ分分彩" ? "三军号码" : "五星胆码";
    this.Change();
  }
  ionViewWillUnload() {
    this.insomnia.allowSleepAgain().then(() => console.log('success'), () => console.log('error'));
    clearInterval(this.timer);
    console.log('关闭定时器！');
    this.buff = true;
  }
  PushOpen(name) {
    //  e.stopPropagation();
    let data;
    switch (name) {
      case "重庆时时彩": data = { title: "重庆时时彩", get_url: "/php/get_cp.php?name=cqssc&init=true&date=false", update_url: "/php/update_cp.php?name=cqssc", hidden: true };
        break;
      case "天津时时彩": data = { title: "天津时时彩", get_url: "/php/get_cp.php?name=tjssc&init=true&date=false", update_url: "/php/update_cp.php?name=tjssc", hidden: true };
        break;
      case "江苏快三彩": data = { title: "江苏快三", get_url: "/php/get_cp.php?name=jsk3&init=true&date=false", update_url: "/php/update_cp.php?name=jsk3", hidden: true };
        break;
      case "安徽快三彩": data = { title: "安徽快三", get_url: "/php/get_cp.php?name=ahk3&init=true&date=false", update_url: "/php/update_cp.php?name=ahk3", hidden: true };
        break;
      case "湖北快三彩": data = { title: "湖北快三", get_url: "/php/get_cp.php?name=hubeik3&init=true&date=false", update_url: "/php/update_cp.php?name=hubeik3", hidden: true };
        break;
      case "上海快三彩": data = { title: "上海快三", get_url: "/php/get_cp.php?name=shk3&init=true&date=false", update_url: "/php/update_cp.php?name=shk3", hidden: true };
        break;
      case "河北快三彩": data = { title: "河北快三", get_url: "/php/get_cp.php?name=hebeik3&init=true&date=false", update_url: "/php/update_cp.php?name=hebeik3", hidden: true };
        break;
      case "广西快三彩": data = { title: "广西快三", get_url: "/php/get_cp.php?name=gxk3&init=true&date=false", update_url: "/php/update_cp.php?name=gxk3", hidden: true };
        break;
      case "江西快三彩": data = { title: "江西快三", get_url: "/php/get_cp.php?name=jxk3&init=true&date=false", update_url: "/php/update_cp.php?name=jxk3", hidden: true };
        break;
      case "北京时时彩": data = { title: "北京时时彩", get_url: "/php/get_cp.php?name=bjssc&init=true&date=false", update_url: "/php/update_cp.php?name=bjssc", hidden: true };
        break;
      case "台湾五分彩": data = { title: "台湾五分彩", get_url: "/php/get_cp.php?name=twssc&init=true&date=false", update_url: "/php/update_cp.php?name=twssc", hidden: true };
        break;
      case "腾讯分分彩": data = { title: "腾讯分分彩", get_url: "/php/get_cp.php?name=txffc&init=true&date=false", update_url: "/php/update_cp.php?name=txffc", hidden: true };
        break;
      case "QQ分分彩": data = { title: "QQ分分彩", get_url: "/php/get_cp.php?name=qqffc&init=true&date=false", update_url: "/php/update_cp.php?name=qqffc", hidden: true };
        break;
      case "北京PK10": data = { title: "北京PK10", get_url: "/php/get_pk10.php?name=pk10&init=true&date=false", update_url: "/php/update_pk10.php?name=pk10", hidden: true };
        break;
      case "极速分分彩": data = { title: "极速分分彩", get_url: "/php/get_cp.php?name=jsffc&init=true&date=false", update_url: "/php/update_cp.php?name=jsffc", hidden: true };
        break;
    }
    this.navCtrl.push(OpenPage, data)
    //  return false;
  }
  pushdata(url: string, obj?) {
    this.app.http_get(url, "json").subscribe(data => {
      console.log(data)
      let arr_num;
      if (data.name == "pk10") {
        arr_num = data.push_nums.split("&");
        this.datas.a = arr_num[0];
        this.datas.b = arr_num[1];
        this.datas.c = arr_num[2];
        this.datas.d = arr_num[3];
        if (arr_num[4] == "0") this.datas.e = "第五名";
        if (arr_num[4] == "1") this.datas.e = "第六名";
        if (arr_num[4] == "2") this.datas.e = "第二名";
        if (arr_num[4] == "3") this.datas.e = "第九名";
        this.datas.date = this.sub_date(this.datas.name, data.open_issue.substr(8, 14));
        this.datas.num = data.open_num;
        console.log("num:" + this.datas.num)
        console.log((data.open_issue.substr(0, 4) + "/" + data.open_issue.substr(4, 2) + "/" + data.open_issue.substr(6, 2) + "/" + "   " + data.open_date).replace(/-/g, "/"))
        let opentime = new Date((data.open_issue.substr(0, 4) + "/" + data.open_issue.substr(4, 2) + "/" + data.open_issue.substr(6, 2) + "/" + "   " + data.open_date).replace(/-/g, "/"));
        console.log("opentime1:" + opentime);
        let new_open_time: any;
        if (opentime.getHours() >= 23 && opentime.getMinutes() >= 55 || opentime.getHours() < 9) {
          new_open_time = new Date(opentime.getFullYear(), opentime.getMonth(), opentime.getDate() + 1, 9, 6, 20)
        } else if (opentime.getHours() >= 9 && opentime.getHours() <= 23) {
          new_open_time = new Date(opentime.getFullYear(), opentime.getMonth(), opentime.getDate(), opentime.getHours(), opentime.getMinutes() + 5, opentime.getSeconds() + 20)
        }
        console.log("newtime:" + new_open_time);
        let time = this.app.back_date(new_open_time, new Date(data.nowtime));
        console.log("time:" + time.hour);
        if (time.second > 0 || time.minute > 0 || time.hour > 0) {
          if (this.buff) return;
          console.log("时间>0");
          this.datas.hour = time.hour;
          this.datas.second = time.second;
          this.datas.minute = time.minute;
          clearInterval(this.timer);
          this.timer = setInterval(() => this.count_down(this.datas), 1000);
        } else {
          if (this.buff) return;
          console.log("时间=0");
          this.datas.hour = "00";
          this.datas.second = "00";
          this.datas.minute = "00";
          clearInterval(this.timer);
          this.timer = setInterval(() => this.count_down(this.datas), 1000);
        }

      } else {
        if (data.name != "cqssc" && data.name != "tjssc" && data.name != "bjssc" && data.name != "twssc" && data.name != "txffc" && data.name != "qqffc"&& data.name != "jsffc") {
          if (!data.push_num) data.push_num = "暂无";
          if (!data.push_nums) data.push_nums = "暂无";
          this.datas.e = data.push_num;
        } else {
          if (!data.a) data.a = "暂无";
          if (!data.b) data.b = "暂无";
          if (!data.c) data.c = "暂无";
          if (!data.d) data.d = "暂无";
          if (!data.e) data.e = "暂无";
          if (!data.f) data.f = "暂无";
          this.datas.a = data.a;
          this.datas.b = data.b;
          this.datas.c = data.c;
          this.datas.d = data.d;
          this.datas.e = data.e;
          this.datas.f = data.f;
        }
        this.datas.push_nums = data.push_nums;
        if (this.get_string_len(data.push_nums) > 0) {
          this.datas["one_num"] = data.push_nums.substr(0, 1)

          this.datas["one_text"] = (data.name == "cqssc" || data.name == "tjssc" || data.name == "bjssc" || data.name == "twssc" || data.name == "txffc" || data.name == "qqffc" || data.name == "jsffc") ? "五星一码" : "三军一码";
        }
        if (this.get_string_len(data.push_nums) > 1) {
          this.datas["two_num"] = data.push_nums.substr(0, 2)
          this.datas["two_text"] = (data.name == "cqssc" || data.name == "tjssc" || data.name == "bjssc" || data.name == "twssc" || data.name == "txffc" || data.name == "qqffc" || data.name == "jsffc") ? "五星二码" : "三军二码";
        }
        if (this.get_string_len(data.push_nums) > 2) {
          this.datas["three_num"] = data.push_nums.substr(0, 3)

          this.datas["three_text"] = (data.name == "cqssc" || data.name == "tjssc" || data.name == "bjssc" || data.name == "twssc" || data.name == "txffc" || data.name == "qqffc" || data.name == "jsffc") ? "五星三码" : "三军三码";
        }
        if (data.name != "cqssc" && data.name != "tjssc" && data.name != "bjssc" && data.name != "twssc" && data.name != "txffc" && data.name != "qqffc" &&  data.name != "jsffc") {
          if (this.get_string_len(data.push_nums) > 3) {
            this.datas["three_num2"] = data.push_nums.substr(3, 3)
          }
        }
        if (data.name == "cqssc" || data.name == "tjssc" || data.name == "bjssc" || data.name == "twssc" || data.name == "txffc" || data.name == "qqffc" || data.name == "jsffc") {
          if (this.get_string_len(data.push_nums) > 3) {
            this.datas["four_num"] = data.push_nums.substr(0, 4)
            this.datas["four_text"] = (data.name == "cqssc" || data.name == "tjssc" || data.name == "bjssc" || data.name == "twssc" || data.name == "txffc" || data.name == "qqffc" || data.name == "jsffc") ? "五星四码" : "三军四码";
          }
          if (this.get_string_len(data.push_nums) > 4) {
            this.datas["five_num"] = data.push_nums.substr(0, 5)
            this.datas["five_text"] = (data.name == "cqssc" || data.name == "tjssc" || data.name == "bjssc" || data.name == "twssc" || data.name == "txffc" || data.name == "qqffc" || data.name == "jsffc") ? "五星五码" : "三军五码";
          }
          if (this.get_string_len(data.push_nums) > 5) {
            this.datas["six_num"] = data.push_nums.substr(0, 6)
            this.datas["six_text"] = (data.name == "cqssc" || data.name == "tjssc" || data.name == "bjssc" || data.name == "twssc" || data.name == "txffc" || data.name == "qqffc" || data.name == "jsffc") ? "五星六码" : "三军六码";
          }
          if (this.get_string_len(data.push_nums) > 6) {
            this.datas["seven_num"] = data.push_nums.substr(0, 7)
            this.datas["seven_text"] = (data.name == "cqssc" || data.name == "tjssc" || data.name == "bjssc" || data.name == "twssc" || data.name == "txffc" || data.name == "qqffc" || data.name == "jsffc") ? "五星七码" : "三军七码";
          }
          if (this.get_string_len(data.push_nums) > 7) {
            this.datas["eight_num"] = data.push_nums.substr(0, 8)
            this.datas["eight_text"] = (data.name == "cqssc" || data.name == "tjssc" || data.name == "bjssc" || data.name == "twssc" || data.name == "txffc" || data.name == "qqffc" || data.name == "jsffc") ? "五星八码" : "三军八码";
          }
          if (this.get_string_len(data.push_nums) > 8) {
            this.datas["nine_num"] = data.push_nums.substr(0, 9)
            let str = "0123456789";
            for (let j = 0; j < 10; j++) {
              if (this.datas["nine_num"].indexOf(str.substr(j, 1)) < 0) {
                this.datas["nine_num2"] = str.substr(j, 1);
                break;
              }
            }
            this.datas["nine_text"] = (data.name == "cqssc" || data.name == "tjssc" || data.name == "bjssc" || data.name == "twssc" || data.name == "txffc" || data.name == "qqffc" || data.name == "jsffc") ? "五星九码" : "三军五码";
          }
        }

        this.datas["num"] = data.num;
        this.datas["num"] = this.datas["num"].replace(/,/g, " ");
        this.datas.date = this.sub_date(this.datas.name, data.opentime);
        console.log("time3:" + data.lotterytime)
        let opentime = new Date(data.lotterytime);
        console.log("opentime1:" + opentime);
        let new_open_time: any;

        if (data.name == "cqssc") {
          if (opentime.getHours() >= 1 && opentime.getHours() < 10 && opentime.getMinutes() >= 55) {
            new_open_time = new Date(opentime.getFullYear(), opentime.getMonth(), opentime.getDate(), 10, 1, 59);
          } else if (opentime.getHours() >= 10 && opentime.getHours() < 22) {
            if (opentime.getMinutes() >= 50) {
              let arr = opentime.getMinutes().toString().split("")[1];
              new_open_time = new Date(opentime.getFullYear(), opentime.getMonth(), opentime.getDate(), opentime.getHours() + 1, Number(arr), opentime.getSeconds() + 20);
            } else {
              new_open_time = new Date(opentime.getFullYear(), opentime.getMonth(), opentime.getDate(), opentime.getHours(), opentime.getMinutes() + 10, opentime.getSeconds() + 20);
            }
          } else if (opentime.getHours() >= 22 || opentime.getHours() < 2) {
            new_open_time = new Date(opentime.getFullYear(), opentime.getMonth(), opentime.getDate(), opentime.getHours(), opentime.getMinutes() + 5, opentime.getSeconds() + 20);
          }
        } else if (data.name == "tjssc") {
          if (opentime.getHours() >= 22 && opentime.getMinutes() >= 55 || opentime.getHours() >= 23) {
            new_open_time = new Date(opentime.getFullYear(), opentime.getMonth(), opentime.getDate() + 1, 9, 11, 55);
          } else if (opentime.getHours() >= 9 && opentime.getHours() <= 22) {
            if (opentime.getMinutes() >= 50) {
              let arr = opentime.getMinutes().toString().split("")[1];
              new_open_time = new Date(opentime.getFullYear(), opentime.getMonth(), opentime.getDate(), opentime.getHours() + 1, Number(arr), opentime.getSeconds() + 20);
            } else {
              new_open_time = new Date(opentime.getFullYear(), opentime.getMonth(), opentime.getDate(), opentime.getHours(), opentime.getMinutes() + 10, opentime.getSeconds() + 20);
            }
          }
        } else if (data.name == "jsk3") {
          if (opentime.getHours() >= 22 && opentime.getMinutes() >= 5) {
            new_open_time = new Date(opentime.getFullYear(), opentime.getMonth(), opentime.getDate() + 1, 8, 41, 55);
          } else if (opentime.getHours() >= 8 && opentime.getHours() <= 22) {
            if (opentime.getMinutes() >= 50) {
              let arr = opentime.getMinutes().toString().split("")[1];
              new_open_time = new Date(opentime.getFullYear(), opentime.getMonth(), opentime.getDate(), opentime.getHours() + 1, Number(arr), opentime.getSeconds() + 20);
            } else {
              new_open_time = new Date(opentime.getFullYear(), opentime.getMonth(), opentime.getDate(), opentime.getHours(), opentime.getMinutes() + 10, opentime.getSeconds() + 20);
            }
          }
        } else if (data.name == "jxk3") {
          if (opentime.getHours() >= 22 && opentime.getMinutes() >= 50) {
            new_open_time = new Date(opentime.getFullYear(), opentime.getMonth(), opentime.getDate() + 1, 9, 7, 55);
          } else if (opentime.getHours() >= 9 && opentime.getHours() <= 22) {
            if (opentime.getMinutes() >= 50) {
              let arr = opentime.getMinutes().toString().split("")[1];
              new_open_time = new Date(opentime.getFullYear(), opentime.getMonth(), opentime.getDate(), opentime.getHours() + 1, Number(arr), opentime.getSeconds() + 20);
            } else {
              new_open_time = new Date(opentime.getFullYear(), opentime.getMonth(), opentime.getDate(), opentime.getHours(), opentime.getMinutes() + 10, opentime.getSeconds() + 20);
            }
          }
        } else if (data.name == "gxk3") {
          if (opentime.getHours() >= 22 && opentime.getMinutes() >= 25) {
            new_open_time = new Date(opentime.getFullYear(), opentime.getMonth(), opentime.getDate() + 1, 9, 39, 55);
          } else if (opentime.getHours() >= 9 && opentime.getHours() <= 22) {
            if (opentime.getMinutes() >= 50) {
              let arr = opentime.getMinutes().toString().split("")[1];
              new_open_time = new Date(opentime.getFullYear(), opentime.getMonth(), opentime.getDate(), opentime.getHours() + 1, Number(arr), opentime.getSeconds() + 20);
            } else {
              new_open_time = new Date(opentime.getFullYear(), opentime.getMonth(), opentime.getDate(), opentime.getHours(), opentime.getMinutes() + 10, opentime.getSeconds() + 20);
            }
          }
        } else if (data.name == "shk3") {
          if (opentime.getHours() >= 22 && opentime.getMinutes() >= 25) {
            new_open_time = new Date(opentime.getFullYear(), opentime.getMonth(), opentime.getDate() + 1, 9, 0, 55);
          } else if (opentime.getHours() >= 8 && opentime.getHours() <= 22) {
            if (opentime.getMinutes() >= 50) {
              let arr = opentime.getMinutes().toString().split("")[1];
              new_open_time = new Date(opentime.getFullYear(), opentime.getMonth(), opentime.getDate(), opentime.getHours() + 1, Number(arr), opentime.getSeconds() + 20);
            } else {
              new_open_time = new Date(opentime.getFullYear(), opentime.getMonth(), opentime.getDate(), opentime.getHours(), opentime.getMinutes() + 10, opentime.getSeconds() + 20);
            }
          }
        } else if (data.name == "ahk3") {
          if (opentime.getHours() >= 22 && opentime.getMinutes() >= 0 || opentime.getHours() >= 21 && opentime.getMinutes() >= 58) {
            new_open_time = new Date(opentime.getFullYear(), opentime.getMonth(), opentime.getDate() + 1, 8, 51, 55);
          } else if (opentime.getHours() >= 8 && opentime.getHours() <= 22) {
            if (opentime.getMinutes() >= 50) {
              let arr = opentime.getMinutes().toString().split("")[1];
              new_open_time = new Date(opentime.getFullYear(), opentime.getMonth(), opentime.getDate(), opentime.getHours() + 1, Number(arr), opentime.getSeconds() + 20);
            } else {
              new_open_time = new Date(opentime.getFullYear(), opentime.getMonth(), opentime.getDate(), opentime.getHours(), opentime.getMinutes() + 10, opentime.getSeconds() + 20);
            }
          }
        } else if (data.name == "hebeik3") {
          if (opentime.getHours() >= 22 && opentime.getMinutes() >= 0 || opentime.getHours() >= 21 && opentime.getMinutes() >= 57) {
            new_open_time = new Date(opentime.getFullYear(), opentime.getMonth(), opentime.getDate() + 1, 8, 41, 55);
          } else if (opentime.getHours() >= 8 && opentime.getHours() <= 22) {
            if (opentime.getMinutes() >= 50) {
              let arr = opentime.getMinutes().toString().split("")[1];
              new_open_time = new Date(opentime.getFullYear(), opentime.getMonth(), opentime.getDate(), opentime.getHours() + 1, Number(arr), opentime.getSeconds() + 20);
            } else {
              new_open_time = new Date(opentime.getFullYear(), opentime.getMonth(), opentime.getDate(), opentime.getHours(), opentime.getMinutes() + 10, opentime.getSeconds() + 20);
            }
          }
        } else if (data.name == "hubeik3") {
          if (opentime.getHours() >= 22 && opentime.getMinutes() >= 0 || opentime.getHours() >= 21 && opentime.getMinutes() >= 57) {
            new_open_time = new Date(opentime.getFullYear(), opentime.getMonth(), opentime.getDate() + 1, 9, 11, 55);
          } else if (opentime.getHours() >= 9 && opentime.getHours() <= 22) {
            if (opentime.getMinutes() >= 50) {
              let arr = opentime.getMinutes().toString().split("")[1];
              new_open_time = new Date(opentime.getFullYear(), opentime.getMonth(), opentime.getDate(), opentime.getHours() + 1, Number(arr), opentime.getSeconds() + 20);
            } else {
              new_open_time = new Date(opentime.getFullYear(), opentime.getMonth(), opentime.getDate(), opentime.getHours(), opentime.getMinutes() + 10, opentime.getSeconds() + 20);
            }
          }
        } else if (data.name == "bjssc") {
          if (opentime.getHours() >= 23 && opentime.getMinutes() >= 55 || opentime.getHours() < 9) {
            new_open_time = new Date(opentime.getFullYear(), opentime.getMonth(), opentime.getDate() + 1, 9, 6, 20)
          } else if (opentime.getHours() >= 9 && opentime.getHours() <= 23) {
            new_open_time = new Date(opentime.getFullYear(), opentime.getMonth(), opentime.getDate(), opentime.getHours(), opentime.getMinutes() + 5, opentime.getSeconds() + 20)
          }
          console.log("newtime:" + new_open_time);
        } else if (data.name == "twssc") {
          if (opentime.getHours() >= 23 && opentime.getMinutes() >= 55 || opentime.getHours() < 7) {
            new_open_time = new Date(opentime.getFullYear(), opentime.getMonth(), opentime.getDate() + 1, 7, 6, 20)
          } else if (opentime.getHours() >= 7 && opentime.getHours() <= 23) {
            new_open_time = new Date(opentime.getFullYear(), opentime.getMonth(), opentime.getDate(), opentime.getHours(), opentime.getMinutes() + 5, opentime.getSeconds() + 20)
          }
          console.log("newtime:" + new_open_time);
        } else if (data.name == "txffc" || data.name == "qqffc" || data.name == "jsffc") {
          new_open_time = new Date(opentime.getFullYear(), opentime.getMonth(), opentime.getDate(), opentime.getHours(), opentime.getMinutes() + 2, opentime.getSeconds())
          console.log("newtime:" + new_open_time);
        }
        let time = this.app.back_date(new_open_time, new Date(data.nowtime));
        console.log("time:" + time.hour);
        if (time.second > 0 || time.minute > 0 || time.hour > 0) {
          if (this.buff) return;
          console.log("时间>0");
          this.datas.hour = time.hour;
          this.datas.second = time.second;
          this.datas.minute = time.minute;
          clearInterval(this.timer);
          this.timer = setInterval(() => this.count_down(this.datas), 1000);
        } else {
          if (this.buff) return;
          console.log("时间=0");
          this.datas.hour = "00";
          this.datas.second = "00";
          this.datas.minute = "00";
          clearInterval(this.timer);
          this.timer = setInterval(() => this.count_down(this.datas), 1000);
        }

      }


    }, error => {
      console.log("刷新失败，请检查网络环境！")
      //  this.Change();
      return;
    });
  }
  sub_date(name, date) {
    if (name == "重庆时时彩") {
      if (Number(date.substr(13, 19)) == 120) {
        return "001";
      } else if (Number(date.substr(13, 19)) >= 9 && Number(date.substr(13, 19)) < 99) {
        return "0" + (Number(date.substr(13, 19)) + 1);
      } else if (Number(date.substr(13, 19)) < 9) {
        return "00" + (Number(date.substr(13, 19)) + 1);
      } else {
        return Number(date.substr(13, 19)) + 1;
      }
    } else if (name == "天津时时彩") {
      if (Number(date.substr(13, 19)) == 84) {
        return "001";
      } else if (Number(date.substr(13, 19)) >= 9 && Number(date.substr(13, 19)) < 99) {
        return "0" + (Number(date.substr(13, 19)) + 1);
      } else {
        return "00" + (Number(date.substr(13, 19)) + 1);
      }
    } else if (name == "江苏快三彩") {
      if (Number(date.substr(13, 19)) == 82) {
        return "001";
      } else if (Number(date.substr(13, 19)) >= 9 && Number(date.substr(13, 19)) < 99) {
        return "0" + (Number(date.substr(13, 19)) + 1);
      } else {
        return "00" + (Number(date.substr(13, 19)) + 1);
      }
    } else if (name == "湖北快三彩") {
      if (Number(date.substr(13, 19)) == 78) {
        return "001";
      } else if (Number(date.substr(13, 19)) >= 9 && Number(date.substr(13, 19)) < 99) {
        return "0" + (Number(date.substr(13, 19)) + 1);
      } else {
        return "00" + (Number(date.substr(13, 19)) + 1);
      }
    } else if (name == "上海快三彩") {
      if (Number(date.substr(13, 19)) == 82) {
        return "001";
      } else if (Number(date.substr(13, 19)) >= 9 && Number(date.substr(13, 19)) < 99) {
        return "0" + (Number(date.substr(13, 19)) + 1);
      } else {
        return "00" + (Number(date.substr(13, 19)) + 1);
      }
    } else if (name == "安徽快三彩") {
      if (Number(date.substr(13, 19)) == 80) {
        return "001";
      } else if (Number(date.substr(13, 19)) >= 9 && Number(date.substr(13, 19)) < 99) {
        return "0" + (Number(date.substr(13, 19)) + 1);
      } else {
        return "00" + (Number(date.substr(13, 19)) + 1);
      }
    } else if (name == "河北快三彩") {
      if (Number(date.substr(13, 19)) == 81) {
        return "001";
      } else if (Number(date.substr(13, 19)) >= 9 && Number(date.substr(13, 19)) < 99) {
        return "0" + (Number(date.substr(13, 19)) + 1);
      } else {
        return "00" + (Number(date.substr(13, 19)) + 1);
      }
    } else if (name == "广西快三彩") {
      if (Number(date.substr(13, 19)) == 78) {
        return "001";
      } else if (Number(date.substr(13, 19)) >= 9 && Number(date.substr(13, 19)) < 99) {
        return "0" + (Number(date.substr(13, 19)) + 1);
      } else {
        return "00" + (Number(date.substr(13, 19)) + 1);
      }
    } else if (name == "江西快三彩") {
      if (Number(date.substr(13, 19)) == 84) {
        return "001";
      } else if (Number(date.substr(13, 19)) >= 9 && Number(date.substr(13, 19)) < 99) {
        return "0" + (Number(date.substr(13, 19)) + 1);
      } else {
        return "00" + (Number(date.substr(13, 19)) + 1);
      }
    } else if (name == "北京时时彩" || name == "北京PK10") {
      return Number(date) + 1;
    } else if (name == "台湾五分彩") {
      return Number(date.substr(13, 19)) + 1;
    } else if (name == "QQ分分彩" || name == "腾讯分分彩" || name == "极速分分彩") {
      return Number(date.substr(13, 19)) + 2;
    }
  }
  count_down(obj) {
    if (obj.second == "00" && obj.minute == "00" && obj.hour == "00") {
      clearInterval(this.timer);
      this.pushdata(this.back_name(this.datas));
      return;
    }
    if (obj.second == "00" && Number(obj.hour) > 0 || obj.second == "00" && Number(obj.minute) > 0) {
      obj.second = "59";

      if (obj.minute == "00" && Number(obj.hour) > 0) {
        obj.minute = "59";
        if (Number(obj.hour) < 11 && Number(obj.hour) > 0) {
          obj.hour = "0" + (Number(obj.hour) - 1);
        } else {
          obj.hour = Number(obj.hour) - 1;
        }
      } else if (Number(obj.minute) < 11 && Number(obj.minute) > 0) {
        obj.minute = "0" + (Number(obj.minute) - 1);
      } else {
        obj.minute = Number(obj.minute) - 1;
      }
    } else {
      if (Number(obj.second) < 11 && Number(obj.second) > 0) {
        obj.second = "0" + (Number(obj.second) - 1);
      } else {
        obj.second = Number(obj.second) - 1;
      }
    }
  }
  Change(e?) {
    clearInterval(this.timer);
    this.pushdata(this.back_name(this.datas));
  }
  push_new_page(title) {
    this.navCtrl.push(Open2Page, { name: title })
  }
  back_name(obj) {
    let text;
    switch (obj.name) {
      case "重庆时时彩": text = "/php/push_ssc.php?name=cqssc";
        break;
      case "天津时时彩": text = "/php/push_ssc.php?name=tjssc";
        break;
      case "江苏快三彩": text = "/php/push_k3c.php?name=jsk3";
        break;
      case "上海快三彩": text = "/php/push_k3c.php?name=shk3";
        break;
      case "广西快三彩": text = "/php/push_k3c.php?name=gxk3";
        break;
      case "安徽快三彩": text = "/php/push_k3c.php?name=ahk3";
        break;
      case "河北快三彩": text = "/php/push_k3c.php?name=hebeik3";
        break;
      case "湖北快三彩": text = "/php/push_k3c.php?name=hubeik3";
        break;
      case "江西快三彩": text = "/php/push_k3c.php?name=jxk3";
        break;
      case "北京时时彩": text = "/php/push_ssc.php?name=bjssc";
        break;
      case "台湾五分彩": text = "/php/push_ssc.php?name=twssc";
        break;
      case "腾讯分分彩": text = "/php/push_ssc.php?name=txffc";
        break;
      case "QQ分分彩": text = "/php/push_ssc.php?name=qqffc";
        break;
      case "北京PK10": text = "/php/push_pk10.php?name=pk10";
        break;
      case "极速分分彩": text = "/php/push_ssc.php?name=jsffc";
        break;
    }
    return text;
  }
  get_string_len(str) {
    if (str == null) return 0;
    if (typeof str != "string") {
      str += "";
    }
    return str.replace(/[^\x00-\xff]/g, "ab").length;
  }
}
