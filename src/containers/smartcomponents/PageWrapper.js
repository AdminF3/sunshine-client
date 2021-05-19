import React, { Component } from 'react';

import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';

import { TOGGLE_LOG_BACK_IN_DIALOG } from '../../constants/actionTypes';
import getCookie from '../../components/utils/getCookie';
import LogBackInDialog from '../../components/authentication/LogBackInDialog';
import { logoutUser } from '../../../src/actions/authentication';

const styles = {
  root: {
    display: 'flex',
    flexDirection: 'column',
    paddingTop: 70,
    paddingBottom: 20,
    marginLeft: 250,
    height: '100%',

    '@media screen and (max-width: 960px)': {
      marginLeft: 0,
    },
  },
};

class PageWrapper extends Component {
  state = {
    loggingOut: false,
  }

  componentDidUpdate() {
    const isCookieExpired = !getCookie();
    const { user } = this.props;

    if (user.isLogged && isCookieExpired && !user.isFetching) {
      this.performLogout();
      return;
    }

    if (!user.isLogged && !isCookieExpired) {
      this.performLogout();
      return;
    }
  }

  performLogout() {
    if (this.state.loggingOut) {
      return;
    }

    this.setState({ loggingOut: true });

    this.props.logout(() => this.setState({ loggingOut: false }));
  }

  render() {
    const { classes, children } = this.props;

    return (
      <React.Fragment>
        <div className={classes.root}>
          {children}
        </div>

        {this.props.logBackInDialogOpen && (
          <LogBackInDialog />
        )}
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.user,
  logBackInDialogOpen: state.dialogs.logBackInDialog,
});

const mapDispatchToProps = (dispatch) => ({
  logout: (onComplete) => dispatch(logoutUser(null, () => {
    if (onComplete) {
      onComplete();
    }
    dispatch({ type: TOGGLE_LOG_BACK_IN_DIALOG });
  })),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(PageWrapper)));
