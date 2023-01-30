import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NgModule} from '@angular/core';
import {HTTP_INTERCEPTORS, HttpClient, HttpClientModule} from '@angular/common/http';

import {environment} from '../environments/environment';

import {NgbAccordionModule, NgbModule, NgbNavModule, NgbTooltipModule} from '@ng-bootstrap/ng-bootstrap';
import {CarouselModule} from 'ngx-owl-carousel-o';
import {ScrollToModule} from '@nicky-lenaers/ngx-scroll-to';



import {LayoutsModule} from './shared/layouts/layouts.module';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {initFirebaseBackend} from './authUtils';

import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';

import {ErrorInterceptor} from './core/interceptors/error.interceptor';
import {JwtInterceptor} from './core/interceptors/jwt.interceptor';
import {FakeBackendInterceptor} from './core/interceptors/fake-backend';
import {EffectsModule} from "@ngrx/effects";
import {metaReducers, reducers} from "./core/redux";
import {StoreModule} from '@ngrx/store';
import {DatePipe} from "@angular/common";
import {DialogService, DynamicDialogRef} from "primeng/dynamicdialog";
import {ToastrModule} from "ngx-toastr";
import {ToastModule} from "primeng/toast";
import {MessageService} from "primeng/api";


if (environment.defaultauth === 'firebase') {
  initFirebaseBackend(environment.firebaseConfig);
} else {
  // tslint:disable-next-line: no-unused-expression
  FakeBackendInterceptor;
}

export function createTranslateLoader(http: HttpClient): any {
  return new TranslateHttpLoader(http, 'assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    AppComponent,
  ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: createTranslateLoader,
                deps: [HttpClient]
            }
        }),
        LayoutsModule,
        AppRoutingModule,

        CarouselModule,
        NgbAccordionModule,
        NgbNavModule,
        NgbTooltipModule,
        ScrollToModule.forRoot(),
        ToastrModule.forRoot(),
        NgbModule,

        // redux module
        StoreModule.forRoot(reducers, {
            metaReducers,
        }),

        EffectsModule.forRoot([]),
        ToastModule,



    ],
  bootstrap: [AppComponent],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: FakeBackendInterceptor, multi: true },
    DatePipe,
    DialogService,
    MessageService,
    DynamicDialogRef
    //{ provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptorService, multi: true },
  ],
})
export class AppModule { }
