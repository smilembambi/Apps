
import {memberParams} from "../../../features/management/member/core/member.params";
import {churchParams} from "../../../features/management/church/core/church.params";
import {cityParams} from "../../../features-master/city/core/city.params";
import {countryParams} from "../../../features-master/country/core/country.param";
import {eventParams} from "../../../features/management/events/core/event.params";
import {ministryParams} from "../../../features/administration/ministry/core/ministry.params";
import {userParams} from "../../../features-master/users/core/user.params";
import {pastorParams} from "../../../features/administration/pastor/core/pastor.params";
import {remParams} from "../../../features/administration/rem/core/rem.params";
import {starParams} from "../../../features/administration/star/core/star.params";


export class ConfigClass{

  /**
   * get params
   * @param entity
   * @param need
   * @param options
   */
  getParamsGlobal(entity: string, need: string, options:any={select:'active'}){
    let data;
    if(need == 'header'){
      let d: any[] = JSON.parse(localStorage.getItem('params'))[entity][need];

      if(options.select == 'active')d = d.filter(el=> el.status == true);

      data = d.sort((a,b)=>{
        if(Number(b.order) < Number(a.order)) return 1;
        return -1
      })
    }
    if(need) data = JSON.parse(localStorage.getItem('params'))[entity][need];

    return data;
  }

  /**
   * init global params
   */
  initParamsGlobal(){

    let params = JSON.parse(localStorage.getItem('params'));
    if(!params)params = {};

    //I. MANAGEMENT

        //I.1. CHURCH
        params.church = churchParams;

        //I.2. MEMBER
        params.member = memberParams;

        //I.3. EVENT
        params.event = eventParams;

        //I.4. USER
        params.user = userParams;

    //II. ADMINISTRATION

        //II.1. CITY
        params.city = cityParams;

        //II.2. COUNTRY
        params.country = countryParams;

        //II.3. MINISTRY
        params.ministry = ministryParams;

        //II.4. PASTOR
        params.pastor = pastorParams;

        //II.5. REM
        params.rem = remParams;

        //II.6. STAR
        params.star = starParams;


    localStorage.setItem('params', JSON.stringify(params));

  }

  /**
   * get fields
   * @param headers
   * @param label
   */
  getFields(headers: any[], label: string):string[]{
    let globalFilters: string [] = [];
    headers?.forEach(el=>{
      const a = el.field.split(label);
      if(a.length >= 2){
        globalFilters.push(a[1]);
      }
      if(a.length == 1 && a[0] != ""){
        globalFilters.push(a[0]);
      }
    })
    return globalFilters
  }

  /**
   * set paginate
   * @param entity
   * @param first
   */
  setPaginate(entity, first){
    let params = JSON.parse(localStorage.getItem('params'));
    params[entity].paginate = first;
    localStorage.setItem('params', JSON.stringify(params));
  }

  /**
   * get params
   * @param object
   * @param info
   * @param label
   */
  getParams(object: string, info: string, label: string): string {
    const data: any[] = new ConfigClass().getParamsGlobal(object, info);
    if (data) {
      return data.find(el => el.label == label)?.value;
    }
    return '';
  }
}
