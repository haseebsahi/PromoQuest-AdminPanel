import { AngularFireAuth } from '@angular/fire/auth';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable()
export class AuthService {
  user$: Observable<firebase.User>;
  isLoggedin: Observable<boolean>;

  constructor(private afAuth: AngularFireAuth, private router: Router) {
    this.user$ = this.afAuth.user;
  }

  isLoggedIn() {
    return this.user$.subscribe(user => {
      return user ? true : false;
    });
  }

  login(loginData) {

    this.afAuth.auth
      .signInWithEmailAndPassword(loginData.email, loginData.password)
      .then(user => {
        if (user) {
          this.router.navigate(['/']);
        }
      })
      .catch(error => {
        console.log(error);
      });
  }


  resetPassword(email: string) {
    this.afAuth.auth.sendPasswordResetEmail(email)
      .then(() => { console.log("success"); })
      .catch((err) => { console.log("error"); });
  }

  logOut(): any {
    this.afAuth.auth.signOut();
  }
}
