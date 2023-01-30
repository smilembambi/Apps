import { Component, OnInit } from '@angular/core';
import {Store} from "@ngrx/store";
import {Router} from "@angular/router";
import {DynamicDialogConfig, DynamicDialogRef} from "primeng/dynamicdialog";
import {MainAllService} from "../../../../../core/services/main-all.service";
import {UserService} from "../../../../../features-master/users/services/user.service";
import {CountryListConstancy} from "../../../../../core/helpers/constancy/country-list.constancy";
import {CountryModel} from "../../../../../features-master/country/models/country.model";
import {MainClass} from "../../../../../core/helpers/class/main.class";
import {UserModel} from "../../../../../features-master/users/models/user.model";
import {MinistryModel} from "../../models/ministry.model";

@Component({
  selector: 'app-ministry-edit',
  templateUrl: './ministry-edit.component.html',
  styleUrls: ['./ministry-edit.component.scss']
})
export class MinistryEditComponent implements OnInit {

  state: string = 'edit';

  users: UserModel[] = [];
  loading: boolean = false;
  action: string = '';
  msgError: string = "";

  ministry: MinistryModel = new MinistryModel();

  constructor(private store:Store,
              private router: Router,
              public config: DynamicDialogConfig,
              private mainService: MainAllService,
              private userService: UserService,
              private dialogService: DynamicDialogRef) { }

  ngOnInit(): void {
    if(this.config.data){
      this.ministry = {...this.config.data.object};
      console.log("MINISTR",this.ministry)
      this.action = this.config.data.action
      this.state = this.action == 'add' || this.action == 'edit' ? 'edit' : this.action;
    }

    this.getUser()

  }

  getUser(){
    let params: any = {};
    params.isPastor = true;
    this.mainService.getAll(params, 'user').subscribe({
      next:(res)=>{
        if(res.success){
          this.users = res.data;
        }
      }
    })
  }

  ngOnChanges(){
    this.changeHeader();
  }



  /**
   * add
   */
  add() {



    this.loading = true;
    this.mainService.create(this.ministry,'ministry').subscribe({
      next:(res)=>{
        if(res?.success){
          this.loading = false;
          this.dialogService.close({data:true});
          this.router.routeReuseStrategy.shouldReuseRoute = () => false;
          this.router.onSameUrlNavigation = 'reload';
          this.router.navigateByUrl('/app/administration/ministere').then()

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
