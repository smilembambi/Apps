import { Component, OnInit } from '@angular/core';
import {ConfigClass} from "../../../../core/helpers/class/config.class";

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent {

  breadCrumbItems: any;
  object: string = 'user';
  headers: any[] = [];

  constructor() {
    this.headers = new ConfigClass().getParamsGlobal(this.object, 'header');
    this.breadCrumbItems = [{ label: 'Skote' }, { label: 'Calendar', active: true }];
  }
}
