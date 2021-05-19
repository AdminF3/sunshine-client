import React from 'react';
import { connect } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet';
import {
  Grid,
  makeStyles,
} from '@material-ui/core';

import NavContainer from './../../smartcomponents/navcontainer';
import SnackbarNotification from './../../smartcomponents/SnackbarNotification';
import QuickLinks from './QuickLinks';
import CountriesMap from './CountriesMap';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3),
    height: '100%',
  },
}));

function HomePage(props) {
  const { alerts } = props;

  const classes = useStyles();

  const { t } = useTranslation('translations');

  return (
    <React.Fragment>
      <Helmet title={t('navigation.homeTitle')} />
      <NavContainer />
      {alerts && alerts.map((alrt, index) => (
        <SnackbarNotification open alert={alrt} key={index} />
      ))}
      <Grid
        container
        direction="column"
        justify="space-between"
        alignItems="stretch"
        className={classes.root}
      >
        <CountriesMap />
        <QuickLinks />
      </Grid>
    </React.Fragment>
  );
}

export default connect(
  state => ({
    alerts: state.alerts.pending,
  }),
)(HomePage);
