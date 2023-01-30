import {ChangeDetectorRef, Component, HostListener, Input, OnInit, SimpleChanges, ViewChild} from '@angular/core';
import {MenuItem, MessageService, PrimeNGConfig} from 'primeng/api';
import {Table} from 'primeng/table';
import {DatePipe} from '@angular/common';
import {UserModel} from "../../../../features-master/users/models/user.model";
import {UserService} from "../../../../features-master/users/services/user.service";
import {LocaleSettings} from "primeng/calendar";
import {ActivatedRoute, Router} from "@angular/router";
import {URL_API} from "../../../../core/helpers/params/params-api.routes";
import {AllClass} from "../../../../core/helpers/class/all.class";
import {MainClass} from "../../../../core/helpers/class/main.class";
import {ActionClass} from "../../../../core/helpers/class/action.class";
import {DAY_LIST_2, MENU_NOT_ACTION, MONTH_LIST} from "../../../../core/helpers/params/params-global";
import {MyDialogService} from "../../../../core/services/my-dialog.service";
import {MainAllService} from "../../../../core/services/main-all.service";
import {Store} from "@ngrx/store";
import {ConfigClass} from "../../../../core/helpers/class/config.class";
import {QueryResultDataModel} from "../../../../core/models/natural-model/query-result.model";
import {DialogService} from "primeng/dynamicdialog";
import {DialogCityComponent} from "../../../../features-master/city/pages/dialog-city/dialog-city.component";
import {CountryEditComponent} from "../../../../features-master/country/pages/country-edit/country-edit.component";
import {GetAllClass} from "../../../../core/helpers/class/get-all.class";
import {GetStatusClass} from "../../../../core/helpers/class/get-status.class";
import {FilterStatusClass} from "../../../../core/helpers/class/filter-status.class";
import {ChurchModel} from "../../../../features/management/church/models/church.model";
import {FilterChurchModel} from "../../../../core/models/feature-model/filter-church.model";
import {TypeEventModel} from "../../../../features/management/events/models/type-event.model";
import {
  MinistryEditComponent
} from "../../../../features/administration/ministry/pages/ministry-edit/ministry-edit.component";
import {DialogConfirmComponent} from "../../../dialogs/dialog-confirm/dialog-confirm.component";
import {MESSAGE_SUPPRESSION_OK} from "../../../../core/helpers/params/params-message";

declare var require: any
const FileSaver = require('file-saver');

@Component({
  selector: 'app-main-table',
  templateUrl: './main-table.component.html',
  styleUrls: ['./main-table.component.scss']
})
export class MainTableComponent implements OnInit {

  @Input('origin') origin: string;
  @Input('originUser') originUser: string;

  title: string; // l'objet d'origin driver, fleet...
  postTitle: string;
  icon: string;
  message: string;
  loading: boolean; //chargement

  @Input('headers') headers: any[] = []; //headers
  globalFilters: string[] = []; //data

  @ViewChild('dateFilterId', {}) private dateFilterId: any;
  @ViewChild('dt') dt: Table | undefined;

  first: number = 0;
  locale: LocaleSettings;
  minDate: Date;
  maxDate: Date

  statusFilter: any = 0;
  search: any;
  _selectedColumns: any[];
  loadingExport: boolean = false;
  dateFilter: any;
  menus: any [];
  selectedObject: any = {};
  items: MenuItem[];

  url: string = URL_API.baseUrlFiles;
  errorImg: string = "assets/logo/icon_none.png";

  @ViewChild('p-contextMenu') cm;

  currentUrl: string;
  user: UserModel;
  status: any;
  urlApi: string;

  objects: any[] = []; //data
  objectsBase: any[] = []; //data
  objectsFilter: any[] = []; //data
  parentId: string;
  parent: ChurchModel;
  idChurchMember: string;
  idChurchEvent: string;

  typeEvent: TypeEventModel[] = [];


  private churches: any[] = [];
  private updateIdChurchMember: number = 0;
  statusLevelChurch: FilterChurchModel[] = [];
  private myCurrentAction: string;


  onRightClick(event: MouseEvent, data) {
    // Exécutez votre méthode ici
    if(data._id) this.selectedObject = data;
    console.log(this.selectedObject)

    /** get contextual menu **/
    this.getMenu();
  }

  constructor(private datePipe: DatePipe,
              private config: PrimeNGConfig,
              private myDialogService: MyDialogService,
              private dialogService: DialogService,
              private mainService: MainAllService,
              private messageService: MessageService,
              private activatedRoute: ActivatedRoute,
              private store: Store,
              private router: Router,
              private userService: UserService,
              private cdr: ChangeDetectorRef) {

  }

  ngOnInit(): void {
    /** get parent id when is come  **/
    this.routeChurchListParent();

    /** get list type event for affected to status selected when the origin is EVENT **/
    this.getTypeEvent();

    /** get list ministries for affected to status selected when the origin is Star **/
    if (this.origin == "user" && this.originUser == "star") this.getMinistries();

    /** get query params for define the church parent **/
    this.activatedRoute.queryParams.subscribe(el => {
      if (el.idChurch && (this.origin == 'user' || this.origin == 'event')) {
        this.idChurchMember = el.idChurch;
        this.updateIdChurchMember = 0;
      }
    })

    /** get nature element for object **/
    this.urlApi = this.getInfo('api-route');
    this.icon = this.getInfo('icon');
    this.title = this.getInfo('list');

    /** load data **/
    this.load(true);

    /** get church list when the object is USER or EVENT  **/
    this.getChurches();

    /** reload page when the action come from external dialog, use just for delete object **/
    this.myDialogService.getResult().subscribe(data => {
      if (data.success) {
        this.load(true)
      }
    });

    /** get pagination manage - not work now **/
    let first = new MainClass().getParamsGlobal(this.origin, 'paginate');
    if (first) this.first = Number(first);
    else this.first = 0;

    this.currentUrl = this.router.url;
    this.objectsBase = this.objects.slice();
    this.user = this.userService.getUser();


    this.config.setTranslation({
      monthNames: MONTH_LIST,
      dayNamesMin: DAY_LIST_2,
    });
    this._selectedColumns = this.headers;

    /** use for download and export **/
    this.menus = [
      {
        label: 'Exporter en CSV', icon: 'pi pi-params-excel', command: () => {
          this.downloadFile()
        }
      },
      {
        label: 'Exporter en Pdf', icon: 'pi pi-params-pdf', command: () => {
          this.printTable()
        }
      },
      // {label: 'Exportation avancée', icon: 'pi pi-params-excel', command: () => {
      //
      // }},
      // {separator: true},
      // {label: 'Parametrage', icon: 'pi pi-cog', routerLink: ['/setup']}
    ];


  }

  ngOnChanges(changes: SimpleChanges) {

    if (changes) {
      if (changes?.headers?.currentValue != this._selectedColumns)
        this._selectedColumns = changes?.headers?.currentValue;
      this.cdr.detectChanges();
    }

  }

  ngOnDestroy() {
    this.items = [];
    this.parentId = undefined;
    console.log(this.myCurrentAction)
    if(this.myCurrentAction != "location"){
      localStorage.removeItem('arrayParentChurchStory');
    }

  }

  routeChurchListParent(){
    const parentIdAdd = JSON.parse(localStorage.getItem('parentIdAdd'));
    if(parentIdAdd && this.origin == 'church'){
      this.executeAction('list-child', parentIdAdd);
      this.getArrayParentChurchStory(parentIdAdd)
      localStorage.removeItem('parentIdAdd')
    }
  }

  /**
   * get churches
   */
  getChurches() {

    this.mainService.getAll({}, 'church').subscribe({
      next: (res) => {
        if (res.success) {
          this.churches = res.data;

          let churchLevelZero = this.churches.filter(el => el.level == 0);
          let church = new ChurchModel();
          church.label = "Toutes les églises";
          church._id = "all";
          church.level = 0;
          churchLevelZero.unshift(church);

          this.statusLevelChurch = new GetStatusClass().getStatusChurch(this.churches, 'no-default');

          console.log(this.statusLevelChurch);

          this.statusLevelChurch.forEach(el => {
            if (el) {
              el.level = new ChurchModel();
              el.churchesLevel = [];

              if (el.value == 0) {
                el.status = true;
                el.churchesLevel = churchLevelZero;
              } else el.status = false

            }
          })

          if (this.idChurchMember) {
            this.parent = this.churches.find(el => el._id == this.idChurchMember);
          }
          this.cdr.detectChanges()
        }
      }
    })
  }

  /**
   * get type event
   */
  getTypeEvent() {
    this.mainService.getAll({}, 'type-event').subscribe({
      next: (res) => {
        if (res.success) {
          this.status = new GetStatusClass().getStatusMain(this.origin, res.data);
          this.cdr.detectChanges();
        }
      }
    })
  }

  /**
   * get type event
   */
  getMinistries() {

    this.mainService.getAll({}, 'ministry').subscribe({
      next: (res) => {
        if (res.success) {
          this.status = new GetStatusClass().getStatusMain(this.originUser, res.data);
          this.cdr.detectChanges();
        }
      }
    })
  }


  /**
   * load
   */
  load(loading) {
    this.loading = loading;
    let params: any = {};

    if (this.origin == "event") params.isMain = false;
    if (this.origin == "user" && this.originUser == "pastor") params.isPastor = true;
    if (this.origin == "user" && this.originUser == "rem") params.isRem = true;
    if (this.origin == "user" && this.originUser == "star") params.isStar = true;

    this.mainService.getAll(params, this.urlApi).subscribe({
      next: (res: QueryResultDataModel) => {
        if (res.success) {
          this.loading = false;
          /** get object, processing parsing, and slice object to object base for saved the original object anytime **/
          this.objects = new GetAllClass().getAllMain(res.data, this.origin);
          this.objectsBase = this.objects?.slice();

          /** slice object for saved when we make a filter **/
          this.objectsFilter = this.objects?.slice();



          /** use for tested the origin if is STAR, REM or PASTOR, because is USER nature **/
          let origin = this.origin
          if (this.origin == "user" && this.originUser) origin = this.originUser;


          /** composite headers **/
          this.headers = new ConfigClass().getParamsGlobal(origin, 'header');

          /** composite status filter **/
          if (this.origin != 'event' && (this.origin != 'user' && this.originUser != 'star')) {
            this.status = new GetStatusClass().getStatusMain(origin, this.objects);
          }

          /** processing church ***/
          if (this.origin == 'church') this.processingChurch();
          if (this.origin == 'user') this.processingMember();
          if (this.origin == 'event') this.processingEvent();


          /** get the global param for the object **/
          this.globalFilters = new ConfigClass().getParamsGlobal(this.origin, 'fields');

          if(this.origin == "church") this.routeChurchListParent();

          this.cdr.detectChanges()
          return;
        }
      },
      error: (err) => {
        console.log(err)
      }
    })
  }

  async getFile(pdfName) {
    this.loading = true;
    await FileSaver.saveAs(URL_API.baseUrlPdfs + 'messageedm/' + pdfName.fileDownload, pdfName.fileDownload);
    const message = "Fichier télécharger";
    this.messageService.add({key: 'tc', severity: 'success', summary: 'Bien!', detail: "message"});
    setTimeout(() => {
      this.loading = false;
    }, 3000);
  }

  /**
   * execute action
   * @param $event
   * @param _id
   * @param ref
   */
  executeAction($event, _id, ref: string = '') {

    this.myCurrentAction = $event;

    if ($event == "detach-star") {
      this.router.navigateByUrl(this.router.createUrlTree([this.getInfo('main-route') + '/edit/' + _id],
        {queryParams: {id: _id}})).then();
      return;
    }

    if ($event == "location" && this.origin == "church") {
      this.router.navigateByUrl(this.getInfo('main-route') + '/map/' + _id).then();
      return;
    }

    if ($event == "location" && this.origin == "user") {
      this.router.navigateByUrl(this.getInfo('main-route') + '/map/' + _id).then();
      return;
    }



    if ($event == "detach") {
      this.detach(_id)
      return;
    }

    if ($event == 'download') {
      this.loading = true;
      this.mainService.getAll({}, 'event/' + _id + '/download').subscribe({
        next: (res) => {
          if (res.success) {
            this.loading = false;
            this.getFile(res.data).then()
          }
        }
      })
      return;
    }

    if ($event == 'presence') {
      this.router.navigateByUrl(this.getInfo('main-route') + '/presence/' + _id).then();
      return;
    }

    if ($event == 'detail') {
      this.router.navigateByUrl(this.getInfo('main-route') + '/fiche-activite/' + _id).then();
      return;
    }

    if ($event == 'soul') {
      let url = new ConfigClass().getParams('user', 'info', 'main-route');

      this.router.navigateByUrl(this.router.createUrlTree([url],
        {queryParams: {idChurch: _id}})).then();
      return;
    }

    if ($event == "event") {

      let url = new ConfigClass().getParams('event', 'info', 'main-route');

      this.router.navigateByUrl(this.router.createUrlTree([url],
        {queryParams: {idChurch: _id}})).then();
      return;
    }

    if ($event == 'list-child') {
      this.parentId = _id;
      this.getArrayParentChurchStory(_id)

      this.objects = this.objectsBase.filter(el => el.parent?._id == this.parentId);
      this.processingChurch()

      return;
    }

    const modalPage = ["city", "country", "ministry", "star", "rem", "pastor"];

    if ((modalPage.includes(this.origin)) && $event == 'edit') {
      if (this.origin == 'city') new MainClass().createDialogAdd(_id, 'edit', this.objects, this.dialogService, this.origin, DialogCityComponent);
      if (this.origin == 'country') new MainClass().createDialogAdd(_id, 'edit', this.objects, this.dialogService, this.origin, CountryEditComponent);
      if (this.origin == 'ministry') new MainClass().createDialogAdd(_id, 'edit', this.objects, this.dialogService, this.origin, MinistryEditComponent);
    } else {

      if ($event == 'add') {
        this.router.navigateByUrl(this.router.createUrlTree([this.getInfo('main-route') + '/edit/0'],
          {queryParams: {id: _id}})).then();
      } else if ($event == 'list') {
        this.router.navigateByUrl(this.getInfo('main-route') + '/list').then();
      } else {

        new ActionClass().executeActionOne(
          $event, _id, "", {},
          this.objects, this.router, this.myDialogService, this.mainService, this.messageService, this.store, this.origin)
      }
    }
  }


  getMenu() {
    let actions: any[] = new MainClass().getParamsGlobal(this.origin, 'actions');
    this.items = [];

    console.log(this.selectedObject)


    actions.forEach(el => {
      const enable: boolean = new ActionClass().can(el, this.origin, this.selectedObject, this.user);
      if (enable) {
        let menu: any = {};
        menu.label = el.title;
        menu.title = el.label;
        menu.icon = el.class;
        menu.command = () => {
          this.openMenu(this.selectedObject, menu);
        }
        this.items.push(menu)
      }
    });

  }

  /**
   * open menu
   * @param selectedObject
   * @param menu
   */
  openMenu(selectedObject, menu) {
    this.executeAction(menu.title, selectedObject._id);
  }


  /**
   * get dynamical variable
   * @param object
   * @param col
   */
  getVar(object: any, col: any) {

    let v = new MainClass().getVar(object, col, this.datePipe);
    if (v) {
      v = v.toString();
      v = v?.trim();
      if (col.field == 'tag.passenger.person.label' && (v == 'undefined' || v == undefined)) return "-";
      if (col.id == 'tag.price' && (v == 'undefined' || v == undefined || v == 'null')) return "-";
      if (col.id == 'customer.person' && (v == 'undefined undefined' || v == undefined || v == 'null')) return "";
      if (col.id == 'tag.price' && !(v == 'undefined' || v == undefined || v == 'null')) v = v + " FCFA";

      if (col.field == 'tag.sellingDate' && (v == 'undefined' || v != undefined)) return "-";

      if (v == 'undefined' || v == 'undefined undefined' || v == 'undefined FCFA') return '';

      if (v != 'undefined' && v != undefined) return v;
    }
    return '';
  }

  /**
   * export by csv
   */
  downloadFile() {
    this.loadingExport = true;
    new AllClass().downloadFile(this.headers, this.objects, this.datePipe, this.origin);
    setTimeout(() => {
      this.loadingExport = false;
      this.cdr.detectChanges();
    }, 3000);
  }

  /**
   * export by pdf
   */
  public printTable() {
    this.loadingExport = true;
    new AllClass().exportPdf(this.headers, this.objects, this.title, this.datePipe);
    setTimeout(() => {
      this.loadingExport = false;
      this.cdr.detectChanges();
    }, 3000);
  }

  /**
   * filter
   */
  filter() {
    if (this.origin == 'church') {
      if (this.statusFilter == 0) {
        this.deleteColumns('parent')
        this.deleteColumns('city')
        this.deleteColumns('address')
      } else {
        this._selectedColumns = new ConfigClass().getParamsGlobal(this.origin, 'header');
        this.deleteColumns('phone1')
        this.deleteColumns('phone2')
      }
    }

    let origin = this.origin
    if (this.origin == "user" && this.originUser) origin = this.originUser;

    this.objectsFilter = new FilterStatusClass().filterStatusMain(origin, this.objectsBase, this.statusFilter);
    this.objects = this.objectsFilter.slice();

    if (this.origin == 'event') this.processingMember()
  }

  /**
   * get size
   * @param col
   */
  getSize(col: any): string {
    return new MainClass().getSizeColumn(col);
  }

  getSizeActions(): string {
    return new MainClass().getSizeActions(this.origin);
  }

  /**
   * clear all filter
   * @param table
   */
  clear(table: Table = null) {
    if (table) table.clear();
    this.objects = this.objectsBase?.slice();
    this.search = '';
    this.statusFilter = undefined;
    this.dateFilter = undefined;
    this.parentId = undefined;
    this.title = this.getInfo('list');
    localStorage.removeItem('arrayParentChurchStory');
  }

  @Input() get selectedColumns(): any[] {
    return this._selectedColumns;
  }

  set selectedColumns(val: any[]) {
    //restore original order
    this._selectedColumns = this.headers.filter(col => val.includes(col));
  }

  /**
   * label
   */
  getLabelDate(): string {
    return 'Date de création';
  }

  onSelectDateFilter() {
    if (this.dateFilter[1]) this.dateFilterId.overlayVisible = false;
  }

  applyFilterGlobal($event: any, stringVal: any) {
    this.dt!.filterGlobal(($event.target as HTMLInputElement).value, stringVal);
  }


  /**
   * can add
   */
  canAdd(): boolean {
    return true;
  }


  /**
   * get size display
   */
  getSizeDisplayCol(): string {
    if (this.origin == 'booking') return "200";
    return "200";
  }


  /**
   * control day before print eTicket
   */
  availableDate(): boolean {
    let day = 10;
    if (this.objects) {
      day = new AllClass().differenceDate(new Date().getTime(), new Date(this.objects[0]?.trip?.journey?.path?.departureDate).getTime())
    }
    return day <= 30;
  }


  /**
   * double click
   * @param rowData
   */
  openDblClick(rowData: any) {

    let event: any = {};
    event.event = 'view';
    let _id = rowData._id;

    if (this.origin == 'trip') {
      if (rowData.mainTrip) _id = rowData.mainTrip._id;
      event.event = 'ticket';
    }

    if (this.origin == 'ticket') {
      event.event = 'read';
    }

    event._id = _id;

  }


  /**
   * have action
   */
  haveAction(): boolean {
    return !MENU_NOT_ACTION.includes(this.origin);
  }

  /**
   * get paginate
   * @param $event
   */
  getPage($event: any) {
    this.first = $event.first;
    new AllClass().setPaginate(this.origin, this.first);
  }


  getInfo(label: string) {
    let origin = this.origin;
    if (this.originUser && label != 'api-route') origin = this.originUser;

    return new ConfigClass().getParams(origin, 'info', label);
  }

  reload() {

    if(this.origin == "church" && this.parentId ){
      if(this.origin == "church" && this.parentId ) localStorage.setItem('parentIdAdd', JSON.stringify(this.parentId))
      this.load(true)
    }else{
      this.load(true);
      this.clear();
    }
  }

  /**
   * delete columns
   * @param id
   */
  deleteColumns(id) {
    const index = this._selectedColumns.findIndex(el => el.id.toString() == id.toString());
    if (index != -1) this._selectedColumns.splice(index, 1);
  }

  /**
   * add
   */
  add() {
    switch (this.origin) {

      case 'city':
        new MainClass().createDialogAdd('0', 'add', this.objects, this.dialogService, this.origin, DialogCityComponent);
        break;

      case 'country' :
        new MainClass().createDialogAdd('0', 'add', this.objects, this.dialogService, this.origin, CountryEditComponent);
        break;

      case 'ministry' :
        new MainClass().createDialogAdd('0', 'add', this.objects, this.dialogService, this.origin, MinistryEditComponent);
        break;

      case 'church' :
        if(!this.parentId) this.parentId = this.objects[0]._id;

        if (this.parentId) this.executeAction("add", this.parentId)
        else this.router.navigateByUrl(this.getInfo('main-route') + '/edit/0').then();
        break;

      default:
        console.log(this.getInfo('main-route'))
        this.router.navigateByUrl(this.getInfo('main-route') + '/edit/0').then();
    }
  }


  /**
   * get continent
   * @param region
   */
  getContinent(region: any): string {
    return new AllClass().getContinent(region);
  }

  /**
   * back
   */
  back() {

    if (this.origin == 'church') {
      let arrayParentChurchStory: string[] = JSON.parse(localStorage.getItem("arrayParentChurchStory"));
      if (!arrayParentChurchStory) return;

      console.log(arrayParentChurchStory);

      if (arrayParentChurchStory.length > 0 && this.parentId == arrayParentChurchStory[arrayParentChurchStory.length - 1]) {
        if (arrayParentChurchStory.length - 1 > 0) {
          this.parentId = arrayParentChurchStory[arrayParentChurchStory.length - 2];
          arrayParentChurchStory.splice(arrayParentChurchStory.length - 1, 1)
          localStorage.setItem("arrayParentChurchStory", JSON.stringify(arrayParentChurchStory));
          this.objects = this.objectsBase.filter(el => el?.parent?._id == this.parentId)

        } else {
          this.parentId = undefined;
          this.title = this.getInfo('list');
          localStorage.removeItem('arrayParentChurchStory');
        }
      } else {
        this.parentId = undefined;
        this.title = this.getInfo('list');
        localStorage.removeItem('arrayParentChurchStory');
      }
      this.processingChurch()
    }
  }

  /**
   * filter church by level
   * @param level
   * @param $event
   */
  filterLevel(level: number, $event: any = "") {


    if ($event && $event._id == "all") {

      /** disable status **/
      this.statusLevelChurch.forEach(el => {
        if (el.value > level) el.status = false;
      })


      if (level == $event.level) {
        console.log("encore toi")
        this.updateIdChurchMember++
        if (this.updateIdChurchMember == 2) this.idChurchMember = undefined;
      } else {
        if (level > 0) {
          this.parent = this.statusLevelChurch[level - 1].level
          this.idChurchMember = this.parent._id
        }

      }


      this.processingMember()

    } else {
      setTimeout(() => {
        this.parent = this.churches.find(el => el._id == this.idChurchEvent);
        this.getSubChurches($event, level)
        this.cdr.detectChanges();
      }, 100);

    }
  }

  /**
   * get sub churches
   * @param $event
   * @param value
   */
  getSubChurches($event, value) {
    let churchesSub = this.churches.filter(el => el.parent?._id == $event?._id);

    let church = new ChurchModel();
    church.label = "Toutes les églises : " + $event.label;
    church._id = "all";
    church.level = value
    churchesSub.unshift(church)

    const indexLevelChurch = this.statusLevelChurch.findIndex(el => el.value == value);

    if (indexLevelChurch != -1) {
      this.statusLevelChurch[indexLevelChurch].level = $event;
      this.parent = this.statusLevelChurch[indexLevelChurch].level


      if (indexLevelChurch + 1 <= this.statusLevelChurch.length - 1) {
        this.statusLevelChurch[indexLevelChurch + 1].status = true;
        this.statusLevelChurch[indexLevelChurch + 1].churchesLevel = churchesSub;
        this.statusLevelChurch[indexLevelChurch + 1].level = churchesSub[0];
      }
    }

    this.idChurchMember = $event._id;
    this.processingMember()
  }

  /**
   * get status level
   */
  getStatusLevelChurch(): FilterChurchModel[] {
    return this.statusLevelChurch.filter(el => el.status == true);
  }


  openMessage() {
    this.router.navigateByUrl(this.getInfo('main-route') + '/message').then();
  }

  getTitleMessage(): string {
    return "Prédication des EDM "
  }

  getArrayParentChurchStory(parentId){
    let arrayParentChurchStory = JSON.parse(localStorage.getItem("arrayParentChurchStory"));
    if (!arrayParentChurchStory) arrayParentChurchStory = [];

    const index = arrayParentChurchStory.findIndex(el => el == parentId);
    if (index == -1) {
      arrayParentChurchStory.push(parentId);
      localStorage.setItem("arrayParentChurchStory", JSON.stringify(arrayParentChurchStory));
    }

  }

  /**
   * detach
   *   openDialog(DialogComponent, title, word, description, mainService, objectType, messageService: MessageService,object) {
   *
   * @private
   */
  private detach(_id: string) {
    const title = "";
    const word = "";
    const description = '';

    const ref = this.dialogService.open(DialogConfirmComponent, {
      header: title,
      width: '500px',
      data: {title, word, description,},
      contentStyle: {"max-height": "500px", "overflow": "auto"},
      baseZIndex: 10000
    });

    ref.onClose.subscribe((res) => {
      if (res) {
        if (res.data) {
          let url = ""
          if (this.originUser == "pastor") url = "user/pastor-detach";
          if (this.originUser == "rem") url = "user/rem-detach";
          if (this.originUser == "star") url = "user/star-detach";

          this.mainService.getOne(_id, url).subscribe({
            next: (res) => {
              if (res && res.success) {
                this.messageService.add({
                  key: 'tc',
                  severity: 'success',
                  summary: 'Bien',
                  detail: MESSAGE_SUPPRESSION_OK
                });
                this.load(true);

              }
            }
          })

        }


      }
    });


  }

  /************* PROCESSING ****************/

  /**
   * church processing
   * @private
   */
  private processingChurch() {
    let arrayParentChurchStory: string[] = JSON.parse(localStorage.getItem("arrayParentChurchStory"));

    if (arrayParentChurchStory && arrayParentChurchStory.length > 0)
      this.parentId = arrayParentChurchStory[arrayParentChurchStory.length - 1]

    if (this.parentId) {
      this.objects = this.objectsBase.filter(el => el?.parent?._id == this.parentId);
      this.parent = this.objectsBase.find(el => el._id == this.parentId);
      this.title = " Liste des églises filles";
      this._selectedColumns = new ConfigClass().getParamsGlobal(this.origin, 'header');
      this.deleteColumns('phone1')
      this.deleteColumns('phone2')
    } else {
      if (this.statusFilter == 0) {
        this.deleteColumns('parent')
        this.deleteColumns('city')
        this.deleteColumns('address')
      }
      this.filter()

    }
  }

  /**
   * processing member
   * @private
   */
  private processingMember() {

    if (this.idChurchMember) {
      let objects = [];
      this.objectsFilter.forEach(el => {
        const r = new MainClass().groupMemberForChurch(el.church, this.idChurchMember);
        if (r == 1) objects.push(el)
      })
      this.objects = objects
    } else {
      this.objects = this.objectsFilter.slice();
    }

  }

  private processingEvent() {
    if (this.idChurchMember) {
      this.objects = this.objectsBase.filter(el => el.church?._id == this.idChurchMember);
    } else {
      this.objects = this.objectsBase.filter(el => el.church?._id == this.idChurchMember);
    }
  }

  /**
   * get title add button
   */
  getTitleButtonAdd(): string {
    if (this.origin == "church") return "Ajouter une eglise fille "
    if (this.origin == "user" && this.originUser) return "Affecter"

    return "Ajouter"
  }
}
