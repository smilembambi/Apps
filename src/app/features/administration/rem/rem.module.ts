import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RemListComponent} from './pages/rem-list/rem-list.component';
import {RouterModule, Routes} from "@angular/router";
import {MainModule} from "../../../shared/widget/main/main.module";
import {NgbAlertModule} from "@ng-bootstrap/ng-bootstrap";
import {RemEditComponent} from './pages/rem-edit/rem-edit.component';

const routes: Routes = [
  {
    path: '',
    component: RemListComponent
  },
  {
    path: 'edit/:id',
    component: RemEditComponent
  },
];

@NgModule({
  declarations: [
    RemListComponent,
    RemEditComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MainModule,
    NgbAlertModule
  ]
})
export class RemModule { }
