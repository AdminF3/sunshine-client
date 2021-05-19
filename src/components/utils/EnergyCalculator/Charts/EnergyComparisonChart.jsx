import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

import { colors } from '../utils';

const useStyles = makeStyles({
  root: {
    '& .recharts-legend-wrapper': {
      marginLeft: 10,
    },
  },
});

function EnergyComparisonChart({ before, after, noDataComponent }) {
  const classes = useStyles();

  if (!before || !after) {
    return noDataComponent;
  }

  const data = [
    {
      name: 'Ex-post',
      sh: after.sh,
      cl: after.cl,
      dhw: after.dhw,
    },
    {
      name: 'Your building',
      sh: before.sh,
      cl: before.cl,
      dhw: before.dhw,
    },
  ];

  return (
    <ResponsiveContainer width="100%" height={180}>
      <BarChart
        className={classes.root}
        data={data}
        margin={{
          top: 20, right: 30, left: 10, bottom: 20,
        }}
        layout="vertical"
      >
        <Tooltip />
        <XAxis
          type="number"
          label={{
            value: 'kWh/m2',
            offset: 70,
            dy: 20,
            fill: '#333',
          }}
        />
        <YAxis type="category" dataKey="name" />
        <Bar dataKey="sh" name="Space heat" stackId={1} fill={colors.sh} maxBarSize={30} />
        <Bar dataKey="dhw" name="Domestic hot water" stackId={1} fill={colors.dhw} maxBarSize={30} />
        <Bar dataKey="cl" name="Circulation losses" stackId={1} fill={colors.cl} maxBarSize={30} />
        <Legend
          verticalAlign="bottom"
          wrapperStyle={{
            bottom: 0,
          }}
        />
      </BarChart>
    </ResponsiveContainer>
  );
}

EnergyComparisonChart.propTypes = {
  before: PropTypes.shape({
    sh: PropTypes.number.isRequired,
    cl: PropTypes.number.isRequired,
    dhw: PropTypes.number.isRequired,
    total: PropTypes.number,
  }),
  after: PropTypes.shape({
    sh: PropTypes.number.isRequired,
    cl: PropTypes.number.isRequired,
    dhw: PropTypes.number.isRequired,
  }),
};

export default EnergyComparisonChart;
