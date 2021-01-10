import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule, MatCheckboxModule, MatInputModule } from '@angular/material';

import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  imports: [CommonModule, FormsModule,
            LoginRoutingModule, MatInputModule, MatCheckboxModule, MatButtonModule, FlexLayoutModule],
  declarations: [LoginComponent],
  providers: []
})
export class LoginModule {}
