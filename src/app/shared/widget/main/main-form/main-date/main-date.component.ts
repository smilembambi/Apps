import {Component, EventEmitter, Input, OnInit, Output, SimpleChanges, ViewChild} from '@angular/core';
import {UserService} from "../../../../../features-master/users/services/user.service";
import {MainClass} from "../../../../../core/helpers/class/main.class";
import {ActionClass} from "../../../../../core/helpers/class/action.class";


@Component({
  selector: 'app-main-date',
  templateUrl: './main-date.component.html',
  styleUrls: ['./main-date.component.scss']
})
export class MainDateComponent implements OnInit{
  @Input('isStory') isStory : boolean = false;
  @Input('field') field : any = '';
  @Input('origin') origin : any = '';
  @Input('id') id : any;
  @Input('beginDateDiscount') beginDateDiscount : any;
  @Input('label') label : string = '';
  @Input('size') size : string = "20";
  @Input('state') state : string = 'edit';
  @Input('type') type : string = 'text';
  @Input('defaultDate') defaultDate ;
  @Input('selectionMode') selectionMode : string = 'single';
  @Output('sendField') sendField = new EventEmitter();
  @Output('sendState') sendState = new EventEmitter();
  @Output('sendDepartureDate') sendDepartureDate = new EventEmitter();

  @Input('errors') errors: any[] = [];
  @Output('sendErrors') sendErrors = new EventEmitter();
  @Input('isValidForm') isValidForm: boolean = false;
  @Input('isRequire') isRequire : boolean = false;



  @Input('departureDate') departureDate : string;
  @Input('max') max : any;
  @Input('min') min : any;


  isError: boolean = false;
  message: string = '';
  active: boolean = false;

  @ViewChild('dateFilterId', {}) private dateFilterId: any;

  constructor(private userService: UserService) {
  }
  ngOnInit(): void {

    let currentYear = new Date().getFullYear();
    let currentMonth = new Date().getMonth();
    let currentDay = new Date().getDate();

    if(this.field){
      this.field = new Date(this.field);
    }

    if(this.origin == 'user' ||  (this.origin == 'operator' && this.id =='birthday')  ||  (this.origin == 'driver' && this.id =='birthday')){
      this.max = new Date(currentYear -18, 11, 31);
      this.min = new Date(currentYear -90, 0, 1);
      this.defaultDate = new Date('1988/04/20');
    }

    if(this.origin == 'event'){
      if(this.id == "dateEvent" ){
        this.max = new Date(currentYear +15, currentMonth, currentDay);
        this.min = new Date();
        this.defaultDate = new Date();
      }
    }

    if(this.origin == 'discount' || this.origin == 'promotional'){
      if(this.id == "beginDate"){
        this.max = new Date(currentYear, currentMonth + 6, currentDay);
        this.min = new Date();
        this.defaultDate = new Date();
      }

      if(this.id == "expirationDate"){
        console.log(this.beginDateDiscount)
        //if(this.beginDateDiscount){
          this.max = new Date(currentYear, currentMonth + 6, currentDay);
          this.min = new Date();
          this.defaultDate = new Date();
        //}

      }
    }

    if(this.origin == 'voucher'){
      if(this.id == "expirationDate"){
        this.max = new Date(currentYear, currentMonth+30, currentDay);
        this.min = new Date();
        this.defaultDate = new Date();
      }
    }

    if(this.origin == 'fleet'){
      if(this.id == 'yellowCardLabel' ||
         this.id =='transportAuthorizationLabel' ||
         this.id =='technicalControlExpirationLabel' ||
         this.id == 'assuranceLabel'){
        this.max = new Date(currentYear +15, currentMonth, currentDay);
        this.min = new Date();
        this.defaultDate = new Date();
      }

      if(this.id == "technicalControlLabel"){
        this.max = new Date();
        this.min = new Date(currentYear -2, currentMonth, currentDay);
        this.defaultDate = new Date();
      }
    }

    if(this.origin == 'trip'){
      if(this.id == 'departureDate'){
        this.max = new Date(currentYear, currentMonth+1, currentDay);
        this.min = new Date();
        this.defaultDate = new Date();
      }
      if(this.id == 'arrivalDate'){
        this.max = new Date(currentYear, currentMonth+1, currentDay);
        this.min = new Date();
        this.defaultDate = new Date();
      }
    }

    console.log(this.origin);

    if(this.origin == 'notification'){
      if(this.id == 'durationBegin'){
        this.max = new Date(currentYear+1, currentMonth, currentDay);
        this.min = new Date();
        this.defaultDate = new Date();
      }
      if(this.id == 'durationEnd'){
        this.max = new Date(currentYear+1, currentMonth+1, currentDay);
        this.min = new Date();
        this.defaultDate = new Date();
      }
    }

    if(this.origin == 'under'){
      this.field = this.defaultDate;
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(changes){

      const a = new MainClass().checkErrorField(changes,this.errors,this.isValidForm,this.id);
      this.isError = a['isError'];
      this.message = a['message'];
      if(changes.field?.currentValue == 'Invalid Date'){
        this.field = null;
      }




    }
  }



  /**
   * condition operator type
   */
  conditionOperatorType(){
    let currentYear = new Date().getFullYear();

  }


  /**
   * change field
   * @param $event
   */
  changeField($event: any) {
    console.log($event);
    if(this.isRequireField($event) )this.validField($event);
    else this.createError($event)
    if(this.id == 'departureDate' && $event){
      this.sendDepartureDate.emit($event);
      localStorage.setItem('departureDate',JSON.stringify('departureDate'));
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
   * on select date filter
   */
  onSelectDateFilter() {
    if(this.selectionMode == 'range'){
      if (this.field[1]) this.dateFilterId.overlayVisible=false;
    }
  }

  /**
   * can edit
   */
  canEdit(): boolean {
    return new ActionClass().canEdit(this.origin,this.userService.getUser(), this.isStory);
  }

  /**
   * show time
   */
  showTime() : boolean{
    if((this.origin == 'discount' || this.origin == 'promotional') && (this.id == 'expirationDate' || this.id=='beginDate') )return true;
    return false;
  }
}
