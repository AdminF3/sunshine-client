import React from 'react';
import PropTypes from 'prop-types';

// WRAPPERS
import { withRouter } from 'react-router-dom';
import { withTranslation } from 'react-i18next';
import { connect } from 'react-redux';

// COMPONENTS
import { Helmet } from 'react-helmet';
import NavContainer from './../../smartcomponents/navcontainer';
import ProgressBar from './../../../components/utils/ProgressBar';
import RestorePassword from './../../../components/authentication/RestorePassword/RestorePassword.jsx';
import SnackbarNotification from '../../smartcomponents/SnackbarNotification';

// ACTIONS
import { tokenVerification } from './../../../actions/authentication';

class ForgotPasswordPage extends React.Component {
  componentDidMount() {
    const { tokenVerify, match } = this.props;
    const token = match.params.token;
    tokenVerify(token);
  }

  componentDidUpdate() {
    if (!this.props.tokenVerified) {
      this.props.history.push('/login');
    }
  }

  render() {
    const { fetching, alerts } = this.props;

    const progressBarStyle = {
      marginTop: '120px',
      marginRight: '140px'
    };

    if (fetching) {
      return <ProgressBar addStyle={progressBarStyle} />;
    }

    return (
      <React.Fragment>
        <Helmet title='Forgot Password | SUNShINE' />
        {alerts && alerts.map((a, index) => (
          <SnackbarNotification open alert={a} key={index} />
        ))}
        <NavContainer formName='profileUpdate' />
        <RestorePassword />
      </React.Fragment>
    );
  }
}

ForgotPasswordPage.propTypes = {
  tokenVerify: PropTypes.func.isRequired,
  fetching: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => {
  return {
    fetching: state.auth.isFetching,
    tokenVerified: state.auth.tokenVerified,
    alerts: state.alerts.pending
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    tokenVerify: (creds) => {
      dispatch(tokenVerification(creds));
    }
  };
};

export default withRouter(withTranslation('translations')(connect(
    mapStateToProps,
    mapDispatchToProps
  )(ForgotPasswordPage)));
