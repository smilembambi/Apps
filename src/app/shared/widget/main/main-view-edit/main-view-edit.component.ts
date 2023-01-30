import {ChangeDetectorRef, Component, Injector, Input, OnInit, SimpleChanges} from '@angular/core';
import {FormModel} from "../../../../core/models/natural-model/form.model";
import {GroupFormModel} from "../../../../core/models/natural-model/group-form.model";
import {GROUP_FORM_MODEL} from "../../../../core/helpers/params/params-global";
import {ActivatedRoute, Router} from "@angular/router";
import {UserService} from "../../../../features-master/users/services/user.service";
import {MainClass} from "../../../../core/helpers/class/main.class";
import {DatePipe, Location} from "@angular/common";
import {PrepareSaveClass} from "../../../../core/helpers/class/prepare-save.class";
import {
  MESSAGE_CREATION_KO,
  MESSAGE_CREATION_OK,
  MESSAGE_SUPPRESSION_KO,
  MESSAGE_SUPPRESSION_OK,
  TITLE_DELETE
} from "../../../../core/helpers/params/params-message";
import {MainAllService} from "../../../../core/services/main-all.service";
import {ConfigClass} from "../../../../core/helpers/class/config.class";
import {GetOneClass} from "../../../../core/helpers/class/get-one.class";
import {ActionClass} from "../../../../core/helpers/class/action.class";
import {Store} from "@ngrx/store";
import {MyDialogService} from "../../../../core/services/my-dialog.service";
import {ChurchModel} from "../../../../features/management/church/models/church.model";
import {CityModel} from "../../../../features-master/city/models/city.model";
import {CountryModel} from "../../../../features-master/country/models/country.model";
import {TypeEventModel} from "../../../../features/management/events/models/type-event.model";
import {MessageService} from "primeng/api";
import {UserModel} from "../../../../features-master/users/models/user.model";
import {MinistryModel} from "../../../../features/administration/ministry/models/ministry.model";
import {LocationUserService} from "../../../../core/services/location-user.service";

@Component({
  selector: 'app-main-view-edit',
  templateUrl: './main-view-edit.component.html',
  styleUrls: ['./main-view-edit.component.scss']
})
export class MainViewEditComponent implements OnInit {
  @Input('origin') origin: string;

  forms: FormModel[] = [];
  groupForms: GroupFormModel[] = [];
  errors: any[] = [];
  object: any = {};
  urlApi: string;
  step: number = 0;
  isGroupFormOrigin: string[] = GROUP_FORM_MODEL;
  checkEmail: boolean = false;
  icon: string;
  title: string;
  id: string = "0";
  isValidForm: boolean = false;
  state: string = 'edit';
  loadingSend: boolean = false;
  loading: boolean;
  message: any;


  listChurches: ChurchModel[] = [];
  cities: CityModel[] = [];
  citiesBase: CityModel[] = [];
  countries: CountryModel[] = [];
  countriesBase: CountryModel[] = [];
  users: UserModel[] = [];

  church: ChurchModel;
  typeChurches: string[] = ['Eglise', 'Chapèle', 'Eglise de maison'];
  typeChurch: string = "Eglise";
  sexList: string[] = ['M', 'F'];
  yesOrNot: string[] = ['Non', 'Oui'];
  titlePastor: string[] = ['Pasteur', 'Assistant Pasteur'];
  titleEdm: string[] = ['Rem', 'Corem'];

  isMainChurch: boolean = false;
  parentId: string = "";
  parent: ChurchModel;
  listTypeEvents: TypeEventModel[] = [];
  listTypeEventsBase: TypeEventModel[] = [];
  ministries: MinistryModel[] = [];
  churchSelected: ChurchModel;

  isStar: any = "Non";

  ministriesMember: MinistryModel[];

  /*** Selected ***/
  countrySelected: CountryModel;
  parentChurchSelected: ChurchModel;

  constructor(private router: Router,
              private userService: UserService,
              private datePipe: DatePipe,
              private store: Store,
              private cdr: ChangeDetectorRef,
              private dialogService: MyDialogService,
              private injector: Injector,
              private messageService: MessageService,
              private mainService: MainAllService,
              private activatedRoute: ActivatedRoute,
              private location: Location
  ) {}

  ngOnInit(): void {

    /** get all cities **/
    this.getCities();

    /** get all users **/
    this.getUsers();

    /** get all type events **/
    this.getTypeEvents();

    /** get all countries **/
    this.getCountry();

    /** get all churches **/
    this.getListChurches();

    /** get all ministries **/
    this.getMinistries();

    /** get query params and test if is main church **/
    this.activatedRoute.queryParams.subscribe(el => {
      if (el.id) {
        this.isMainChurch = true;
        this.parentId = el.id;
      } else {
        this.parentId = undefined;
        this.parent = undefined;
        this.isMainChurch = false
      }
    })

    /** use for the form group - in this projet there's no the group form **/
    if (this.groupForms[0]?.completed == false) this.step = 0;

    /** get all element of the object **/
    this.title = this.state == 'view' ? this.getInfo('view') : this.object?._id == '0' ? this.getInfo('add') : this.getInfo('edit')
    this.icon = this.getInfo('icon');
    this.urlApi = this.getInfo('api-route');

    /** subscribe to external dialog if is closed, refresh result, is just for delete action modal  **/
    this.getResultDialogClosed();

    /** get object **/
    this.getById();

  }

  ngOnChanges(changes: SimpleChanges) {
  }

  getUsers() {
    let params : any = {};

    if(this.origin == 'pastor') params.isPastor = false;
    if(this.origin == 'rem') params.isRem = false;


    this.mainService.getAll(params, 'user').subscribe({
      next: (res) => {
        if (res.success) {
          this.users = res.data;
          if(this.origin == "church"){
            this.users = this.users.filter(el=> el.isStar);
          }
        }
      }
    })
  }

  /**
   * get ministries
   */
  getMinistries() {
    this.mainService.getAll({}, 'ministry').subscribe({
      next: (res) => {
        if (res.success) {
          this.ministries = res.data;
        }
      }
    })
  }

  /**
   * get cities
   */
  getCities() {
    this.mainService.getAll({}, 'city').subscribe({
      next: (res) => {
        if (res.success) {
          this.cities = res.data;
          this.citiesBase = res.data.slice();
          localStorage.setItem('cities', JSON.stringify(this.citiesBase))
        }
      },
      error: (err) => {

      }
    })
  }

  /**
   * get type event
   */
  getTypeEvents() {
    this.mainService.getAll({}, 'type-event').subscribe({
      next: (res) => {
        if (res.success) {
          this.listTypeEvents = res.data;
          this.listTypeEventsBase = res.data.slice();
        }
      },
      error: (err) => {

      }
    })
  }

  /**
   * get country
   */
  getCountry() {
    this.mainService.getAll({}, 'country').subscribe({
      next: (res) => {
        if (res.success) {
          this.countries = res.data;
          this.countriesBase = res.data.slice();
        }
      },
      error: (err) => {
      }
    })
  }

  /**
   * get result when we delete element, for return to list
   */
  getResultDialogClosed() {
    this.dialogService.getResult().subscribe(data => {
      if (data.success) {
        this.list()
      }
    });
  }


  /**
   * get list churches
   */
  getListChurches() {
    let params: any = {};
    params['status[ne]'] = "Supprimer";
    this.mainService.getAll(params, 'church').subscribe({
      next: (res) => {
        if (res.success) {
          this.listChurches = res.data;

          if (this.parentId) {
            this.parent = this.listChurches.find(el => el._id == this.parentId);
          }

          if(this.origin == "rem" || this.origin == "user"){
            this.listChurches = this.listChurches.filter(el=> el.typeChurch == "Eglise de maison")
          }

          this.cdr.detectChanges()
        }
      },
      error: (err) => {

      }
    })
  }


  /**
   * get info
   * @param label
   */
  getInfo(label): any {
    let origin: string = this.origin;
    if( (this.origin == "pastor" || this.origin == "rem" || this.origin == "star") && label =='api-route') origin = "user";
    return new ConfigClass().getParams(origin, 'info', label);
  }


  /**
   * get result
   * @param form
   * @param $event
   */
  getResultForm(form: FormModel, $event: any) {
    const index = this.forms.findIndex(el => el.field == $event.field && el.type == $event.type);
    if (index != -1) this.forms.splice(index, 1, $event);

    this.forms.forEach(el => {
      if (el.field != 'void') this.object[el.field] = el.value
    });
  }


  /**
   * change header
   */
  changeHeader() {
    const info: any[] = new MainClass().getParamsGlobal(this.origin, 'info');
    this.title = info.find(el => el.label == this.state)?.value;
  }


  /**
   * next
   */
  next() {


    //test control
    if (this.controlValidForm()) {
      if (this.step == this.groupForms.length - 1) {
        this.save();
      } else {
        this.groupForms[this.step].completed = true;
        if (this.groupForms.length > this.step) {
          this.step++;
          this.groupForms[this.step].status = true;
          this.isValidForm = false;
        }
      }
    }

  }

  /**
   * control valid form
   */
  controlValidForm(): boolean {
    let forms = this.forms.slice();
    if (this.groupForms[this.step].forms) forms = this.groupForms[this.step].forms.slice();
    const labels = forms.map(f => f.id);
    let value: boolean = true;

    let errors: any[] = [];
    this.errors.forEach(el => {
      if (labels.includes(el.label)) errors.push(el)
    });

    errors.forEach(el => {
      if (labels.includes(el.label)) {
        value = false;
        this.isValidForm = true;
      }
    });

    return value;
  }

  /**
   * is precedent
   */
  isPrecedent(): boolean {
    return this.step > 0;
  }

  /**
   * before
   */
  before() {
    this.step--;
  }


  /**
   * get check email
   * @param $event
   */
  getCheckEmail($event: any) {
    this.checkEmail = $event;
  }

  /**
   * ge errors
   * @param $event
   */
  getErrors($event: any) {
    this.errors = $event
  }

  isViewZOne(): boolean {
    if (GROUP_FORM_MODEL.includes(this.origin) && this.step == 0 && this.state == 'view') return true;
    if (GROUP_FORM_MODEL.includes(this.origin) && this.step != 0 && this.state == 'view') return false;
    return this.state == 'view'
  }

  /**
   * get by id
   */
  getById() {

    /** get query params for know if is a view or edit **/
    this.activatedRoute.queryParams.subscribe(params => {
      if (params && params["state"]) this.state = params["state"];
    });

    /** get params for know if is a edit or a add **/
    this.activatedRoute.params.subscribe(params => {
      this.id = params['id'];

      // if is a edit
      if (this.id && this.id != '0') {

        /** get the title of page **/
        this.title = this.state == 'view' ? this.getInfo('view') : this.id == '0' ? this.getInfo('add') : this.getInfo('edit')

        /** use for tested the origin if is STAR, REM or PASTOR, because is USER nature **/
        let origin = this.origin;
        if(this.origin == "star") origin = "user";

        /** use for tested the origin if is STAR, REM or PASTOR, because is USER nature **/
        const urlApi = new ConfigClass().getParams(origin, 'info', 'api-route');
        this.loading = true;


        /** get one in db **/
        this.mainService.getOne(this.id, urlApi).subscribe(res => {
          if (res && res.success) {

            /** get object, processing parsing, and slice object to object base for saved the original object anytime **/
            this.object = new GetOneClass().getOneMain(res.data, this.origin);
            this.churchSelected = this.object?.church;

            if (this.origin == 'user') {
              this.isStar = this.object.isStar;
            }

            if (this.object?.parent) {
              this.isMainChurch = true;
              this.parentId = this.object?.parent._id;
            } else {
              this.parentId = undefined;
              this.parent = undefined;
              this.isMainChurch = false
            }
          this.getForm();
            this.loading = false;
            this.cdr.detectChanges()
          }
        })

      }
      // if is a add
      else {
        this.loading = false;
        this.title = this.state == 'view' ? this.getInfo('view') : this.id == '0' ? this.getInfo('add') : this.getInfo('edit')
        this.getForm();
      }
    });
  }

  /**
   * get form
   */
  getForm() {
    this.forms = new ConfigClass().getParamsGlobal(this.origin, 'fieldsForm');

    this.forms.forEach(el => {
      if (el.id == 'church') el.options = this.listChurches;
      if (el.id == 'sex') el.options = this.sexList;
      if (el.id == 'isStar') el.options = this.yesOrNot;
      if (el.id == 'city') el.options = this.cities;
      if (el.id == 'title') el.options = this.titlePastor;
      if (el.id == 'titleEdm') el.options = this.titleEdm;
      if(el.id == 'ministries')el.options = this.ministries;
    });



    if (this.origin == 'church') this.processingChurch();

    this.forms.forEach(el => {
      if (el.field != 'void') el.value = this.object[el.field]
    });
    this.errors = new MainClass().setRequire(this.forms);


  }

  /**
   * delete field
   * @param id
   */
  deleteField(id) {
    const index = this.forms.findIndex(el => el.id == id);
    if (index != -1) this.forms.splice(index, 1);
  }

  /**
   * list
   */
  list() {

    if(this.origin == "church" && this.object.parent ){
      localStorage.setItem('parentIdAdd', JSON.stringify(this.object.parent._id))
    }
    this.location.back();

    //this.router.navigateByUrl(this.getInfo('main-route')).then();
  }

  /**
   * delete
   */
  delete() {
    const descriptionDelete = 'Pour supprimer ' + this.getInfo('sentence') + ' <b>' + this.object.label + '</b>, tapez le mot <strong>Supprimer</strong> dans la zone à saisie';

    new ActionClass().actionStepOne(
      this.store,
      this.dialogService,
      this.mainService,
      this.messageService,
      this.origin,
      this.object,
      TITLE_DELETE,
      'Supprimer',
      descriptionDelete,
      "",
      MESSAGE_SUPPRESSION_OK,
      MESSAGE_SUPPRESSION_KO,
      'delete')
  }

  getChurch($event: any) {
    this.church = $event;
  }

  /**
   * get title
   */
  getTitle(): string {
    if (this.parentId && this.origin == 'church') {
      if (this.id == "0") return "Ajout d'une église fille "
      return "Modification d'une église fille "
    }

    return this.title;
  }

  getChurchSending($event: ChurchModel) {
    if ($event.level == 0 || $event.level == 1) {
      this.cities = this.citiesBase.filter(el => el.country?._id == $event?.countryChurch?._id)
    }
  }

  /**
   * gte is star
   * @param $event
   */
  getIsStar($event: any) {
    this.isStar = $event;

    this.forms.forEach(el => {
      if (el.id == 'ministries' && $event == 'Oui')
        this.errors = new MainClass().createError('', 'ministries', this.errors);
      if (el.id == 'ministries' && $event == 'non')
        this.errors = new MainClass().validField(this.errors, 'ministries');
    })
  }

  /**
   * save
   */
  save() {

    this.isValidForm = true;
    if (!this.object?._id) this.object.createdBy = this.userService.getUser();


    if (this.errors.length > 0) return;

    this.object = new PrepareSaveClass().prepareMain(this.object, this.origin, this.datePipe);

    let params : any = {origin:this.origin}

    this.loadingSend = true;
    this.mainService.create(this.object, this.urlApi, params).subscribe({
      next: (res) => {
        if (res && res.success) {

          this.messageService.add({key: 'tc', severity: 'success', summary: 'Bien', detail: MESSAGE_CREATION_OK});
          setTimeout(() => {
            this.loadingSend = false;

            if(this.origin == "church") localStorage.setItem('parentIdAdd', JSON.stringify(this.object.parent._id))

            new MainClass().openList(this.router, this.origin);

          }, 1500);

        } else {
          if (this.origin == 'user' && res.data == 'user-exist') {
            this.messageService.add({
              key: 'tc',
              severity: 'error',
              summary: 'Erreur',
              detail: 'Le numéro de téléphone choisi est déjà utilisé',
              life: 5000
            });
            this.loadingSend = false;
          }
        }
      },
      error: (err) => {
        if (err) this.loadingSend = false;
        this.messageService.add({key: 'tc', severity: 'error', summary: 'Erreur', detail: MESSAGE_CREATION_KO});
      }
    })

  }


  /************ PROCESSING **************/
  /************ PROCESSING **************/
  /************ PROCESSING **************/
  /************ PROCESSING **************/
  /************ PROCESSING **************/

  /**
   * processing church
   */
  processingChurch() {
    if (!this.isMainChurch) {
      this.deleteField('address');
      this.deleteField('city');
      this.deleteField('arrondissement');
      this.deleteField('manager');
      this.deleteField('subManager');
      this.deleteField('memberNumber');
      this.deleteField('parent');
      this.deleteField('smsNumber');

      this.typeChurches = ["Eglise"]
    } else {
      //this.deleteField('countryChurch');
    }
  }

  /**
   * get ministries of member selected
   * @param $event
   */
  getMinistriesMember($event: any) {
    this.ministriesMember = $event;
    this.forms.forEach(el=>{
      if(el.id == "ministries") el.value = this.ministriesMember;

    })
  }

  /******************** SELECTED **********************/
  /******************** SELECTED **********************/
  /******************** SELECTED **********************/
  /******************** SELECTED **********************/
  /******************** SELECTED **********************/


  /**
   * get country selected
   * @param $event
   */
  getCountrySelected($event) {
    this.countrySelected = $event;

    if(this.origin == "church"){
      const parent  = this.forms.find(el=> el.id == "parent");
      // if the parent has a country
      if(parent) {
        this.countrySelected = parent?.value?.countryChurch;
        //filter cities
        this.cities = this.citiesBase.filter(el=> el?._id == parent?.value?.city._id);
      }

    }else{
      //filter cities
      this.cities = this.citiesBase.filter(el=> el?.country?._id == this.countrySelected._id);

    }


    //init value of city
    if(!this.object._id ){
      this.forms.forEach(el=>{
        if(el.id == 'city' && el.value?.country?._id != this.countrySelected?._id ) el.value = undefined
      })
    }

  }


  /**
   * change selected church parent
   * @param $event
   */
  getParentChurchSelected($event: any) {
    this.countries = this.countriesBase.filter(el=> el._id == $event.countryChurch._id);
    this.getCountrySelected($event.countryChurch)
  }
}
