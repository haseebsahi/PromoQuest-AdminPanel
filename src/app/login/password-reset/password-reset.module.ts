import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PasswordResetComponent } from './password-reset.component';
import { RouterModule, Routes } from '@angular/router';

import { FlexLayoutModule } from '@angular/flex-layout';
import {
  MatSnackBarModule,
  MatCardModule,
  MatButtonModule,
  MatFormFieldModule,
  MatPaginatorModule,
  MatInputModule,
  MatExpansionModule,
} from '@angular/material';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../shared/services/auth.service';

const routes: Routes = [
  {
    path: '',
    component: PasswordResetComponent
  },
];

@NgModule({
  declarations: [PasswordResetComponent],
  imports: [
    RouterModule.forChild(routes),
    FormsModule,
    CommonModule,
    MatCardModule,
    MatFormFieldModule,
    MatPaginatorModule,
    MatSnackBarModule,
    MatInputModule,
    MatExpansionModule,
    MatButtonModule,
    FlexLayoutModule
  ],
  providers: [AuthService]
})
export class PasswordResetModule { }
