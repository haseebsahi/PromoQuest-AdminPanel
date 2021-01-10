import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClaimsComponent } from './claims.component';

import { Routes, RouterModule } from '@angular/router';
import { MatButtonModule, MatExpansionModule, MatTableModule, MatFormFieldModule, MatPaginatorModule, MatInputModule } from '@angular/material';
import { AngularFireModule } from '@angular/fire';
import { environment } from '../../../environments/environment';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { SafeHtmlPipe } from './claims.pipe';


const routes: Routes = [
  {
    path: '',
    component: ClaimsComponent
  }
]

@NgModule({
  declarations: [ClaimsComponent, SafeHtmlPipe],
  imports: [
    CommonModule,
    RouterModule,
    RouterModule.forChild(routes),

    MatButtonModule,
    MatExpansionModule,
    MatTableModule,
    MatFormFieldModule,
    MatPaginatorModule,
    MatInputModule,

    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule
  ]
})
export class ClaimsModule { }
