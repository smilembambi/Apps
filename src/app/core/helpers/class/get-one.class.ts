import {AllClass} from "./all.class";
import {ChurchModel} from "../../../features/management/church/models/church.model";
import {UserModel} from "../../../features-master/users/models/user.model";

export class GetOneClass {

  /**
   * get one main
   * @param object
   * @param origin
   */
  getOneMain(object: any, origin: string) : any{
    switch (origin) {
      case 'church': return this.getOneChurch(object);
      case 'member': return this.getOneMember(object);
      case 'user': return this.getOneUser(object);
      case 'star': return this.getOneStar(object);
      default: return object;
    }
  }

  /**
   * get on  church
   * @param object
   */
  private getOneChurch(object: ChurchModel): ChurchModel{
    object.manager = object.managerFront;
    object.subManager = object.managerSFront;
    return object;
  }


  private getOneMember(object: any) {
    return object;
  }

  private getOneUser(object: UserModel) {
    if(object.isStar == true) object.isStar = "Oui";
    if(object.isStar == false) object.isStar = "Non";
    return object;
  }

  private getOneStar(object: any) {
    object.user = object
    return object
  }
}
