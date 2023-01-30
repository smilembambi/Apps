import {MainClass} from "../../../core/helpers/class/main.class";
import {ROUTE_APP_ICON_MEMBER, ROUTE_APP_ICON_USER} from "../../../core/helpers/params/params.icon";
import {ROUTE_APP_ADMINISTRATION_USER} from "../../../core/helpers/params/params.routes";
import {PersonModelFormConstancy} from "../../../core/helpers/constancy/person-model-form.constancy";


export let userParams : any  = {};
userParams.header = [
  { order:0, field: 'createdAt', header: 'Date d\'inscription', status: true, type: 'date'},
  { order:1, field: 'label', header: 'Nom', status: true },
  { order:2, field: 'person.sex', header: 'Genre', status: true },
  { order:3, field: 'user.church.label', header: 'Eglise', status: true },
  { order:4, field: 'person.phone.e164Number', header: 'Ville', status: true },
  { order:5, field: 'person.email', header: 'Email', status: true },
  { order:6, field: 'birthday', header: 'Anniversaire', status: true, type:'birthday' },

];
userParams.fields = new MainClass().getFields(userParams.header, 'user.');


userParams.fieldsForm = [
  {id:'church',type:'autocomplete', multiple:false, isRequire:false, value:'', label:'Eglise', field:'church', options:'',sizeColumn:'col-md-4', action: false},
  {id:'void',type:'void', isRequire:true, group:'Information', value:'', label:'', field:'void', options:'',sizeColumn:'col-md-12'},
];

userParams.fieldsForm =  userParams.fieldsForm.concat(PersonModelFormConstancy)


userParams.info = [
  {label:'add', value :'Créer un utilisateur'},
  {label:'edit', value :'Modifier l\'utilisateur'},
  {label:'view', value :'Fiche de l\'utilisateur'},
  {label:'list', value :'Liste des utilisateurs'},
  {label:'icon', value : ROUTE_APP_ICON_MEMBER},
  {label:'main-route', value: ROUTE_APP_ADMINISTRATION_USER},
  {label:'api-route', value :'user'},
  {label:'sentence', value :'L\'utilisateur'},
];
userParams.actions = [
  {label:'edit', title:'Modifier', icon:'ri-edit-2-line', class:'ri-edit-2-line text-info',  value : "Ajouter une église"},
  {label:'view', title:'Visualiser', icon:'ri-eye-line ', class:'ri-eye-line text-primary',  value :"Fiche d'eglise"  },
  {label:'delete', title:'Supprimer', icon:'ri-delete-bin-5-line', class:'ri-delete-bin-5-line text-danger',  value :"Liste des eglises"},
  {label:'location',title:'Map', icon:'ri-map-pin-user-line', class:'ri-map-pin-user-line text-primary',  value :'Localisation'},

  {label:'active', title:'Activer', icon:'ri-checkbox-circle-line', class:'ri-checkbox-circle-line text-success',  value :'Liste '},
  {label:'disable', title:'Désactiver', icon:'ri-indeterminate-circle-line', class:'ri-indeterminate-circle-line text-danger',  value :'Désactiver'},
];
