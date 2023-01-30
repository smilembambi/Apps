import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {StarListComponent} from './pages/star-list/star-list.component';
import {RouterModule, Routes} from "@angular/router";
import {MainModule} from "../../../shared/widget/main/main.module";
import {NgbAlertModule} from "@ng-bootstrap/ng-bootstrap";
import {StarEditComponent} from './pages/star-edit/star-edit.component';

const routes: Routes = [
  {
    path: '',
    component: StarListComponent
  },
  {
    path: 'edit/:id',
    component: StarEditComponent
  },
];

@NgModule({
  declarations: [
    StarListComponent,
    StarEditComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MainModule,
    NgbAlertModule
  ]
})
export class StarModule { }
