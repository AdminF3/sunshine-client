import React from 'react';
import PropTypes from 'prop-types';

/// WRAPPERS
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import { withRouter } from "react-router-dom";
import { withStyles } from '@material-ui/core/styles';

/// COMPONENTS
import RegisterForm from './../../../components/authentication/RegisterForm/RegisterForm';
import { Helmet } from "react-helmet";
import NavContainer from './../../smartcomponents/navcontainer';
import SnackbarNotification from './../../smartcomponents/SnackbarNotification';
import Paper from '@material-ui/core/Paper';
import Avatar from '@material-ui/core/Avatar';
import ProgressBar from './../../../components/utils/ProgressBar';
import Sunshine from './../../../images/Sunshine.png';

/// ACTIONS
import { registerUser } from '../../../actions/authentication';

import styles from './styles';

class RegisterView extends React.Component {
  render(){
    let { register, t, fetching, alerts, classes } = this.props;
    
    return (
      <div>
        <Helmet title='Register Profile | SUNShINE'/>
        <NavContainer formName='registerForm'/>
        {fetching ? <ProgressBar /> : (
          <div>
            {alerts && alerts.map((alert, index) => (
              <SnackbarNotification open alert={alert} key={index}/>
            ))}
            <div className={`row center-xs ${classes.container}`}>
              <Paper zdepth={0} rounded='true' className={classes.loginBase}>
                <div className={classes.centeredLogo}>
                  <Avatar src={Sunshine} className={classes.avatarStyle} />
                </div>
                <div className={`row center-xs ${classes.formHeading}`}>{t('auth.registerTitle')}</div>
                <RegisterForm handleFormSubmit={register} />
              </Paper>
            </div>
          </div>
        )}
      </div>
    )
  }
}


RegisterView.propTypes = {
  // userIsLogged: PropTypes.string.isRequired,
  fetching: PropTypes.bool,
  register: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
}

const mapStateToProps = (state, ownProps) => {
  return {
    userIsLogged: state.user.isAuthenticated,
    fetching: state.user.isFetching,
    didRegister: state.user.didRegister,
    alerts: state.alerts.pending,
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  const redirect = () => ownProps.history.push("/login");
  
  return {
    register: (creds) => {
      dispatch(registerUser(creds, redirect));
    }
  };
};

export default withRouter(withTranslation('translations')
(connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(RegisterView))));
