import {MainClass} from "../../../../core/helpers/class/main.class";
import {ROUTE_APP_MANAGEMENT_CHURCH} from "../../../../core/helpers/params/params.routes";
import {ROUTE_APP_ICON_CHURCH} from "../../../../core/helpers/params/params.icon";
import {actionConstancy} from "../../../../core/helpers/constancy/action.constancy";


export let churchParams : any  = {};
churchParams.header = [
    { id:'label', order:1,  field: 'label', header: 'Appelation', status: true, type: 'object' },
    { id:'level', order:1,  field: 'church.level', header: 'Niveau', status: true, type: 'object' },
    { id:'typeChurch', order:1,  field: 'church.typeChurch', header: 'Type', status: true, type: 'object' },
    { id:'parent', order:2, field: 'church.parent.label', header: 'Eglise mère', status: true },
    { id:'city', order:3, field: 'church.city.label', header: 'Ville', status: true },
    { id:'churchCountry', order:3,  field: 'church.countryChurch.label', header: 'Pays', status: true },
    // { id:'address', order:4, field: 'church.address', header: 'Adresse', status: true },
    { id:'childNumber', order:5, field: 'church.childNumber', header: 'Nbre des filles', status: true },
    { id:'phone1', order:6, field: 'church.phone1.e164Number', header: 'Téléphone 1', status: true },
    { id:'phone2',  order:6, field: 'church.phone2.e164Number', header: 'Téléphone 2', status: true },
  ];
churchParams.fields = new MainClass().getFields(churchParams.header, 'church.');
churchParams.fieldsForm = [
  {id:'parent', type:'autocomplete', multiple:false, isRequire:false, value:'', label:'Eglise mère', field:'parent', options:'',sizeColumn:'col-md-6', action: false},
  {id:'void',type:'void', isRequire:true,  value:'', label:'', field:'void', options:'',sizeColumn:'col-md-12'},

  {id:'typeChurch',type:'select', isRequire:true, value:'', label:"Type d'église", field:'typeChurch', options:'',sizeColumn:'col-md-3'},
  // {id:'smsNumber',type:'input', isRequire:true, value:'', label:'Numéro SMS', field:'smsNumber', options:'',sizeColumn:'col-md-4'},
  {id:'smsNumber',type:'phone', isRequire:false, value:'', label:'Numéro SMS', field:'smsNumber', options:'',sizeColumn:'col-md-3'},

  {id:'void',type:'void', isRequire:true,  value:'', label:'', field:'void', options:'',sizeColumn:'col-md-12'},


  {id:'label',type:'input', isRequire:true, value:'', label:'Nom', field:'label', options:'',sizeColumn:'col-md-6'},
  {id:'void',type:'void', isRequire:true,  value:'', label:'', field:'void', options:'',sizeColumn:'col-md-12'},
  {id:'countryChurch', type:'autocomplete', multiple:false, isRequire:true, value:'', label:'Pays', field:'countryChurch', options:'',sizeColumn:'col-md-6', action: false},
  {id:'void',type:'void', isRequire:true,  value:'', label:'', field:'void', options:'',sizeColumn:'col-md-12'},

  {id:'city', type:'autocomplete', multiple:false, isRequire:true, value:'', label:'Ville', field:'city', options:'',sizeColumn:'col-md-6', action: false},
  {id:'void',type:'void', isRequire:true,  value:'', label:'', field:'void', options:'',sizeColumn:'col-md-12'},

  {id:'address',type:'input', isRequire:true, value:'', label:'Adresse', field:'address', options:'',sizeColumn:'col-md-3'},
  {id:'arrondissement',type:'input', isRequire:true, value:'', label:'Arrondissement/Commune', field:'arrondissement', options:'',sizeColumn:'col-md-3'},
  {id:'void',type:'void', isRequire:true,  value:'', label:'', field:'void', options:'',sizeColumn:'col-md-12'},


  {id:'manager',type:'autocomplete', multiple:false, isRequire:false, value:'', label:'Responsable/Rem', field:'manager', options:'',sizeColumn:'col-md-3', action: false},
  {id:'subManager',type:'autocomplete', multiple:false, isRequire:false, value:'', label:'Responsable adjoint/Corem', field:'subManager', options:'',sizeColumn:'col-md-3', action: false},
  {id:'void',type:'void', isRequire:true,  value:'', label:'', field:'void', options:'',sizeColumn:'col-md-12'},

  {id:'phone1',type:'phone', isRequire:false, value:'', label:'Téléphone 1', field:'phone1', options:'',sizeColumn:'col-md-3'},
  {id:'phone2',type:'phone', isRequire:false, value:'', label:'Téléphone 2', field:'phone2', options:'',sizeColumn:'col-md-3'},

  {id:'void',type:'void', isRequire:true,  value:'', label:'', field:'void', options:'',sizeColumn:'col-md-12'},
  {id:'memberNumber',type:'input-number', icon:'Fidèles', max:'100000000000',  isRequire:false, value:'', label:'Estimation membre', field:'memberNumber', options:'',sizeColumn:'col-md-2'},

];


churchParams.info = [
  {label:'add', value :'Ajouter une église principale '},
  {label:'edit', value :'Modifier une église principale '},
  {label:'view', value : "L'eglise "},
  {label:'list', value :"Liste des églises principales " },
  {label:'icon', value : ROUTE_APP_ICON_CHURCH},
  {label:'main-route', value : ROUTE_APP_MANAGEMENT_CHURCH},
  {label:'api-route', value : 'church'},
  {label:'sentence', value : "L'église"},
];

churchParams.actions =
  [
    {label:'edit', title:'Modifier', icon:'ri-edit-2-line', class:'ri-edit-2-line text-info',  value : "Ajouter une église"},
    {label:'view', title:'Visualiser', icon:'ri-eye-line ', class:'ri-eye-line text-primary',  value :"Fiche d'eglise"  },
    {label:'delete', title:'Supprimer', icon:'ri-delete-bin-5-line', class:'ri-delete-bin-5-line text-danger',  value :"Liste des eglises"},
    {label:'active', title:'Activer', icon:'ri-checkbox-circle-line', class:'ri-checkbox-circle-line text-success',  value :'Liste '},
    {label:'disable', title:'Désactiver', icon:'ri-indeterminate-circle-line', class:'ri-indeterminate-circle-line text-danger',  value :'Désactiver'},

    {label:'add', title:'Ajouter une église filles',  icon:'ri-add-circle-line', class:'ri-add-circle-line text-success',  value :'Ajouter'},
    {label:'list-child',title:'Les églises filles', icon:'ri-community-line', class:'ri-community-line text-color-icc-1  ',  value :'Liste'},
    {label:'soul',title:'Les ames', icon:'ri-group-line', class:'ri-group-line text-warning',  value :'Ame'},
    {label:'event',title:'Les évenements', icon:'ri-volume-up-fill', class:'ri-volume-up-fill text-color-icc-2',  value :'Evenement'},
    {label:'finance',title:'Finance', icon:'ri-shopping-basket-2-line', class:'ri-shopping-basket-2-line text-success',  value :'Evenement'},
    {label:'location',title:'Map', icon:'ri-map-pin-line', class:'ri-map-pin-line text-primary',  value :'Localisation'},

  ]
