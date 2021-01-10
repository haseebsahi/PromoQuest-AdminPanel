import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from '../../../shared/services/auth.service';

import { trigger, transition, useAnimation } from '@angular/animations';
import { slideInLeft, swing } from 'ng-animate';

@Component({
    selector: 'app-topnav',
    templateUrl: './topnav.component.html',
    styleUrls: ['./topnav.component.scss'],
    animations: [
        trigger('swing', [transition('* => *', useAnimation(swing))]),
        trigger('slideInLeft', [transition('* => *', useAnimation(slideInLeft, {
            params: {
              timing: 0.5,
              opacity: 0.2
            }
          })
          )]),
      ],
})
export class TopnavComponent implements OnInit {
    swing: any;
    slideInLeft: any;
    
    public pushRightClass: string;

    constructor(public router: Router, private translate: TranslateService, private authService: AuthService) {
        this.router.events.subscribe(val => {
            if (val instanceof NavigationEnd && window.innerWidth <= 992 && this.isToggled()) {
                this.toggleSidebar();
            }
        });
    }

    ngOnInit() {
        this.pushRightClass = 'push-right';
    }

    isToggled(): boolean {
        const dom: Element = document.querySelector('body');
        return dom.classList.contains(this.pushRightClass);
    }

    toggleSidebar() {
        const dom: any = document.querySelector('body');
        dom.classList.toggle(this.pushRightClass);
    }

    onLoggedout() {
        this.authService.logOut();
        this.router.navigate(['/login']);
    }

    changeLang(language: string) {
        this.translate.use(language);
    }
}
