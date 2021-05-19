import React from 'react';
import PropTypes from 'prop-types';
import { withTranslation } from 'react-i18next';

import { withStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';

const styles = {
  root: {
    width: '100%',
    marginBottom: '10px',
  },
  annexStep: {
    '&:hover': {
      fontWeight: '800'
    }
  },
  stepStyle: {
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: '600',
    textAlign: 'left',
    color: '#848c98',
  },
};

const steps = (t) => [
  t('translations:annexes.annex1_stepper'),
  t('translations:annexes.annex2_stepper'),
  t('translations:annexes.annex3_stepper'),
  t('translations:annexes.annex4_stepper'),
  t('translations:annexes.annex5_stepper'),
  t('translations:annexes.annex6_stepper'),
  t('translations:annexes.annex7_stepper'),
  t('translations:annexes.annex8_stepper')
];

class VerticalLinearStepper extends React.Component {
  render() {
    const { classes, activeAnnex, toggleActiveAnnex, orientation, t } = this.props;

    return (
      <div className={classes.root}>
        <Stepper activeStep={activeAnnex} orientation={orientation} >
          {steps(t).map((label, index) => {
            return (
              <Step key={label} onClick={() => toggleActiveAnnex(index)} >
                {orientation === 'vertical'
                  ?
                  <StepLabel style={{ cursor: 'pointer' }} >
                    <p className={classes.stepStyle}>{label}</p>
                  </StepLabel>
                  :
                  <StepLabel style={{ cursor: 'pointer' }} >
                    <p className={classes.stepStyle}></p>
                  </StepLabel>
                }
              </Step>
            );
          })}
        </Stepper>
      </div>
    );
  }
}

VerticalLinearStepper.propTypes = {
  classes: PropTypes.object,
};

export default withStyles(styles)(withTranslation('translations')(VerticalLinearStepper));
