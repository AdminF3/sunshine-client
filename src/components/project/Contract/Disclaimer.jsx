import React from 'react';
import { connect } from 'react-redux';
import { useTranslation } from 'react-i18next';
import {
  Typography,
  makeStyles,
} from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    display: 'block',
    textAlign: 'left',
    paddingTop: theme.spacing(3),
  },
  disclaimer: {
    display: 'block',
    position: 'relative',

    '&::before': {
      content: '""',
      display: 'block',
      height: 1,
      top: -theme.spacing(1),
      position: 'absolute',
      left: 0,
      right: '90%',
      background: theme.palette.divider,
    },
  },
}));

const disclaimers = {
  latvia: {
    english: 'annexes.epcDisclaimerLatviaEnglish',
    native: 'annexes.epcDisclaimerLatviaNative',
  },
  all: 'annexes.epcDisclaimerAll',
};

function Disclaimer(props) {
  const {
    country,
    language,
    userLanguage,
  } = props;
  const { t } = useTranslation('translations');
  const classes = useStyles();

  const lang = language || mapUserLanguage(userLanguage);

  if (!country || !lang) {
    return null;
  }

  const tKey = disclaimers[country]?.[lang] || disclaimers.all;
  if (!tKey) {
    return null;
  }

  return (
    <div className={classes.root}>
      <Typography variant="caption" className={classes.disclaimer} component="div">
        {t(tKey)}
      </Typography>
    </div>
  );
}

function mapUserLanguage(userLanguage) {
  if (userLanguage === 'lv') {
    return 'native';
  }
  return 'english';
}

export default connect(
  state => ({
    country: state.project.singleProject.data?.country?.toLowerCase(),
    userLanguage: state.user.language,
  }),
)(Disclaimer);
