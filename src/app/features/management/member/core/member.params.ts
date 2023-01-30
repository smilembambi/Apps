import {MainClass} from "../../../../core/helpers/class/main.class";
import {ROUTE_APP_MANAGEMENT_MEMBER} from "../../../../core/helpers/params/params.routes";
import {ROUTE_APP_ICON_MEMBER} from "../../../../core/helpers/params/params.icon";
import {PersonModelFormConstancy} from "../../../../core/helpers/constancy/person-model-form.constancy";
import {actionConstancy} from "../../../../core/helpers/constancy/action.constancy";

export let memberParams : any  = {};
memberParams.header = [
  { order:0, field: 'createdAt', header: 'Date de création', status: true, type: 'date'},
  { order:1, field: 'member.user.label', header: 'Nom', status: true },
  { order:1, field: 'member.church.label', header: 'Eglise', status: true },
  { order:2, field: 'member.city.country.label', header: 'Pays', status: true },
  { order:2, field: 'member.city.label', header: 'Ville', status: true },
  { order:2, field: 'member.address', header: 'Adresse', status: true },
  { order:2, field: 'member.phone.e164Number', header: 'Téléphone 1', status: true },

];

memberParams.fields = new MainClass().getFields(memberParams.header, 'member.');

memberParams.fieldsForm = [
  {id:'church',type:'autocomplete', multiple:false, isRequire:false, value:'', label:'Eglise', field:'church', options:'',sizeColumn:'col-md-4', action: false},
  {id:'void',type:'void', isRequire:true, group:'Information', value:'', label:'', field:'void', options:'',sizeColumn:'col-md-12'},
];

memberParams.fieldsForm =  memberParams.fieldsForm.concat(PersonModelFormConstancy)

memberParams.info = [
  {label:'add', value :'Ajouter un fidèle'},
  {label:'edit', value :'Modifier un fidèle '},
  {label:'view', value : "Le fidèle "},
  {label:'list', value :"Liste des fidèles" },
  {label:'icon', value : ROUTE_APP_ICON_MEMBER},
  {label:'main-route', value : ROUTE_APP_MANAGEMENT_MEMBER},
  {label:'api-route', value : 'member'},
  {label:'sentence', value : "Le fidèle"},
];

memberParams.actions = actionConstancy;
