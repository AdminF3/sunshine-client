import React, { useCallback, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import {
  Grid,
  Paper,
  makeStyles,
} from '@material-ui/core';

import { getProjectContract } from '../../../actions/contracts';
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

      '& > h2': {
        textAlign: 'center',
      },
    },
  },
}));

function GeneralTerms(props) {
  const {
    project,
    contracts,
    fetchContract,
    tooltip,
  } = props;
  const classes = useStyles();

  const [language, setLanguage] = useState(window.location.hash.replace('#', '') || 'english');
  const handleSelectLanguage = (lang) => {
    setLanguage(lang);
    window.location.hash = lang;
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

  const terms = contractParsedData[contractParsedData.length - 1];
  const termsHTML = toHTML(terms.content);

  return (
    <div className={classes.root}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <ActionsHeader
            language={language}
            onSelectLanguage={handleSelectLanguage}
            country={project?.singleProject?.data?.country}
            projectID={project?.singleProject?._id}
            tooltip={tooltip}
          />
        </Grid>
        <Grid item xs={12}>
          <Annex
            component={Paper}
            items={termsHTML}
            annex={0}
            project={project}
          />
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
)(GeneralTerms);
