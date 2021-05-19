import React from 'react';

import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import { withStyles } from '@material-ui/core/styles';

import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ErrorIcon from '@material-ui/icons/Error';
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import green from '@material-ui/core/colors/green';
import InfoBoxNotification from './InfoBoxNotification';

import { removeAlert } from './../../actions/alerts';

const styles = theme => ({
  snackBarRoot: {
    marginTop: '8px',
    minWidth: '288px',
    flexGrow: '0 !important'
  },
  success: {
    backgroundColor: green[600],
  },
  error: {
    backgroundColor: theme.palette.error.dark,
  },
  alertText: {
    marginLeft: '15px',
    marginRight: '25px',
  },
  closeAlertButton: {
    transform: 'rotate(45deg)',
    cursor: 'pointer',
    fontSize: '24px',
    width: '15px',
    height: '15px',
    position: 'absolute',
    right: '10px',
    paddingLeft: '15px',
    top: '0px',
  }
})

class SnackbarNotification extends React.Component {
  state = {
    vertical: 'top',
    horizontal: 'center',
  };

  render() {
    const { vertical, horizontal } = this.state;
    const { classes, alert, closeAlert } = this.props;

    if (alert.alertType === 'notificationBox') {
      return (
        <InfoBoxNotification
          notification={alert}
          closeNotification={() => closeAlert(alert.id)}
        />
      );
    }

    return (
      <div>
        <Snackbar
          anchorOrigin={{ vertical, horizontal }}
          open={true}
          ContentProps={{
            'aria-describedby': 'message-id',
          }}
        >
          <SnackbarContent
            className={alert.level === 'success' ? classes.success : classes.error}
            style={{ backgroundColor: alert.timeout && 'darkblue', fontSize: alert.timeout && '24px', minWidth: alert.timeout && '700px' }}
            classes={{ root: classes.snackBarRoot }}
            message={
              <div style={{ display: 'flex' }} id="message-id">
                {alert.level === 'success' ? <CheckCircleIcon style={{ marginRight: '10px' }}/> : <ErrorIcon style={{ marginRight: '10px', marginTop: alert.timeout && '20px', color: alert.timeout && 'red' }}/> }
                <div className={classes.alertText}>{alert.text}</div>
                <div onClick={()=> closeAlert(alert.id)} className={classes.closeAlertButton}>+</div>
              </div>
            }
          />
        </Snackbar>
        {(() => { setTimeout(()=> closeAlert(alert.id), alert.timeout ? alert.timeout : 6000) })()}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    closeAlert: (id) => {
      dispatch(removeAlert(id))
    }
  }
}

export default withTranslation('translations',
 'serverMessages')(withStyles(styles)(connect(
  mapStateToProps,
  mapDispatchToProps
)(SnackbarNotification)))
