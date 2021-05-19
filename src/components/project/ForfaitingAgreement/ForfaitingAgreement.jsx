import React, { useCallback, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useTranslation } from 'react-i18next';
import {
  Grid,
  Paper,
  Step,
  Stepper,
  StepLabel,
  Typography,
  makeStyles,
} from '@material-ui/core';
import {
  RadioButtonChecked as StepLabelIcon,
} from '@material-ui/icons';

import { SERVER as backendURL} from '../../../constants/endpoints';
import { getProjectAgreement } from '../../../actions/agreements';
import ProgressBar from '../../utils/ProgressBar';
import { toHTML } from '../texParser';
import Annex from '../Contract/Annex';
import ActionsHeader from '../Contract/ActionsHeader';
import Disclaimer from '../Contract/Disclaimer';

const useStyles = makeStyles(theme => ({
  root: {
    position: 'relative',
    padding: `0 ${theme.spacing(2)}px ${theme.spacing(2)}px ${theme.spacing(2)}px`,

    '& > p:first-child': {
      marginTop: 0,
    },
    '& .MuiPaper-root': {
      padding: theme.spacing(1),

      '& > h2': {
        textAlign: 'center',
      },
    },
  },
  annexTitle: {
    display: 'inline-flex',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
}));

function ForfaitingAgreement(props) {
  const {
    project,
    agreements,
    fetchAgreement,
    tooltip,
  } = props;
  const classes = useStyles();
  const { t } = useTranslation('translations');
  const hashParts = window.location.hash.replace('#', '').split('-');
  const [activeStep, setActiveStep] = useState(parseInt(hashParts[0] || 0, 10));
  const [language, setLanguage] = useState(hashParts[1] || 'english');

  const handleSelectLanguage = (lang) => {
    setLanguage(lang);
    window.location.hash = `${activeStep}-${lang}`;
  };
  const projectID = project.singleProject?._id;

  const agreementParsedData = agreements.data?.[projectID]?.[language];
  const dataLoaded = Boolean(agreementParsedData);

  const performFetchAgreement = useCallback(() => {
    if (!projectID || dataLoaded) {
      return;
    }
    fetchAgreement(projectID, language);
  }, [projectID, language, dataLoaded, fetchAgreement]);

  useEffect(() => {
    performFetchAgreement();
  }, [performFetchAgreement]);

  if (agreements.loading) {
    return <ProgressBar />;
  }
  if (!agreementParsedData) {
    return null;
  }

  const currHTML = toHTML(agreementParsedData[activeStep].content);

  return (
    <div className={classes.root}>
      <Grid
        container
        spacing={2}
        direction="row-reverse"
      >
        <Grid item xs={12}>
          <ActionsHeader
            language={language}
            onSelectLanguage={handleSelectLanguage}
            country={project?.singleProject?.data?.country}
            projectID={project?.singleProject?._id}
            tooltip={tooltip}
            downloadButtonProps={{
              href: `${backendURL}/project/${projectID}/agreement/download/${language}`,
              title: t('projects.downloadForfaitingAgreement')
            }}
          />
        </Grid>
        <Grid container item xs={12}>
          {agreementParsedData[activeStep].title && (
            <Typography variant="h5" gutterBottom align="center" className={classes.annexTitle}>
              {agreementParsedData[activeStep].title}
            </Typography>
          )}
        </Grid>
        <Grid item sm={3} xs={12}>
          <Stepper activeStep={activeStep} orientation="vertical" className={classes.stepper}>
            {agreementParsedData.map((s, i) => (
              <Step
                key={i}
                onClick={() => {
                  setActiveStep(i);
                  window.location.hash = `${i}-${language}`;
                }}
              >
                <StepLabel
                  icon={<StepLabelIcon color={activeStep === i ? 'primary' : 'disabled'} />}
                >
                  {s.title}
                </StepLabel>
              </Step>
            ))}
          </Stepper>
        </Grid>
        <Grid item sm={9} xs={12}>
          <Paper>
            <Annex
              items={currHTML}
              annex={activeStep + 1}
              language={language}
            />
          </Paper>
          <Disclaimer language={language} />
        </Grid>
      </Grid>
    </div>
  );
}

export default connect(
  state => ({
    project: state.project,
    agreements: state.agreements,
  }),
  dispatch => ({
    fetchAgreement: (projectID, language) => dispatch(getProjectAgreement(projectID, language)),
  }),
)(ForfaitingAgreement);
