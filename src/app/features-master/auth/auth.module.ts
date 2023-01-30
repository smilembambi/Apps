import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';
import { CarouselModule } from 'ngx-owl-carousel-o';

import { UIModule } from '../../shared/ui/ui.module';
import { LoginComponent } from './pages/login/login.component';
import { Login2Component } from './pages/login2/login2.component';
import { SignupComponent } from './pages/signup/signup.component';
import { Register2Component } from './pages/register2/register2.component';
import { Recoverpwd2Component } from './pages/recoverpwd2/recoverpwd2.component';

import { AuthRoutingModule } from './auth-routing';
import { PasswordresetComponent } from './pages/passwordreset/passwordreset.component';

@NgModule({
  declarations: [LoginComponent, Login2Component, SignupComponent, PasswordresetComponent, Register2Component, Recoverpwd2Component],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    NgbAlertModule,
    UIModule,
    AuthRoutingModule,
    CarouselModule
  ]
})
export class AuthModule { }
