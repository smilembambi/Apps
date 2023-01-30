import { Component, OnInit } from '@angular/core';
import {DynamicDialogConfig, DynamicDialogRef} from "primeng/dynamicdialog";
import {TestimonialModel} from "../../../models/activity-sheet.model";

@Component({
  selector: 'app-add-testimony',
  templateUrl: './add-testimony.component.html',
  styleUrls: ['./add-testimony.component.scss']
})
export class AddTestimonyComponent implements OnInit {
  state: any;
  testimony: TestimonialModel;

  constructor(private dialogService: DynamicDialogRef,
              public config: DynamicDialogConfig,) { }

  ngOnInit(): void {
    if(this.config.data){
      this.state = this.config.data.state;
      this.testimony = this.config.data.testimony;
    }
  }

  add() {
    this.dialogService.close({data:this.testimony});
  }
}
