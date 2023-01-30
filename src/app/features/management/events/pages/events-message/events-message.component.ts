import {Component, OnInit} from '@angular/core';
import {MainAllService} from "../../../../../core/services/main-all.service";
import {EventModel} from "../../models/event.model";
import {MessageEventModel} from "../../models/message-event.model";
import { Location} from "@angular/common";
import {PdfService} from "../../../../../core/services/pdf.service";
import { URL_API } from 'src/app/core/helpers/params/params-api.routes';
import {ToastrService} from "ngx-toastr";


declare var require: any
const FileSaver = require('file-saver');

@Component({
  selector: 'app-events-message',
  templateUrl: './events-message.component.html',
  styleUrls: ['./events-message.component.scss']
})
export class EventsMessageComponent implements OnInit {
  loading: any;
  title: string = "Prédication des EDM";

  listMainEvent: EventModel [] = [];
  selectedList : EventModel;
  isEdit: boolean = false;

  constructor(private mainService: MainAllService,
              private pdfService: PdfService,
              private toastService: ToastrService,
              private location: Location) { }

  ngOnInit(): void {
    this.getLisMainEvent();

  }

  getLisMainEvent(){
    let params: any = {};
    params.isMain = true;
    this.mainService.getAll(params, 'event').subscribe({
      next:(res)=>{
        if(res.success){
          this.listMainEvent = res.data;
          if(this.listMainEvent.length > 0 ) {
            this.selectedList = this.listMainEvent[0];
            if(!this.selectedList?.message){
              let message = new MessageEventModel();
              message.label =  message.comment =  message.message = "";
              this.selectedList.message = message;
            }
          }
        }
      }
    })
  }

  saveList() {
    this.loading = true;
    this.mainService.create(this.selectedList, 'event').subscribe({
      next:(res)=>{
        if(res.success){
          this.loading = false;
          this.location.back();
        }
      }
    })
  }

  back() {
    this.location.back();
  }

  change($event: any) {
    this.selectedList = $event;
  }

  download() {
    this.loading = true;
    this.mainService.getAll({},'event/'+ this.selectedList._id +'/download').subscribe({
      next: (res)=>{
        if(res.success){
          this.loading = false;
          this.getFile(res.data).then()
        }
      }
    })
  }

  async getFile(pdfName) {
    this.loading = true;
    await FileSaver.saveAs(URL_API.baseUrlPdfs + 'messageedm/'+pdfName.fileDownload, pdfName.fileDownload);
    const message = "Fichier télécharger";
    this.toastService.success(message);
    setTimeout(() => {
      this.loading = false;
    }, 3000);
  }

  getComment($event: any) {
    console.log($event);
    this.selectedList.message.comment = $event
  }
}
