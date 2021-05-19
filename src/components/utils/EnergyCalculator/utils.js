export const coefficients = {
  'Type 316': [
    [3, -0.007143, 208.08, -0.001532, 79.95],
    [4, -0.007735, 188.35, -0.001637, 69.52],
    [5, -0.007838, 185.39, -0.001871, 72.93],
  ],
  'Type 464': [
    [5, -0.005850, 175.42, -0.002300, 70.21],
    [9, -0.001859, 154.96, -0.000412, 67.30],
  ],
  'Type 467': [
    [5, -0.009143, 195.83, -0.002125, 66.73],
    [9, -0.001859, 154.96, -0.000412, 67.30],
  ],
  'Type 103': [
    [3, -0.019726, 217.87, -0.003662, 84.26],
    [4, -0.013590, 210.16, -0.002641, 77.69],
    [5, -0.006988, 182.96, -0.002233, 73.03],
  ],
  'Type 104': [
    [3, -0.013434, 189.10, -0.002862, 62.37],
    [5, -0.007557, 181.42, -0.001717, 64.64],
  ],
  'Czech project':[
    [9, -0.002421, 177.28, -0.000546, 125.91],
    [12, -0.001788, 175.75, -0.000409, 125.91],
  ],
  'Type 602': [
    [5, -0.001545, 156.95, -0.000359, 66.33],
    [9, -0.001444, 152.22, -0.000438, 73.44],
  ],
  'Type 119': [
    [5, -0.002520, 165.48, -0.000524, 72.13],
    [9, -0.001444, 161.08, -0.000438, 73.44],
    [10, -0.001246, 160.78, -0.000342, 72.76],
  ]
};

export const colors = {
  sh: '#9b59b6',
  cl: '#e74c3c',
  dhw: '#3498db',
  dhwcl: '#27ae60',
  maintenance: '#e67e22',
  debtService: '#2980b9',
  fees: '#34495e',
  grant: '#3498db',
  equityFinancing: '#f39c12',
  debtFinancing: '#2ecc71',
};

const tCO2Emission = 2.54;

const calc = {
  yearlyConsumption(data) {
    const res = {
      sh: 0,
      cl: 0,
      dhw: 0,
      total: 0,
    };

    if (!data) {
      return res;
    }

    Array(12).fill(0).forEach((_, i) => {
      const m = i + 1;

      const sh = Number(data[`${m}-sh`]);
      const cl = Number(data[`${m}-cl`]);
      const dhw = Number(data[`${m}-dhw`]);

      res.sh += sh;
      res.cl += cl;
      res.dhw += dhw;
      res.total += sh + cl + dhw;
    });

    return res;
  },
  investmentEnergy({ area, type, numFloors, costs }) {
    if (!type || !(type in coefficients)) {
      return { investment: null, energy: null };
    }

    const coef = coefficients[type];
    const investments = [];
    const energies = [];
    const floors = [];

    for (const i in coef) {
      const tuple = coef[i];
      const [floorNumber, aInv, bInv, aEnergy, bEnergy] = tuple;
      const investment = area * aInv + bInv + costs;
      const energy = area * aEnergy + bEnergy;

      if (numFloors === floorNumber) {
        return { investment, energy };
      }

      investments.push(investment);
      energies.push(energy);
      floors.push(floorNumber);
    }

    const floorsDelta = floors.slice(-1)[0] - floors[0];

    const mInv = (investments.slice(-1)[0] - investments[0]) / floorsDelta;
    const weightedInvestment = mInv * (numFloors - floors.slice(-1)[0]) + investments.slice(-1)[0] + costs;

    const mEnergy = (energies.slice(-1)[0] - energies[0]) / floorsDelta;
    const weightedEnergy = mEnergy * (floors.slice(-1)[0] - numFloors) + energies.slice(-1)[0];

    return { investment: weightedInvestment, energy: weightedEnergy };
  },
  clConsumption(cl, floors) {
    if (floors <= 3) {
      return cl * 0.21;
    }

    if (floors <= 5) {
      return cl * 0.2;
    }

    return cl * 0.19;
  },
  payment({ interest, period, investment, grant }) {
    if (!interest || !period || !investment || !grant) {
      return null;
    }

    const loan = investment / 1000 * (1 - grant / 100);
    const interestP = interest / 100;
    return interestP * -loan * (1 + interestP) ** period / (1 - (1 + interestP) ** period);
  },
  monthlyPayments({ sh, cl, dhw, maintenance, price }) {
    if (!sh || !price) {
      return null;
    }

    return {
      sh: sh / 12 * price,
      dhwcl: ((cl + dhw) / 12) * price,
      maintenance,
    };
  },
  transformKwHSqM(c, area) {
    if (!c) {
      return { sh: 0, cl: 0, dhw: 0 };
    }

    return {
      sh: c.sh ? c.sh * 1000 / area : 0,
      cl: c.cl ? c.cl * 1000 / area : 0,
      dhw: c.dhw ? c.dhw * 1000 / area : 0,
    };
  }
};

/* eslint-disable complexity, max-statements */
export function getCalculatedData(data) {
  const {
    energyData,
    buildingData,
    economicData,
    maintenanceData,
    investmentData,
  } = data;

  const result = {
    monthlyConsumption: null,
    yearlyConsumption: null,

    energyAnalysis: null,
    monthlyPayments: null,
    totalInvestments: null,
    fees: null,

    results: null,
  };

  const yearlyMgwH = calc.yearlyConsumption(energyData);
  let yearlyKwHSqM;
  let yearlyKwHSqMPost;

  let totalInvestment;
  let energyPriceKwH;

  let ieCalc = { investment: null, energy: null };

  const energyInputOK = Object.values(energyData).some(v => Boolean(v));
  const buildingInputOK = Boolean(buildingData.project) && Boolean(buildingData.heatedArea) && Boolean(buildingData.numFloors);
  const economicInputOK = Object.values(economicData).every(v => v !== '');
  const investmentInputOK =
    Boolean(investmentData.administrationFee) &&
    Boolean(investmentData.maintenanceFee) &&
    Boolean(investmentData.insuranceFee);

  if (energyInputOK) {
    result.monthlyConsumption = energyData;
    result.yearlyConsumption = [
      { name: 'Space heating', value: yearlyMgwH.sh, color: colors.sh },
      { name: 'Circulation losses', value: yearlyMgwH.cl, color: colors.cl },
      { name: 'Domestic hot water', value: yearlyMgwH.dhw, color: colors.dhw },
    ];
  }

  if (energyInputOK && buildingInputOK) {
    yearlyKwHSqM = calc.transformKwHSqM(yearlyMgwH, buildingData.heatedArea);

    ieCalc = calc.investmentEnergy({
      type: buildingData.project,
      area: buildingData.heatedArea,
      numFloors: buildingData.numFloors,
      costs: 0,
    });

    yearlyKwHSqMPost = {
      sh: ieCalc.energy,
      cl: calc.clConsumption(yearlyKwHSqM.cl, buildingData.numFloors),
      dhw: yearlyKwHSqM.dhw,
    };

    result.energyAnalysis = {
      before: yearlyKwHSqM,
      after: yearlyKwHSqMPost,
    };
  }

  if (Boolean(yearlyKwHSqM) && economicInputOK && investmentInputOK) {
    totalInvestment = ieCalc.investment * buildingData.heatedArea;
    energyPriceKwH = economicData.energyPrice / 1000;

    const monthlyPaymentsBefore = calc.monthlyPayments({
      sh: yearlyKwHSqM.sh,
      cl: yearlyKwHSqM.cl,
      dhw: yearlyKwHSqM.dhw,
      maintenance: maintenanceData.feeBeforeRenovation,
      price: energyPriceKwH,
    });

    const fees =
      investmentData.administrationFee / 100 * ieCalc.investment +
      investmentData.maintenanceFee / 100 * ieCalc.investment +
      investmentData.insuranceFee / 100 * ieCalc.investment;

    const calculatedPayment = calc.payment({
      interest: economicData.interestRate,
      period: economicData.loanTerm,
      investment: totalInvestment,
      grant: economicData.grant,
    });

    const monthlyPaymentsAfter = {
      sh: yearlyKwHSqMPost.sh / 12 * energyPriceKwH,
      dhwcl: (yearlyKwHSqMPost.dhw + yearlyKwHSqMPost.cl) / 12 * energyPriceKwH,
      maintenance: maintenanceData.feeAfterRenovation,
      debtService: calculatedPayment * 1000 / 12 / buildingData.heatedArea,
      fees: fees / (economicData.loanTerm * 12),
    };

    result.monthlyPayments = {
      before: monthlyPaymentsBefore,
      after: monthlyPaymentsAfter,
    };

    result.totalInvestments = [
      {
        name: 'Grant',
        value: totalInvestment * economicData.grant / 100,
        color: colors.grant,
      },
      {
        name: 'Equity financing',
        value: totalInvestment * economicData.equityFinancing / 100,
        color: colors.equityFinancing,
      },
      {
        name: 'Debt financing',
        value: totalInvestment * economicData.debtFinancing / 100,
        color: colors.debtFinancing,
      },
    ];

    result.fees = [
      {
        name: 'Adminisrration fee',
        value: (totalInvestment * investmentData.administrationFee / 100) / economicData.loanTerm,
        color: colors.grant,
      },
      {
        name: 'Maintenance fee',
        value: (totalInvestment * investmentData.maintenanceFee / 100) / economicData.loanTerm,
        color: colors.equityFinancing,
      },
      {
        name: 'Insurance fee',
        value: (totalInvestment * investmentData.insuranceFee / 100) / economicData.loanTerm,
        color: colors.debtFinancing,
      },
    ];

    const aesMwH = yearlyMgwH.total - (
      yearlyKwHSqMPost.sh + yearlyKwHSqMPost.dhw + yearlyKwHSqMPost.cl
    ) * buildingData.heatedArea / 1000;
    const ams = aesMwH * economicData.energyPrice;
    result.results = {
      aesMwH,
      aesPercent: Math.round(aesMwH / yearlyMgwH.total * 100),
      ams,
      tCO2Reduction: aesMwH * tCO2Emission,
      paybackPeriod: (totalInvestment - totalInvestment * economicData.grant / 100) / ams,
      investment: ieCalc.investment,
      totalInvestment,
    };
  }

  return result;
}
/* eslint-enable complexity, max-statements */

export function validateData(data, requiredFields = []) {
  const errors = {};
  Object.keys(data).forEach(k => {
    if ((requiredFields.length === 0 || requiredFields.indexOf(k) !== -1) && !Boolean(data[k])) {
      errors[k] = 'Please fill in the required field';
    }
  });

  return errors;
}

export const demoData = {
  buildingData: {
    project: 'Type 464',
    heatedArea: '1900',
    numFloors: '9',
    numStaircases: '1',
    numFlats: '36',
  },
  energyData: {
    '1-sh': '56', '1-cl': '6.0', '1-dhw': '3.2',
    '2-sh': '54', '2-cl': '6.0', '2-dhw': '3.2',
    '3-sh': '40', '3-cl': '6.0', '3-dhw': '3.2',
    '4-sh': '19', '4-cl': '6.0', '4-dhw': '3.2',
    '5-sh': '0', '5-cl': '6.0', '5-dhw': '3.2',
    '6-sh': '0', '6-cl': '6.0', '6-dhw': '3.2',
    '7-sh': '0', '7-cl': '6.0', '7-dhw': '3.2',
    '8-sh': '0', '8-cl': '6.0', '8-dhw': '3.2',
    '9-sh': '0', '9-cl': '6.0', '9-dhw': '3.2',
    '10-sh': '16', '10-cl': '6.0', '10-dhw': '3.2',
    '11-sh': '35', '11-cl': '6.0', '11-dhw': '3.2',
    '12-sh': '48', '12-cl': '6.0', '12-dhw': '3.2',
  },
  economicData: {
    energyPrice: '60',
    grant: '50',
    equityFinancing: '10',
    debtFinancing: '40',
    interestRate: '5.5',
    loanTerm: '20',
    epcTerm: '20',
    inflation: '3',
  },
  maintenanceData: {
    feeBeforeRenovation: '0.45',
    feeAfterRenovation: '0.40',
  },
  investmentData: {
    administrationFee: '10',
    maintenanceFee: '5',
    insuranceFee: '1',
    yearlyFee: '',
    monthlyFee: '',
  },
};
