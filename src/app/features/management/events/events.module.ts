import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {EventsEditComponent} from './pages/events-edit/events-edit.component';
import {EventsListComponent} from './pages/events-list/events-list.component';
import {MainModule} from "../../../shared/widget/main/main.module";
import {EventsPresenceComponent} from './pages/events-presence/events-presence.component';
import {CheckboxModule} from "primeng/checkbox";
import {FormsModule} from "@angular/forms";
import {RippleModule} from "primeng/ripple";
import {ButtonModule} from "primeng/button";
import {ConfirmPopupModule} from "primeng/confirmpopup";
import {ConfirmationService, MessageService} from "primeng/api";
import {OverlayPanelModule} from "primeng/overlaypanel";
import {RadioButtonModule} from "primeng/radiobutton";
import {EventsMessageComponent} from './pages/events-message/events-message.component';
import {EditorModule} from "primeng/editor";
import {ToolbarModule} from "primeng/toolbar";
import {EventsActivitySheetComponent} from './pages/events-activity-sheet/events-activity-sheet.component';
import {FileUploadModule} from "primeng/fileupload";
import {ToastModule} from "primeng/toast";
import { AddTestimonyComponent } from './pages/events-activity-sheet/add-testimony/add-testimony.component';
import {FormModule} from "../../../examples/pages/form/form.module";
import {DialogModule} from "primeng/dialog";
import {NgxImageZoomModule} from "ngx-image-zoom";

const routes: Routes = [
  {
    path: '',
    component: EventsListComponent
  },
  {
    path: 'message',
    component: EventsMessageComponent
  },
  {
    path: 'edit/:id',
    component: EventsEditComponent
  },
  {
    path: 'presence/:id',
    component: EventsPresenceComponent
  },
  {
    path: 'fiche-activite/:id',
    component: EventsActivitySheetComponent
  },

];

@NgModule({
  declarations: [
    EventsEditComponent,
    EventsListComponent,
    EventsPresenceComponent,
    EventsMessageComponent,

    EventsActivitySheetComponent,
     AddTestimonyComponent
  ],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        MainModule,
        CheckboxModule,
        FormsModule,
        RippleModule,
        ButtonModule,

        ConfirmPopupModule,
        OverlayPanelModule,
        RadioButtonModule,
        EditorModule,
        ToolbarModule,
        FileUploadModule,
        ToastModule,
        FormModule,
        DialogModule,
        NgxImageZoomModule,
    ],
  providers:[
    ConfirmationService,
    MessageService
  ]
})
export class EventsModule { }
