import { Injectable } from '@angular/core';
import { AlertController, LoadingController, ToastController } from 'ionic-angular';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class AppServiceProvider {

  constructor(public http: Http, public alertCtrl: AlertController, public loadingCtrl: LoadingController, public toastCtrl: ToastController) { }
  IP() {
   return "http://192.168.0.102";
    //return "http://192.168.31.219";
    // return "http://192.168.31.178";
    //return "http://119.29.181.81";
    // return "http://127.0.0.1";
  }
  http_get(url: string, type: string, boolean?: string) {
    let ip = this.IP() + url;
    if (boolean) {
      ip = url;
    }
    if (type == "json") {
      return this.http.get(ip).map(res => res.json());
    } else {
      return this.http.get(ip).map(res => res.text());
    }
  }
  show_tabs() {
    document.querySelector(".tabbar")['style'].display = 'flex';
  }
  hidden_tabs() {
    document.querySelector(".tabbar")['style'].display = 'none';
  }
  http_post(url: string, creds: string, type: string, boolean?: string) {
    let ip = this.IP() + url;
    if (boolean) {
      ip = url;
    }
    let headers = new Headers()
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    if (type == "json") {
      return this.http.post(ip, creds, { headers: headers }).map(res => res.json());
    } else {
      return this.http.post(ip, creds, { headers: headers }).map(res => res.text());
    }
  }
  Alert(text) {
    let alert = this.alertCtrl.create({
      subTitle: '提示：',
      message: text,
      buttons: ['确定']
    });
    alert.present();
  }

  Loading(text?) {
    let loader = this.loadingCtrl.create({
      content: text,
      duration: 10000
    });
    loader.present();
    return loader;
  }

  Toast(text, position, time, css) {
    let toast = this.toastCtrl.create({
      message: text,
      position: position,
      duration: time,
      cssClass: css
    })
    toast.present();
  }
  back_date(NEW_TIME, NOW_TIME) {
    let t = Math.floor((NEW_TIME - NOW_TIME) / 1000);
    let j: any = Math.floor(t % 86400 / 3600);
    let i: any = t % 60;
    let r: any = Math.floor(t % 86400 % 3600 / 60);
    if (j < 10) j = "0" + j;
    if (i < 10) i = "0" + i;
    if (r < 10) r = "0" + r;
    return { "hour": j, "minute": r, "second": i };
  }
}
