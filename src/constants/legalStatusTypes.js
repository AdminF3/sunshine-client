export const legalForms = (t, enums) => {
  if (enums) {
    return Object.keys(LEGAL_FORMS).filter(k => Boolean(LEGAL_FORMS[k])).map(k => ({
      value: k,
      label: t(`translations:legalForms.${LEGAL_FORMS[k]}`),
      enum: LEGAL_FORMS[k],
    })).sort((a, b) => (a.label.toUpperCase() > b.label.toUpperCase()) ? 1 : -1);
  }
  return Object.keys(LEGAL_FORMS).map(k => t(`translations:legalForms.${LEGAL_FORMS[k]}`));
};

export const LEGAL_FORMS = {
  0: null,
  1: 'FINANCIAL_INSTITUTION',
  2: 'SERVICE_COMPANY',
  3: 'PUBLIC_ORGANIZATION',
  4: 'RESIDENTS_COMMUNITY',
  5: 'NGO',
  6: 'NATURAL_PERSON',
  7: 'SUPPLIER',
  8: 'HOUSING_ASSOCIATION',
};

export const stakeholderTypes = [
  { value: 'AGENCY', labelKey: 'legalForms.AGENCY' },
  { value: 'CENTRAL_GOVERNMENT', labelKey: 'legalForms.CENTRAL_GOVERNMENT' },
  { value: 'FINANCIAL_INSTITUTION', labelKey: 'legalForms.FINANCIAL_INSTITUTION' },
  { value: 'HOUSING_ASSOCIATION', labelKey: 'legalForms.HOUSING_ASSOCIATION' },
  { value: 'MINISTRY', labelKey: 'legalForms.MINISTRY' },
  { value: 'MUNICIPALITY', labelKey: 'legalForms.MUNICIPALITY' },
  { value: 'NATURAL_PERSON', labelKey: 'legalForms.NATURAL_PERSON' },
  { value: 'NGO', labelKey: 'legalForms.NGO' },
  { value: 'RESIDENT', labelKey: 'legalForms.RESIDENT' },
  { value: 'SERVICE_COMPANY', labelKey: 'legalForms.SERVICE_COMPANY' },
  { value: 'SUPPLIER', labelKey: 'legalForms.SUPPLIER' },
  { value: 'OTHER', labelKey: 'meetings.types.other' },
];

export const isResidentsCommunity = (lf) => LEGAL_FORMS[lf] === 'RESIDENTS_COMMUNITY';

export const organizationMeetingTypes = [
  { value: 'CONFERENCE', labelKey: 'legalForms.CONFERENCE' },
  { value: 'EU_PROJECT_MEETING', labelKey: 'legalForms.EU_PROJECT_MEETING' },
  { value: 'EU_PROJECT_ACTIVITY', labelKey: 'legalForms.EU_PROJECT_ACTIVITY' },
  { value: 'EVENT', labelKey: 'legalForms.EVENT' },
  { value: 'INTERNAL_MEETING', labelKey: 'legalForms.INTERNAL_MEETING' },
  { value: 'TRAINING', labelKey: 'legalForms.TRAINING' },
  { value: 'WORKSHOP', labelKey: 'legalForms.WORKSHOP' },
  { value: 'OTHER', labelKey: 'meetings.types.other' },
];

export const projectMeetingTypes = [
  { value: 'ACQUISITION', labelKey: 'legalForms.ACQUISITION' },
  { value: 'ACQUISITION_COMMITMENT', labelKey: 'legalForms.ACQUISITION_COMMITMENT' },
  { value: 'ACQUISITION_KICK_OFF', labelKey: 'legalForms.ACQUISITION_KICK_OFF' },
  { value: 'WORKS_KICK_OFF', labelKey: 'legalForms.WORKS_KICK_OFF' },
  { value: 'WORKS_INITIAL_INFORMATION', labelKey: 'legalForms.WORKS_INITIAL_INFORMATION' },
  { value: 'WORKS_WEEKLY_REPORT', labelKey: 'legalForms.WORKS_WEEKLY_REPORT' },
  { value: 'WORKS_RENOVATION_INFORMATIVE', labelKey: 'legalForms.WORKS_RENOVATION_INFORMATIVE' },
  { value: 'WORKS_COMMUNICATION', labelKey: 'legalForms.WORKS_COMMUNICATION' },
  { value: 'WORKS_CONSTRUCTION_MANAGERS_FINAL', labelKey: 'legalForms.WORKS_CONSTRUCTION_MANAGERS_FINAL' },
  { value: 'WORKS_FINAL_INFORMATION', labelKey: 'legalForms.WORKS_FINAL_INFORMATION' },
];
