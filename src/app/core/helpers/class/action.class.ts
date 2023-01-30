import {UserModel} from "../../../features-master/users/models/user.model";
import {Router} from "@angular/router";
import {Store} from "@ngrx/store";
import {DialogService} from "primeng/dynamicdialog";
import {DialogConfirmComponent} from "../../../shared/dialogs/dialog-confirm/dialog-confirm.component";
import {
  MESSAGE_DISABLE_KO,
  MESSAGE_DISABLE_OK,
  MESSAGE_SUPPRESSION_KO,
  MESSAGE_SUPPRESSION_OK, MESSAGE_VALIDATION_KO, MESSAGE_VALIDATION_OK, TITLE_ACTIVE, TITLE_DELETE, TITLE_DISABLE
} from "../params/params-message";
import {MainAllService} from "../../services/main-all.service";
import {ConfigClass} from "./config.class";
import {ToastrService} from "ngx-toastr";
import {MyDialogService} from "../../services/my-dialog.service";
import {MessageService} from "primeng/api";

export class ActionClass {

  /**
   * can edit
   * @param origin
   * @param user
   * @param isStory
   */
  canEdit(origin: string, user: UserModel, isStory: boolean = false): boolean {
    let action: any = {};
    action.label = "edit";
    if(isStory) action.label = 'not';
    return this.can(action,origin,null, user);
  }


  /**
   * can
   * @param action
   * @param origin
   * @param data
   * @param user
   */
  can(action: any, origin: string, data: any, user: UserModel = null): boolean {

    switch (action.label) {
      case 'disable':
        return  false;

      case 'active':
        return  false;

      case 'edit':
        return  true;

      case 'view':
        return  true;

      case 'cancel':
        return  true;

      case 'delete':
        /** no delete for church level 0 **/
        if(origin == "church" && data.level == 0) return false;
        return  true;

      case 'finance':
        /** no finance for church level 0 **/
        if(origin == "church" && data.level == 0) return false;
        return  true;

      case 'location':
        /** no location for church level 0 **/
        if(origin == "church" && data.level == 0) return false;
        return  true;

      default: return  true;
    }

    return false;
  }


  /**
   * execuce action
   * @param data
   * @param router
   * @param mainRoute
   * @param type
   */
  executeAction(data: any, router: Router, mainRoute: string, type:string=''):any {
    const event = data.event;
    const _id = data._id;
    let queryParams: any;
    switch (event) {
      case 'edit':
        if(mainRoute.includes('/user'))queryParams = { queryParams: { type: type}};


        // if(OPEN_TAB_ACTION_URL.includes(mainRoute))window.open(mainRoute+'/edit/'+ _id, "_blank");
        // else router.navigate([mainRoute+'/edit/'+ _id], queryParams).then();
        router.navigate([mainRoute+'/edit/'+ _id], queryParams).then();


        break;
      case 'view':
        queryParams = { state: 'view' }

        if(mainRoute.includes('/user')){
          queryParams.type = type;
        }


        if(mainRoute == '/app/travel/selling') {
          mainRoute = "/app/travel/booking";
          queryParams.type = 'selling';
        }
        const globalMain = ["/app/manage/customer", "/app/travel/booking",  "/app/manage/transaction", "/app/manage/story" ];

        if(globalMain.includes(mainRoute) ){
          router.navigate([mainRoute+'/view/'+ _id], {queryParams}).then();
        } else{
          router.navigate([mainRoute+'/edit/'+ _id], {queryParams}).then();
        }

        break;
      case 'delete':
        return 'delete';
      case 'close':
        return 'close';
      case 'active':
        return 'active';
      case 'disable':
        return 'disable';
    }
  }


  /**
   * execute action
   * @param $event
   * @param _id
   * @param ref
   * @param object
   * @param objects
   * @param router
   * @param dialogService
   * @param mainService
   * @param messageService
   * @param store
   * @param origin
   */
  executeActionOne($event,
                   _id: string,
                   ref: string ='',
                   object : any,
                   objects: any[],
                   router:Router,
                   dialogService: MyDialogService,
                   mainService: MainAllService,
                   messageService: MessageService,
                   store: Store,
                   origin:string,
                   ) {

    const data = {event:$event, _id:_id, ref:ref}
    const returnExecute = new ActionClass().executeAction(data, router, this.getInfo('main-route', origin));
    const LABEL = objects.find(el => el._id == data._id).label;

    new ActionClass().executeActionOpen(
      returnExecute,
      dialogService,
      mainService,
      messageService,
      store,
      origin,
      objects,
      TITLE_ACTIVE,
      TITLE_DISABLE,
      TITLE_DELETE,
      this.getInfo('sentence', origin),
      LABEL,
      this.getInfo('main-route', origin),
      router,
      data);
  }

  getInfo(label, origin): any{
    return new ConfigClass().getParams(origin,'info',label)
  }

  /**
   * step One : execute action
   * @param actionType
   * @param dialog
   * @param mainService
   * @param messageService
   * @param store
   * @param objectType
   * @param objects
   * @param titleActive
   * @param titleDisable
   * @param titleDelete
   * @param sentence
   * @param label
   * @param mainRoute
   * @param router
   * @param data
   */
   executeActionOpen(
    actionType: string,
    dialog: MyDialogService,
    mainService: MainAllService,
    messageService: MessageService,
    store: Store,
    objectType: string,
    objects: any[],
    titleActive: string,
    titleDisable: string,
    titleDelete: string,
    sentence: string,
    label: string,
    mainRoute: string, //'app/travel/trip/'
    router: Router,
    data: any) {

    const descriptionActive = 'Pour activer ' + sentence + ' <b>' + label + '</b>, tapez le mot <strong>Activer</strong> dans la zone à saisie';
    const descriptionDelete = 'Pour supprimer ' + sentence + ' <b>' + label + '</b>, tapez le mot <strong>Supprimer</strong> dans la zone à saisie';
    const descriptionDisable = 'Pour désactiver ' + sentence + ' <b>' + label + '</b>, tapez le mot <strong>Désactiver</strong> dans la zone à saisie';


    let object;

    switch (actionType) {
      case 'active':
        object = objects.find(el => el._id == data._id);
        this.actionStepOne(store, dialog, mainService, messageService, objectType, object, titleActive, 'Activer', descriptionActive, "Opérationnel", MESSAGE_VALIDATION_OK, MESSAGE_VALIDATION_KO);
        break;
      case 'delete':
        object = objects.find(el => el._id == data._id);
        this.actionStepOne(store, dialog, mainService, messageService, objectType, object, titleDelete, 'Supprimer', descriptionDelete, "", MESSAGE_SUPPRESSION_OK, MESSAGE_SUPPRESSION_KO, 'delete');
        break;
      case 'disable':
        object = objects.find(el => el._id == data._id);
        this.actionStepOne(store, dialog, mainService, messageService, objectType, object, titleDisable, 'Désactiver', descriptionDisable, "Désactivé", MESSAGE_DISABLE_OK, MESSAGE_DISABLE_KO);
        break;
    }
  }



  /**
   * step Two : execute action
   * @param store
   * @param dialog
   * @param mainService
   * @param messageService
   * @param title
   * @param word
   * @param description
   * @param status
   * @param msgOk
   * @param msgKo
   * @param objectType
   * @param object
   * @param action
   */
  actionStepOne(store: Store,
                      dialog: MyDialogService,
                      mainService: MainAllService,
                      messageService: MessageService,
                      objectType: string,
                      object: any,
                      title: string,
                      word: string,
                      description: string,
                      status: string,
                      msgOk: string,
                      msgKo: string,
                      action: string = 'update') {
    this.actionStepTwo(dialog, mainService, messageService, store, objectType, object, title, word, description, status, msgOk, msgKo, action)
  }

  /**
   * action step two
   * @param dialog
   * @param mainService
   * @param messageService
   * @param store
   * @param objectType
   * @param object
   * @param title
   * @param word
   * @param description
   * @param status
   * @param msgOk
   * @param msgKo
   * @param action
   */
  actionStepTwo(dialog: MyDialogService,
                mainService: MainAllService,
                messageService: MessageService,
                store: Store,
                objectType: string,
                object: any, title: string, word: string, description: string, status: string, msgOk: string, msgKo: string, action: string = 'update') {

    dialog.openDialog(DialogConfirmComponent,title,word,description, mainService, objectType, messageService,object);

  }

}
