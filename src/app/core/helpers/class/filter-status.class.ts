import {GetStatusClass} from "./get-status.class";
import {UserModel} from "../../../features-master/users/models/user.model";

export class FilterStatusClass {

  filterStatusMain(origin: string,  objects: any[], statusFilter: any): any[]{
    console.log("rtegted", origin)
    switch (origin) {
      case 'church':
        return this.filterStatusChurch(objects, statusFilter);
      case 'city': return objects;
      case 'country': return objects;
      case 'event':
        return this.filterStatusEvent(objects, statusFilter);
      case 'pastor':
        return this.filterStatusPastor(objects, statusFilter);
      case 'rem':
        return this.filterStatusRem(objects, statusFilter);
      case 'star':
        return this.filterStatusStar(objects, statusFilter);
    }
    return []
  }

  /**
   * filter status church
   * @param objects
   * @param statusFilter
   * @private
   */
  private filterStatusChurch(objects: any[], statusFilter): any[] {
    if(statusFilter != -1) return objects.filter(el=> el.level == statusFilter);
    return objects;
  }

  /**
   * filter status events
   * @param objects
   * @param statusFilter
   * @private
   */
  private filterStatusEvent(objects: any[], statusFilter: any) {
    if(statusFilter != -1) return objects.filter(el=> el.typeEvent.label == statusFilter);
    return objects;
  }

  /**
   * filter status pastor
   * @param objects
   * @param statusFilter
   * @private
   */
  private filterStatusPastor( objects: any[], statusFilter: any) {
    let status;
    if(statusFilter == 1) status = "Pasteur";
    if(statusFilter == 2) status = "Assistant Pasteur";
    if(statusFilter != -1) return objects.filter(el=> el.title == status);
    return objects;
  }

  /**
   * filter status rem
   * @param objects
   * @param statusFilter
   * @private
   */
  private filterStatusRem(objects: any[], statusFilter: any) {
    let status;
    if(statusFilter == 1) status = "Rem";
    if(statusFilter == 2) status = "Corem";
    if(statusFilter != -1) return objects.filter(el=> el.titleEdm == status);
    return objects;
  }

  /**
   * filter status star
   * @param objects
   * @param statusFilter
   * @private
   */
  private filterStatusStar(objects: UserModel[], statusFilter: any) {
    console.log(statusFilter);
    if(statusFilter != -1){
      let objectFilter = [];
      objects.forEach(el=>{
         const ministry = el.ministries.find(m=> m.label == statusFilter);
         if(ministry){
           objectFilter.push(el)
         }
      })

      objects = objectFilter;
    }



    return objects;
  }
}
