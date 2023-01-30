import {UserModel} from "../../users/models/user.model";

export class CityModel {
  _id: string;
  label: string;
  country: any;
  region: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  createdBy: UserModel;
  abbreviation: any;
}


export class QueryResultCity {
  data: CityModel;
  success: boolean;
}

export class QueryResultCities {
  data: CityModel[];
  success: boolean;
}



// Search Data
export interface SearchResult {
  cities: CityModel[];
  success: boolean;
  total: number;
}
