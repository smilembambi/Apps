import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {UserListComponent} from './pages/user-list/user-list.component';
import {UserEditComponent} from './pages/user-edit/user-edit.component';
import {RouterModule, Routes} from "@angular/router";
import {MainModule} from "../../shared/widget/main/main.module";
import {MessageService} from "primeng/api";
import { UserMapComponent } from './pages/user-map/user-map.component';

const routes: Routes = [
  {
    path: '',
    component: UserListComponent
  },
  {
    path: 'edit/:id',
    component: UserEditComponent
  },
  {
    path: 'map/:id',
    component: UserMapComponent
  },
];

@NgModule({
  declarations: [
    UserListComponent,
    UserEditComponent,
    UserMapComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MainModule,
  ],
  providers:[
    MessageService
  ]
})
export class UsersModule { }
