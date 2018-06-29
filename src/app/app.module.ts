import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HttpModule,JsonpModule } from '@angular/http';
import { AboutPage } from '../pages/about/about';
import { AboutDirective } from '../pages/about/about.directive';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AppServiceProvider } from '../providers/app-service/app-service';
import { OpenPageModule } from '../pages/open/open.module';
import { Open2PageModule } from '../pages/open2/open2.module';
import { UserRegisterPageModule } from '../pages/user-register/user-register.module';
import { UserloginPageModule } from '../pages/user-login/user-login.module';
import { OpenDirective } from '../pages/open/open.directive';
import { ClassPageModule } from '../pages/class/class.module';
import { ForecastPageModule } from '../pages/forecast/forecast.module';
import { AppVersion } from '@ionic-native/app-version';
import { BackBtnComponentModule } from '../components/back-btn/back-btn.module';
import { ScreenOrientation } from '@ionic-native/screen-orientation';
import { LocalNotifications } from '@ionic-native/local-notifications';
import { JPushService  } from 'ionic2-jpush';
import { Insomnia } from '@ionic-native/insomnia';
import { NoticePageModule } from '../pages/notice/notice.module';
import { CasePageModule } from '../pages/case/case.module';
import { CaseClassPageModule } from '../pages/case-class/case-class.module';
@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    AboutDirective,
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp,{
     mode: 'md',
     swipeBackEnabled:true
    }),
    HttpModule,
    JsonpModule,
    UserRegisterPageModule,
    UserloginPageModule,
    OpenPageModule, 
    Open2PageModule, 
    ClassPageModule,
    ForecastPageModule,
    BackBtnComponentModule,
    NoticePageModule,
    CasePageModule,
    CaseClassPageModule,
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
   
  ],
  providers: [
  {provide: ErrorHandler, useClass: IonicErrorHandler},
    AppServiceProvider,
    StatusBar,
    SplashScreen,
    AppVersion,
    ScreenOrientation,
    LocalNotifications,
    JPushService,
    Insomnia,

  ]
})
export class AppModule {}
