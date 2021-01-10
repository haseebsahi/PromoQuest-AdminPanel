import { Component, OnInit } from '@angular/core';

import { trigger, transition, useAnimation } from '@angular/animations';
import { bounceInDown, flash, slideInLeft, slideInUp } from 'ng-animate';

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.scss'],
    animations: [
        trigger('bounceInDown', [transition('* => *', useAnimation(bounceInDown, {
          params: {
            timing: 5,
         
            // Specify granular values for `translate` on axis Y during 'bounceInDown' 
            a: '-3000px',
            b: '25px',
            c: '-10px',
            d: '5px',
          }
        })
        )]),
        trigger('slideInUp', [transition('* => *', useAnimation(slideInUp, {
            params: {
              timing: 0.5,
              opacity: 0.2
            }
          })
          )]),
          trigger('slideInLeft', [transition('* => *', useAnimation(slideInLeft, {
            params: {
              timing: 0.5,
              opacity: 0.2
            }
          })
          )]),
        trigger('flash', [transition('* => *', useAnimation(flash, {
          // Set the duration to 5seconds and delay to 2seconds
          params: { timing: 2, delay: 2 }
        }))])
      ],
})
export class SidebarComponent implements OnInit {
    flash: any;
    slideInLeft: any;
    slideInUp: any;
    bounceInDown: any;
    public showMenu: string;
    constructor() {}

    ngOnInit() {
        this.showMenu = '';
    }

    addExpandClass(element: any) {
        if (element === this.showMenu) {
            this.showMenu = '0';
        } else {
            this.showMenu = element;
        }
    }
}
