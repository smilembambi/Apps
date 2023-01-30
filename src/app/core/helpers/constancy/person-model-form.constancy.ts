export const PersonModelFormConstancy = [

  {id:'isStar',type:'select', isRequire:true, value:'Non', label:"C'est un star?", field:'isStar', options:'',sizeColumn:'col-md-2'},
  {id:'ministries',type:'autocomplete', multiple:true,  isRequire:false, value:'', label:'Ministères', field:'ministries', options:'',sizeColumn:'col-md-8', action: true},

  {id:'void',type:'void', isRequire:true, group:'Information', value:'', label:'', field:'void', options:'',sizeColumn:'col-md-12'},

  {id:'name',type:'input', isRequire:true, value:'', label:'Nom', field:'name', options:'',sizeColumn:'col-md-3'},
  {id:'firstName',type:'input', isRequire:true, value:'', label:'Prénom', field:'firstName', options:'',sizeColumn:'col-md-3'},
  {id:'sex',type:'select', isRequire:true, value:'', label:'Genre', field:'sex', options:'',sizeColumn:'col-md-2'},

  {id:'void',type:'void', isRequire:true, group:'Information', value:'', label:'', field:'void', options:'',sizeColumn:'col-md-12'},

  {id:'phone',type:'phone', isRequire:true, value:'', label:'Téléphone', field:'phone', options:'',sizeColumn:'col-md-3'},
  {id:'email',type:'email', isRequire:false, value:'', label:'Email', field:'email', options:'',sizeColumn:'col-md-3'},
  {id:'birthday',type:'date', isRequire:false, value:'', label:'Date de naissance', field:'birthday', options:'',sizeColumn:'col-md-2'},

  {id:'void',type:'void', isRequire:true, group:'Information', value:'', label:'', field:'void', options:'',sizeColumn:'col-md-12'},

  {id:'city',type:'autocomplete',  isRequire:true, value:'', label:'Ville', field:'city', options:'',sizeColumn:'col-md-3', action: false},
  {id:'arrondissement',type:'input', isRequire:true, value:'', label:'Arrondissement', field:'arrondissement', options:'',sizeColumn:'col-md-2'},

  {id:'address',type:'input', isRequire:true, value:'', label:'Adresse', field:'address', options:'',sizeColumn:'col-md-3'},

  {id:'void',type:'void', isRequire:true, group:'Information', value:'', label:'', field:'void', options:'',sizeColumn:'col-md-12'},

]
