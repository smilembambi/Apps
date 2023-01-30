import {ChangeDetectorRef, Component, EventEmitter, Input, OnChanges, Output, SimpleChanges} from "@angular/core";
import {URL_API} from "../../../../../core/helpers/params/params-api.routes";
import {UserService} from "../../../../../features-master/users/services/user.service";
import {DialogService} from "primeng/dynamicdialog";
import {AllService} from "../../../../../core/services/all.service";
import {MainClass} from "../../../../../core/helpers/class/main.class";
import {MAX_SIZE_UPLOAD_FILE} from "../../../../../core/helpers/params/params-global";
import {DialogOpenFileComponent} from "../../../../dialogs/dialog-open-file/dialog-open-file.component";
import {ActionClass} from "../../../../../core/helpers/class/action.class";
import {saveAs} from 'file-saver';

@Component({
  selector: 'app-main-input-file',
  templateUrl: './main-input-file.component.html',
  styleUrls: ['./main-input-file.component.scss']
})
export class MainInputFileComponent implements OnChanges{
  @Input('id') id : any;
  @Input('isStory') isStory : boolean = false;
  @Input('field') field : any = '';
  @Input('value') value : any = '';
  @Input('label') label : string = '';
  @Input('origin') origin : string = '';
  @Input('size') size : string = "20";
  @Input('state') state : string = 'edit';
  @Input('type') type : string = 'string';
  @Output('sendField') sendField = new EventEmitter();
  @Output('sendState') sendState = new EventEmitter();
  @Output('sendFile') sendFile = new EventEmitter();

  @Input('errors') errors: any[] = [];
  @Output('sendErrors') sendErrors = new EventEmitter();
  @Input('isValidForm') isValidForm: boolean = false;
  @Input('isRequire') isRequire : boolean = false;


  isError: boolean = false;
  message: string = '';

  fileUpload: File;

  errorFieldFile: any;
  url = URL_API.baseUrlFiles;
  constructor(private cdr: ChangeDetectorRef,
              private allService: AllService,
              private userService: UserService,
              public dialogService: DialogService,) {}




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
    this.fileUpload = this.getDoc($event);
    this.sendFile.emit(this.fileUpload);
    this.cdr.detectChanges();
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
   * get document
   * @param files
   */
  getDoc(files) {
    if(files[0] == undefined)   this.errorFieldFile= "";
    if (files.length === 0) return;
    let mimeSize = files[0].size;

    if(mimeSize > MAX_SIZE_UPLOAD_FILE){
      this.errorFieldFile = "La taille du fichier ne peux pas depasser " + MAX_SIZE_UPLOAD_FILE / 1000 + "ko";
      this.errors = new MainClass().createError(files[0], this.id, this.errors,'file-size');
    }else{
      this.errorFieldFile = "";
      this.errors = new MainClass().validField(this.errors,this.id);
    }

    return files[0];
  }


  /**
   * view doc
   */
  viewDoc() {
    let url: string = '';
    let type: string = '';
    let label: string = '';







    const ref = this.dialogService.open(DialogOpenFileComponent, {
      header: '',
      width:'700px',
      data:{ url: url},
      contentStyle: {"max-height": "500px", "overflow": "auto"},
      baseZIndex: 10000
    });

    ref.onClose.subscribe((res) => {
      if (res) {
        if(res == 'download'){
          this.download(url, type);
        }
      }
    });

  }

  /**
   * downlaod
   * @param url
   * @param type
   */
  download(url,type){
    this.allService.export(url).subscribe(data => saveAs(data, type));
  }

  clearFile() {
    this.field=null;
    this.fileUpload = null;
    this.errorFieldFile = "";
    this.errors = new MainClass().validField(this.errors,this.id);
    this.sendFile.emit(null);
  }

  /**
   * have file
   */
  haveFile():boolean {


    return false;
  }

  /**
   * get name file
   */
  getNameFile() :string {


    return '';
  }


  /**
   * can edit
   */
  canEdit(): boolean {
    return new ActionClass().canEdit(this.origin,this.userService.getUser(), this.isStory);
  }
}
