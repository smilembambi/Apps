import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CountryListComponent } from './pages/country-list/country-list.component';
import { CountryEditComponent } from './pages/country-edit/country-edit.component';
import {MainModule} from "../../shared/widget/main/main.module";
import {RouterModule, Routes} from "@angular/router";
import {NgbAlertModule} from "@ng-bootstrap/ng-bootstrap";


const routes: Routes = [
  {
    path: '',
    component: CountryListComponent
  },
];


@NgModule({
  declarations: [
    CountryListComponent,
    CountryEditComponent
  ],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        MainModule,
        NgbAlertModule
    ]
})
export class CountryModule { }
