import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MainActionComponent} from "./main-table/main-action/main-action.component";
import {MainLoadingComponent} from "./main-loading/main-loading.component";
import {MainEditorComponent} from "./main-form/main-editor/main-editor.component";
import {MainButtonComponent} from "./main-form/main-button/main-button.component";
import {MainSelectComponent} from "./main-form/main-select/main-select.component";
import {MainInputComponent} from "./main-form/main-input/main-input.component";
import {MainTableComponent} from "./main-table/main-table.component";
import {MainViewInfoComponent} from "./main-view-edit/main-view-info/main-view-info.component";
import {MainStatusComponent} from "./main-status/main-status.component";
import {MainMapComponent} from "./main-map/main-map.component";
import {MainAutoCompleteComponent} from "./main-form/main-auto-complete/main-auto-complete.component";
import {MainPhoneNumberComponent} from "./main-form/main-phone-number/main-phone-number.component";
import {MainInputEmailComponent} from "./main-form/main-input-email/main-input-email.component";
import {MainFormComponent} from "./main-form/main-form.component";
import {MainNotDataComponent} from "./main-not-data/main-not-data.component";
import {MainViewZoneComponent} from "./main-view-edit/main-view-zone/main-view-zone.component";
import {MainViewEditComponent} from "./main-view-edit/main-view-edit.component";
import {MainChipsComponent} from "./main-form/main-chips/main-chips.component";
import {MainInputMaskComponent} from "./main-form/main-input-mask/main-input-mask.component";
import {MainInputFileComponent} from "./main-form/main-input-file/main-input-file.component";
import {MainInputNumberComponent} from "./main-form/main-input-number/main-input-number.component";
import {MainDateComponent} from "./main-form/main-date/main-date.component";
import {MainLoadingSkeletonComponent} from "./main-loading-skeleton/main-loading-skeleton.component";
import {TabViewModule} from "primeng/tabview";
import {ContextMenuModule} from "primeng/contextmenu";
import {SkeletonModule} from "primeng/skeleton";
import {TableModule} from "primeng/table";
import {DropdownModule} from "primeng/dropdown";
import {FormsModule} from "@angular/forms";
import {CalendarModule} from "primeng/calendar";
import {MultiSelectModule} from "primeng/multiselect";
import {SplitButtonModule} from "primeng/splitbutton";
import {AlertModule} from "ngx-bootstrap/alert";
import {NgxIntlTelInputModule} from "ngx-intl-tel-input";
import {CheckboxModule} from "primeng/checkbox";
import {InputNumberModule} from "primeng/inputnumber";
import {InputMaskModule} from "primeng/inputmask";
import {EditorModule} from "primeng/editor";
import {AutoCompleteModule} from "primeng/autocomplete";
import {InputTextModule} from "primeng/inputtext";
import {MainAllService} from "../../../core/services/main-all.service";
import {UIModule} from "../../ui/ui.module";
import { MainTitleComponent } from './main-title/main-title.component';
import {DialogConfirmModule} from "../../dialogs/dialog-confirm/dialog-confirm.module";
import {ToastModule} from "primeng/toast";
import {MessageService} from "primeng/api";
import {GoogleMapsModule} from "@angular/google-maps";

@NgModule({
  declarations: [
    MainActionComponent,
    MainLoadingComponent,
    MainTableComponent,
    MainInputComponent,
    MainSelectComponent,
    MainButtonComponent,
    MainEditorComponent,
    MainViewInfoComponent,
    MainStatusComponent,
    MainMapComponent,
    MainAutoCompleteComponent,
    MainPhoneNumberComponent,
    MainInputEmailComponent,
    MainFormComponent,
    MainNotDataComponent,
    MainViewZoneComponent,
    MainViewEditComponent,
    MainDateComponent,
    MainChipsComponent,
    MainInputMaskComponent,
    MainInputNumberComponent,
    MainInputFileComponent,
    MainLoadingSkeletonComponent,
    MainTitleComponent,
  ],
    exports: [
        MainButtonComponent,
        MainTableComponent,
        MainInputComponent,
        MainViewEditComponent,
        MainStatusComponent,
        MainViewInfoComponent,
        MainAutoCompleteComponent,
        MainLoadingSkeletonComponent,
        MainNotDataComponent,
        MainEditorComponent,
        MainSelectComponent,
        MainDateComponent,
        MainLoadingComponent,
        MainMapComponent
    ],
    imports: [
        CommonModule,
        TabViewModule,
        ContextMenuModule,
        SkeletonModule,
        TableModule,
        DropdownModule,
        FormsModule,
        CalendarModule,
        MultiSelectModule,
        SplitButtonModule,
        AlertModule,
        NgxIntlTelInputModule,
        CheckboxModule,
        InputNumberModule,
        InputMaskModule,
        EditorModule,
        AutoCompleteModule,
        InputTextModule,
        UIModule,
        DialogConfirmModule,
        ToastModule,
        GoogleMapsModule
    ],
  providers:[

  ]


})
export class MainModule { }
