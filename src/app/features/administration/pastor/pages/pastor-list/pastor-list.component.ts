import { Component, OnInit } from '@angular/core';
import {ConfigClass} from "../../../../../core/helpers/class/config.class";

@Component({
  selector: 'app-pastor-list',
  templateUrl: './pastor-list.component.html',
  styleUrls: ['./pastor-list.component.scss']
})
export class PastorListComponent  {

  breadCrumbItems: any;
  object: string = 'user';
  headers: any[] = [];

  constructor() {
    this.headers = new ConfigClass().getParamsGlobal('pastor', 'header');
    this.breadCrumbItems = [{ label: 'Skote' }, { label: 'Calendar', active: true }];
  }
}
