import {EventModel} from "./event.model";
import {MemberModel} from "../../member/models/member.model";
import {UserModel} from "../../../../features-master/users/models/user.model";

export class PresenceListModel {
  _id: string;
  event : EventModel;
  member : MemberModel;
  label: string;
  isPresent: string; //P: presence : A: Absence  RA: reasonAbsence
  reasonAbsence: any;
  checkinDate: string;

  updatedBy: UserModel
  isNewMember: boolean;
}
