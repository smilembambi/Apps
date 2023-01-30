import {MainClass} from "../../../../core/helpers/class/main.class";
import {ROUTE_APP_MANAGEMENT_EVENTS} from "../../../../core/helpers/params/params.routes";
import {ROUTE_APP_ICON_EVENTS} from "../../../../core/helpers/params/params.icon";

export let eventParams : any  = {};
eventParams.header = [
  { order:1, field: 'label', header: 'Dénomination', status: true },
  { order:2, field: 'event.typeEvent.label', header: 'Type évenement', status: true },
  { order:3, field: 'dateEvent', header: 'Date de l\'évenement', status: true, type:'date' },
  { order:4, field: 'event.church.label', header: 'Eglise', status: true },
  { order:5, field: 'event.church.typeChurch', header: 'Type d\'église', status: true },
  { order:6, field: 'event.church.city.label', header: 'Ville', status: true },
  { order:7, field: 'status', header: 'Statut', status: true },
];

eventParams.fields = new MainClass().getFields(eventParams.header, 'event.');

eventParams.fieldsForm = [
  {id:'church',type:'autocomplete', multiple:false, isRequire:false, value:'', label:'Eglise', field:'church', options:'',sizeColumn:'col-md-3', action: false},
  {id:'typeEvent',type:'autocomplete', multiple:false, isRequire:false, value:'', label:'Type d\'évenement', field:'typeEvent', options:'',sizeColumn:'col-md-3', action: false},
  {id:'dateEvent',type:'date', isRequire:false, value:'', label:'Date de l\'évement', field:'dateEvent', options:'',sizeColumn:'col-md-2'},
  {id:'timeEvent',type:'select', editable:true,  isRequire:true, placeholder:'hh:mm', slotChar:'hh:mm', sType:'text',  value:'', label:'Heure de l\'évement', field:'timeEvent', options:'',sizeColumn:'col-md-2'},

  {id:'void',type:'void', isRequire:true, group:'Information', value:'', label:'', field:'void', options:'',sizeColumn:'col-md-12'},

];


eventParams.info = [
  {label:'add', value :'Ajouter un évenement'},
  {label:'edit', value :'Modifier un évenement '},
  {label:'view', value : "L'évenement "},
  {label:'list', value :"Liste des évenements" },
  {label:'icon', value : ROUTE_APP_ICON_EVENTS},
  {label:'main-route', value : ROUTE_APP_MANAGEMENT_EVENTS},
  {label:'api-route', value : 'event'},
  {label:'sentence', value : "L'évenement"},
];

eventParams.actions = [
  {label:'edit', title:'Modifier', icon:'ri-edit-2-line', class:'ri-edit-2-line text-info',  value : "Ajouter une église"},
  {label:'view', title:'Visualiser', icon:'ri-eye-line ', class:'ri-eye-line text-primary',  value :"Fiche d'eglise"  },
  {label:'delete', title:'Supprimer', icon:'ri-delete-bin-5-line', class:'ri-delete-bin-5-line text-danger',  value :"Liste des eglises"},
  {label:'detail',title:'Fiche d\'activité', icon:'ri-projector-line', class:'ri-projector-line text-color-icc-1',  value :'Ame'},

  {label:'presence',title:'Présence', icon:'ri-group-line', class:'ri-group-line text-warning',  value :'Ame'},
 // {label:'download',title:'Télécharge', icon:'ri-file-pdf-line', class:'ri-file-pdf-line text-danger',  value :'Télécharger'},
  // {label:'event',title:'Détail', icon:'ri-volume-up-fill', class:'ri-volume-up-fill text-color-icc-2',  value :'Evenement'},

  {label:'active', title:'Activer', icon:'ri-checkbox-circle-line', class:'ri-checkbox-circle-line text-success',  value :'Liste '},
  {label:'disable', title:'Désactiver', icon:'ri-indeterminate-circle-line', class:'ri-indeterminate-circle-line text-danger',  value :'Désactiver'},
]


