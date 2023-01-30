import {ChurchModel} from "../../../features/management/church/models/church.model";

export class FilterChurchModel {
  level: ChurchModel;
  churchesLevel: ChurchModel[];
  status: boolean;
  value: number;
  label : string
}
