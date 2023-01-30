import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PastorListComponent } from './pages/pastor-list/pastor-list.component';
import {RouterModule, Routes} from "@angular/router";
import {MinistryListComponent} from "../ministry/pages/ministry-list/ministry-list.component";
import {MainModule} from "../../../shared/widget/main/main.module";
import {NgbAlertModule} from "@ng-bootstrap/ng-bootstrap";
import {UserEditComponent} from "../../../features-master/users/pages/user-edit/user-edit.component";
import { PastorEditComponent } from './pages/pastor-edit/pastor-edit.component';

const routes: Routes = [
  {
    path: '',
    component: PastorListComponent
  },
  {
    path: 'edit/:id',
    component: PastorEditComponent
  },
];

@NgModule({
  declarations: [
    PastorListComponent,
    PastorEditComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MainModule,
    NgbAlertModule
  ]
})
export class PastorModule { }
