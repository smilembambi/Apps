import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {UIModule} from './ui/ui.module';

import {WidgetModule} from './widget/widget.module';
import {MainModule} from "./widget/main/main.module";
import {NgbAlertModule} from "@ng-bootstrap/ng-bootstrap";

@NgModule({
  declarations: [ ],
  imports: [
    CommonModule,
    UIModule,
    WidgetModule,
    MainModule,
    NgbAlertModule,

  ],
})

export class SharedModule { }
