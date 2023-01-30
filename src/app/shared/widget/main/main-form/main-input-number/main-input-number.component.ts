import {Component, EventEmitter, Input, OnInit, Output, SimpleChanges} from '@angular/core';

import {UserService} from "../../../../../features-master/users/services/user.service";
import {PLATFORM} from "../../../../../core/helpers/params/params-api.routes";
import {MainClass} from "../../../../../core/helpers/class/main.class";
import {ActionClass} from "../../../../../core/helpers/class/action.class";


@Component({
  selector: 'app-main-input-number',
  templateUrl: './main-input-number.component.html',
  styleUrls: ['./main-input-number.component.scss']
})
export class MainInputNumberComponent  {
  @Input('isStory') isStory : boolean = false;
  @Input('field') field : any = '';
  @Input('value') value : any = '';
  @Input('id') id : any;
  @Input('objectId') objectId : any;
  @Input('label') label : string = '';
  @Input('origin') origin : string = '';
  @Input('size') size : string = "20";
  @Input('minFractionDigits') minFractionDigits : number = 0;
  @Input('state') state : string = 'edit';
  @Input('type') type : string = 'string';
  @Input('icon') icon : string = 'string';
  @Output('sendField') sendField = new EventEmitter();
  @Output('sendState') sendState = new EventEmitter();

  @Input('errors') errors: any[] = [];
  @Output('sendErrors') sendErrors = new EventEmitter();
  @Input('isValidForm') isValidForm: boolean = false;
  @Input('isRequire') isRequire : boolean = false;
  @Input('disabled') disabled : boolean = false;
  @Input('readOnly') readOnly : boolean = false;
  @Input('max') max : any ;


  isError: boolean = false;
  message: string = '';

  constructor(private userService: UserService) {}

  ngOnInit(){

    if(this.origin == 'trip' && this.field){
      setTimeout(() => {
        if(this.id == 'initialLuggage' && !this.objectId) this.field = 23
        if(this.id == 'maxLuggage' && !this.objectId)this.field = 2;
        if(this.id == 'maxWeightLuggage' && !this.objectId)this.field = 42;
        if(this.id == 'maxWeightLuggage' && !this.objectId)this.field = 42;
        if(this.id == 'handLuggage' && !this.objectId)this.field = 10;
        if(this.id == 'maxHeightHandLuggage' && !this.objectId)this.field = 60;
        if(this.id == 'maxWidthHandLuggage' && !this.objectId)this.field = 60;
        if(this.id == 'costLuggageSupKg' && !this.objectId)this.field = 1200;
        this.changeField(this.field);
      }, 500);
    }

    if(this.origin == "voucher" && this.id =='price'){
      console.log("V", this.value)
      console.log("F", this.field)
      if(PLATFORM == 'Seller'){
        this.max = 1000;
      }else{
        this.max = 10000;
      }
    }
    if(!this.objectId) {
      this.field = null;
      // if(this.origin == 'discount' && this.id == 'amount') this.field = 0
      // if(this.origin == 'discount' && this.id == 'percent') this.field = 10

      setTimeout(() => {
        this.validField(this.field);
      }, 500);
    }else{
      console.log(this.field)
      this.field = this.value ;
      console.log(this.value)
      setTimeout(() => {
        this.validField(this.field);
      }, 500);

    }
  }


  ngOnChanges(changes: SimpleChanges): void {
    if(this.origin == 'trip' && changes.value?.currentValue != undefined){
      if(this.id == 'initialLuggage' && changes.value ) this.field = changes.value.currentValue;
      if(this.id == 'maxLuggage' && changes.value) this.field = changes.value.currentValue;
      if(this.id == 'maxWeightLuggage' && changes.value) this.field = changes.value.currentValue;
      if(this.id == 'handLuggage' && changes.value) this.field = changes.value.currentValue;
      if(this.id == 'maxHeightHandLuggage' && changes.value) this.field = changes.value.currentValue;
      if(this.id == 'maxWidthHandLuggage' && changes.value) this.field = changes.value.currentValue;
      if(this.id == 'costLuggageSupKg' && changes.value) this.field = changes.value.currentValue;

      setTimeout(() => {
        this.changeField(this.field);
      }, 1000);

    }

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
    if(this.isRequireField($event) )this.validField($event);
    else this.createError($event);
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
   * is require field
   * @param $event
   */
  isRequireField($event): boolean{
    if(!this.isRequire) return true;
    return !($event == '' || $event == null);
  }

  /**
   * valid field
   * @param $event
   */
  validField($event){
    console.log(this.id)
    this.errors = new MainClass().validField(this.errors, this.id);
    this.isError = false;
    this.sendErrors.emit(this.errors);
    console.log(this.errors)
    this.sendField.emit($event);
  }

  /**
   * create error
   * @param $event
   */
  createError($event){
    this.errors = new MainClass().createError($event, this.id,this.errors);
    this.isError = true;
    this.sendErrors.emit(this.errors);
  }

  /**
   * can edit
   */
  canEdit(): boolean {
    return new ActionClass().canEdit(this.origin,this.userService.getUser(), this.isStory);
  }
}
