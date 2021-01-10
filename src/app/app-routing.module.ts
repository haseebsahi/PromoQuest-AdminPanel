import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './shared/guard/auth.guard';

const routes: Routes = [
  {
      path: 'layout',
      loadChildren: './layout/layout.module#LayoutModule',
      canActivate: [AuthGuard]
  },
  // {
  //   path: '',
  //   loadChildren: './pages/models/list/list.module#ListModule',
  //   canActivate: [AuthGuard]
  // },
  // {
  //   path: 'models',
  //   loadChildren: './pages/models/list/list.module#ListModule',
  //   canActivate: [AuthGuard]
  // },
  // {
  //   path: 'users',
  //   loadChildren: './pages/users/list/list.module#ListModule',
  //   canActivate: [AuthGuard]
  // },
  // {
  //   path: 'auto',
  //   loadChildren: './pages/drops/auto-drops/auto-drops.module#AutoDropsModule',
  //   canActivate: [AuthGuard]
  // },

  {
    path: '',
    loadChildren: './pages/pages.module#PagesModule',
    canActivate: [AuthGuard]
  },
  {
    path: 'login',
    loadChildren: './login/login.module#LoginModule',
  },
  {
    path: 'password-reset',
    loadChildren: './login/password-reset/password-reset.module#PasswordResetModule',

  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule {}
