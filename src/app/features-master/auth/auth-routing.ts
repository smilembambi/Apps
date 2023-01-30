import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {LoginComponent} from './pages/login/login.component';
import {Login2Component} from './pages/login2/login2.component';

import {SignupComponent} from './pages/signup/signup.component';
import {PasswordresetComponent} from './pages/passwordreset/passwordreset.component';
import {Register2Component} from './pages/register2/register2.component';
import {Recoverpwd2Component} from './pages/recoverpwd2/recoverpwd2.component';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'signup',
    component: SignupComponent
  },
  {
    path: 'signup-2',
    component: Register2Component
  },
  {
    path: 'reset-password',
    component: PasswordresetComponent
  },
  {
    path: 'recoverpwd-2',
    component: Recoverpwd2Component
  },
  {
    path: 'login-2',
    component: Login2Component
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule {
}
