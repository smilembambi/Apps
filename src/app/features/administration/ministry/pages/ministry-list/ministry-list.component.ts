import { Component, OnInit } from '@angular/core';
import {ConfigClass} from "../../../../../core/helpers/class/config.class";

@Component({
  selector: 'app-ministry-list',
  templateUrl: './ministry-list.component.html',
  styleUrls: ['./ministry-list.component.scss']
})
export class MinistryListComponent  {

  breadCrumbItems: any;
  object: string = 'ministry';
  headers: any[] = [];

  constructor() {
    this.headers = new ConfigClass().getParamsGlobal(this.object, 'header');
    this.breadCrumbItems = [{ label: 'Skote' }, { label: 'Calendar', active: true }];
  }

}
