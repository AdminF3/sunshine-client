import React from 'react';
import { useTranslation } from 'react-i18next';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@material-ui/core';

function InfoBoxNotification(props) {
  const {
    notification,
    closeNotification,
  } = props;
  const { t } = useTranslation('translations');

  return (
    <Dialog open>
      <DialogTitle>{t(notification.titleKey)}</DialogTitle>
      <DialogContent>
        <DialogContentText>{t(notification.textKey)}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={closeNotification}
          color={notification.level === 'error' ? 'default' : 'primary'}
          autoFocus
          variant="contained"
        >
          {t('navigation.ok')}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default InfoBoxNotification;
