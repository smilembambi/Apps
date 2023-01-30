import {catchError, map, switchMap, tap} from "rxjs/operators";
import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {of} from "rxjs";
import {Router} from "@angular/router";
import {Location} from "@angular/common";
import * as ItemsActions from "./city.actions";

import {ToastrService} from 'ngx-toastr';

import {QueryResultCities, QueryResultCity} from '../models/city.model';
import {MainAllService} from "../../../core/services/main-all.service";
import {
  MESSAGE_MODIFICATION_KO,
  MESSAGE_MODIFICATION_OK, MESSAGE_SUPPRESSION_KO,
  MESSAGE_SUPPRESSION_OK
} from "../../../core/helpers/params/params-message";


@Injectable()
export class CityEffects {
  constructor(private actions$: Actions<any>,
              private router: Router,
              private location: Location,
              private toastService: ToastrService,
              private elementService: MainAllService) {}

  //get all
  fetchCities$ = createEffect(() =>
    this.actions$.pipe(
      // you can pass in multiple actions here that will trigger the same effect
      ofType(ItemsActions.fetchCity.type),
      switchMap((action) =>
        this.elementService.getAll(action.params,'city').pipe(
          map((cities:QueryResultCities) =>
            ItemsActions.fetchCitySuccess({ cities: cities.data })
          ),
          catchError((error) =>
            of(ItemsActions.fetchCityFailed({ error: error }))
          )
        )
      )
    )
  );


  // edit
  editCity$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ItemsActions.editCity.type),
      switchMap((action) =>
        this.elementService.create(action.city, 'city').pipe(
          tap(() => {
            this.toastService.success(MESSAGE_MODIFICATION_OK);
          }),
          map((res: QueryResultCity) =>
            ItemsActions.editCitySuccess({ result: res })
          ),
          catchError((error) => {
              this.toastService.error(MESSAGE_MODIFICATION_KO);
              return of(ItemsActions.editCityFailed({ error: error }));
            }
          )
        )
      )
    )
  );




  // delete
  deleteCity$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ItemsActions.deleteCity.type),
      switchMap((action) =>
        this.elementService.delete(action.cityId, 'city').pipe(
          tap(() => {
            this.router.navigate(["app/admin/city/"]).then();
            this.toastService.success(MESSAGE_SUPPRESSION_OK);
          }),
          map((res) =>
            ItemsActions.deleteCitySuccess({ cityId: action.cityId, res:res })
          ),
          catchError((error) => {
              this.toastService.error(MESSAGE_SUPPRESSION_KO);
              return of(ItemsActions.deleteCityFailed({ error: error }));
              }
          )
        )
      )
    )
  );


  // init effect
/*  init$ = createEffect(
    () => this.actions$.pipe(tap((action) => console.log(action))),
    { dispatch: false }
  );*/

}
