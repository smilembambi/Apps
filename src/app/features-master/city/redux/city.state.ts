import {CityModel, QueryResultCity} from '../models/city.model';

export interface CityState {
  cities: CityModel[];
  isRequestOk: boolean;
  isRequestNot: boolean;
  city: CityModel;
  result: QueryResultCity;
  loading: boolean;
  loaded: boolean

}

export const initialState: CityState = {
  cities: [],
  isRequestOk: false,
  isRequestNot: false,
  city: undefined,
  result:undefined,
  loading: false,
  loaded: false
};
