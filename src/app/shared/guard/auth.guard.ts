import { Injectable } from "@angular/core";
import { CanActivate } from "@angular/router";
import { Router } from "@angular/router";
import { AuthService } from "../services/auth.service";
import { map } from "rxjs/operators";
import { Observable, of } from "rxjs";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private authService: AuthService) {}

  canActivate(): Observable<boolean> {
    return this.authService.user$.pipe(
      map(user => {

        if (user) {
          return true;
        }
        this.router.navigate(["/login"]);
        return false;
      })
    );

   
  }
}
