import { Directive ,Output,EventEmitter,HostListener} from '@angular/core';


@Directive({
  selector: '[OpenDirective]' // Attribute selector
})
export class OpenDirective {
  @Output() public OpenDirective = new EventEmitter<any>();
  public touchStartX;
  public touchStartY;
  constructor() {
  
  }
     @HostListener('touchstart', ['$event'])  onTouchStart(e) {
         this.touchStartX = e.changedTouches[0].clientX;
         this.touchStartY = e.changedTouches[0].clientY;
    }
     @HostListener('touchend', ['$event']) onTouchEnd(e) {
        let moveX = e.changedTouches[0].clientX - this.touchStartX;
        let moveY = e.changedTouches[0].clientY - this.touchStartY;
        console.log("结束：" + moveY)
      if (Math.abs(moveY) > Math.abs(moveX)) {
            if (moveY >= 140) {
               this.OpenDirective.emit({'moveY':moveY});
           }
        }
     }
}
