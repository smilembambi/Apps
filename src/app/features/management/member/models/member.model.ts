import {PersonModel} from "../../../../core/models/natural-model/person.model";
import {StoryEventModel} from "../../../../core/models/feature-model/story-event.model";
import {UserModel} from "../../../../features-master/users/models/user.model";
import {ChurchModel} from "../../church/models/church.model";
import {CityModel} from "../../../../features-master/city/models/city.model";

export class MemberModel {
  _id: string;
  church: ChurchModel;
  name: string;
  firstName: string;
  address: string;
  arrondissement : string;
  city: CityModel;
  sex: string;
  phone: any;
  email: string;
  birthday: string;
  storyEvent: StoryEventModel[];
  user: UserModel;
  location: {
    lat: number,
    long: number
  }
  label: string;
}
