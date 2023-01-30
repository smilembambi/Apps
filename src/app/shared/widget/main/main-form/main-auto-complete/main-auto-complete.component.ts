import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {UserService} from "../../../../../features-master/users/services/user.service";
import {MainClass} from "../../../../../core/helpers/class/main.class";
import {ActionClass} from "../../../../../core/helpers/class/action.class";


@Component({
  selector: 'app-main-auto-complete',
  templateUrl: './main-auto-complete.component.html',
  styleUrls: ['./main-auto-complete.component.scss']
})
export class MainAutoCompleteComponent implements OnInit, OnChanges {
  @Input('field') field : any;
  @Input('isStory') isStory : boolean = false;
  @Input('id') id : any;
  @Input('multiple') multiple : boolean = false;
  @Input('origin') origin :string;
  @Input('state') state : string = "edit";
  @Input('options') options : any[] = [];
  @Input('label') label : string;
  @Input('source') source : string;
  @Input('size') size : string = "20";
  @Input('action') action : boolean = false;
  @Input('disabled') disabled : boolean = false;
  @Output('sendField') sendField = new EventEmitter();
  @Output('sendState') sendState = new EventEmitter();

  @Input('errors') errors: any[] = [];
  @Output('sendErrors') sendErrors = new EventEmitter();
  @Input('isValidForm') isValidForm: boolean = false;
  @Input('isRequire') isRequire : boolean = false;

  filtered: any[] = [];

  isError: boolean = false;
  message: string = '';
  constructor(private userService: UserService) {
  }

  ngOnInit(): void {

  }

  ngOnChanges(changes: SimpleChanges): void {

    if(changes){
      const a = new MainClass().checkErrorField(changes,this.errors,this.isValidForm,this.id);
      this.isError = a['isError'];
      this.message = a['message'];

      /** get options when changed **/
      if(changes.options)this.options = changes.options.currentValue;


      /** when field changed **/
      if(changes.field && changes.field.currentValue ) this.changeField(changes.field.currentValue);

    }
  }


  /**
   * change field
   * @param $event
   */
  changeField($event: any) {

    if($event && $event.length > 1){

      if ($event instanceof Array) {
        const index  = $event?.findIndex(el=>el._id == 'all');

        if(index != -1) {
          if($event[index]._id == $event[$event.length -1]._id) $event = [$event[index]];
          else $event.splice(index, 1);
        }
      }

    }

    if(this.isRequireField($event)){
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
   * filter
   * @param event
   */
  filter(event) {
    //in a real application, make a request to a remote url with the query and return filtered results, for demo we filter at client side
    let filtered : any[] = [];
    let query = event.query;
    if(this.options?.length > 0) {
      for (let i = 0; i < this.options?.length; i++) {
        let item = this.options[i];
        if (this.source == 'country' || this.field == 'country' ) {

          if(item?.toLowerCase().includes(query.toLowerCase())){
            filtered.push(item);
          }

          // if (item?.toLowerCase().indexOf(query.toLowerCase()) == 0) {
          //
          // }
        }
        if (this.source != 'country' ) {
          if(item?.label?.toLowerCase().includes(query.toLowerCase())){
            filtered.push(item);
          }
        }

      }
    }
    this.filtered = filtered;
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

  getMultiple() : boolean {
    if(this.origin == 'voucher' && this.id =='operators') return true;
    if(this.origin == 'operator' && this.id=='transportTypes')return true;
    if(this.origin == 'operator' && this.id=='services')return true;
    if(this.origin == 'operator' && this.id=='operators')return true;
    return false;
  }


  clearItem(autoOne: any) {
    autoOne.value = '';
    autoOne.handleDropdownClick();
  }


  getReadonly(): boolean {
    if(this.id == 'operatorType' ) return true
    return  false;
  }

  /**
   * get size auto complete
   */
  getSizeAutoComplete(): string {
    if(this.origin == 'voucher' && this.id == 'operators') return "100"
    if(this.id == 'pathSelect') return '30';
    else{
      if(this.action)return'75';
      return '100';
    }

  }

  /**
   * can edit
   */
  canEdit(): boolean {
    return new ActionClass().canEdit(this.origin,this.userService.getUser(), this.isStory);
  }
}
