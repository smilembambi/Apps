import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";

const routes: Routes = [
  { path: '', redirectTo : 'tableau-de-bord', pathMatch:"full"},
  { path: 'bi', loadChildren: () => import('./bi/bi.module').then(m => m.BiModule) },
  { path: 'tableau-de-bord', loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule) },
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class AnalyseModule { }
