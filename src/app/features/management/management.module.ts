import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";

const routes: Routes = [
  { path: '', redirectTo : 'eglises', pathMatch:"full"},
  { path: 'eglises', loadChildren: () => import('./church/church.module').then(m => m.ChurchModule) },
  { path: 'ames', loadChildren: () => import('./member/member.module').then(m => m.MemberModule) },
  { path: 'evenements', loadChildren: () => import('./events/events.module').then(m => m.EventsModule) },

];


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class ManagementModule { }
