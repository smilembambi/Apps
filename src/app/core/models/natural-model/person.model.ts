import {UserModel} from "../../../features-master/users/models/user.model";
import {AddressModel} from "./address.model";

export class PersonModel {
  name: string;
  firstName: string;
  sex: string;
  birthday: any;
  label: string;
  picture: string;
  email:string;
  phone: any;
  address: AddressModel;
  createdAt: string;
  updatedAt: string;
  createdBy: UserModel;
  ageRange: string;
  yearBorn: number;
}
