import {ChurchModel} from "../../../features/management/church/models/church.model";

export class GetStatusClass {

  getStatusMain(origin: string, objects: any[] = []): any[]{

    switch (origin) {
      case 'church' : return this.getStatusChurch(objects);
      case 'event' : return this.getStatusEvent(objects);
      case 'pastor' : return this.getStatusPastor(objects);
      case 'rem' : return this.getStatusRem(objects);
      case 'star' : return this.getStatusStar(objects);

    }
    return [];
  }

  getStatusChurch(objects: ChurchModel[], type=''): any[] {

    console.log(objects);
    let numberLevel = 0;
    objects.forEach(el=>{
      if(numberLevel< el.level) numberLevel = el.level;
    })


    let status : any[] = [];
    for(let i=0; i <= numberLevel; i++){
      let st: any  = {};
      st.value = i;
      st.label = 'Niveau ' + i;
      status.push(st);
    }

    if(type == ''){
      status.push({label : 'Toutes les églises', value:-1})
    }

    return status;
  }

  /**
   *
   * @param objects
   * @private
   */
  private getStatusEvent(objects: any[]): any[] {
    objects = objects.reverse();
    objects.forEach(el=> el.value = el.label)
    objects.unshift({label : "Tous les évenements", value : -1 })
    return objects;
  }

  private getStatusPastor(objects: any[]) : any[]{

    let object1 = {label : "Tous", value : -1 };
    let object2 = {label : "Pasteur", value : 1 };
    let object3 = {label : "Assistant Pasteur", value : 2 };
    objects.push(object1)
    objects.push(object2)
    objects.push(object3)

    return objects;
  }

  private getStatusRem(objects: any[]) : any[]{

    let object1 = {label : "Tous", value : -1 };
    let object2 = {label : "Rem", value : 1 };
    let object3 = {label : "Corem", value : 2 };
    objects.push(object1)
    objects.push(object2)
    objects.push(object3)

    return objects;
  }

  private getStatusStar(objects: any[]) {
    objects.forEach(el=> el.value = el.label)
    objects.unshift({label : "Tous les ministères", value : -1 })
    return objects;
  }
}
