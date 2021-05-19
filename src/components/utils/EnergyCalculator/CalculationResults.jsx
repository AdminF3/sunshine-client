import React from 'react';
import {
  Grid,
  Paper,
  Typography,
  makeStyles,
} from '@material-ui/core';

import {
  MonthlyConsumptionChart,
  EnergyComparisonChart,
  MonthlyPaymentsChart,
  GenericPieChart,
} from './Charts';
import { getCalculatedData } from './utils';

const useStyles = makeStyles(theme => ({
  widget: {
    padding: theme.spacing(2),
  },
  title: {
    paddingBottom: theme.spacing(2),
  },
}));

function CalculationResults(props) {
  const { data } = props;

  const calculatedData = getCalculatedData(data);

  return (
    <Grid container direction="row" spacing={4}>
      <Widget title="Baseline year energy consumption per month">
        <MonthlyConsumptionChart
          data={calculatedData.monthlyConsumption}
          noDataComponent={
            <Typography variant="overline">
              Please fill in all relevant <strong>Energy data</strong> fields
            </Typography>
          }
        />
      </Widget>
      <Widget title="Baseline year total energy consumption">
        <GenericPieChart
          data={calculatedData.yearlyConsumption}
          valueType="MWh"
          labelTotal="In total"
          noDataComponent={
            <Typography variant="overline">
              Please fill in all relevant <strong>Energy data</strong> fields
            </Typography>
          }
        />
      </Widget>
      <Widget title="Energy analysis">
        <EnergyComparisonChart
          noDataComponent={
            <Typography variant="overline">
              Please fill in all relevant <strong>Building data</strong> and <strong>Energy data</strong> fields.
            </Typography>
          }
          {...calculatedData.energyAnalysis}
        />
      </Widget>
      <Widget title="Average monthly payments">
        <MonthlyPaymentsChart
          noDataComponent={
            <Typography variant="overline">
              Please fill in all relevant <strong>Building</strong>,&nbsp;
              <strong>Energy</strong>, <strong>Economic</strong> and <strong>Fees Data</strong> fields.
            </Typography>
          }
          {...calculatedData.monthlyPayments}
        />
      </Widget>
      <Widget title="Financing ">
        <GenericPieChart
          data={calculatedData.totalInvestments}
          valueType="EUR"
          labelTotal="Total investment"
          noDataComponent={
            <Typography variant="overline">
              Please fill in all relevant <strong>Building</strong>,&nbsp;
              <strong>Energy</strong>, <strong>Economic</strong> and <strong>Fees Data</strong> fields.
            </Typography>
          }
        />
      </Widget>
      <Widget title="Fees for energy efficiency investments">
        <GenericPieChart
          data={calculatedData.fees}
          valueType="EUR"
          labelTotal="Total annual fee"
          noDataComponent={
            <Typography variant="overline">
              Please fill in all relevant <strong>Building</strong>,&nbsp;
              <strong>Energy</strong>, <strong>Economic</strong> and <strong>Fees Data</strong> fields.
            </Typography>
          }
        />
      </Widget>
      <Widget title="Summary" sm={12}>
        <Grid
          container
          justify="space-between"
          alignItems="flex-end"
        >
          <Grid item xs={8}>
            <Typography variant="h6">
              Annual Energy Savings <strong>{calculatedData.results.aesMwH.toFixed(2)}&nbsp;
              MWh or {calculatedData.results.aesPercent}%</strong>
            </Typography>
            <Typography variant="h6">
              Annual CO₂ Reduction <strong>{calculatedData.results.tCO2Reduction.toFixed()} CO₂</strong>
            </Typography>
            <Typography variant="h6">
              Annual money saving <strong>{calculatedData.results.ams.toFixed(2)} €</strong>
            </Typography>
            <Typography variant="h6">
              Payback period <strong>{calculatedData.results.paybackPeriod.toFixed(1)} years</strong>
            </Typography>
            <Typography variant="h6">
              Total investment cost <strong>{calculatedData.results.totalInvestment.toFixed(2)} €</strong>
            </Typography>
            <Typography variant="h6">
              Investment cost <strong>{calculatedData.results.investment.toFixed(2)} €</strong>
            </Typography>
          </Grid>
        </Grid>
      </Widget>
    </Grid>
  );
}

function Widget(props) {
  const {
    title,
    children,
    ...gridProps
  } = props;

  const classes = useStyles();

  return (
    <Grid item {...gridProps}>
      <Paper
        variant="outlined"
        elevation={1}
        className={classes.widget}
      >
        <Typography
          className={classes.title}
          variant="h5"
        >
          {title}
        </Typography>
        {children}
      </Paper>
    </Grid>
  );
}

Widget.defaultProps = {
  xs: 12,
  sm: 6,
};

export default CalculationResults;
