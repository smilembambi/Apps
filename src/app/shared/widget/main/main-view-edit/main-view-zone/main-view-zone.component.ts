import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-main-view-zone',
  templateUrl: './main-view-zone.component.html',
  styleUrls: ['./main-view-zone.component.scss']
})
export class MainViewZoneComponent implements OnInit {
  @Input('object') object : any;
  @Input('origin') origin : string;
  constructor() { }

  ngOnInit(): void {
  }

}
