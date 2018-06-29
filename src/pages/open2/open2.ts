import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AppServiceProvider } from '../../providers/app-service/app-service';
import { CaseClassPage } from '.././case-class/case-class';
/**
 * Generated class for the Open2Page page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-open2',
  templateUrl: 'open2.html',
})
export class Open2Page {
  public title;
  public datas = [];
  public state = true;
  public date_select = "";
  public dates = [];
  public object;
  public object2;
  constructor(public navCtrl: NavController, public navParams: NavParams, public app: AppServiceProvider) {
    this.app.hidden_tabs();
    this.title = this.navParams.get("name");
    this.pushdata();
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad Open2Page');
  }
  ionViewWillUnload() {
    this.app.show_tabs();
  }
  loading(infiniteScroll) {
    this.pushdata(infiniteScroll);
  }
  pushdata(obj?) {
    if (this.state == true) {
      this.state = false;
      let name = "";
      switch (this.title) {
        case "重庆时时彩": name = "cqssc";
          break;
        case "天津时时彩": name = "tjssc";
          break;
        case "江苏快三彩": name = "jsk3";
          break;
        case "上海快三彩": name = "shk3";
          break;
        case "安徽快三彩": name = "ahk3";
          break;
        case "广西快三彩": name = "gxk3";
          break;
        case "河北快三彩": name = "hebeik3";
          break;
        case "湖北快三彩": name = "hubeik3";
          break;
        case "江西快三彩": name = "jxk3";
          break;
        case "北京时时彩": name = "bjssc";
          break;
        case "台湾五分彩": name = "twssc";
          break;
        case "腾讯分分彩": name = "txffc";
          break;
        case "QQ分分彩": name = "qqffc";
          break;
        case "北京PK10": name = "pk10";
          break;
        case "极速分分彩": name = "jsffc";
          break;
      }
      let url = name == "pk10" ? '/php/get_pk10_history.php?' : '/php/get_history.php?';
      let date = (this.datas.length > 0) ? this.datas[this.datas.length - 1]["date"] : "0";
      let init = (this.datas.length > 0) ? "false" : "true";
      let buff = (this.datas.length > 0) ? "true" : "false";
      console.log(date)
      this.app.http_get(url + 'name=' + name + "&date=" + date + "&init=" + init + "&buff=" + buff, "text").subscribe(data => {
        this.state = true;
        if (data == "") {
          this.object = obj;
          obj.enable(false);
          console.log("没有更多数据了！");
          return;
        }
        if (init == "false") {
          obj.enable(true);
          this.split_data(data, name);
        } else {
          let arr = name == "pk10" ? data.split("#") : data.split("&");
          let times = arr[1].split("|");
          for (let i = 0; i < times.length; i++) {
            this.dates.push(times[i]);
          }
          console.log("msg:" + arr[0]);
          this.split_data(arr[0], name);
          this.date_select = this.dates[0];
        }
      }, error => {
        console.log("加载失败，请检查网络环境！");
        obj.complete();
        obj.enable(false);
        setTimeout(() => {
          obj.enable(true);
          this.state = true;
        }, 3000)
      })
    }
  }
  compute_num(obj, obj2) {
    return obj.split(obj2).length - 1;
  }
  get_num(obj) {
    let items = "";
    if (obj == 1 || obj == 3) {
      items = "小单";
    } else if (obj == 0 || obj == 2 || obj == 4) {
      items = "小双";
    } else if (obj == 5 || obj == 7 || obj == 9) {
      items = "大单";
    } else if (obj == 6 || obj == 8) {
      items = "大双";
    }
    return items;
  }
  select_event(e) {
    let obj = this.app.Loading();
    let name = "";
    switch (this.title) {
      case "重庆时时彩": name = "cqssc";
        break;
      case "天津时时彩": name = "tjssc";
        break;
      case "江苏快三彩": name = "jsk3";
        break;
      case "上海快三彩": name = "shk3";
        break;
      case "广西快三彩": name = "gxk3";
        break;
      case "江西快三彩": name = "jxk3";
        break;
      case "安徽快三彩": name = "ahk3";
        break;
      case "河北快三彩": name = "hebeik3";
        break;
      case "湖北快三彩": name = "hubeik3";
        break;
      case "北京时时彩": name = "bjssc";
        break;
      case "台湾五分彩": name = "twssc";
        break;
      case "腾讯分分彩": name = "txffc";
        break;
      case "QQ分分彩": name = "qqffc";
        break;
      case "北京PK10": name = "pk10";
        break;
      case "极速分分彩": name = "jsffc";
        break;
    }
    let url = name == "pk10" ? '/php/get_pk10_history.php?' : '/php/get_history.php?';
    this.app.http_get(url + 'name=' + name + '&init=false' + '&date=' + e + '&buff=false', "text").subscribe(
      data => {
        obj.dismiss();
        this.datas = [];
        this.split_data(data, name);
        if (this.object) this.object.enable(true);
      }
    )
    console.log(e);
  }
  today() {
    if (this.date_select != this.dates[0]) {
      this.date_select = this.dates[0];
      this.select_event(this.dates[0]);

    }
  }
  nav_case_page() {
    this.navCtrl.push(CaseClassPage, { name: this.title });
  }
  split_data(data, name) {
    let item = data.split("*");
    console.log(item.length);
    for (let i in item) {
      let json = {};
      let object = JSON.parse(item[i]);
      console.log(object["issue"]);
      if (name == "cqssc" || name == "tjssc" || name == "bjssc" || name == "twssc" || name == "txffc" || name == "qqffc" || name == "jsffc") {
        if (this.get_string_len(object["push_nums"]) > 9) {
          json["push_nums"] = object["push_nums"].substr(0, 9);;
        } else {
          json["push_nums"] = object["push_nums"];
        }
      } else {
        if (name == "pk10") {
          if (object["push_num"]) {
            json["push_num"] = object["push_num"].split("&");
          }
        } else if (this.get_string_len(object["push_nums"]) > 3) {
          json["push_nums"] = object["push_nums"].substr(0, 3);
          json["push_nums_2"] = object["push_nums"].substr(3, 3);
        } else {
          json["push_nums"] = object["push_nums"];
        }

      }
      json["date"] = object["issue"];
      if (name == "bjssc") {
        json["date1"] = object["issue"].substr(4, 2);
      } else {
        json["date1"] = name == "pk10" ? object["issue"].substr(9, 14) : object["issue"].substr(11, 14);
      }
      json["date2"] = object["issue"].substr(0, 10);
      json["date3"] = name == "pk10" ? object["lotterytime"] : object["lotterytime"].substr(11, 19);
      json["num"] = object["num"].split(",");
      json["nums"] = object["num"];
      if (name == "cqssc" || name == "tjssc" || name == "bjssc" || name == "twssc" || name == "txffc" || name == "qqffc" || name == "jsffc") {
        json["a"] = object["a"];
        json["b"] = object["b"];
        json["c"] = object["c"];
        json["d"] = object["d"];
        json["e"] = object["e"];
        json["f"] = object["f"];
      } else {
        json["e"] = object["push_num"];
      }
      let num: any = 0;
      for (let j = 0; j < json["num"].length; j++) {
        num = num + Number(json["num"][j]);
      }
      if (num < 10) num = "0" + num;
      json["num3"] = num;
      if (name == "cqssc" || name == "tjssc" || name == "bjssc" || name == "twssc" || name == "txffc" || name == "qqffc" || name == "jsffc") {
        if (json["a"] != "") {
          json["state1"] = this.back_state(json["a"], json["num"][0]);
        }
        if (json["b"] != "") {
          json["state2"] = this.back_state(json["b"], json["num"][1]);
        }
        if (json["c"] != "") {
          json["state3"] = this.back_state(json["c"], json["num"][2]);

        }
        if (json["d"] != "") {
          json["state4"] = this.back_state(json["d"], json["num"][3]);
        }
        if (json["e"] != "") {
          json["state5"] = this.back_state(json["e"], json["num"][4]);
        }

      } else {

      }
      json["win_nums"] = 0;
      if (json["push_nums"]) {
        let str = "0123456789";
        for (let j = 0; j < 10; j++) {
          if (json["push_nums"].indexOf(str.substr(j, 1)) < 0) {
            json["not_push_num"] = str.substr(j, 1);
            break;
          }
        }
        let nums_length = this.get_string_len(json["push_nums"]);
        if (name != "cqssc" && name != "tjssc" && name != "bjssc" && name != "twssc" && name != "txffc" && name != "qqffc" && name != "jsffc") {
          for (let i = 0; i < nums_length; i++) {
            json["win_nums"] += this.compute_num(object["num"], json["push_nums"].substr(i, 1));
          }
        } else {
          for (let i = 0; i < nums_length; i++) {
            json["win_nums"] += this.compute_num(object["num"], json["push_nums"].substr(i, 1));
          }
          if (nums_length == 1) {
            if (json["win_nums"] > 0) {
              json["state4"] = "中";
            } else {
              json["state4"] = "挂";
            }
          }
          if (nums_length == 2) {
            if (json["win_nums"] > 1) {
              json["state4"] = "中";
            }
            if (json["win_nums"] == 0) {
              json["state4"] = "挂";
            }
            if (json["win_nums"] == 1) {
              json["state4"] = "和";
            }
          }
          if (nums_length == 3) {
            if (json["win_nums"] >= 2) {
              json["state4"] = "中";
            }
            if (json["win_nums"] <= 1) {
              json["state4"] = "挂";
            }
          }
          if (nums_length == 4) {
            if (json["win_nums"] > 2) {
              json["state4"] = "中";
            }
            if (json["win_nums"] < 2) {
              json["state4"] = "挂";
            }
            if (json["win_nums"] == 2) {
              json["state4"] = "和";
            }
          }
          if (nums_length == 5) {
            if (json["win_nums"] > 2) {
              json["state4"] = "中";
            }
            if (json["win_nums"] <= 2) {
              json["state4"] = "挂";
            }
          }
        }
      }
      if (json["f"] != "") {
        json["e3"] = json["f"].substr(0, 1);
        json["e4"] = json["f"].substr(1, 2);
        let nums: any = 0;
        let num_add = "";
        let one = "";
        let two = "";
        for (let j = 0; j < json["num"].length; j++) {
          nums = nums + Number(json["num"][j]);
        }
        if (nums < 10) nums = "0" + nums;
        let num_index = name == "cqssc" || name == "tjssc" || name == "bjssc" || name == "twssc" || name == "txffc" || name == "qqffc" || name == "jsffc" ? 22 : 10;
        if (nums > num_index && nums.toString().substr(1, 2) % 2 == 0) {
          one = "大双";
        } else if (nums > num_index && nums.toString().substr(1, 2) % 2 != 0) {
          one = "大单";
        } else if (nums <= num_index && nums.toString().substr(1, 2) % 2 != 0) {
          one = "小单";
        } else {
          one = "小双";
        }
        if (one.search(json["e3"]) != -1) {
          json["e33"] = true;
        } else {
          json["e33"] = false;
        }
        if (one.search(json["e4"]) != -1) {
          json["e44"] = true;
        } else {
          json["e44"] = false;
        }
        if (json["e33"] == false && json["e44"] == false) {
          json["state6"] = "挂";
        }
        if (json["e33"] == false && json["e44"] != false || json["e33"] != false && json["e44"] == false) {
          json["state6"] = "和";
        }
        if (json["e33"] && json["e44"]) {
          json["state6"] = "中";
        }
      }

      this.datas.push(json);
    }
  }
  back_state(value, nums) {
    if (value == "大双") {
      if (nums == 6 || nums == 8) {
        return "中";
      } else if (nums == 0 || nums == 2 || nums == 4) {
        return "和";
      } else if (nums == 5 || nums == 7 || nums == 9) {
        return "和";
      } else {
        return "挂";
      }
    }
    if (value == "小双") {
      if (nums == 6 || nums == 8) {
        return "和";
      } else if (nums == 0 || nums == 2 || nums == 4) {
        return "中";
      } else if (nums == 5 || nums == 7 || nums == 9) {
        return "挂";
      } else if (nums == 1 || nums == 3) {
        return "和";
      }
    }
    if (value == "大单") {
      if (nums == 6 || nums == 8) {
        return "和";
      } else if (nums == 0 || nums == 2 || nums == 4) {
        return "挂";
      } else if (nums == 5 || nums == 7 || nums == 9) {
        return "中";
      } else if (nums == 1 || nums == 3) {
        return "和";
      }
    }
    if (value == "小单") {
      if (nums == 6 || nums == 8) {
        return "挂";
      } else if (nums == 0 || nums == 2 || nums == 4) {
        return "和";
      } else if (nums == 5 || nums == 7 || nums == 9) {
        return "和";
      } else if (nums == 1 || nums == 3) {
        return "中";
      }
    }
  }
  yesterday() {
    if (this.date_select != this.dates[1]) {
      this.date_select = this.dates[1];
      this.select_event(this.dates[1]);
    }
  }
  get_string_len(str) {
    if (str == null) return 0;
    if (typeof str != "string") {
      str += "";
    }
    return str.replace(/[^\x00-\xff]/g, "ab").length;
  }
  get_state(obj, obj1) {
    if (obj.indexOf(obj1) >= 0) {
      return true;
    } else {
      return false;
    }
  }
}
