import {ChurchModel} from "../../../features/management/church/models/church.model";
import {CityModel} from "../../../features-master/city/models/city.model";
import {CountryModel} from "../../../features-master/country/models/country.model";
import {MemberModel} from "../../../features/management/member/models/member.model";

export class GetAllClass {
  /**
   * get one main
   * @param objects
   * @param origin
   */
  getAllMain(objects: any[], origin: string) : any[]{
    switch (origin) {
      case 'church': return this.getAllChurch(objects);
      case 'city': return this.getAllCity(objects);
      case 'country': return this.getAllCountry(objects);
      case 'member': return this.getAllMember(objects);
      default: return objects;

    }
  }

  /**
   * get on  church
   * @param objects
   */
  getAllChurch(objects: ChurchModel[]): ChurchModel[]{

    objects.forEach(el=>{
      const childChurch = objects.filter(o=> o.parent?._id == el?._id);
      el.childNumber = childChurch.length;
    })

    return objects;
  }

  /**
   * get all city
   * @param objects
   */
  private getAllCity(objects: CityModel[]): CityModel[]{
    return objects;
  }

  /**
   * get all country
   * @param objects
   */
  private getAllCountry(objects: CountryModel[]): CountryModel[]{
    return objects;
  }

  private getAllMember(objects: MemberModel[]): MemberModel[] {
    return objects;
  }
}
