import {MainClass} from "../../../core/helpers/class/main.class";

export let countryParams : any  = {};
countryParams.header = [
  { order:0, field: 'createdAt', header: 'Date de création', status: true, type: 'date'},
  { order:1, id:'labelCountry', field: 'label', header: 'Pays', status: true },
  { order:1,  field: 'country.data.capital',  header: 'Capitale', status: true },
  { order:1, id:'continentCountry',  field: 'country.data.region',  header: 'Continent', status: true },
  { order:1, id:'codeCalling', field: 'country.callingCodes',  header: 'Code', status: true },
  { order:1, id:'currenciesCountry', field: 'country.data.currencies[0].code',  header: 'Monnaie', status: true },

];
countryParams.fields = new MainClass().getFields(countryParams.header, 'country.');

countryParams.info = [
  {label:'add', value :'Ajouter un pays'},
  {label:'edit', value :'Modifier le pays'},
  {label:'view', value :'Fiche de pays'},
  {label:'list', value :'Liste des pays'},
  {label:'icon', value :'bx bx-map-alt'},
  {label:'main-route', value :'/app/administration/pays'},
  {label:'api-route', value :'country'},
  {label:'sentence', value :'La ville'},
];
countryParams.actions = [
  {label:'delete', title:'Supprimer', icon:'ri-delete-bin-5-line', class:'ri-delete-bin-5-line text-danger',  value :"Liste des eglises"},
  {label:'active', title:'Activer', icon:'ri-checkbox-circle-line', class:'ri-checkbox-circle-line text-success',  value :'Liste '},
  {label:'disable', title:'Désactiver', icon:'ri-indeterminate-circle-line', class:'ri-indeterminate-circle-line text-danger',  value :'Désactiver'},
]
