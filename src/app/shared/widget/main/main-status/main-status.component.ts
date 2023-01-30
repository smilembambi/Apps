import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-main-status',
  templateUrl: './main-status.component.html',
  styleUrls: ['./main-status.component.scss']
})
export class MainStatusComponent implements OnInit {
  @Input('status') status: any;
  @Input('origin') origin: string;
  constructor() { }

  ngOnInit(): void {
  }

}
