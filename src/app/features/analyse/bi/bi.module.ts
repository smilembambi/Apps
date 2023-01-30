import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MetricSectorComponent } from './pages/metric-sector/metric-sector.component';
import { PortIndicatorComponent } from './pages/port-indicator/port-indicator.component';
import {RouterModule, Routes} from "@angular/router";
import {DomainIndicatorComponent} from "./pages/domain-indicator/domain-indicator.component";
const routes: Routes = [
  { path:'', redirectTo:'metrique-par-secteur' , pathMatch : "full" },
  { path : 'metrique-par-secteur', component: MetricSectorComponent },
  { path : 'indicateur-de-port',  component: PortIndicatorComponent },
  { path : 'indicateur-de-domaine', component: DomainIndicatorComponent },
];

@NgModule({
  declarations: [
    MetricSectorComponent,
    PortIndicatorComponent,
    DomainIndicatorComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ]
})
export class BiModule { }
