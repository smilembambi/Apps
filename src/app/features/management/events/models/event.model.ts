import {TypeEventModel} from "./type-event.model";
import {ChurchModel} from "../../church/models/church.model";
import {CampaignModel} from "./campaign.model";
import {WorshipModel} from "./worship.model";
import {UserModel} from "../../../../features-master/users/models/user.model";
import {MessageEventModel} from "./message-event.model";
import {ActivitySheetModel} from "./activity-sheet.model";

export class EventModel {
  _id: string;
  label: string;
  typeEvent: TypeEventModel;
  dateEvent : string;
  place: string;
  pictures: string[];
  church: ChurchModel;
  month: string;
  year : string;
  campaign : CampaignModel;
  worship: WorshipModel;
  createdBy: UserModel;
  isMain : boolean;
  message: MessageEventModel;
  activitySheet: ActivitySheetModel;
}
