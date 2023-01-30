import {ChangeDetectorRef, Component, EventEmitter, Input, Output, SimpleChanges, ViewChild} from '@angular/core';
import {GroupFormModel} from "../../../../core/models/natural-model/group-form.model";
import {FormModel} from "../../../../core/models/natural-model/form.model";
import {URL_API} from "../../../../core/helpers/params/params-api.routes";
import {MainClass} from "../../../../core/helpers/class/main.class";
import {ChurchModel} from "../../../../features/management/church/models/church.model";
import {CityModel} from "../../../../features-master/city/models/city.model";
import {CountryModel} from "../../../../features-master/country/models/country.model";
import {TypeEventModel} from "../../../../features/management/events/models/type-event.model";
import {TIMES} from "../../../../core/helpers/constancy/times.constancy";
import {MinistryModel} from "../../../../features/administration/ministry/models/ministry.model";
import {UserModel} from "../../../../features-master/users/models/user.model";


@Component({
  selector: 'app-main-form',
  templateUrl: './main-form.component.html',
  styleUrls: ['./main-form.component.scss']
})
export class MainFormComponent{

  @Input('origin') origin: string;
  @Input('groupForms') groupForms: GroupFormModel[];

  @Input('objectId') objectId: any;
  @Input('isValidForm') isValidForm: boolean = false;
  @Output('sendHeader') sendHeader = new EventEmitter();


  @Input('form') form: FormModel;
  @Output('sendForm') sendForm = new EventEmitter();

  @Input('errors') errors: any[] = [];
  @Output('sendErrors') sendErrors = new EventEmitter();

  @Input('state') state: string = 'edit';
  @Output('sendState') sendState = new EventEmitter();

  @Output('sendCheckEmail') sendCheckEmail = new EventEmitter();

  @Input('role') role: string ;
  @Input('parentId') parentId: string ;
  @Input('parent') parent: ChurchModel ;


  @ViewChild('mainChips') mainChips;


  @Input('listChurches') listChurches: ChurchModel[] = [];
  @Input('listTypeEvents') listTypeEvents: TypeEventModel[] = [];
  @Input('cities') cities: CityModel[] = [];
  @Input('users') users: UserModel[] = [];
  @Input('ministries') ministries: MinistryModel[] = [];
  @Input('countries') countries: CountryModel[] = [];
  @Input('typeChurches') typeChurches: string[] = [];

  @Input('typeChurch') typeChurch : string;
  @Output('sendTypeChurch') sendTypeChurch  = new EventEmitter();
  @Output('sendIsStar') sendIsStar  = new EventEmitter();

  // under trip action
  @Input('isStory') isStory : boolean = false;
  @Input('isStar') isStar : any = "Non";

  url: string = URL_API.baseUrlFiles;
  errorImg: string = "assets/images/man-avatar-icon-flat-.jpg";

  @Input('church') church: ChurchModel;
  @Input('churchSelected') churchSelected: ChurchModel;
  @Output('sendChurch') sendChurch  = new EventEmitter();
  @Output('sendChurchSelected') sendChurchSelected  = new EventEmitter();

  @Input('ministriesMember') ministriesMember : MinistryModel[];
  @Output('sendMinistriesMember') sendMinistriesMember  = new EventEmitter();

  /*** The selected country ***/
  @Input('countrySelected') countrySelected : CountryModel;
  @Output('sendCountrySelected') sendCountrySelected  = new EventEmitter();

  /*** The selected church parent ***/
  @Input('parentChurchSelected') parentChurchSelected : ChurchModel;
  @Output('sendParentChurchSelected') sendParentChurchSelected  = new EventEmitter();

  constructor() {
  }

  ngOnChanges(changes: SimpleChanges){

    if(this.form.id == 'parent'){
      this.form.options = this.listChurches;
      if(this.parentId){
        this.form.value = this.listChurches.find(el=> el._id == this.parentId);
      }
    }

    /** manage autocomplete cities **/
    if(this.form.id == 'city' ){
      let cities = this.cities;

      /** select cities from the parent **/
      if(this.parent?._id && this.origin == 'church'){
        //cities = cities.filter(el=> el.country?._id == this.parent?.countryChurch?._id )
      }
      if(this.origin == "user" && this.churchSelected){
        cities = cities.filter(el=> el._id == this.churchSelected.city._id )
      }
      this.form.options = cities;
    }

    if(this.form.id == 'countryChurch') this.form.options = this.countries;
    if(this.form.id == 'church') {
      if(this.origin == 'user') this.form.options = this.listChurches.filter(el=> el.typeChurch == 'Eglise de maison');
      else this.form.options = this.listChurches;
    }
    if(this.form.id == 'typeChurch')this.form.options = this.typeChurches;
    if(this.form.id == 'ministry')this.form.options = this.ministries;
    if(this.form.id == 'ministries')this.form.options = this.ministries;
    if(this.form.id == 'user' || this.form.id == 'subManager' || this.form.id == 'manager' )this.form.options = this.users;
    if(this.form.id == 'typeEvent')this.form.options = this.listTypeEvents;
    if(this.form.id == 'timeEvent')this.form.options = TIMES;

  }

  ngOnDestroy(){

  }

  /******* Select *********/
  checkSelect($event: any) {
    this.form.value = $event;

    if(this.form.id == 'typeChurch'){
      this.typeChurch = $event;
      this.sendTypeChurch.emit(this.typeChurch)
    }

    if(this.form.id == 'isStar'){
      this.isStar = $event;
      this.sendIsStar.emit(this.isStar)
    }
    this.sendForm.emit(this.form);
  }

  /******* autocomplete, chips, date *********/
  change($event) {

    // if(this.form.type == "autocomplete" && this.form.multiple){
    //   $event = $event.filter((elem, index, self) => {
    //     return self.indexOf(elem) === index;
    //   });
    // }
    this.form.value = $event;



    /** church **/
    if(this.origin == "church"){


      if(this.form.id == 'church' ){
        this.church = $event;
        this.sendChurch.emit($event);
      }

      /** when is the country church**/
      if(this.form.id == "countryChurch"){
        this.countrySelected = $event;
        this.sendCountrySelected.emit(this.countrySelected);
      }

      /** when is church parent and level superior at 0 **/
      if(this.form.id == "parent" && $event){
        console.log($event);
        if($event.level >  0){
          console.log($event);
          this.parentChurchSelected = $event;
          this.sendParentChurchSelected.emit(this.parentChurchSelected);
        }

      }

    }


    /** user **/
    if(this.origin == "user"){
      if(this.form.id == "church"){
        this.churchSelected = $event;
        this.sendChurchSelected.emit($event)
      }
    }

    /** Star **/
    if(this.origin == "star"){
      if(this.form.id == "user"){
        this.ministriesMember = $event.ministries;
        this.sendMinistriesMember.emit(this.ministriesMember);
      }
    }


    if(this.form.isRequire && ($event == '' || $event == null) ){

      this.errors = new MainClass().createError($event, this.form.id, this.errors);
      this.sendErrors.emit(this.errors);
    }else this.sendForm.emit(this.form);

  }



  /**
   * change header
   */
  changeHeader($event = '') {
    this.state=$event;
    this.sendState.emit(this.state);
    this.sendHeader.emit(true);
  }


  /**
   * get file
   * @param $event
   */
  getFile($event: any) {
    let errors = this.errors.map(e=> e.label);
    //this.sendFile.emit($event);
  }


  getDate(): Date {
    return new Date();
  }

  getCheckEmail($event: any) {
    this.sendCheckEmail.emit($event);
  }


  getDisabled(): boolean {
    return false
  }



  /**
   * is input
   */
  isInput(): boolean {
     return true;
  }

  /**
   * is date
   */
  isDate(): boolean {
    //trip
    return true;
  }

  /**
   * is date require
   */
  isDateRequire(): boolean {
    if(this.origin != 'notification') return this.form.isRequire;
    return true;
  }

  /**
   * is auto complete
   */
  isAutocomplete() : boolean{
    if(this.origin == 'user' && this.form.id=='ministries' && this.isStar == "Non") return false;
    if(this.origin == 'church'  && this.form.id == 'church' &&  !this.church) return false;
    return true;
  }


  isInputFile(): boolean {

    return true;
  }

  isInputMask() : boolean{

    return true;
  }




  /**
   * is select
   */
  isSelect(): boolean {



    return true;
  }

  isAutocompleteDisabled() {
    if(this.form.id == 'parent' && this.parentId) return true
    return false;
  }



  /**
   * is editor
   */
  isEditor() {

    return true;
  }

  getSelectMode(): string {
    return 'single';
  }

  isInputNumber() : boolean {
    return true;
  }


  isPhone() {
    if(this.form.id == 'smsNumber' && this.typeChurch != "Eglise de maison") return false
    return true;
  }

  isChips() : boolean {
    if(this.origin == 'user' && this.form.id=='ministries' && this.isStar == "Non") return false;
    if(this.origin == 'member' && this.form.id=='ministries' && this.isStar == "Non") return false;
    return true;
  }
}
