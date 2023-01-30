import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";

const routes: Routes = [

  { path: 'utilisateur', loadChildren: () => import('./../../features-master/users/users.module').then(m => m.UsersModule) },
  { path: 'ville', loadChildren: () => import('../../features-master/city/city.module').then(m => m.CityModule) },
  { path: 'pays', loadChildren: () => import('../../features-master/country/country.module').then(m => m.CountryModule) },
  { path: 'pasteur', loadChildren: () => import('../../features/administration/pastor/pastor.module').then(m => m.PastorModule) },
  { path: 'rem', loadChildren: () => import('../../features/administration/rem/rem.module').then(m => m.RemModule) },
  { path: 'ministere', loadChildren: () => import('../../features/administration/ministry/ministry.module').then(m => m.MinistryModule) },
  { path: 'star', loadChildren: () => import('../../features/administration/star/star.module').then(m => m.StarModule) },

];


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class AdministrationModule { }
