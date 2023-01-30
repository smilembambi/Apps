import { Action, createReducer, on } from "@ngrx/store";
import * as ItemActions from "./city.actions";
import {CityState,initialState} from './city.state';
import * as AgenciesActions from "../../agency/redux/agency.actions";

const cityReducer = createReducer(
  initialState,


  /*********** FETCH ***************/
  on(ItemActions.fetchCity, (state, { params }) => ({
    ...state,
    loading: true,
    loaded: false,
    isRequestOk: false,
    isRequestNot:false,
  })),


  on(ItemActions.fetchCitySuccess, (state, { cities }) => ({
    ...state,
    cities: cities,
    isRequestOk: true,
    loading: false,
    loaded: true
  })),

  on(ItemActions.fetchCityFailed, (state, {  }) => ({
    ...state,
    loading: false,
    loaded: true,
    isRequestNot:true,
  })),




  /*********** ADD AND EDIT ***************/

  on(ItemActions.editCity, (state, {  }) => ({
    ...state,
    loading: true,
    loaded: false,
    isRequestOk: false,
    isRequestNot:false,
  })),

  on(ItemActions.editCitySuccess, (state, { result }) => {
    const itemIndex = state.cities.findIndex(
      (item) => item._id === result.data._id
    );
    const updatedItem = [...state.cities];
    if(itemIndex == -1){
      updatedItem.unshift(result.data)
    }else{
      updatedItem.splice(itemIndex,1, result.data)
    }

    return {
      ...state,
      isRequestOk:true,
      city: state.city,
      loaded: true,
      loading: false,
      result: result,
      cities: updatedItem,
    };
  }),

  on(ItemActions.editCityFailed, (state, {  }) => ({
    ...state,
    loading: false,
    loaded: true,
    isRequestNot:true,
  })),



  /*********** DELETE ***************/
  on(ItemActions.deleteCity, (state, {  }) => ({
    ...state,
    loading: true,
    loaded: false,
    isRequestOk: false,
    isRequestNot:false,
  })),


  on(ItemActions.deleteCitySuccess, (state, { cityId, res }) => {
    const itemIndex = state.cities.findIndex(
      (item) => item._id === cityId
    );
    const dataItems = [...state.cities];
    dataItems.splice(itemIndex, 1);
    return {
      ...state,
      isRequestOk:true,
      result:res,
      loading:false,
      loaded: true,
      cities: dataItems,
    };
  }),

  on(ItemActions.deleteCityFailed, (state, {  }) => ({
    ...state,
    loading: false,
    loaded: true,
    isRequestNot:true,
  })),


);

export function reducer(state: CityState | undefined, action: Action) {
  return cityReducer(state, action);
}
