import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild} from '@angular/core';
import {UserService} from "../../../../../features-master/users/services/user.service";
import {Editor} from "primeng/editor";
import {MainClass} from "../../../../../core/helpers/class/main.class";
import {ActionClass} from "../../../../../core/helpers/class/action.class";

@Component({
  selector: 'app-main-editor',
  templateUrl: './main-editor.component.html',
  styleUrls: ['./main-editor.component.scss']
})
export class MainEditorComponent implements OnChanges {
  @Input('isStory') isStory : boolean = false;
  @Input('field') field : any;
  @Input('id') id : any;
  @Input('style') style : any = {'height':'120px'};
  @Input('label') label : string;
  @Input('origin') origin : string;
  @Input('size') size : string = "14";
  @Input('state') state : string = 'edit';
  @Output('sendField') sendField = new EventEmitter();
  @Output('sendState') sendState = new EventEmitter();
  @Input('errors') errors: any[] = [];
  @Output('sendErrors') sendErrors = new EventEmitter();
  @Input('isValidForm') isValidForm: boolean = false;
  @Input('isRequire') isRequire : boolean = false;

  isError: boolean = false;
  message: string = '';
  limitLetter: number = 200;

  constructor(private userService: UserService) {}
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
    this.validField($event);
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
    this.errors = new MainClass().createError($event, this.label,this.id);
    this.isError = true;
    this.sendErrors.emit(this.errors);
  }

  /**
   * can edit
   */
  canEdit(): boolean {
    return new ActionClass().canEdit(this.origin,this.userService.getUser(), this.isStory);
  }

  getNumberLetter(): number {
    if(!this.field?.length) return 0;
   return  this.field?.length-7;
  }

  deleteLetter() {
    if(this.origin == 'notification' && this.field?.length-7 > this.limitLetter){
      this.field = this.field.slice(0,this.limitLetter);
    }
  }
}
