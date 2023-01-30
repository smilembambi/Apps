import {createFeatureSelector, createSelector} from "@ngrx/store";
import {CityState} from './city.state';


export const selectCities= createFeatureSelector<CityState>("cities");

export  const  selectCitiesLoading$ =
  createSelector(selectCities, (state) =>  state.loading);

export  const  selectCitiesLoaded$ =
  createSelector(selectCities, (state) =>  state.loaded);



//select all
export const selectAllCities = createSelector(
  selectCities,
  (state: CityState) => state.cities
);

//select one
export const selectOneCity = (props: { id: string }) =>
  createSelector(selectAllCities, (cities) =>
    cities.find((city) => city._id === props.id)
);


//select is request ok
export const selectCitiesIsRequestOk = createSelector(
  selectCities,
  cityState =>  {return cityState.result},

);

