import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

import {UserService} from "../../../../../features-master/users/services/user.service";
import {AllClass} from "../../../../../core/helpers/class/all.class";
import {MainClass} from "../../../../../core/helpers/class/main.class";
import {ActionClass} from "../../../../../core/helpers/class/action.class";

@Component({
  selector: 'app-main-action',
  templateUrl: './main-action.component.html',
  styleUrls: ['./main-action.component.scss']
})
export class MainActionComponent implements OnInit {

  @Input('origin') origin: string;
  @Input('originUser') originUser: string;
  @Input('data') data: any;
  @Output('sendAction')sendAction = new EventEmitter();

  actions: any[]=[];

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    let origin = this.origin;
    if(this.originUser) origin = this.originUser

    this.actions = new MainClass().getParamsGlobal(origin, 'actions');
  }

  /**
   * send action
   * @param label
   */
  sendActionLabel(label: string) {
    this.sendAction.emit(label);
  }


  /**
   * can support
   */
  canSupport() {
    return this.origin == "booking";
  }



  /**
   * can
   * @param action
   */
  can(action: any): boolean {
    return new ActionClass().can(action,this.origin,this.data, this.userService.getUser());
  }
}
