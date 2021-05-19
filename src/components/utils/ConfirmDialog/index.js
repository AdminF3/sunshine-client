import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import styles from './styles';
import { withTranslation } from 'react-i18next';
import { withStyles } from '@material-ui/core/styles';

class ConfirmDialog extends React.Component {
  state = {
    open: false,
  }
  handleClickOpen = () => {
    this.setState({ open: true });
  }

  handleCancel = (e) => {
    e.stopPropagation();
    this.setState({ open: false });
  }

  handleClose = (e) => {
    e.stopPropagation();
    this.setState({ open: false });
    this.props.handleClose();
  }

  render() {
    const { classes, t } = this.props;
    const { open } = this.state;

    return (
      <div>
        <div
          className={classes.closeButton}
          onClick={this.handleClickOpen}
          key='1'
        >
          {"+"}
        </div>
        <Dialog
          open={open}
          keepMounted
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-slide-title"
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogContent>
            <DialogContentText id="alert-dialog-slide-description">
              {t('translations:utils.confirmDialogText')}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleCancel} color="primary">
              {t('translations:utils.confirmDialogCancel')}
            </Button>
            <Button onClick={this.handleClose} color="primary">
              {t('translations:utils.confirmDialogClose')}
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default withTranslation('translations')
(withStyles(styles, { withTheme: true })(ConfirmDialog));
