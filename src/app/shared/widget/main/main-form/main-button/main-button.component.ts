import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-main-button',
  templateUrl: './main-button.component.html',
  styleUrls: ['./main-button.component.scss']
})
export class MainButtonComponent implements OnInit {

  @Input('label') label : string;
  @Input('icon') icon : string;
  @Input('typeIcon') typeIcon : string =  "pi";
  @Input('sizeButton') sizeButton : string = "btn-xs";
  @Input('positionIcon') positionIcon : string = 'left';
  @Input('loading') loading : boolean = false;
  @Input('disabled') disabled : boolean = false;
  @Input('sizeIcon') sizeIcon : string = "11";
  @Input('class') class : string; //btn-primary
  @Output('sendAction') sendAction = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  /**
   * execute action
   */
  executeAction() {
    this.sendAction.emit(true);
  }
}
