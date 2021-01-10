import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../shared/services/auth.service';

import { trigger, transition, useAnimation } from '@angular/animations';
import { bounceInDown } from 'ng-animate';
import { flash } from 'ng-animate';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
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
      trigger('flash', [transition('* => *', useAnimation(flash, {
        // Set the duration to 5seconds and delay to 2seconds
        params: { timing: 2, delay: 2 }
      }))])
    ],
})


export class LoginComponent implements OnInit {
  bounceInDown: any;
  flash: any;
  
  constructor(private authService: AuthService, private router: Router) {
  }

  ngOnInit() {}

  onLogin(loginData) {
   // e.preventDefault();
   this.authService.login(loginData);
  }
}
