import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {UserService} from "../../../../../features-master/users/services/user.service";
import {MainClass} from "../../../../../core/helpers/class/main.class";
import {ActionClass} from "../../../../../core/helpers/class/action.class";


@Component({
  selector: 'app-main-select',
  templateUrl: './main-select.component.html',
  styleUrls: ['./main-select.component.scss']
})
export class MainSelectComponent implements OnInit, OnChanges {
  @Input('isStory') isStory : boolean = false;
  @Input('id') id : any;
  @Input('field') field : any;
  @Input('value') value : any;
  @Input('objectId') objectId : any;
  @Input('origin') origin : any;
  @Input('editable') editable : boolean = false;
  @Input('state') state : string = "edit";
  @Input('options') options : any[] = [];
  @Input('label') label : string;
  @Input('size') size : string = "20";
  @Input('action') action : boolean = false;
  @Input('disabled') disabled : boolean = false;
  @Output('sendField') sendField = new EventEmitter();
  @Output('sendState') sendState = new EventEmitter();
  @Output('sendMark') sendMark = new EventEmitter();
  @Input('errors') errors: any[] = [];
  @Output('sendErrors') sendErrors = new EventEmitter();
  @Input('isValidForm') isValidForm: boolean = false;
  @Input('isRequire') isRequire : boolean = false;

  isError: boolean = false;
  message: string = '';

  optionBase: any[] = [];

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    if(this.id=="departureTime" && !this.field) this.field = '06:00';
    if(this.id=="arrivalTime" && !this.field) this.field = '06:00';
    this.field;
    if(!this.objectId){
      setTimeout( () => {
        if(this.field) this.changeField(this.value);
      }, 2000);
    }else{
      if(this.field) this.changeField(this.value);
    }

    if(this.id == 'mark'){
      this.optionBase = this.options.slice();
      this.options = this.options.map(el=>{ return el.label});
    }


  }

  ngDoCheck(){

  }
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
    let f;


    if(this.editable == true && this.id =='mark') {
      f = $event;
      this.sendMark.emit($event);
    }
    else {
      f = $event;
      //f = this.value;
    }

    if(this.isRequireField(f) )this.validField(f);
    else this.createError(f);
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
    if(!this.isRequire){
      return true;
    }else{
      return ($event != '' || $event != undefined)
    }
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
   * can edit
   */
  canEdit(): boolean {
    return new ActionClass().canEdit(this.origin,this.userService.getUser(), this.isStory);
  }

}
