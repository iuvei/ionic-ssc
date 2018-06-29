import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ForecastPage } from './forecast';

@NgModule({
  declarations: [
    ForecastPage,
  ],
  imports: [
    IonicPageModule.forChild(ForecastPage),
  ],
  exports: [
    ForecastPage
  ]
})
export class ForecastPageModule {}
