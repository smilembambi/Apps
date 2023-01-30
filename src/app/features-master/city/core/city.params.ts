import {MainClass} from "../../../core/helpers/class/main.class";


export let cityParams : any  = {};
cityParams.header = [
  { order:0, field: 'createdAt', header: 'Date de création', status: true, type: 'date'},
  { order:1, field: 'city.createdBy.person.label', header: 'Créé par', status: true },
  { order:2, field: 'label', header: 'Ville', status: true },
  { order:2, field: 'abbreviation', header: 'Code de ville', status: true },
  { order:3, field: 'region', header: 'Région', status: true },
  { order:4, field: 'city.country.label', header: 'Pays', status: true },
];
cityParams.fields = new MainClass().getFields(cityParams.header, 'city.');

cityParams.info = [
  {label:'add', value :'Créer une ville'},
  {label:'edit', value :'Modifier la ville'},
  {label:'view', value :'Fiche de la ville'},
  {label:'list', value :'Liste des villes'},
  {label:'icon', value :'bx bx-map-pin'},
  {label:'main-route', value :'/app/administration/ville'},
  {label:'api-route', value :'city'},
  {label:'sentence', value :'La ville'},
];
cityParams.actions = [
    {label:'edit', title:'Modifier', icon:'ri-edit-2-line', class:'ri-edit-2-line text-info',  value : "Ajouter une église"},
    {label:'delete', title:'Supprimer', icon:'ri-delete-bin-5-line', class:'ri-delete-bin-5-line text-danger',  value :"Liste des eglises"},
    {label:'active', title:'Activer', icon:'ri-checkbox-circle-line', class:'ri-checkbox-circle-line text-success',  value :'Liste '},
    {label:'disable', title:'Désactiver', icon:'ri-indeterminate-circle-line', class:'ri-indeterminate-circle-line text-danger',  value :'Désactiver'},
  ];
