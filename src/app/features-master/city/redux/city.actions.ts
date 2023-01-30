import {createAction, props} from "@ngrx/store";
import {CityModel, QueryResultCity} from '../models/city.model';



/*** FETCH ****/
export const fetchCity= createAction(
  "[Fetch City Page] Add City",
  props<{ params: any }>()
);


// ✨ New 👇
export const fetchCitySuccess = createAction(
  "[City API] Fetch City Success",
  props<{ cities: CityModel[] }>()
);

// ✨ New 👇
export const fetchCityFailed = createAction(
  "[City API] Fetch City Failed",
  props<{ error: any }>()
);


/*** EDIT ****/

export const editCity = createAction(
  "[Edit City Page] Edit City",
  props<{ city: any }>()
);



// ✨ New 👇
export const editCitySuccess = createAction(
  "[City API] Edit City Success",
  props<{ result: QueryResultCity }>()
);


// ✨ New 👇
export const editCityFailed = createAction(
  "[City API] Edit City Failed",
  props<{ error: any }>()
);

/*** DELETE ****/

export const deleteCity= createAction(
  "[Delete City Page] Delete City",
  props<{ cityId: string }>()
);

// ✨ New 👇
export const deleteCitySuccess = createAction(
  "[City API] Delete City Success",
  props<{ cityId: string, res:any}>()
);

// ✨ New 👇
export const deleteCityFailed = createAction(
  "[City API] Delete City Failed",
  props<{ error: any }>()
);
