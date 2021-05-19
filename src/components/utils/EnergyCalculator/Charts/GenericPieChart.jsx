import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core';
import {
  Cell,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Label,
  ResponsiveContainer,
} from 'recharts';

const useStyles = makeStyles({
  root: {
    '& .recharts-legend-wrapper': {
      marginLeft: 20,
    },
  },
});

function GenericPieChart(props) {
  const {
    data,
    noDataComponent,
    height,
    innerRadius,
    outerRadius,
    paddingAngle,
    dataKey,
    labelTotal,
    valueType
  } = props;
  const classes = useStyles();

  if (!data) {
    return noDataComponent;
  }

  let total = data.reduce((acc, d) => acc + d.value, 0);
  if (total % 1 !== 0) {
    total = Math.round(total * 10) / 10;
  }

  return (
    <ResponsiveContainer width="100%" height={height}>
      <PieChart
        className={classes.root}
        margin={{
          top: 20, right: 20, left: -20, bottom: 20,
        }}
      >
        <Pie
          data={data}
          innerRadius={innerRadius}
          outerRadius={outerRadius}
          paddingAngle={paddingAngle}
          dataKey={dataKey}
        >
          {data.map(({ color }, i) => <Cell key={i} fill={color} />)}

          {labelTotal && (
            <Label
              value={labelTotal}
              position="centerBottom"
              fontSize="26px"
            />
          )}
          <Label
            value={`${total} ${valueType}`}
            position={labelTotal ? 'centerTop' : 'center'}
            fontSize="26px"
            dy={labelTotal ? 6 : null}
          />
        </Pie>
        <Tooltip />
        <Legend
          verticalAlign="bottom"
          wrapperStyle={{
            bottom: 0,
          }}
        />
      </PieChart>
    </ResponsiveContainer>
  );
}

GenericPieChart.propTypes = {
  height: PropTypes.number.isRequired,
  innerRadius: PropTypes.number.isRequired,
  outerRadius: PropTypes.number.isRequired,
  paddingAngle: PropTypes.number.isRequired,
  dataKey: PropTypes.string.isRequired,
  data: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  })),
  valueType: PropTypes.string.isRequired,
  noDataComponent: PropTypes.element.isRequired,
};

GenericPieChart.defaultProps = {
  height: 400,
  innerRadius: 120,
  outerRadius: 160,
  paddingAngle: 5,
  dataKey: 'value',
  noDataComponent: <React.Fragment />,
};

export default GenericPieChart;
