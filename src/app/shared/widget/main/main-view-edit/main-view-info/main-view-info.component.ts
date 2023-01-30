import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-main-view-info',
  templateUrl: './main-view-info.component.html',
  styleUrls: ['./main-view-info.component.scss']
})
export class MainViewInfoComponent implements OnInit {
  @Input('label') label : string = '';
  @Input('field') field : string = '';
  @Input('size') size : string = "20";

  constructor() { }

  ngOnInit(): void {
  }

}
