import {FormModel} from "./form.model";

export class GroupFormModel{
  index: number;
  label: string;
  forms: FormModel[];
  status: boolean;
  completed: boolean;
  id: string;
}
