import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SharedModule} from "../../shared.module";
import {NgbAlertModule} from "@ng-bootstrap/ng-bootstrap";
import {MainModule} from "../../widget/main/main.module";
import {DialogConfirmComponent} from "./dialog-confirm.component";
import {FormsModule} from "@angular/forms";
import {InputTextModule} from "primeng/inputtext";


@NgModule({
  declarations: [DialogConfirmComponent],
  exports:[DialogConfirmComponent],
  imports: [
    CommonModule,
    NgbAlertModule,
    FormsModule,
    InputTextModule,
  ]
})
export class DialogConfirmModule { }
