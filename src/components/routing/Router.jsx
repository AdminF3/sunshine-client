import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  Router as ReactRouter,
  Switch
} from 'react-router-dom';
import { Helmet } from 'react-helmet';

import { canAccessRoute } from '../../utils/can';
import NavContainer from '../../containers/smartcomponents/navcontainer';
import InternalError from '../utils/InternalError';
import Route from './Route';

class Router extends React.Component {
  constructor(props) {
    super(props);
    this.state = { error: null };
  }

  componentDidCatch(error) {
    this.setState({ error });
  }

  render() {
    const { routesConfig, wrapper, user } = this.props;

    const Wrapper = wrapper || React.Fragment;

    return (
      <ReactRouter history={this.props.history}>
        <Wrapper>
          <RouterErrorHandler
            routesConfig={routesConfig}
            user={user}
            error={this.state.error}
          />
        </Wrapper>
      </ReactRouter>
    );
  }
}

function RouterErrorHandler(props) {
  const {
    routesConfig,
    user,
    error,
  } = props;

  if (error) {
    return (
      <React.Fragment>
        <Helmet title="Energy Service Companies | SUNShINE" />
        <NavContainer />
        <InternalError error={error} />
      </React.Fragment>
    );
  }

  return (
    <Switch>
      {routesConfig.map((r) => canAccessRoute(user, r.path) && (
        <Route
          key={r.path}
          path={r.path}
          exact={r.exact || r.exact === undefined}
          isPublic={r.public}
        >
          <r.component {...r.componentProps} />
        </Route>
      ))}
    </Switch>
  );
}

Router.propTpes = {
  routesConfig: PropTypes.arrayOf(
    PropTypes.shape({
      path: PropTypes.string.isRequired,
      component: PropTypes.element.isRequired,
      componentProps: PropTypes.shape({
        slideIndex: PropTypes.number,
      }),
      public: PropTypes.bool,
      track: PropTypes.bool,
    }),
  ),
  wrapper: PropTypes.element,
};

export default connect(
  state => ({ user: state.user }),
)(Router);
