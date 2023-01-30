import {CityModel} from "../../../features-master/city/models/city.model";

export class BaseUserModel {
  name: string;
  firstName: string;
  sex: string;
  birthday: any;
  label: string;
  phone: any;
  address: string;
  addressSuite: string;
  country: string;
  city: CityModel;
  region: string;
  postalCode: string;

}
