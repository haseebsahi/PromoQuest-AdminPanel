import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AutoDropsComponent } from './auto-drops.component';
import { RouterModule, Routes } from '@angular/router';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatInputModule} from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { AngularFireModule } from '@angular/fire';
import { environment } from '../../../../environments/environment';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { MatSelectModule, MatButtonModule } from '@angular/material';

import { MatSnackBarModule } from '@angular/material';


const routes: Routes = [
  {
      path: '',
      component: AutoDropsComponent
  },
  {
    path: 'list',
    loadChildren: '../list/list.module#ListModule'
  }
];

@NgModule({
  declarations: [AutoDropsComponent],
  imports: [
    CommonModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    RouterModule.forChild(routes),
    MatButtonModule,
    FormsModule,
    MatSelectModule,
    MatSnackBarModule,
    MatGridListModule,
    MatInputModule
  ]
})
export class AutoDropsModule { }
