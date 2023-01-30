import { Component, OnInit } from '@angular/core';
import {ConfigClass} from "../../../../../core/helpers/class/config.class";

@Component({
  selector: 'app-star-list',
  templateUrl: './star-list.component.html',
  styleUrls: ['./star-list.component.scss']
})
export class StarListComponent  {

  breadCrumbItems: any;
  object: string = 'user';
  headers: any[] = [];

  constructor() {
    this.headers = new ConfigClass().getParamsGlobal('star', 'header');
    this.breadCrumbItems = [{ label: 'Skote' }, { label: 'Calendar', active: true }];
  }

}
