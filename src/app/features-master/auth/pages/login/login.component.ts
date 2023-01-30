import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';

import { AuthenticationService } from '../../../../core/services/auth.service';
import { AuthfakeauthenticationService } from '../../../../core/services/authfake.service';

import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';

import { environment } from '../../../../../environments/environment';
import {ROUTE_APP_ANALYSE_DASHBOARD} from "../../../../core/helpers/params/params.routes";
import {MESSAGE_CHAMPS_OBLIGATOIRE} from "../../../../core/helpers/params/params-message";
import {DatePipe} from "@angular/common";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

/**
 * Login component
 */
export class LoginComponent implements OnInit {

  loginForm: UntypedFormGroup;
  submitted = false;
  error = '';
  returnUrl: string;

  // set the currenr year
  year: number = new Date().getFullYear();

  // tslint:disable-next-line: max-line-length
  loading: boolean = false;

  constructor(private formBuilder: UntypedFormBuilder,
              private route: ActivatedRoute,
              private router: Router,
              private datePipe : DatePipe,
              private authenticationService: AuthenticationService) {
    if (this.authenticationService.currentUserValue) {
      this.router.navigate(['/app/analyse/']).then();
    }
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['+2420643534354', [Validators.required]],
      password: ['admin', [Validators.required]],
    });

    // reset login status
    // this.authenticationService.logout();
    // get return url from route parameters or default to '/'
    // tslint:disable-next-line: no-string-literal
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  // convenience getter for easy access to form fields
  get f() { return this.loginForm.controls; }

  /**
   * Se connecter
   */
  onSubmit() {
    this.submitted = true;


    const controls = this.loginForm.controls;
    /** check form */
    let invalidFields = [];
    if (this.loginForm.invalid) {
      Object.keys(controls).forEach((controlName) => {
        controls[controlName].markAsTouched();
        if (controls[controlName].status == 'INVALID') {
          invalidFields.push(controlName);
        }
      });

      if (invalidFields.includes('username') && invalidFields.length == 1) {
        this.error = "Saisissez une adresse e-mail correcte";
      }
      else
      if(invalidFields.includes('recaptchaReactive') && invalidFields.length == 1 ){
        this.error = 'Veuillez confirmer que vous n\'êtes pas un robot';
      }

      else {
        this.error = MESSAGE_CHAMPS_OBLIGATOIRE;
      }

      return;
    }


    this.submitted = true;

    // reset alerts on submit



    this.loading = true;

    this.authenticationService.login(this.f.username.value, this.f.password.value).subscribe(
      // this.authenticationService.login("smilembambi@gmail.com", "admin").subscribe(
      (data: any)=>{
        if(data){
          if(data.success){
            if (this.authenticationService.currentUserValue) {


              // this.returnUrl='/app/dashboard'
              if(this.returnUrl == '/') this.returnUrl = '/app/analyse/';


              this.router.navigate([this.returnUrl ]).then();

            }
          }else{

            if(data.error == "roleError"){
              this.error = "Compte ou mot de passe incorrect";
            }
            else if(data.error == "noAccess"){
              this.error = "Vous n'êtes pas autorisé à utiliser, veuillez consulter votre Admin";
            }
            else{
              if(data.error == "noActive"){
                this.error = "Ce compte n'est pas activité";
              }else{

                if(data.error.includes("Disable account now")){
                  const date = this.datePipe.transform(data.error.split('::')[1], 'dd-MM-yyyy à HH:mm');
                  this.error = "Vous avez saisie un mauvais mot de passe 5fois de suite... " +
                    "Votre compte est desactivé jusqu'au " + date;
                }else{
                  if(data.error.includes("Disable account after")){
                    const date = this.datePipe.transform(data.error.split('::')[1], 'dd-MM-yyyy à HH:mm');
                    this.error = "Votre compte est desactivé jusqu'au " + date;
                  }else{
                    this.error = "Compte ou mot de passe incorrect";
                  }
                }
              }
            }
            this.loading = false;
          }
        }
      }, error => {

        if(error=="Unauthorized"){
          this.error = "Compte ou mot de passe incorrect";
        }

        this.loading = false;
      }
    );

  }
}
