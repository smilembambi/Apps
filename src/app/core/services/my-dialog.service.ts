import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import {DialogService} from "primeng/dynamicdialog";
import {DialogConfirmComponent} from "../../shared/dialogs/dialog-confirm/dialog-confirm.component";
import {ConfigClass} from "../helpers/class/config.class";
import {MESSAGE_CREATION_OK, MESSAGE_SUPPRESSION_KO, MESSAGE_SUPPRESSION_OK} from "../helpers/params/params-message";
import {MessageService} from "primeng/api";

@Injectable({
  providedIn: 'root'
})
export class MyDialogService {
  private result = new Subject<any>();


  constructor( private dialog: DialogService,) {}

  openDialog(DialogComponent, title, word, description, mainService, objectType, messageService: MessageService,object) {
    const ref = this.dialog.open(DialogConfirmComponent, {
      header: title,
      width:'500px',
      data:{title, word, description,},
      contentStyle: {"max-height": "500px", "overflow": "auto"},
      baseZIndex: 10000
    });

    ref.onClose.subscribe((res) => {
      if (res) {
        if(res.data){
          const urlApi = new ConfigClass().getParams(objectType,'info','api-route');
          mainService.delete(object._id,urlApi).subscribe({
            next: (res)=>{
              if(res && res.success){
                messageService.add({key: 'tc', severity:'success', summary: 'Bien', detail: MESSAGE_SUPPRESSION_OK});
                this.setResult({success:true})
              }
            },
            error: err => {
              messageService.add({key: 'tc', severity:'success', summary: 'Bien', detail: MESSAGE_SUPPRESSION_KO});
              this.setResult({success:false})
            }
          })
        }


      }
    });


  }

  getResult() {
    return this.result.asObservable();
  }

  setResult(data: any) {
    this.result.next(data);
  }
}
