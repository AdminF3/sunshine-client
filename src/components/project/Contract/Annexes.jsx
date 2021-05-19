import React, { useCallback, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useTranslation } from 'react-i18next';
import {
  Grid,
  Paper,
  Stepper,
  Step,
  StepLabel,
  Typography,
  makeStyles,
} from '@material-ui/core';
import {
  RadioButtonChecked as StepLabelIcon,
  InfoOutlined as InfoIcon,
} from '@material-ui/icons';

import { getProjectContract } from '../../../actions/contracts';
import isSupportedCountry from '../../../utils/isSupportedCountry';
import UserTooltip from '../../utils/UserTooltip';
import MarkdownText from '../../utils/MarkdownText';
import Markdown from '../../utils/Markdown/Markdown';
import ProgressBar from '../../utils/ProgressBar';
import { toHTML } from '../texParser';
import ActionsHeader from './ActionsHeader';
import Annex from './Annex';
import Disclaimer from './Disclaimer';

const useStyles = makeStyles(theme => ({
  root: {
    position: 'relative',
    padding: `0 ${theme.spacing(2)}px ${theme.spacing(2)}px ${theme.spacing(2)}px`,

    '& .MuiPaper-root': {
      padding: theme.spacing(1),
    },
  },
  stepper: {
    boxShadow: theme.shadows[1],

    '& .MuiStepLabel-root': {
      cursor: 'pointer',
    },
  },
  content: {
    padding: theme.spacing(2),

    '& ol, ul': {
      margin: 0,
    },
  },
  languageButton: {
    marginRight: theme.spacing(0.5),
  },
  disclamer: {
    fontWeight: 600
  },
  annexTitle: {
    display: 'inline-flex',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',

    '& .UserTooltip-grow': {
      marginLeft: 8,
    },
  },
}));

const tooltips = {
  0: 'tooltips:projects.epc.annexesExtraPage',
  10: 'tooltips:projects.epc.annexesExtraPage',
};

function Annexes(props) {
  const {
    project,
    contracts,
    fetchContract,
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

  const contractParsedData = contracts.data?.[projectID]?.[language];
  const dataLoaded = Boolean(contractParsedData);

  const performFetchContract = useCallback(() => {
    if (!projectID || dataLoaded) {
      return;
    }
    fetchContract(projectID, language);
  }, [projectID, language, dataLoaded, fetchContract]);

  useEffect(() => {
    performFetchContract();
  }, [performFetchContract]);

  if (contracts.loading) {
    return <ProgressBar />;
  }
  if (!contractParsedData) {
    return null;
  }

  const contents = [];
  for (let i = 1; i < (contractParsedData.length - 1); i++) {
    contents.push(contractParsedData[i]);
  }
  contents.push({
    title: t('annexes.annexMarkdown'),
    items: [<Markdown />],
  });

  const currHTML = contents[activeStep].content ? toHTML(contents[activeStep].content) : contents[activeStep].items;

  return (
    <div className={classes.root}>
      <Grid
        container
        direction="row-reverse"
        spacing={2}
      >
        <Grid item xs={12}>
          <ActionsHeader
            language={language}
            onSelectLanguage={handleSelectLanguage}
            country={project?.singleProject?.data?.country}
            projectID={project?.singleProject?._id}
            tooltip={tooltip}
          />
        </Grid>

        {
          !isSupportedCountry(project.singleProject.data.country) &&
          <Grid item xs={12}>
            <Typography align="center" className={classes.disclamer}>
              {t('annexes.disclamer')}
            </Typography>
          </Grid>
        }

        <Grid container item xs={12}>
          {contents[activeStep].title && (
            <Typography variant="h5" gutterBottom align="center" className={classes.annexTitle}>
              {contents[activeStep].title}
              {tooltips[activeStep] && (
                <UserTooltip
                  action="click"
                  icon={<InfoIcon />}
                  iconButtonProps={{ color: 'primary', size: 'small' }}
                  title={<MarkdownText text={t(tooltips[activeStep], { returnObjects: true })} />}
                />
              )}
            </Typography>
          )}
        </Grid>

        <Grid item sm={3} xs={12}>
          <Stepper activeStep={activeStep} orientation="vertical" className={classes.stepper}>
            {contents.map((s, i) => (
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
    contracts: state.contracts,
  }),
  dispatch => ({
    fetchContract: (projectID, language) => dispatch(getProjectContract(projectID, language)),
  }),
)(Annexes);
