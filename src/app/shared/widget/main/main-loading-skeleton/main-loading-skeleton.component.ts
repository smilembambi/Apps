import {Component, Input, OnInit} from '@angular/core';
import {MainClass} from "../../../../core/helpers/class/main.class";
import {AllClass} from "../../../../core/helpers/class/all.class";


@Component({
  selector: 'app-main-loading-skeleton',
  templateUrl: './main-loading-skeleton.component.html',
  styleUrls: ['./main-loading-skeleton.component.scss']
})
export class MainLoadingSkeletonComponent implements OnInit {
  @Input('origin') origin : string;
  @Input('paginator') paginator : boolean = true;
  @Input('headers') headers: any[];
  objects: any[] = new MainClass().getTemplateData();
  _selectedColumns

  constructor() { }

  ngOnInit(): void {
    this._selectedColumns = this.headers;
  }

  /**
   * get size
   * @param col
   */
  getSize(col: any):string {
    return new MainClass().getSizeColumn(col);
  }

  getSizeActions(): string {
    return new MainClass().getSizeActions(this.origin);
  }
}
