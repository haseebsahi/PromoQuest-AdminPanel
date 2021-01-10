import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatTableModule } from '@angular/material/table';

import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';

import { ListComponent } from './list.component';
import { environment } from '../../../../environments/environment';

import {
  MatFormFieldModule,
  MatPaginatorModule,
  MatInputModule,
  MatExpansionModule,
  MatButtonModule
} from '@angular/material';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { DetailComponent } from '../detail/detail.component';

const routes: Routes = [
  {
    path: '',
    component: ListComponent
  },
  {
    path: ':id',
    component: DetailComponent
  }
];

// const routes: Routes = [
//   {
//     path: '',
//     component: ListComponent,
//     children: [
//       {
//         path: ':id',
//         component: DetailComponent
//       }
//     ]
//   }
// ];

@NgModule({
  declarations: [ListComponent, DetailComponent],
  imports: [
    CommonModule,
    FormsModule,

    MatButtonModule,
    MatExpansionModule,
    MatTableModule,
    MatFormFieldModule,
    MatPaginatorModule,
    MatInputModule,

    RouterModule.forChild(routes),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule
  ]
})
export class ListModule {}
