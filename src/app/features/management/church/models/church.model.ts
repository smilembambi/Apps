
import {LocationModel} from "../../../../core/models/natural-model/location.model";
import {UserModel} from "../../../../features-master/users/models/user.model";
import {BaseModelModel} from "../../../../core/models/natural-model/base-model.model";
import {CityModel} from "../../../../features-master/city/models/city.model";
import {CountryModel} from "../../../../features-master/country/models/country.model";

export class ChurchModel extends BaseModelModel{
  _id: string;
  label : string;
  codeObject : string;
  address: any;
  manager : UserModel;
  subManager: UserModel;
  phone1: any;
  phone2: any;
  phone3: any;
  city: CityModel;
  countryChurch: CountryModel
  typeChurch: string;
  creationDate: string;
  smsNumber: string;
  location: LocationModel;
  starNumber: number;
  memberNumber: number;
  createdBy: UserModel;
  parent: ChurchModel;
  pastoralCollege: UserModel[];
  isMain: boolean;
  childNumber: number
  level: number
  managerSFront: UserModel;
  managerFront: UserModel;

}
