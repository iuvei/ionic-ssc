import { Component} from '@angular/core';
import { NavController} from 'ionic-angular';
/**
 * Generated class for the BackBtnComponent component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
  selector: 'back-btn',
  templateUrl: 'back-btn.html'
})
export class BackBtnComponent {
  constructor( public navCtrl:NavController) {
  }
  back(){
    this.navCtrl.pop()
  }
}
