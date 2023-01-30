import {MainClass} from "../../../../core/helpers/class/main.class";
import {ROUTE_APP_ICON_STAR} from "../../../../core/helpers/params/params.icon";
import {ROUTE_APP_ADMINISTRATION_STAR} from "../../../../core/helpers/params/params.routes";


export let starParams : any  = {};
starParams.header = [
  { order:0, field: 'createdAt', header: 'Date d\'inscription', status: true, type: 'date'},
  { order:1, field: 'label', header: 'Nom', status: true },
  { order:1, field: 'title', header: 'Titre', status: true },
  { order:2, field: 'person.sex', header: 'Genre', status: true },
  { order:3, field: 'star.ministries.label', header: 'Ministères', status: true, type:"array" },
  { order:4, field: 'person.phone.e164Number', header: 'Ville', status: true },
  { order:5, field: 'person.email', header: 'Email', status: true },
  { order:6, field: 'birthday', header: 'Anniversaire', status: true, type:'birthday' },

];
starParams.fields = new MainClass().getFields(starParams.header, 'star.');


starParams.fieldsForm = [
  {id:'user',type:'autocomplete', multiple:false, isRequire:false, value:'', label:'Membre', field:'user', options:'',sizeColumn:'col-md-4', action: false},
  {id:'void',type:'void', isRequire:true, group:'Information', value:'', label:'', field:'void', options:'',sizeColumn:'col-md-12'},
  {id:'ministries',type:'autocomplete', multiple:true,   isRequire:true, value:'', label:'Ministères', field:'ministries', options:'',sizeColumn:'col-md-6', action: true},
];


starParams.info = [
  {label:'add', value :'Affecter un star'},
  {label:'edit', value :'Modifier un star'},
  {label:'view', value :'Fiche de star'},
  {label:'list', value :'Liste des star'},
  {label:'icon', value : ROUTE_APP_ICON_STAR},
  {label:'main-route', value: ROUTE_APP_ADMINISTRATION_STAR},
  {label:'api-route', value :'star'},
  {label:'sentence', value :'Le Rem'},
];

starParams.actions = [
  {label:'detach-star', title:'Détacher', icon:'ri-links-fill', class:'ri-links-fill text-primary',  value :"Liste des eglises"},
  {label:'active', title:'Activer', icon:'ri-checkbox-circle-line', class:'ri-checkbox-circle-line text-success',  value :'Liste '},
  {label:'disable', title:'Désactiver', icon:'ri-indeterminate-circle-line', class:'ri-indeterminate-circle-line text-danger',  value :'Désactiver'},
];
