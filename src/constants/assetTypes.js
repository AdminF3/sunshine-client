import {
  Type103,
  Type104,
  Type113,
  Type119,
  Type316,
  Type318,
  Type464,
  Type467,
  Type602,
  CulturalFacilities,
  CzechProject,
  EducationalFacilities,
  LatvianProject,
  MedicalFacilities,
  OfficeBuildings,
  SportsFacilities,
  TransportationFacilities,
  Other
} from '../images/AssetTypes';

const assetTypes = {
  '1': 'Czech project',
  '2': 'Type 103',
  '3': 'Type 104',
  '4': 'Type 119',
  '5': 'Type 316',
  '6': 'Type 318',
  '7': 'Type 464',
  '8': 'Type 467',
  '9': 'Type 602',
  '10': 'Latvian Project',
  '11': 'Type 113',
  '12': 'Other'
};

export const assetImages = {
  '1': CzechProject,
  '2': Type103,
  '3': Type104,
  '4': Type119,
  '5': Type316,
  '6': Type318,
  '7': Type464,
  '8': Type467,
  '9': Type602,
  '10': LatvianProject,
  '11': Type113,
  '12': Other,
  'nonresidential_educational_facilities': EducationalFacilities,
	'nonresidential_cultural_facilities': CulturalFacilities,
	'nonresidential_medical_facilities': MedicalFacilities,
	'nonresidential_sports_facilities': SportsFacilities,
	'nonresidential_office_buildings': OfficeBuildings,
	'nonresidential_transportation_facilities': TransportationFacilities,
};

export const assetTypeOptions = Object.keys(assetTypes).map(k => ({ value: k, label: assetTypes[k] }));

export const heatingTypes = t => {
  return (
    {
      0: t('translations:assets.all'),
      1: t('translations:assets.districtHeating'),
      2: t('translations:assets.buildingHeating'),
    }
  );
};

export const heatingTypesMap = [
  { id: '1', title: 'assets.districtHeating', tooltip: 'tooltips:assets.assetFields.districtHeating' },
  { id: '2', title: 'assets.buildingHeating', tooltip: 'tooltips:assets.assetFields.buildingHeating' },
];

export const buildingTypeOther = { id: '12', title: 'Other' };

export const residentialTypes = [
  { id: '1', title: 'building_type_czech_project' },
  { id: '2', title: 'building_type_type_103' },
  { id: '3', title: 'building_type_type_104' },
  { id: '4', title: 'building_type_type_119' },
  { id: '5', title: 'building_type_type_316' },
  { id: '6', title: 'building_type_type_318' },
  { id: '7', title: 'building_type_type_464' },
  { id: '8', title: 'building_type_type_467' },
  { id: '9', title: 'building_type_type_602' },
  { id: '10', title: 'building_type_latvian_project' },
  { id: '11', title: 'building_type_type_113' },
  { id: '12', title: 'building_type_type_other' },
];

export const nonResidentialCategories = [
  { id: 'nonresidential_educational_facilities', title: 'category_nonresidential_educational_facilities' },
	{ id: 'nonresidential_cultural_facilities', title: 'category_nonresidential_cultural_facilities' },
	{ id: 'nonresidential_medical_facilities', title: 'category_nonresidential_medical_facilities' },
	{ id: 'nonresidential_sports_facilities', title: 'category_nonresidential_sports_facilities' },
	{ id: 'nonresidential_office_buildings', title: 'category_nonresidential_office_buildings' },
	{ id: 'nonresidential_transportation_facilities', title: 'category_nonresidential_transportation_facilities' },
];

export const assetTypeImage = (asset) => {
  if (!asset.category || asset.category === 'residential') {
    return assetImages[asset.building_type];
  }
  return assetImages[asset.category];
};

export const assetTypeTitleKey = (asset) => {
  if (!asset.category || asset.category === 'residential') {
    const rt = residentialTypes.find(t => t.id === String(asset.building_type));
    return rt?.title;
  }

  const cat = nonResidentialCategories.find(c => c.id === asset.category);
  return cat?.title;
};
