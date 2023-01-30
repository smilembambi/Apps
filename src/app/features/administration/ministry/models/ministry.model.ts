import {UserModel} from "../../../../features-master/users/models/user.model";

export class MinistryModel {
  _id: string;
  label: string;
  manager : string;
  description: string;
  status: any;
  createdBy: UserModel;
  createdAt: string;
}
