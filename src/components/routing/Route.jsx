import React from 'react';
import PropTypes from 'prop-types';
import {
  Route as BrowserRoute,
  Redirect
} from 'react-router-dom';

import getCookie from '../utils/getCookie';

function Route(props) {
  const { path, exact, isPublic } = props;

  if (!isPublic && !getCookie() && path !== '/login') {
    return <Redirect to="/login" />;
  }

  return (
    <BrowserRoute exact={exact} path={path}>
      {props.children}
    </BrowserRoute>
  );
}

Route.propTypes = {
  path: PropTypes.string.isRequired,
  isPublic: PropTypes.bool.isRequired,
  track: PropTypes.bool.isRequired,
  exact: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired,
};

Route.defaultProps = {
  exact: true,
  isPublic: false,
  track: true,
};

export default Route;
