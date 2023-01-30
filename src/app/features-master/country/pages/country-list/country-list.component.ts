import { Component, OnInit } from '@angular/core';
import {ConfigClass} from "../../../../core/helpers/class/config.class";

@Component({
  selector: 'app-country-list',
  templateUrl: './country-list.component.html',
  styleUrls: ['./country-list.component.scss']
})
export class CountryListComponent{

  breadCrumbItems: any;
  object: string = 'country';
  headers: any[] = [];

  constructor() {
    this.headers = new ConfigClass().getParamsGlobal(this.object, 'header');
    this.breadCrumbItems = [{ label: 'Skote' }, { label: 'Calendar', active: true }];
  }

}
