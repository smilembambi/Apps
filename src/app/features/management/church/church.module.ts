import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ChurchEditComponent} from './pages/church-edit/church-edit.component';
import {ChurchListComponent} from './pages/church-list/church-list.component';
import {MainModule} from "../../../shared/widget/main/main.module";
import {RouterModule, Routes} from "@angular/router";
import { ChurchLocationComponent } from './pages/church-location/church-location.component';
import { ChurchMapComponent } from './pages/church-map/church-map.component';
import {AgmCoreModule, MapsAPILoader} from "@agm/core";
import {ToastModule} from "primeng/toast";
import {GoogleMapsModule} from "@angular/google-maps";


const routes: Routes = [
  {
    path: '',
    component: ChurchListComponent
  },
  {
    path: 'edit/:id',
    component: ChurchEditComponent
  },
  {
    path: 'map/:id',
    component: ChurchMapComponent
  },
];

@NgModule({
  declarations: [
    ChurchEditComponent,
    ChurchListComponent,
    ChurchLocationComponent,
    ChurchMapComponent
  ],
    imports: [
        CommonModule,
        MainModule,
        RouterModule.forChild(routes),
        AgmCoreModule.forRoot({
            apiKey: 'AIzaSyCSxHWkM8ylyczGAgdX9NyfjTFAA-rEHTw'
        }),
        ToastModule,
        GoogleMapsModule,
    ],
  providers:[
  ]
})
export class ChurchModule { }
