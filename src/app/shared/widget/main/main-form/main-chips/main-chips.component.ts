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
import {MainClass} from "../../../../../core/helpers/class/main.class";
import {ActionClass} from "../../../../../core/helpers/class/action.class";

@Component({
  selector: 'app-main-chips',
  templateUrl: './main-chips.component.html',
  styleUrls: ['./main-chips.component.scss']
})
export class MainChipsComponent {
  @Input('isStory') isStory : boolean = false;
  @Input('options') options : any[] = [];
  @Input('field') field ;
  @Input('value') value : any = [];
  @Input('id') id : any;
  @Input('objectId') objectId : any;
  @Input('origin') origin : string;
  @Input('source') source : string;
  @Input('state') state : string = "edit";
  @Input('label') label : string;
  @Input('size') size : string = "20";
  @Input('action') action : boolean = false;
  @Output('sendField') sendField = new EventEmitter();
  @Output('sendState') sendState = new EventEmitter();
  @Input('errors') errors: any[] = [];
  @Output('sendErrors') sendErrors = new EventEmitter();
  @Input('isValidForm') isValidForm: boolean = false;
  @Input('isRequire') isRequire : boolean = false;

  @Input('access') access : string[];

  constructor(private userService: UserService,
              private cdr: ChangeDetectorRef) {
  }

  isError: boolean = false;
  message: string = '';

  ngOnInit(){
    //change staffs
    this.setValueOn('staffs');

    //change access
    this.setValueOn('access');

    //change service
    this.setValueOn('onBoardServices');
  }


  ngOnChanges(changes: SimpleChanges){

    console.log(changes);
    if( changes.options?.currentValue){
      this.options = changes.options?.currentValue;
    }

    if(changes.field?.currentValue) {
      this.value = changes.field?.currentValue
      this.field = changes.field?.currentValue

      this.changeField(this.field);
      this.cdr.detectChanges();
      console.log(this.field)
    }



  }

  /**
   * set value On
   * @param id
   */
  setValueOn(id){
    //change service

    if(this.id == id && this.field && this.id != 'access'){
      let a : any[] = this.field;
      if(!this.objectId)a = [];

      let fieldId = a.map(el=>{  return el._id });
      this.field = [];
      this.options.forEach(el=>{
        if(fieldId.includes(el?._id)){
          this.field.push(el);
          setTimeout( () => {
            this.changeField(this.field);
          }, 1000);
        }
      })
    }

    if(this.id == id && this.field && this.id == 'access'){
      let a : any[] = this.field;
      if(!this.objectId)a = [];
      this.field = [];
      this.options.forEach(el=>{
        if(a.includes(el)){
          this.field.push(el);
          setTimeout( () => {
            this.changeField(this.field);
          }, 1000);
        }
      })
    }
  }



  /**
   * change field
   * @param $event
   */
  changeField($event: any) {
    if(this.isRequireField($event) ){
      this.validField($event);
    }else{
      this.createError($event);
    }
  }


  /**
   * change state
   */
  changeState() {
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
    this.errors = new MainClass().createError($event, this.id,this.errors,'email');
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
