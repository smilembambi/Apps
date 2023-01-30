import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {TrafficComponent} from './pages/traffic/traffic.component';

const routes: Routes = [
  { path : '', redirectTo: 'traffic', pathMatch:"full" },
  { path : 'traffic', component: TrafficComponent},
];

@NgModule({
  declarations: [
    TrafficComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ]
})
export class DashboardModule { }
