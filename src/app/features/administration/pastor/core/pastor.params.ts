import {MainClass} from "../../../../core/helpers/class/main.class";
import {ROUTE_APP_ICON_PASTOR} from "../../../../core/helpers/params/params.icon";
import {ROUTE_APP_ADMINISTRATION_PASTOR} from "../../../../core/helpers/params/params.routes";


export let pastorParams : any  = {};
pastorParams.header = [
  { order:0, field: 'createdAt', header: 'Date d\'inscription', status: true, type: 'date'},
  { order:1, field: 'label', header: 'Nom', status: true },
  { order:1, field: 'title', header: 'Titre', status: true },
  { order:2, field: 'person.sex', header: 'Genre', status: true },
  { order:3, field: 'pastor.church.label', header: 'Eglise', status: true },
  { order:4, field: 'person.phone.e164Number', header: 'Ville', status: true },
  { order:5, field: 'person.email', header: 'Email', status: true },
  { order:6, field: 'birthday', header: 'Anniversaire', status: true, type:'birthday' },

];
pastorParams.fields = new MainClass().getFields(pastorParams.header, 'pastor.');


pastorParams.fieldsForm = [
  {id:'user',type:'autocomplete', multiple:false, isRequire:false, value:'', label:'Membre', field:'user', options:'',sizeColumn:'col-md-4', action: false},
  {id:'void',type:'void', isRequire:true, group:'Information', value:'', label:'', field:'void', options:'',sizeColumn:'col-md-12'},
  {id:'title',type:'select', isRequire:true, value:'', label:'Titre', field:'title', options:'',sizeColumn:'col-md-2'},

];


pastorParams.info = [
  {label:'add', value :'Affecter un pasteur'},
  {label:'edit', value :'Modifier un apsteur'},
  {label:'view', value :'Fiche du pasteur'},
  {label:'list', value :'Liste des pasteurs et assistants'},
  {label:'icon', value : ROUTE_APP_ICON_PASTOR},
  {label:'main-route', value: ROUTE_APP_ADMINISTRATION_PASTOR},
  {label:'api-route', value :'pastor'},
  {label:'sentence', value :'Le pasteur'},
];

pastorParams.actions = [
  {label:'detach', title:'Détacher', icon:'ri-link-unlink-m', class:'ri-link-unlink-m text-danger',  value :"Liste des eglises"},
  {label:'active', title:'Activer', icon:'ri-checkbox-circle-line', class:'ri-checkbox-circle-line text-success',  value :'Liste '},
  {label:'disable', title:'Désactiver', icon:'ri-indeterminate-circle-line', class:'ri-indeterminate-circle-line text-danger',  value :'Désactiver'},
];
