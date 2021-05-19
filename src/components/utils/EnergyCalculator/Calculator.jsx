import React, { useState, useReducer } from 'react';
import {
  Grid,
  Paper,
  Button,
  Stepper,
  Step,
  StepLabel,
  makeStyles
 } from '@material-ui/core';
import {
  Print as PrintIcon,
  NavigateNext as NavigateNextIcon,
  NavigateBefore as NavigateBeforeIcon,
  Replay as ReplayIcon,
  WrapText as FillDemoDataIcon,
} from '@material-ui/icons';

import logoIMG from '../../../images/Sunshine-Logo-Platform.png';
import Tooltip from '../TooltipWrapper';
import TextWithIcon from '../TextWithIcon';
import { validateData, demoData } from './utils';
import reducer, { initialState } from './reducer';
import {
  EnergyDataForm,
  DataForm,
} from './Forms';
import CalculatorResults from './CalculationResults';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(4),
  },
  title: {
    paddingBottom: theme.spacing(6),
    '& .logo': {
      maxWidth: theme.spacing(12),
    },
  },
  resetButton: {
    marginRight: theme.spacing(1),
  },
  buttonsGrid: {
    '& > *': {
      marginRight: theme.spacing(1),

      '&:last-child': {
        marginRight: 0,
      }
    },
  },
}));

const steps = [
  {
    label: 'Building data information',
    title: 'Building data',
    key: 'buildingData',
    requiredFields: ['project', 'heatedArea'],
    formComponent: DataForm,
  },
  {
    label: 'Energy data information',
    title: 'Energy data',
    key: 'energyData',
    formComponent: EnergyDataForm,
  },
  {
    label: 'Economic data information',
    title: 'Economic data',
    key: 'economicData',
    formComponent: DataForm,
  },
  {
    label: 'Maintenance data information',
    title: 'Maintenance data',
    key: 'maintenanceData',
    formComponent: DataForm,
  },
  {
    label: 'Investment data information',
    title: 'Investment data',
    key: 'investmentData',
    requiredFields: ['administrationFee', 'maintenanceFee', 'insuranceFee'],
    formComponent: DataForm,
  },
  {
    label: 'Result',
    title: 'Results',
    key: 'result',
    component: CalculatorResults,
  },
];

function Calculator() {
  const [data, dispatch] = useReducer(reducer, initialState);
  const [activeStep, setActiveStep] = useState(0);
  const classes = useStyles();

  const FormComponent = steps[activeStep].formComponent;
  const Component = steps[activeStep].component;

  return (
    <Paper className={classes.root} elevation={1}>
      <Grid container spacing={4}>
        <Grid item xs={12} className="btn-print-wrapper">
          <Stepper activeStep={activeStep} alternativeLabel>
            {steps.map(({ label, key }) => (
              <Step key={key}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
        </Grid>

        <Grid item xs={12}>
          <Grid container justify="center" alignItems="center" className={classes.title}>
            <TextWithIcon
              variant="h5"
              align="center"
              icon={<img src={logoIMG} alt="Sunshine" className="logo hide-non-print" />}
            >
              {steps[activeStep].title}
            </TextWithIcon>
          </Grid>

          {FormComponent && (
            <FormComponent
              data={data[steps[activeStep].key]}
              errors={data.validationErrors}
              setData={(d) => dispatch({ type: `set#${steps[activeStep].key}`, data: d })}
            />
          )}
          {Component && (
            <Component data={data} />
          )}
        </Grid>

        <Grid item xs={12}>
          <NavigationButtons
            activeStep={activeStep}
            setActiveStep={setActiveStep}
            onNavigateNextStep={() => {
              const errors = validateData(data[steps[activeStep].key], steps[activeStep].requiredFields || []);
              if (Object.values(errors).length === 0) {
                setActiveStep(activeStep + 1);
              } else {
                dispatch({ type: 'setValidationErrors', errors });
              }
            }}
            onReset={() => {
              dispatch({ type: 'resetData' });
              setActiveStep(0);
            }}
            fillSampleData={() => dispatch({
              type: `set#${steps[activeStep].key}`,
              data: demoData[steps[activeStep].key]
            })}
          />
        </Grid>
      </Grid>
    </Paper>
  );
}

function NavigationButtons(props) {
  const {
    activeStep,
    setActiveStep,
    onNavigateNextStep,
    onReset,
    fillSampleData,
  } = props;

  const classes = useStyles();

  if (activeStep === steps.length - 1) {
    return (
      <Grid container direction="row" className="btn-print-wrapper">
        <Grid item xs={4}>
          <Tooltip title="Clicking `Reset` will clear all data!">
            <Button
              variant="contained"
              color="primary"
              startIcon={<ReplayIcon />}
              className={classes.resetButton}
              onClick={onReset}
            >
              Reset
            </Button>
          </Tooltip>
          <Button
            variant="outlined"
            color="primary"
            startIcon={<NavigateBeforeIcon />}
            onClick={() => setActiveStep(activeStep - 1)}
          >
            Back
          </Button>
        </Grid>
        <Grid item xs={4} align="center">
          <Button
            variant="contained"
            color="primary"
            size="large"
            startIcon={<PrintIcon color="inherit" />}
            onClick={window.print}
            fullWidth
          >
            Print
          </Button>
        </Grid>
        <Grid item xs={3} />
      </Grid>
    );
  }

  return (
    <Grid container justify="space-between">
      <Grid item>
        {activeStep < steps.length && activeStep > 0 && (
          <Button
            variant="outlined"
            color="primary"
            startIcon={<NavigateBeforeIcon />}
            onClick={() => setActiveStep(activeStep - 1)}
          >
            Back to&nbsp;<strong>{steps[activeStep - 1].title}</strong>
          </Button>
        )}
      </Grid>
      <Grid item className={classes.buttonsGrid}>
        <Tooltip
          title={
            `Click this button to fill the form with sample demo data. You can
            click the "Continue to ${steps[activeStep + 1].title}" button after that
            to proceed to the next step.`
          }
        >
          <Button
            variant="outlined"
            color="default"
            startIcon={<FillDemoDataIcon />}
            onClick={fillSampleData}
          >
            Sample data
          </Button>
        </Tooltip>

        <Button
          variant="outlined"
          color="primary"
          endIcon={<NavigateNextIcon />}
          onClick={onNavigateNextStep}
        >
          {activeStep !== steps.length - 2 && <span>Continue to&nbsp;</span>}
          <strong>{steps[activeStep + 1].title}</strong>
        </Button>
      </Grid>
    </Grid>
  );

}

export default Calculator;
