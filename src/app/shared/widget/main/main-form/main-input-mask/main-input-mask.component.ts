import {Component, EventEmitter, Input, OnInit, Output, SimpleChanges} from '@angular/core';
import {UserService} from "../../../../../features-master/users/services/user.service";
import {MainClass} from "../../../../../core/helpers/class/main.class";
import {ActionClass} from "../../../../../core/helpers/class/action.class";


@Component({
  selector: 'app-main-input-mask',
  templateUrl: './main-input-mask.component.html',
  styleUrls: ['./main-input-mask.component.scss']
})
export class MainInputMaskComponent implements OnInit{
  @Input('isStory') isStory : boolean = false;
  @Input('field') field : any = '';
  @Input('id') id : any = '';
  @Input('origin') origin : any = '';
  @Input('mask') mask : string = '99/99/9999';
  @Input('placeholder') placeholder : string = '99/99/9999';
  @Input('slotChar') slotChar : string = 'jj/mm/aaaa';
  @Input('label') label : string = '';
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

  @Input('seat') seat: number;
  @Output('sendSeat') sendSeat = new EventEmitter();

  isError: boolean = false;
  message: string = '';

  max: number = new Date().getFullYear();
  min: number = 1960;

  constructor(private userService: UserService) {}

  ngOnInit(): void {

    if(this.origin == 'fleet' && (this.id =='commercialSeat' || this.id =='seat')){
      this.max = 9999;
      if(this.id =='commercialSeat')this.max = this.seat;
      this.min = 4;
    }

  }

  ngOnChanges(changes: SimpleChanges): void {

    if(changes){
      const a = new MainClass().checkErrorField(changes,this.errors,this.isValidForm,this.id);
      this.isError = a['isError'];
      this.message = a['message'];

      if(changes.seat){
        if(this.id=='commercialSeat'){
          this.seat = changes.seat.currentValue;
          this.max = this.seat;
        }

      }
    }
  }

  /**
   * change field
   * @param $event
   */
  changeField($event: any) {
    if(this.id=='seat'){
      this.sendSeat.emit(Number($event))
    }

    if($event && (this.id == 'departureTime' || this.id == 'arrivalTime') ){
      const hour = $event.split(':')[0]
      const minute = $event.split(':')[1]

      if(hour && minute && (Number(hour) >=24 || Number(minute) >= 60 )){
        this.createError($event);
        return;
      }
      if( hour?.includes('h') || minute?.includes('m')){
        this.createError($event);
      }

    }

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
