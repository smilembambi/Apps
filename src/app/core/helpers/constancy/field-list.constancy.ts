export let FieldListChurchConstancy = [
  { order:0, field: 'createdAt', header: 'Date de création', status: true, type: 'date'},
  { order:1, field: 'localChurch.label', header: 'Appelation', status: true },
  { order:2, field: 'localChurch.address.country', header: 'Pays', status: true },
  { order:2, field: 'localChurch.address.local.label', header: 'Ville', status: true },
  { order:2, field: 'localChurch.address.address', header: 'Adresse', status: true },
  { order:2, field: 'localChurch.phone1.e164Number', header: 'Téléphone 1', status: true },
  { order:2, field: 'localChurch.phone2.e164Number', header: 'Téléphone 2', status: true },
  { order:2, field: 'localChurch.phone3.e164Number', header: 'Téléphone 3', status: true },
  { order:3, field: 'localChurch.manager.person.label', header: 'Manager', status: true },
  { order:3, field: 'localChurch.memberNumber', header: 'Nombre de membre', status: true },
];
