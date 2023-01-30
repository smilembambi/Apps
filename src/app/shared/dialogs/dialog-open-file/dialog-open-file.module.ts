import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogOpenFileComponent } from './dialog-open-file.component';
import {PdfViewerModule} from "ng2-pdf-viewer";
import {NgbAlertModule} from "@ng-bootstrap/ng-bootstrap";
import {SharedModule} from "../../shared.module";
import {MainModule} from "../../widget/main/main.module";


@NgModule({
  declarations: [
    DialogOpenFileComponent
  ],
  exports:[DialogOpenFileComponent],
  imports: [
    CommonModule,
    PdfViewerModule,
    NgbAlertModule,
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class DialogOpenFileModule { }
