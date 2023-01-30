import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {AuthGuard} from './core/guards/auth.guard';
import {LayoutComponent} from './shared/layouts/layout.component';
import {Page404Component} from './examples/extrapages/page404/page404.component';


const routes: Routes = [
  {
    path: '',
    redirectTo: 'auth',
    pathMatch: 'full'
  },
  { path:'auth', loadChildren: () => import('./features-master/auth/auth.module').then(m => m.AuthModule) },

  {
    path: 'app',
    component: LayoutComponent,
    canActivate: [AuthGuard],
    children: [
      /**** BASE MODULE APP ***/
      {
        path: 'account',
        loadChildren: () => import('./features-master/account/account.module').then(m => m.AccountModule)
      },
      {
        path: 'users',
        loadChildren: () => import('./features-master/users/users.module').then(m => m.UsersModule)
      },
      // {
      //   path: 'story',
      //   loadChildren: () => import('./features-master/story/story.module').then(m => m.StoryModule)
      // },
      {
        path: 'permission',
        loadChildren: () => import('./features-master/permission/permission.module').then(m => m.PermissionModule)
      },

      /**** FEATURES MODULE APP ***/
      {
        path: 'analyse',
        loadChildren: () => import('./features/analyse/analyse.module').then(m => m.AnalyseModule)
      },

      {
        path: 'management',
        loadChildren: () => import('./features/management/management.module').then(m => m.ManagementModule)
      },
      {
        path: 'administration',
        loadChildren: () => import('./features/administration/administration.module').then(m => m.AdministrationModule)
      },

      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },

    ]
  },
  {
    path: 'error',
    component: Page404Component,
    data: {
      'type': 404,
      'title': 'Page Not Found',
      'desc': 'Oopps!! The page you were looking for doesn\'t exist.'
    }
  },
  {
    path: 'error/:type',
    component: Page404Component
  },
  { path: '**', redirectTo: 'error', pathMatch: 'full' }
];


@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'top', relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})

export class AppRoutingModule { }
