import moment from 'moment';

const now = new Date();

export default {
  project_development_renovations: { // eslint-disable-line id-length
    path: 'annex1/project_development_renovations',
    key: 'annex1.table1',
    addRows: true,
    fixedRowsNum: 9,
    legend: ['//', '/', '/'],
  },
  construction_costs_renovations: { // eslint-disable-line id-length
    path: 'annex1/construction_costs_renovations',
    key: 'annex1.table2',
    hint: 'annexes.annex1.renovationCostsHint',
    addRows: true,
    fixedRowsNum: 26,
    legend: ['//', '/', '/'],
  },
  project_supervision: {
    path: 'annex1/project_supervision',
    key: 'annex1.table3',
    addRows: true,
    fixedRowsNum: 2,
    legend: ['//', '/'],
  },
  financial_charges: {
    path: 'annex1/financial_charges',
    key: 'annex1.table4',
    addRows: true,
    fixedRowsNum: 2,
    legend: ['//', '/', '/'],
  },
  renovation_overall_budget: {
    path: 'annex1/renovation_overall_budget',
    key: 'annex1.table5',
    fixedRowsNum: 5,
    legend: ['//', '/'],
  },
  renovation_financial_plan: {
    path: 'annex1/renovation_financial_plan',
    key: 'annex1.table6',
    addRows: true,
    fixedRowsNum: 5,
    legend: ['//', '/'],
  },
  workPhase_scope_renovation: { // eslint-disable-line id-length
    path: 'annex1/workPhase_scope_renovation',
    key: 'annex1.table7',
    addRows: true,
    fixedRowsNum: 37,
    legend: ['//', '/', '/', '/', '/', '/'],
  },
  baseyear: [
    {
      path: 'annex3/baseyear_n_2',
      key: 'annex3.table1',
      title: ['projects.year', { count: 3 }],
      titleInput: {
        key: 'title',
        inputProps: {
          type: 'range-month',
          gutterBottom: true,
          inputProps: {
            id: 'baseyear_n_2-title',
            max: moment(now).format('YYYY-MM'),
          },
        },
      },
      legend: ['x', '/', '/', '/', '/'],
    },
    {
      path: 'annex3/baseyear_n_1',
      key: 'annex3.table2',
      title: ['projects.year', { count: 2 }],
      titleInput: {
        key: 'title',
        inputProps: {
          type: 'range-month',
          gutterBottom: true,
          inputProps: {
            id: 'baseyear_n_1-title',
            max: moment(now).format('YYYY-MM'),
          },
        },
      },
      legend: ['x', '/', '/', '/', '/'],
    },
    {
      path: 'annex3/baseyear_n',
      key: 'annex3.table3',
      title: ['projects.year', { count: 1 }],
      titleInput: {
        key: 'title',
        inputProps: {
          type: 'range-month',
          gutterBottom: true,
          inputProps: {
            id: 'baseyear_n-title',
            max: moment(now).format('YYYY-MM'),
          },
        },
      },
      legend: ['x', '/', '/', '/', '/'],
    },
  ],
  baseconditions: [
    {
      path: 'annex3/baseconditions_n_2',
      key: 'annex3.table4',
      title: ['projects.year', { count: 3 }],
      titleStoreKey: 'annex3.table1.title',
      legend: ['x', 'x', '/', '/', 'x'],
    },
    {
      path: 'annex3/baseconditions_n_1',
      key: 'annex3.table5',
      title: ['projects.year', { count: 2 }],
      titleStoreKey: 'annex3.table2.title',
      legend: ['x', 'x', '/', '/', 'x'],
    },
    {
      path: 'annex3/baseconditions_n',
      key: 'annex3.table6',
      title: ['projects.year', { count: 1 }],
      titleStoreKey: 'annex3.table2.title',
      legend: ['x', 'x', '/', '/', 'x'],
    },
  ],
  baseline: {
    path: 'annex3/baseline',
    key: 'annex3.table7',
    legend: ['x', 'x', 'x', '/', '/', '/', '\\'],
    disabledInputRows: [0, 3, 5, 6],
  },
  periodic_maint_activities_covered_by_contractor: { // eslint-disable-line id-length
    path: 'annex4/periodic_maint_activities_covered_by_contractor',
    key: 'annex4.table1',
    addRows: true,
    fixedRowsNum: 9,
    legend: ['//', '//', '//', '/', '/'],
  },
  mid_term_preventative_activity: { // eslint-disable-line id-length
    path: 'annex4/mid_term_preventative_activity',
    key: 'annex4.table2',
    addRows: true,
    fixedRowsNum: 6,
    legend: ['//', '//', '//', '/', '/'],
  },
  long_term_provisioned_activities: { // eslint-disable-line id-length
    path: 'annex4/long_term_provisioned_activities',
    key: 'annex4.table3',
    addRows: true,
    fixedRowsNum: 2,
    legend: ['//', '//', '//', '/', '/'],
  },
  reccomended_maintanance_activity: { // eslint-disable-line id-length
    path: 'annex4/reccomended_maintanance_activity',
    key: 'annex4.table5',
    addRows: true,
    fixedRowsNum: 4,
    legend: ['//', '//', '//', '/', '/'],
  },
  calc_energy_fee: {
    path: 'annex5/calc_energy_fee',
    key: 'annex5.table1',
    legend: ['//', '/', '/', 'x', 'x', 'x'],
  },
  balancing_period_fee: {
    path: 'annex5/balancing_period_fee',
    key: 'annex5.table2',
    legend: ['x', '/', '/', 'x', 'x', 'x', 'x'],
  },
  project_measurements_table: { // eslint-disable-line id-length
    path: 'annex5/project_measurements_table',
    key: 'annex5.table4',
    legend: ['x', 'x', 'x', '/', 'x'],
  },
  operation_maintenance_budget: { // eslint-disable-line id-length
    path: 'annex4/operation_maintenance_budget',
    key: 'annex4.table4',
    legend: ['x', '/', '/', '/', '/', '/'],
  },
  operations_maintenance_fee: { // eslint-disable-line id-length
    path: 'annex5/operations_maintenance_fee',
    key: 'annex5.table3',
    addRows: true,
    fixedRowsNum: 1,
    legend: ['//', '/', '/', 'x', 'x', 'x'],
  },
  client_representative: {
    path: 'annex9/client_representative',
    key: 'annex9.table1',
    legend: ['x', '/'],
  },
  contractor_representative: {
    path: 'annex9/contractor_representative',
    key: 'annex9.table2',
    legend: ['x', '/'],
  },
};
