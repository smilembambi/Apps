import {MainClass} from "../../../../core/helpers/class/main.class";

export let ministryParams : any  = {};
ministryParams.header = [
  { order:0, field: 'createdAt', header: 'Date d\'ajout', status: true, type: 'date'},
  { order:1, field: 'label', header: 'Ministère', status: true },
  { order:2, field: 'ministry.manager.label',  header: 'Ministre', status: true },
  { order:2, field: 'description',  header: 'Description', status: true, type:'html' },
];
ministryParams.fields = new MainClass().getFields(ministryParams.header, 'ministry.');

ministryParams.info = [
  {label:'add', value :'Ajouter un ministère'},
  {label:'edit', value :'Modifier le ministère'},
  {label:'view', value :'Fiche de ministère'},
  {label:'list', value :'Liste des ministère'},
  {label:'icon', value :'bx bx-map-alt'},
  {label:'main-route', value :'/app/admin/ministry'},
  {label:'api-route', value :'ministry'},
  {label:'sentence', value :'Le ministère'},
];
ministryParams.actions = [
  {label:'edit', title:'Modifier', icon:'ri-edit-2-line', class:'ri-edit-2-line text-info',  value : "Ajouter une église"},
  {label:'delete', title:'Supprimer', icon:'ri-delete-bin-5-line', class:'ri-delete-bin-5-line text-danger',  value :"Liste des eglises"},
  {label:'active', title:'Activer', icon:'ri-checkbox-circle-line', class:'ri-checkbox-circle-line text-success',  value :'Liste '},
  {label:'disable', title:'Désactiver', icon:'ri-indeterminate-circle-line', class:'ri-indeterminate-circle-line text-danger',  value :'Désactiver'},
]
