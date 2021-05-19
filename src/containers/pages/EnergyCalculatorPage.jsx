import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Helmet } from 'react-helmet';

import NavContainer from '../smartcomponents/navcontainer';
import Calculator from '../../components/utils/EnergyCalculator/Calculator';

const styles = {
  root: {
    height: '100%',
  },
  content: {
    padding: 20,
  },
};

function EnergyCalculatorPage(props) {
  const { classes } = props;
  return (
    <div className={classes.root}>
      <Helmet title="Energy Savings Calculator | SUNShINE" />
      <NavContainer formName="calculator"/>
      <div className={classes.content}>
        <Calculator />
      </div>
    </div>
  );
}

export default withStyles(styles)(EnergyCalculatorPage);
