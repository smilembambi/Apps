import {Component, EventEmitter, Input, OnChanges, Output, SimpleChanges} from '@angular/core';

import {UserService} from "../../../../../features-master/users/services/user.service";
import {MainClass} from "../../../../../core/helpers/class/main.class";
import {AllClass} from "../../../../../core/helpers/class/all.class";
import {FIELD_MAIL} from "../../../../../core/helpers/params/params-message";
import {ActionClass} from "../../../../../core/helpers/class/action.class";


@Component({
  selector: 'app-main-input-email',
  templateUrl: './main-input-email.component.html',
  styleUrls: ['./main-input-email.component.scss']
})
export class MainInputEmailComponent implements  OnChanges {
  @Input('field') field: any = '';
  @Input('isStory') isStory : boolean = false;
  @Input('origin') origin: any = '';
  @Input('id') id : any;
  @Input('isValidForm') isValidForm: boolean = false;
  @Input('label') label: string = '';
  @Input('size') size: string = "20";
  @Input('isRequire') isRequire : boolean = false;
  @Input('state') state: string = 'edit';
  @Output('sendField') sendField = new EventEmitter();
  @Output('sendState') sendState = new EventEmitter();
  @Input('errors') errors: any[] = [];
  @Output('sendErrors') sendErrors = new EventEmitter();
  @Output('sendCheckEmail') sendCheckEmail = new EventEmitter();

  isEmailChange:boolean = false;
  hasEmailExist: boolean = false;

  constructor(private userService: UserService) {
  }

  isError: boolean = false;
  message: string = '';

  ngOnChanges(changes: SimpleChanges): void {
    if(changes){
       const a = new MainClass().checkErrorField(changes,this.errors,this.isValidForm,this.id);
       this.isError = a['isError'];
       this.message = a['message'];
    }
  }

  /**
   * change field
   * @param $event
   */
  changeField($event: any) {
    this.isEmailChange = true;
    this.sendCheckEmail.emit(true);

    if(this.isRequireField($event) )this.validField($event);
    else if(this.isEmail($event))this.validField($event);
    else this.createError($event);

  }

  /**
   * is email
   * @param $event
   */
  isEmail($event):boolean{
    return new AllClass().isEmail($event);
  }

  /**
   * is require field
   * @param $event
   */
  isRequireField($event): boolean{
    return (($event == '' || $event == undefined || false) && !this.isRequire)
  }

  /**
   * valid field
   * @param $event
   */
  validField($event){
    this.errors = new MainClass().validField(this.errors, this.id);
    this.isError = false;
    this.sendErrors.emit(this.errors);
    this.sendField.emit($event);
  }

  /**
   * create error
   * @param $event
   */
  createError($event){
    this.errors = new MainClass().createError($event, this.id,this.errors,'email');
    this.isError = true;
    this.sendErrors.emit(this.errors);
  }

  /**
   * change state
   */
  changeState() {
    if(!this.canEdit()) return;
    this.state = 'edit';
    this.sendState.emit(this.state);
  }

  /**
   * check email
   */
  checkEmail() {
    if(this.origin =='operator' && this.id=='emailOperator' && this.isEmailChange && this.field != ''){
      this.checkUserOperator(this.field);
    }

    if(this.origin =='operator' && this.id=='emailUser' && this.isEmailChange && this.field != ''){
      this.checkUserEmail(this.field);
    }

    if(this.origin =='user' && this.id=='emailUser' && this.isEmailChange && this.field != ''){
      this.checkUserEmail(this.field);
    }

    if((this.origin =='user' || this.origin == 'driver') && this.id=='email' && this.isEmailChange && this.field != ''){
      this.checkUserEmail(this.field);
    }
  }

  /**
   * operator check
   * @param email
   */
  checkUserOperator(email){
      this.hasEmailExist = false;
      email = email?.trim();
      this.sendCheckEmail.emit(true);

  }


  /**
   * user check
   * @param email
   */
  checkUserEmail(email){

    if(!(new AllClass().validateEmail(email))) {
      this.message = FIELD_MAIL;
      this.isError = true;
      return;
    }

    if(this.isEmailChange){
      this.hasEmailExist = false;
      email = email.trim();
      this.sendCheckEmail.emit(true);


    }
  }

  /**
   * can edit
   */
  canEdit(): boolean {
    return new ActionClass().canEdit(this.origin,this.userService.getUser(), this.isStory);
  }

}
