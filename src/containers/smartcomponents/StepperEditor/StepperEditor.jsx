import React, { useState, useReducer } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  IconButton,
  Typography,
  Stepper,
  Step,
  StepLabel,
  makeStyles
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';

import Tooltip from '../../../components/utils/TooltipWrapper';
import get from '../../../utils/get';
import { validate } from '../../../utils/validation';

const useStyles = makeStyles(theme => ({
  dialog: {
    '& .MuiDialog-paper': {
      height: '100%',
    },
  },
  titleWrapper: {
    display: 'flex',
  },
  title: {
    flexGrow: 1,
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    paddingTop: theme.spacing(4),
  },
  contentTitle: {
    marginBottom: theme.spacing(3),
  },
  actions: {
    justifyContent: 'space-between',
  },
}));

function StepperEditor(props) {
  const {
    title,
    steps,
    className,
    reducerFn,
    initialState,
    handleClose,
    handleFinalize,
    loading,
    disabled
  } = props;
  const [activeStep, setActiveStep] = useState(0);
  const [confirmCloseOpen, setConfirmCloseOpen] = useState(false);

  const [state, dispatch] = useReducer(reducerFn, initialState);
  const classes = useStyles();
  const { t } = useTranslation('translations');

  const finalStep = activeStep === steps.length - 1;

  const handleNextStep = () => {
    if (!finalStep) {
      setActiveStep(activeStep + 1);
      return;
    }

    handleFinalize({ ...state });
  };

  const { requiredFields = [], requiredDataTransKey, Component, componentProps } = steps[activeStep];
  const canContinue = (typeof requiredFields === 'function' ? requiredFields(state) : requiredFields).every(f => {
    if (typeof f === 'string') {
      return Boolean(get(state, f.split('.')));
    }

    const res = validate(get(state, f.name.split('.')), f.rules);

    return res.valid;
  });

  const onClose = () => {
    if (state.touched) {
      setConfirmCloseOpen(true);
      return;
    }

    setActiveStep(0);
    handleClose();
  };
  const onCloseConfirmDialog = () => setConfirmCloseOpen(false);
  const onSetData = (data) => {
    const handlers = [];
    Object.keys(data).forEach(k => {
      if (typeof props[`on${k}Change`] === 'function') {
        handlers.push(new Promise(r => r(props[`on${k}Change`](data[k]))));
      }
    });
    Promise.all(handlers).then(() => dispatch({ action: 'setData', data }));
  };

  return (
    <React.Fragment>
      <Dialog
        className={[classes.dialog, className].filter(v => Boolean(v)).join(' ')}
        open={props.open}
        onClose={onClose}
        fullWidth
        maxWidth="lg"
      >
        <DialogTitle disableTypography>
          <div className={classes.titleWrapper}>
            <Typography variant="h6" className={classes.title}>
              {typeof title === 'string' ? title : title(state)}
            </Typography>
            <IconButton onClick={onClose}>
              <CloseIcon />
            </IconButton>
          </div>
          <Stepper activeStep={activeStep} alternativeLabel>
            {steps.map(({ label }) => (
              <Step key={label}>
                <StepLabel>{t(label)}</StepLabel>
              </Step>
            ))}
          </Stepper>
        </DialogTitle>
        <DialogContent className={classes.content}>
          <Component
            {...componentProps}
            {...state}
            handleSetData={onSetData}
            handleSetFieldErrors={d => dispatch({ action: 'setFieldErrors', data: d })}
            disabled={disabled}
          />
        </DialogContent>
        <DialogActions className={classes.actions}>
          <span>
            {activeStep !== 0 && (
              <Button
                color="secondary"
                variant="contained"
                size="large"
                onClick={() => setActiveStep(activeStep - 1)}
              >
                {t('navigation.back')}
              </Button>
            )}
          </span>
          <Tooltip
            disabled={finalStep}
            title={canContinue ? t('assets.regContinueNextStep') : t(requiredDataTransKey || 'assets.fillInData')}
          >
            <span>
              <Button
                disabled={!canContinue || loading}
                color="secondary"
                variant="contained"
                size="large"
                onClick={handleNextStep}
              >
                {t(`navigation.${finalStep ? 'finish' : 'next'}`)}
              </Button>
            </span>
          </Tooltip>
        </DialogActions>
      </Dialog>

      <Dialog
        open={confirmCloseOpen}
        onClose={onCloseConfirmDialog}
      >
        <DialogTitle>
          {t('utils.confirmDialogClose')}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            {t('utils.confirmDialogText')}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={onCloseConfirmDialog} color="primary" autoFocus>
            {t('utils.confirmDialogCancel')}
          </Button>
          <Button
            color="primary"
            onClick={() => {
              dispatch({ action: 'resetData', data: { ...initialState } } );
              onCloseConfirmDialog();
              handleClose();
              setActiveStep(0);
            }}
          >
            {t('utils.confirmDialogОК')}
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}

StepperEditor.propTypes = {
  open: PropTypes.bool.isRequired,
  loading: PropTypes.bool.isRequired,
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.func]).isRequired,
  steps: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string,
    requiredFields: PropTypes.oneOfType([PropTypes.array, PropTypes.func]),
    requiredDataTransKey: PropTypes.string,
    Component: PropTypes.elementType,
  })).isRequired,
  handleFinalize: PropTypes.func.isRequired,
  handleClose: PropTypes.func.isRequired,
};

StepperEditor.defaultProps = {
  open: false,
  loading: false,
  steps: [],
};

export default StepperEditor;
