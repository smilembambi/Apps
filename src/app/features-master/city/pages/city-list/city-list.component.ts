import {Component} from '@angular/core';
import {ConfigClass} from "../../../../core/helpers/class/config.class";


@Component({
  selector: 'app-city-list',
  templateUrl: './city-list.component.html',
  styleUrls: ['./city-list.component.scss']
})
export class CityListComponent {
  breadCrumbItems: any;
  object: string = 'city';
  headers: any[] = [];

  constructor() {
    this.headers = new ConfigClass().getParamsGlobal(this.object, 'header');
    this.breadCrumbItems = [{ label: 'Skote' }, { label: 'Calendar', active: true }];
  }
}
