import React from 'react';
import PropTypes from 'prop-types';

// WRAPPERS
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import { withRouter } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';

// COMPONENTS
import Paper from '@material-ui/core/Paper';
import Avatar from '@material-ui/core/Avatar';
import { Helmet } from 'react-helmet';
import LoginForm from './../../../components/authentication/LoginForm/LoginForm';
import ForgotPassword from './../../../components/authentication/ForgotPassword/ForgotPassword.jsx';
import NavContainer from './../../smartcomponents/navcontainer';
import SnackbarNotification from './../../smartcomponents/SnackbarNotification';
import ProgressBar from './../../../components/utils/ProgressBar';
import Sunshine from './../../../images/Sunshine.png';

// ACTIONS
import { forgotPassword as forgotPasswordAction } from './../../../actions/authentication';
import { forgotPassResetState as forgotPassResetStateAction } from './../../../actions/authentication';
import getCookie from './../../../components/utils/getCookie';

import styles from './styles';

class LoginView extends React.Component {
  UNSAFE_componentWillMount() {
    if (getCookie()) {
      this.props.history.push('/');
    }
  }
  componentDidUpdate() {
    if (getCookie()) {
      this.props.history.push('/');
    }
  }

  render() {
    const {
      fetching,
      forgotPassword,
      loading,
      forgotPassSuccess,
      forgotPassFail,
      forgotPassResetState,
      alerts,
      classes,
      t,
    } = this.props;

    return (
      <React.Fragment>
        <Helmet title='User Profile | SUNShINE' />
        <NavContainer formName='loginForm' />
        {fetching ? <ProgressBar /> : (
          <div>
            {alerts && alerts.map((a, index) => (
              <SnackbarNotification open alert={a} key={index} />
            ))}
            <div className={`row center-xs ${classes.innerContainer}`}>
              <Paper zdepth={0} rounded="true" className={classes.loginBase}>
                <div className={classes.centeredLogo}>
                  <Avatar src={Sunshine} className={classes.avatarStyle} />
                </div>
                <div className={`row center-xs ${classes.formHeading}`}>
                  {t('auth.loginTitle')}
                </div>
                <LoginForm />
                <ForgotPassword
                  handleFormSubmit={forgotPassword}
                  loading={loading}
                  forgotPassSuccess={forgotPassSuccess}
                  forgotPassFail={forgotPassFail}
                  forgotPassResetState={forgotPassResetState}
                />
              </Paper>
            </div>
          </div>
        )}
      </React.Fragment>
    );
  }
}

LoginView.propTypes = {
  fetching: PropTypes.bool,
  loading: PropTypes.bool,
  forgotPassSuccess: PropTypes.bool,
  forgotPassFail: PropTypes.bool,
  t: PropTypes.func.isRequired,
  forgotPassword: PropTypes.func.isRequired,
  forgotPassResetState: PropTypes.func
};

const mapStateToProps = (state) => {
  return {
    userIsLogged: state.user.isAuthenticated,
    fetching: state.user.isFetching,
    loading: state.auth.isLoading,
    forgotPassSuccess: state.auth.forgotPassSuccess,
    forgotPassFail: state.auth.forgotPassFail,
    isLogged: state.user.isLogged,
    alerts: state.alerts.pending,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    forgotPassword: (creds) => {
      dispatch(forgotPasswordAction(creds));
    },
    forgotPassResetState: () => {
      dispatch(forgotPassResetStateAction());
    }
  };
};

export default withRouter(withTranslation('translations')(
  connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(LoginView))));
