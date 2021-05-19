import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { makeStyles } from '@material-ui/core';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
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

function MonthlyConsumptionChart({ data, noDataComponent }) {
  const classes = useStyles();

  if (!data) {
    return noDataComponent;
  }

  const monthlyData = Array(12).fill(0).map((_, i) => {
    const m = i + 1;

    return {
      month: moment(`2006-${m}`, 'YYYY-MM').format('MMM'),
      sh: Number(data[`${m}-sh`]),
      cl: Number(data[`${m}-cl`]),
      dhw: Number(data[`${m}-dhw`]),
    };
  });

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart
        data={monthlyData}
        margin={{
          top: 20, right: 20, left: -10, bottom: 20,
        }}
        className={classes.root}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          type="category"
          dataKey="month"
          label={{
            value: 'Month',
            offset: 70,
            dy: 20,
            fill: '#333',
          }}
        />
        <YAxis
          label={(
            <text x={10} y={125} transform="rotate(270 10 125)" fill="#333">
              MWh
            </text>
          )}
        />
        <Tooltip />
        <Legend
          verticalAlign="bottom"
          wrapperStyle={{
            bottom: 0,
          }}
        />
        <Bar dataKey="sh" name="Space heat" stackId={1} fill={colors.sh} maxBarSize={30} />
        <Bar dataKey="dhw" name="Domestic hot water" stackId={1} fill={colors.dhw} maxBarSize={30} />
        <Bar dataKey="cl" name="Circulation losses" stackId={1} fill={colors.cl} maxBarSize={30} />
      </BarChart>
    </ResponsiveContainer>
  );
}

MonthlyConsumptionChart.defaultProps = {
  data: {
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
};

MonthlyConsumptionChart.propTypes = {
  data: PropTypes.object,
};

export default MonthlyConsumptionChart;
