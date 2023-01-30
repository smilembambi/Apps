import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CityListComponent } from './pages/city-list/city-list.component';

import {RouterModule, Routes} from "@angular/router";
import {SharedModule} from "../../shared/shared.module";
import { DialogCityComponent } from './pages/dialog-city/dialog-city.component';
import {MainModule} from "../../shared/widget/main/main.module";
import {AlertModule} from "ngx-bootstrap/alert";
import {NgbAlertModule} from "@ng-bootstrap/ng-bootstrap";
import {FormsModule} from "@angular/forms";

const routes: Routes = [
  {
    path: '',
    component: CityListComponent
  },
];


@NgModule({
  declarations: [
    CityListComponent,
    DialogCityComponent
  ],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        SharedModule,
        MainModule,
        AlertModule,
        NgbAlertModule,
        FormsModule,
    ]
})
export class CityModule { }
