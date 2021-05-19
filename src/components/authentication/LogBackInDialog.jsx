import React from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import { withTranslation } from 'react-i18next';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';

import { TOGGLE_LOG_BACK_IN_DIALOG } from '../../constants/actionTypes';

class LogBackInDialog extends React.Component {
  render() {
    const { location: { pathname }, t, closeDialog } = this.props;

    return (
      <Dialog
        open
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{t('translations:auth.youHaveBeenLoggedOut')}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {t('translations:auth.youHaveBeenLoggedOutDescription')}&nbsp;
            {pathname === '/login' ? t('translations:auth.pleaseLoginAgain') : this.navigateLoginLink()}.
          </DialogContentText>
          <DialogActions>
            <Button variant="contained" onClick={closeDialog} color="primary">
              {t('translations:navigation.ok')}
            </Button>
          </DialogActions>
        </DialogContent>
      </Dialog>
    );
  }

  navigateLoginLink() {
    return (
      <Link to="/login" onClick={() => this.props.closeDialog()}>
        {this.props.t('translations:auth.navigateToLogin')}
      </Link>
    );
  }
}

export default withRouter(connect(
  null,
  dispatch => ({
    closeDialog: () => dispatch({ type: TOGGLE_LOG_BACK_IN_DIALOG }),
  })
)(withTranslation('translations')
(LogBackInDialog)));
