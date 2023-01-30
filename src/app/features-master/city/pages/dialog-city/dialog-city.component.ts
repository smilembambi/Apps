import {Component, OnInit} from '@angular/core';
import {Store} from "@ngrx/store";
import {DynamicDialogConfig, DynamicDialogRef} from "primeng/dynamicdialog";
import {CityModel} from "../../models/city.model";
import {UserService} from "../../../users/services/user.service";
import {MainClass} from "../../../../core/helpers/class/main.class";
import {MainAllService} from "../../../../core/services/main-all.service";
import {Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import {LocationUserService} from "../../../../core/services/location-user.service";

@Component({
  selector: 'app-dialog-city',
  templateUrl: './dialog-city.component.html',
  styleUrls: ['./dialog-city.component.scss']
})
export class DialogCityComponent implements OnInit {

  state: string = 'edit';
  city: CityModel = new CityModel();
  countries: any[] = [];
  loading: boolean = false;
  action: string = '';
  msgError: string = "";
  constructor(private store:Store,
              public config: DynamicDialogConfig,
              private router: Router,
              private userService: UserService,
              private locationUserService: LocationUserService,
              private toastService: ToastrService,
              private mainService: MainAllService,
              private dialogService: DynamicDialogRef) { }

  ngOnInit(): void {
    if(this.config.data){
      this.city = {...this.config.data.city};
      this.action = this.config.data.action
      this.state = this.action == 'add' || this.action == 'edit' ? 'edit' : this.action;
    }

    // this.countries = CountryListConstancy.map(el=> {
    //   let c : any =  el.translations.fr;
    //   return c
    // });

    this.mainService.getAll({}, 'country').subscribe({
      next:(res)=>{
        if(res.success){
          this.countries = res.data;
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

    if(!this.city._id){
      this.city.createdBy = this.userService.getUser();
    }

    if(!this.city.label) {
      //this.toastService.error('Saisissez le nom de la ville', 'Erreur !', {positionClass:'toast-top-center'});
      this.msgError = "Saisissez le nom de la ville";
      return;
    }

    if(!this.city.country) {
      this.msgError = "Selectionner le pays";
      return;
    }

    this.locationUserService.getCoordinates(this.city.label).subscribe(el=>{
      if(el){
        console.log(el)
      }
    })

    this.loading = true;
    this.mainService.create(this.city,'city').subscribe({
      next:(res)=>{
        if(res.success){
          this.loading = false;
          this.dialogService.close({data:true});
          this.router.routeReuseStrategy.shouldReuseRoute = () => false;
          this.router.onSameUrlNavigation = 'reload';
          this.router.navigateByUrl('/app/administration/ville').then()
        }
      },
      error:(err)=> {
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


  getField($event: any) {
    console.log($event);
    this.city.country=$event
  }
}
