import {BaseUserModel} from "../../../core/models/natural-model/base-user.model";
import {CityModel} from "../../city/models/city.model";
import {MinistryModel} from "../../../features/administration/ministry/models/ministry.model";


export class UserModel extends BaseUserModel {
  _id:string;
  name:string;
  firstName:string;
  username:string;
  label:string;
  email: string;
  birthday: string;
  address: string;
  arrondissement: string;
  city: CityModel;

  isStar:any;
  isPastor:any;
  isRem:any;

  picture: string;
  cover: string;

  password: string;

  status: string;
  role: string;
  location: any;
  token: string;
  createdAt: string;
  createdBy: UserModel;
  updatedAt: string;
  access: string[];
  codeObject: string;
  ministries: MinistryModel[];
}


export class QueryResultUser {
  data: UserModel;
  success: boolean;
}

export class QueryResultUsers {
  data: UserModel[];
}

// Search Data
export interface SearchResult {
  users: UserModel[];
  total: number;
}
