export const initialState = {
  buildingData: {
    project: '',
    heatedArea: '',
    numFloors: '',
    numStaircases: '',
    numFlats: '',
  },
  energyData: {
    '1-sh': '', '1-cl': '', '1-dhw': '',
    '2-sh': '', '2-cl': '', '2-dhw': '',
    '3-sh': '', '3-cl': '', '3-dhw': '',
    '4-sh': '', '4-cl': '', '4-dhw': '',
    '5-sh': '', '5-cl': '', '5-dhw': '',
    '6-sh': '', '6-cl': '', '6-dhw': '',
    '7-sh': '', '7-cl': '', '7-dhw': '',
    '8-sh': '', '8-cl': '', '8-dhw': '',
    '9-sh': '', '9-cl': '', '9-dhw': '',
    '10-sh': '', '10-cl': '', '10-dhw': '',
    '11-sh': '', '11-cl': '', '11-dhw': '',
    '12-sh': '', '12-cl': '', '12-dhw': '',
  },
  economicData: {
    energyPrice: '',
    grant: '50',
    equityFinancing: '',
    debtFinancing: '',
    interestRate: '',
    loanTerm: '20',
    epcTerm: '20',
    inflation: '',
  },
  maintenanceData: {
    feeBeforeRenovation: '',
    feeAfterRenovation: '',
  },
  investmentData: {
    administrationFee: '',
    maintenanceFee: '',
    insuranceFee: '',
    yearlyFee: '',
    monthlyFee: '',
  },
  validationErrors: {},
};

export default function reducer(state = initialState, payload) {
  const m = payload.type.match(/^set#([a-z]+)$/i);
  if (m) {
    const key = m[1];
    const validationErrors = { ...state.validationErrors };
    Object.keys(payload.data).forEach(k => {
      delete validationErrors[k];
    });

    return { ...state, [key]: { ...state[key], ...payload.data }, validationErrors };
  }

  if (payload.type === 'setValidationErrors') {
    return { ...state, validationErrors: { ...state.validationErrors, ...payload.errors } };
  }

  if (payload.type === 'resetData') {
    return { ...initialState };
  }

  return state;
}
