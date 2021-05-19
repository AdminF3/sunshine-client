import React from 'react';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';

import NavContainer from '../../smartcomponents/navcontainer';
import SnackbarNotification from '../../smartcomponents/SnackbarNotification';
import AssetPublicView from '../../../components/asset/AssetPublicView/AssetPublicView';

function AssetPage(props) {
  const {
    alerts,
  } = props;

  return (
    <React.Fragment>
      <Helmet title="User Profile | SUNShINE" />
      <NavContainer />
      {alerts && alerts.map((a, index) => (
        <SnackbarNotification open alert={a} key={index} />
      ))}
      <AssetPublicView />
    </React.Fragment>
  );
}

export default connect(state => ({
  alerts: state.alerts.pending,
}))(AssetPage);
