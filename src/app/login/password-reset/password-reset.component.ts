import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../shared/services/auth.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-password-reset',
  templateUrl: './password-reset.component.html',
  styleUrls: ['./password-reset.component.scss']
})
export class PasswordResetComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router, private snackBar: MatSnackBar) { }

  ngOnInit() {
  }

  onSubmit(value) {
    console.log(value);
    
    this.authService.resetPassword(value.email);

    this.openSnackBaar();

  }
  
  openSnackBaar(): any {
    this.snackBar.open(
      "Reset Link Sent ...", 'Login', {
        duration: 7000
      }
    ).onAction().subscribe( () => {
      this.router.navigate(['/login']);
    })
  }


}
