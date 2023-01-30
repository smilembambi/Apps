import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MinistryEditComponent} from './pages/ministry-edit/ministry-edit.component';
import {MinistryListComponent} from './pages/ministry-list/ministry-list.component';
import {RouterModule, Routes} from "@angular/router";
import {MainModule} from "../../../shared/widget/main/main.module";
import {NgbAlertModule} from "@ng-bootstrap/ng-bootstrap";

const routes: Routes = [
  {
    path: '',
    component: MinistryListComponent
  },
];


@NgModule({
  declarations: [
    MinistryEditComponent,
    MinistryListComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MainModule,
    NgbAlertModule
  ]
})
export class MinistryModule { }
