import {UserModel} from "../../users/models/user.model";

export class CountryModel {
  _id: string;
  label: string;
  alpha2Code: string;
  callingCodes: any;
  data: any;
  createdBy: UserModel;
  status: any;
  createdAt: string;

}
