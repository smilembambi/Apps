import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MemberListComponent} from './pages/member-list/member-list.component';
import {MemberEditComponent} from './pages/member-edit/member-edit.component';
import {RouterModule, Routes} from "@angular/router";
import {MainAllService} from "../../../core/services/main-all.service";
import {MainModule} from "../../../shared/widget/main/main.module";


export let MODULE_URL = 'member';

const routes: Routes = [
  {
    path: '',
    component: MemberListComponent
  },
  {
    path: 'edit/:id',
    component: MemberEditComponent
  },
];

@NgModule({
  declarations: [
    MemberListComponent,
    MemberEditComponent
  ],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        MainModule
    ],
  providers: [
    { provide: MODULE_URL, useValue: MODULE_URL },
    MainAllService
  ]
})
export class MemberModule { }
