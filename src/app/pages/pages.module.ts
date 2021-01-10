import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagesComponent } from './pages.component';

import { TopnavComponent } from './components/topnav/topnav.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { FooterComponent } from './components/footer/footer.component';

import { Routes, RouterModule } from '@angular/router';

import {
  MatToolbarModule,
  MatButtonModule,
  MatSidenavModule,
  MatIconModule,
  MatInputModule,
  MatMenuModule,
  MatListModule
} from '@angular/material';

import { TranslateModule } from '@ngx-translate/core';
import { AuthGuard } from '../shared/guard/auth.guard';

export const routes: Routes = [
  {
    path: '',
    component: PagesComponent,
    children: [
      {
        path: '',
        redirectTo: 'auto'
      },
      {
        path: 'auto',
        loadChildren: './drops/auto-drops/auto-drops.module#AutoDropsModule', pathMatch: 'full',
        canActivate: [AuthGuard]
      },
      {
        path: 'list',
        loadChildren: './drops/list/list.module#ListModule'
      },
      {
        path: 'models',
        loadChildren: './models/list/list.module#ListModule',
      },
      {
        path: 'claims',
        loadChildren: './claims/claims.module#ClaimsModule',
      },
      {
        path: 'users',
        loadChildren: './users/list/list.module#ListModule'
      }
    ]
  }
];

@NgModule({
  declarations: [
    PagesComponent,
    TopnavComponent,
    SidebarComponent,
    FooterComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatInputModule,
    MatMenuModule,
    MatListModule,
    TranslateModule
  ]
})
export class PagesModule {}
