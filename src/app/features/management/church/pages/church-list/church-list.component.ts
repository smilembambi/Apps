import { Component, OnInit } from '@angular/core';
import {ConfigClass} from "../../../../../core/helpers/class/config.class";

@Component({
  selector: 'app-church-list',
  templateUrl: './church-list.component.html',
  styleUrls: ['./church-list.component.scss']
})
export class ChurchListComponent  {

  breadCrumbItems: any;
  object: string = 'church';
  headers: any[] = [];

  constructor() {
    this.headers = new ConfigClass().getParamsGlobal(this.object, 'header');
    this.breadCrumbItems = [{ label: 'Skote' }, { label: 'Calendar', active: true }];
  }



}
