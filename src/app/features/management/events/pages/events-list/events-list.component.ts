import { Component, OnInit } from '@angular/core';
import {ConfigClass} from "../../../../../core/helpers/class/config.class";

@Component({
  selector: 'app-events-list',
  templateUrl: './events-list.component.html',
  styleUrls: ['./events-list.component.scss']
})
export class EventsListComponent  {

  breadCrumbItems: any;
  object: string = 'event';
  headers: any[] = [];

  constructor() {
    this.headers = new ConfigClass().getParamsGlobal(this.object, 'header');
  }

}
