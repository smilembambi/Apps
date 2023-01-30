import {UserModel} from "../../../../features-master/users/models/user.model";

export class ActivitySheetModel {
  _id: string;
  pictures: string[];
  wasDone: boolean;
  subject : string;
  driver : string;
  driverObject : UserModel;
  startTime : string;
  endTime : string;

  testimonials: TestimonialModel[];
  comment : string;
  createdBy:  UserModel;
  status: string

}


export class TestimonialModel{
  name: string;
  testimony: string;
  dateTestimony :string;
}
