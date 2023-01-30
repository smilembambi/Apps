import {Component} from '@angular/core';
import {ConfigClass} from "../../../../../core/helpers/class/config.class";

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.scss']
})
export class MemberListComponent {

  breadCrumbItems: any;
  object: string = 'user';
  headers: any[] = [];

  constructor() {
    this.headers = new ConfigClass().getParamsGlobal(this.object, 'header');
  }
}
