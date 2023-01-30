import { Component, OnInit } from '@angular/core';
import {DynamicDialogConfig, DynamicDialogRef} from "primeng/dynamicdialog";

@Component({
  selector: 'app-dialog-open-file',
  templateUrl: './dialog-open-file.component.html',
  styleUrls: ['./dialog-open-file.component.scss']
})
export class DialogOpenFileComponent implements OnInit {
  url: string;
  constructor(public config: DynamicDialogConfig,
              private dialogService: DynamicDialogRef) { }

  ngOnInit(): void {

    if(this.config.data){
      this.url = this.config.data.url;
    }
  }

  download() {
    this.dialogService.close("download");
  }

}
