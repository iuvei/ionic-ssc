import { Component ,ViewChild} from '@angular/core';
import { ContactPage } from '../contact/contact';
import { ForecastPage } from '../forecast/forecast';
import { HomePage } from '../home/home';
import { StatusBar } from '@ionic-native/status-bar';
import { Tabs } from "ionic-angular";

@Component({
  templateUrl: 'tabs.html'
})

export class TabsPage {
@ViewChild("mytabs") tabRef :Tabs;
  tab1Root = HomePage;
  tab2Root = ForecastPage;
  tab3Root = ContactPage;
 ionViewDidEnter() {
  this.tabRef.select(0);
 }
constructor(private statusBar: StatusBar) {
   this.statusBar.styleBlackTranslucent();
   this.statusBar.overlaysWebView(true);

  //  this.tabRef.select(1)
  //  this.statusBar.backgroundColorByHexString('#fff');
  }
}
