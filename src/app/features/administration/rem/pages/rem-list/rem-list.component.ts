import { Component, OnInit } from '@angular/core';
import {ConfigClass} from "../../../../../core/helpers/class/config.class";

@Component({
  selector: 'app-rem-list',
  templateUrl: './rem-list.component.html',
  styleUrls: ['./rem-list.component.scss']
})
export class RemListComponent  {

  breadCrumbItems: any;
  object: string = 'user';
  headers: any[] = [];

  constructor() {
    this.headers = new ConfigClass().getParamsGlobal('rem', 'header');
    this.breadCrumbItems = [{ label: 'Skote' }, { label: 'Calendar', active: true }];
  }
}
