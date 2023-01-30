import { Component, OnInit } from '@angular/core';
import {CityModel, QueryResultCity} from "../../../city/models/city.model";
import {Store} from "@ngrx/store";
import {DynamicDialogConfig, DynamicDialogRef} from "primeng/dynamicdialog";
import {UserService} from "../../../users/services/user.service";
import {CountryListConstancy} from "../../../../core/helpers/constancy/country-list.constancy";
import {editCity, selectCitiesIsRequestOk} from "../../../city/redux";
import {MainClass} from "../../../../core/helpers/class/main.class";
import {CountryModel} from "../../models/country.model";
import {MainAllService} from "../../../../core/services/main-all.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-country-edit',
  templateUrl: './country-edit.component.html',
  styleUrls: ['./country-edit.component.scss']
})
export class CountryEditComponent implements OnInit {
  state: string = 'edit';
  country: any;
  countries: any[] = [];
  loading: boolean = false;
  action: string = '';
  msgError: string = "";
  constructor(private store:Store,
              private router: Router,
              public config: DynamicDialogConfig,
              private mainService: MainAllService,
              private userService: UserService,
              private dialogService: DynamicDialogRef) { }

  ngOnInit(): void {
    if(this.config.data){
      this.country = {...this.config.data.country};
      this.action = this.config.data.action
      this.state = this.action == 'add' || this.action == 'edit' ? 'edit' : this.action;
    }

    this.countries = CountryListConstancy.map(el=> {
      let c : any =  el.translations.fr;
      return c
    });


  }

  ngOnChanges(){
    this.changeHeader();
  }



  /**
   * add
   */
  add() {
    let country: CountryModel = new CountryModel();

    if (Object.keys(this.country).length === 0) {
      //this.toastService.error('Saisissez le nom de la ville', 'Erreur !', {positionClass:'toast-top-center'});
      this.msgError = "Selectionner le pays";
      return;
    }


    if(!this.country?._id){

      const countryOne = CountryListConstancy.find(el=> el.translations.fr == this.country);
      if(countryOne){
        country.label = countryOne.translations.fr
        country.alpha2Code = countryOne.alpha2Code;
        country.callingCodes = countryOne.callingCodes;
        country.data = countryOne;
        country.createdBy = this.userService.getUser();
      }else{
          //this.toastService.error('Saisissez le nom de la ville', 'Erreur !', {positionClass:'toast-top-center'});
          this.msgError = "Selectionner le bon pays, svp";
          return;
      }


    }



    this.loading = true;
    this.mainService.create(country,'country').subscribe({
      next:(res)=>{
        if(res?.success){
          this.loading = false;
          this.dialogService.close({data:true});
          this.router.routeReuseStrategy.shouldReuseRoute = () => false;
          this.router.onSameUrlNavigation = 'reload';
          this.router.navigateByUrl('/app/administration/pays').then()

        }
      },
      error:(err)=>{
        this.loading = false;
      }

    })



  }

  /**
   * change header
   */
  changeHeader(){
    this.config.header = new MainClass().changeHeader(this.action,this.state, 'ville');
  }


}
