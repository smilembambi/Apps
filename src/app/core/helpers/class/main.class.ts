import {SimpleChanges} from "@angular/core";
import {DatePipe} from "@angular/common";
import {UserModel} from "../../../features-master/users/models/user.model";
import {Router} from "@angular/router";
import {Store} from "@ngrx/store";
import {FormModel} from "../../models/natural-model/form.model";
import {FIELD_FILE_SIZE, FIELD_MAIL, FIELD_MAIL_EXIST, FIELD_REQUIRE} from "../params/params-message";
import {ChurchModel} from "../../../features/management/church/models/church.model";
import {DialogService} from "primeng/dynamicdialog";

export class MainClass {

  /**
   * get fields
   * @param headers
   * @param label
   */
  getFields(headers: any[], label: string):string[]{
    let globalFilters: string [] = [];
    headers?.forEach(el=>{
      const a = el.field.split(label);
      if(a.length >= 2){
        globalFilters.push(a[1]);
      }
      if(a.length == 1 && a[0] != ""){
        globalFilters.push(a[0]);
      }
    })
    return globalFilters
  }



  /**
   * check error field
   * @param changes
   * @param errors
   * @param isValidForm
   * @param label
   */
  checkErrorField(
    changes: SimpleChanges,
    errors: any[],
    isValidForm: boolean,
    label: string,
  ): any {
    let message = '';
    let isError = false;
    if (changes.errors?.currentValue) {
      errors = changes.errors?.currentValue;
    }

    if (changes.isValidForm?.currentValue) {
      isValidForm = changes.isValidForm?.currentValue;
    }

    if (errors) {
      const index = errors.findIndex(el => el.label == label);
      if (index != -1 && isValidForm) {
        isError = true;
        message = errors[index].message;
      }
    }

    return {
      isError,
      message
    }
  }


  /**
   * set require
   * @param forms
   */
  setRequire(forms: FormModel[]): any {
    let errors: any[] = [];
    if (forms && forms.length > 0) {
      forms.forEach(el => {
        if (el.type != 'void') {

          if ((el.value == '' || el.value == null) && el.isRequire ) {
            let error: any = {};
            error.label = el.id;
            error.message = FIELD_REQUIRE;
            errors.push(error)
          } else {
            const index = errors.findIndex(f => f.label == el.id);
            if (index != -1) errors.splice(index, 1);
          }
        }


      });
    }

    return errors;
  }

  /**
   * open list
   * @param router
   * @param object
   * @param label
   */
  openList(router: Router, object: any, label: string = 'main-route') {
    const info: any[] = this.getParamsGlobal(object, 'info');
    let url: string;
    if (info) {
      url = info.find(el => el.label == label)?.value;
      router.navigateByUrl(url).then();
    }
  }

  /**
   * valid field
   * @param errors
   * @param label
   */
  validField(errors, label): any[] {
    const index = errors.findIndex(el => el.label == label);
    if (index != -1) {
      errors.splice(index, 1);
    }

    for (let i = 0; i < errors.length; i++) {
      if (errors[i].label === label || errors[i].label == undefined) errors.splice(i, 1);
    }
    let i = 0;
    errors.forEach(el => {
      if (el.label == label) {
        errors.splice(i, 1);
      }
      i++
    })
    return errors
  }

  /**
   * create error
   */
  createError($event, label, errors, type = 'input'): any[] {
    let error: any = {};
    error.label = label;
    let message = '';
   if (type == 'email' && $event == 'exist') message = FIELD_MAIL_EXIST;
   else if ($event == '' || $event == undefined) message = FIELD_REQUIRE;
   else if (type == 'email') message = FIELD_MAIL
   else if (type == 'file-size') message = FIELD_FILE_SIZE

    error.message = message
    errors.push(error);
    return errors;
  }
  /**
   * get params
   * @param entity
   * @param need
   * @param options
   */
  getParamsGlobal(entity: string, need: string, options:any={select:'active'}){
    let data;
    if(need == 'header'){
      let d: any[] = JSON.parse(localStorage.getItem('params'))[entity][need];

      if(options.select == 'active')d = d.filter(el=> el.status == true);

      data = d.sort((a,b)=>{
        if(Number(b.order) < Number(a.order)) return 1;
        return -1
      })
    }
    if(need) data = JSON.parse(localStorage.getItem('params'))[entity][need];

    return data;
  }

  /**
   * get dynamical variable
   * @param object
   * @param col
   * @param datePipe
   */
  getVar(object: any, col: any, datePipe: DatePipe): any {
    let v;
    let join = '';
    let joinCol = '';
    if (col.field.includes('.')) {
      let a: string[] = col.field.split('.');

      if (col.join && col.type != 'dateObject') {
        let b: string[] = col.join.split('.');
        joinCol = this.getVarLength(b, object);
      }
      if (col.join && col.type == 'dateObject') {
        let b: string[] = col.join.split('.');
        join = this.getVarLength(b, object);
      }
      v = this.returnRow(this.getVarLength(a, object) + ' ' + joinCol, col.type, datePipe, col.format, join);
    } else {
      v = this.returnRow(object[col.field], col.type, datePipe, col.format, join)
    }
    return v;
  }

  /**
   * get var length
   * @param fields
   * @param object
   */
  getVarLength(fields, object): any {

    if (fields.length == 2) {
      return object[fields[1]];
    } else if (fields.length == 3) {
      return object[fields[1]]?.[fields[2]]
    } else if (fields.length == 4) {
      return object[fields[1]]?.[fields[2]]?.[fields[3]];
    } else if (fields.length == 5) {
      return object[fields[1]]?.[fields[2]]?.[fields[3]]?.[fields[4]];
    } else if (fields.length == 6) {
      return object[fields[1]]?.[fields[2]]?.[fields[3]]?.[fields[4]]?.[fields[5]]
    } else if (fields.length == 7) {
      return object[fields[1]]?.[fields[2]]?.[fields[3]]?.[fields[4]]?.[fields[5]]?.[fields[6]]
    } else if (fields.length == 8) {
      return object[fields[1]]?.[fields[2]]?.[fields[3]]?.[fields[4]]?.[fields[5]]?.[fields[6]]?.[fields[7]]
    } else {
      return
    }
  }


  /**
   * return row variable
   * @param row
   * @param type
   * @param format
   * @param datePipe
   * @param join
   */
  returnRow(row, type, datePipe, format: string = 'dd-MM-yyyy HH:mm', join) {
    if (type == 'dateObject' && join == '') {
      return datePipe.transform(row, format);
    }
    if (type == 'dateObject' && join != '') {
      let d: Date = new Date(row.split('T')[0]);
      d.setHours(Number(join?.split(':')[0]));
      d.setMinutes(Number(join?.split(':')[1]));
      if (d.toString() != 'Invalid Date') {
        return datePipe.transform(d, format);
      }
      return;

    }
    return row;
  }

  filterTable(objects: any[], user1: UserModel, origin: string, dateGo: any, dateReturn: any, dateFilter: any, statusFilter: string, statusVouchersFilter: string, statusTripsFilter: string, statusBookingsFilter: string, statusTransactionsFilter: string, statusTicketFilter: string, typeTicketsFilter: string, statusTagFilter: string, statusRanting: string, statusNotificationsReceiverNotification: string, statusNotificationFilter: string, selectedSeller: UserModel[], sellers: UserModel[], sellerTransactions: any[], sellerTransactionsFilter: any, storyActionFilter: string, datePipe: DatePipe) {
    return [];
  }

  getSizeColumn(col: any) {
    return "";
  }

  getSizeActions(origin: string) {
    return "";
  }

  /**
   * get template data
   */
  getTemplateData() {
    let objects = [];
    for(let i = 1; i < 10 ; i++){
      let o :any = {};
      objects.push(o);
    }
    return objects
  }


  /**
   * reload
   * @param router
   * @param store
   * @param user
   * @param label
   */
  reload(router: Router, store: Store, user: UserModel, label: string) {

    this.getRedux(store, user, label);
    //let currentUrl = router.url;
    // router.routeReuseStrategy.shouldReuseRoute = () => false;
    //router.onSameUrlNavigation = 'reload';
    //router.navigateByUrl(currentUrl, {skipLocationChange: true}).then()
  }



  /**
   * get redux one time
   * @param store
   * @param user
   * @param label
   */
  getRedux(store: Store, user: UserModel, label: string = 'all') {


  }

  /**
   * change title dialog
   * @param action
   * @param state
   * @param origin
   */
  changeHeader(action: string, state: string, origin:string= ''): string{
    let header = "";
    switch (origin) {
      case 'agence':
      case 'ville':
        if(action=='add'){
          header = 'Ajouter une '+origin;
        }else{
          if(state == 'view'){
            header =  'Fiche d\'une '+origin;
          }else{
            header =  'Modifier une '+origin;
          }
        }
        break;


      case 'service':
      case 'ticket':
      case 'type de ticket':
        if(action=='add'){
          header = 'Ajouter un '+origin;
        }else{
          if(state == 'view'){
            header =  'Fiche de ' +origin;
          }else{
            header =  'Modifier '+origin;
          }
        }
        break;


      default:
        header = "Ajouter"; break
    }

    return header;
  }


  /**
   * group member all level
   * @param church
   * @param idChurchMember
   */
  groupMemberForChurch(church: ChurchModel, idChurchMember) : number{
    if(church?._id == idChurchMember ){
      return 1
    }else{
      if(church.parent){
        return this.groupMemberForChurch(church.parent, idChurchMember)

      }else{
        return 0
      }
    }
  }


  /**
   * create country
   * @param id
   * @param action
   * @param objects
   * @param dialogService
   * @param origin
   * @param component
   */
  createDialogAdd(id:string = '0', action:string = 'add', objects: any , dialogService: DialogService, origin: string, component) {
    let header = new MainClass().changeHeader(action,action, origin);

    console.log(id)
    console.log(objects)
    let object : any = objects.find(el=> el._id == id);
    if(!object){
      object = {};
    }
    dialogService.open(component, {
      header: header,
      width: '30%',
      data:{ object, action},
      contentStyle: {"max-height": "500px", "overflow": "auto"},
      baseZIndex: 10000
    });
  }



}
