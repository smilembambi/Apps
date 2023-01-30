import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges
} from '@angular/core';

import {UserService} from "../../../../../features-master/users/services/user.service";
import {AllClass} from "../../../../../core/helpers/class/all.class";
import {MainClass} from "../../../../../core/helpers/class/main.class";
import {ActionClass} from "../../../../../core/helpers/class/action.class";



@Component({
  selector: 'app-main-input',
  templateUrl: './main-input.component.html',
  styleUrls: ['./main-input.component.scss']
})
export class MainInputComponent implements OnInit, OnChanges {
  @Input('field') field : any = '';
  @Input('isStory') isStory : boolean = false;
  @Input('id') id : any;
  @Input('objectId') objectId : any;
  @Input('label') label : string = '';
  @Input('origin') origin : string = '';
  @Input('size') size : string = "20";
  @Input('state') state : string = 'edit';
  @Input('type') type : string = 'string';
  @Output('sendField') sendField = new EventEmitter();
  @Output('sendState') sendState = new EventEmitter();

  @Input('errors') errors: any[] = [];
  @Output('sendErrors') sendErrors = new EventEmitter();
  @Input('isValidForm') isValidForm: boolean = false;
  @Input('isRequire') isRequire : boolean = false;
  @Input('disabled') disabled : boolean = false;
  @Input('readOnly') readOnly : boolean = false;
  @Input('max') max : any ;
  @Input('maxlength') maxlength : any = "50" ;


  isError: boolean = false;
  message: string = '';
  constructor(private userService: UserService) {}

  ngOnInit(): void {
   if(!this.objectId && (this.origin == 'discount' || this.origin == 'promotional' ) && this.id == 'code'){
     let prefix = '';
     if(this.origin == 'discount') prefix = 'DI-';
     else prefix = 'PR';
     this.field = prefix + new AllClass().makeCode(6);
     setTimeout(() => {
      this.validField(this.field);
     }, 500);
   }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(changes){
      const a = new MainClass().checkErrorField(changes,this.errors,this.isValidForm,this.id);
      this.isError = a['isError'];
      this.message = a['message'];
    }
    if(this.id =="template"){
      setTimeout(() => {
       // this.field = this.pathSelected.origin.label + ">>>" + this.pathSelected.destination.label + ">>>"+this.pathSelected.departureTime;
       // this.changeField(this.field);
        }, 500);
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
   * change field
   * @param $event
   */
  changeFieldCheckBox($event: any){
    this.sendField.emit($event);
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
    this.errors = new MainClass().createError($event, this.id,this.errors);
    this.isError = true;
    this.sendErrors.emit(this.errors);
  }

  /**
   * get max length
   */
  getMaxLength(): string{
    if(this.id=='legalRegistrationNumberLabel' || this.id == 'scienLabel' || this.id == 'scietLabel') return "20"
    return this.maxlength;
  }

  /**
   * can edit
   */
  canEdit(): boolean {
    return new ActionClass().canEdit(this.origin,this.userService.getUser(), this.isStory);
  }


}
