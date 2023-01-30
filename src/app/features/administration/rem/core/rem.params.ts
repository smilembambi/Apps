import {MainClass} from "../../../../core/helpers/class/main.class";
import {ROUTE_APP_ICON_REM} from "../../../../core/helpers/params/params.icon";
import {ROUTE_APP_ADMINISTRATION_REM} from "../../../../core/helpers/params/params.routes";


export let remParams : any  = {};
remParams.header = [
  { order:0, field: 'createdAt', header: 'Date d\'inscription', status: true, type: 'date'},
  { order:1, field: 'label', header: 'Nom', status: true },
  { order:1, field: 'titleEdm', header: 'Titre', status: true },
  { order:2, field: 'person.sex', header: 'Genre', status: true },
  { order:3, field: 'rem.church.label', header: 'Eglise', status: true },
  { order:4, field: 'person.phone.e164Number', header: 'Ville', status: true },
  { order:5, field: 'person.email', header: 'Email', status: true },
  { order:6, field: 'birthday', header: 'Anniversaire', status: true, type:'birthday' },

];
remParams.fields = new MainClass().getFields(remParams.header, 'rem.');


remParams.fieldsForm = [
  {id:'user',type:'autocomplete', multiple:false, isRequire:false, value:'', label:'Membre', field:'user', options:'',sizeColumn:'col-md-4', action: false},
  {id:'void',type:'void', isRequire:true, group:'Information', value:'', label:'', field:'void', options:'',sizeColumn:'col-md-12'},
  {id:'titleEdm',type:'select', isRequire:true, value:'', label:'Titre', field:'titleEdm', options:'',sizeColumn:'col-md-2'},
  {id:'void',type:'void', isRequire:true, group:'Information', value:'', label:'', field:'void', options:'',sizeColumn:'col-md-12'},

  {id:'church',type:'autocomplete', multiple:false, isRequire:false, value:'', label:'Edm', field:'church', options:'',sizeColumn:'col-md-4', action: false},

];


remParams.info = [
  {label:'add', value :'Affecter un Rem ou CoRem'},
  {label:'edit', value :'Modifier un Rem ou Corem'},
  {label:'view', value :'Fiche de Rem et CoRem'},
  {label:'list', value :'Liste des Rem et CoRem'},
  {label:'icon', value : ROUTE_APP_ICON_REM},
  {label:'main-route', value: ROUTE_APP_ADMINISTRATION_REM},
  {label:'api-route', value :'rem'},
  {label:'sentence', value :'Le Rem'},
];

remParams.actions = [
  {label:'detach', title:'Détacher', icon:'ri-link-unlink-m', class:'ri-link-unlink-m text-danger',  value :"Liste des eglises"},
  {label:'active', title:'Activer', icon:'ri-checkbox-circle-line', class:'ri-checkbox-circle-line text-success',  value :'Liste '},
  {label:'disable', title:'Désactiver', icon:'ri-indeterminate-circle-line', class:'ri-indeterminate-circle-line text-danger',  value :'Désactiver'},
];
