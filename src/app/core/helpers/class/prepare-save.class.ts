import {ChurchModel} from "../../../features/management/church/models/church.model";
import {MemberModel} from "../../../features/management/member/models/member.model";
import {DatePipe} from "@angular/common";
import {CityModel} from "../../../features-master/city/models/city.model";

export class PrepareSaveClass {

  /**
   * prepare all
   * @param object
   * @param origin
   * @param datePipe
   */
  prepareMain(object: any, origin: string, datePipe: DatePipe): any {
    switch (origin) {
      case 'church' :
        return this.prepareChurch(object);
      case 'member' :
        return this.prepareMember(object);
      case 'event' :
        return this.prepareEvent(object,  datePipe);
      case 'user' :
        return this.prepareUser(object);
      case 'pastor' :
        return this.preparePastor(object);
      case 'rem' :
        return this.prepareRem(object);
      case 'star' :
        return this.prepareStar(object);
      default: return object;
    }
  }

  /**
   * prepare  church
   * @param object
   */
  private prepareChurch(object: ChurchModel): ChurchModel {

    if(!object?.manager?._id) object.manager = undefined;
    if(!object?.subManager?._id) object.subManager = undefined;

    if(!object?.countryChurch){
      if(object.city) object.countryChurch = object.city.country;
    }

    if(object.parent?._id) object.level = Number(object.parent.level) + 1 ;
    else object.level = 0;

    object.codeObject = object.label.toString().toUpperCase().replace(' ','-')+"-"+object.level;

    return object;
  }


  private prepareMember(object: MemberModel): MemberModel {
    object.label = object.firstName + " " + object.name;
    return object;
  }

  private prepareEvent(object: any, datePipe: DatePipe) {

    if(object.timeEvent){
      let d: Date = new Date(object.dateEvent);
      d.setHours(Number(object.timeEvent.toString().split(':')[0]));
      d.setMinutes(Number(object.timeEvent.toString().split(':')[1]));

      object.dateEvent = d;
    }

    object.label = object.typeEvent.label + " du " + datePipe.transform(object.dateEvent,"dd-MM-yyyy à hh:mm")
    return object
  }

  private prepareUser(object: any) {

    if(object.name && object.firstName) object.label = object.firstName + " " + object.name;
    if(object.phone) object.username = object.phone.e164Number;
    object.isStar = object.isStar == 'Oui';

    if(typeof object.city === "string") {
      const cities: CityModel[] = JSON.parse(localStorage.getItem('cities'));
      if(cities || object.church){
        const city = cities?.find(el=> el.label == object.city);
        if(city) object.city = city;
        else {
          if(object.church) object.city = object.church.city;
          else object.city = undefined;
        }
      }
    }

    let uniqueArray = []
    object?.ministries?.forEach(el=>{
        const index = uniqueArray.findIndex(i=> i._id == el._id);
        if(index == -1) uniqueArray.push(el);
    })

    if(!object.profile && object.sex == "M") object.profile = "m.jpg"
    if(!object.profile && object.sex == "F") object.profile = "f.jpg"

    object.ministries = uniqueArray
    return object;

  }

  /**
   * private
   * @param object
   * @private
   */
  private preparePastor(object: any) {

    if(object.user && object.title){
      object.user.title = object.title;
      object.user.isPastor = true;
    }

    object = object.user;

    return object;
  }

  /**
   * prepare rem
   * @param object
   * @private
   */
  private prepareRem(object: any) {
    if(object.user && object.titleEdm){
      object.user.titleEdm = object.titleEdm;
      object.user.isRem = true;
    }

    object = object.user;

    return object;
  }

  /**
   * prepare star
   * @param object
   * @private
   */
  private prepareStar(object: any) {
console.log(object)
    if(object.user && object.ministries){
      object.user.ministries = object.ministries;

      object.user.isStar = object.ministries.length != 0;
    }

    object = object.user;
    object.user = undefined
    return object
  }
}
