import {DatePipe} from "@angular/common";
import {UserModel} from "../../../features-master/users/models/user.model";
import {AddressModel} from "../../models/natural-model/address.model";
import {TITLE_ACTIVE, TITLE_DELETE, TITLE_DISABLE} from "../params/params-message";
import {DialogService} from "primeng/dynamicdialog";

export class AllClass {

  makeCode(number: number) {
    return "";
  }

  isEmail($event) {
    return $event?.match(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/)
  }

  validateEmail(email) {
    const regularExpression = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regularExpression.test(String(email).toLowerCase());
  }

  downloadFile(headers: any[], objects: any[], datePipe: DatePipe, origin: string): any {
    return ;
  }

  exportPdf(headers: any[], objects: any[], title: string, datePipe: DatePipe) {

  }

  differenceDate(time: number, time2: number) {
    return 0;
  }

  controlAccess(user: UserModel): boolean {
    return false;
  }

  setPaginate(origin: string, first: number) {

  }

  /**
   * parse address
   * @param object
   */
  parseAddress(object: any): any{
    let address = new AddressModel();
    address.address = object?.address;
    address.addressSuite = object?.addressSuite;
    address.arrondissement = object?.arrondissement;
    address.country = object?.country;
    address.city = object?.city;
    address.region = object?.region;
    address.postalCode = object?.postalCode;

    object.address = address;
    return object;
  }

  /**
   * decode address
   * @param object
   */
  decodeAddress(object: any): any{

    object.addressSuite = object.address.addressSuite;
    object.arrondissement = object.address.arrondissement;
    object.city = object.address.city;
    object.region = object.address.region;
    object.country = object.address.country;
    object.postalCode = object.address.postalCode;
    object.address = object.address.address;
    return object;
  }


  /**
   * get continent
   * @param region
   */
  getContinent(region: any) : string {
    switch (region) {
      case 'Africa': return 'Afrique';
      case 'Asia': return 'Asie';
      case 'America': return 'Amérique';
      case 'Oceania': return 'Océanie';
      default : return  "";

    }
  }

  /**
   * Complete 0 for obtain two number
   * @param n
   * @return string
   */
  completeNumberTwoCaractere(n: number): string {
    if (n <= 9) {
      return '0' + n.toString();
    }
    return n.toString();
  }


}
