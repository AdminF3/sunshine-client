import React, { useState } from 'react';
import { connect } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useMutation } from '@apollo/client';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
  makeStyles
} from '@material-ui/core';
import {
  List as ListIcon,
} from '@material-ui/icons';

import { addAlert as addAlertAction } from '../../../actions/alerts';
import { SEND_GDPR_REQUEST } from '../../../actions/GDPRMutations';
import apolloClient from '../../../utils/apolloClient';
import GDPRTabs from './GDPRTabs';
import CountryRolesDialog from '../CountryRolesDialog/CountryRolesDialog';
import { canSendGDPR } from '../../../utils/can';

const useStyles = makeStyles({
  actionBar: {
    display: 'flow-root',
  },
  okButton: {
    marginLeft: 16,
    float: 'right',
  },
  spaceBetween: {
    justifyContent: 'space-between',
  },
  dialogContent: {
    padding: 0,
    marginTop: 50
  }
});

const gdprDefaultData = {
  requesterName: '',
  requesterAddress: '',
  requesterPhone: '',
  requesterEmail: '',
  address: '',
  name: '',
  phone: '',
  email: '',
  reason: '',
  information: '',
  action: 'GET',
  subject: 'self',
  confirm: false,
  files: [],
};

function GDPRDialog(props) {
  const {
    addAlert,
  } = props;
  const { t } = useTranslation('privacy');
  const [isOpen, setIsOpen] = useState(false);
  const [isDPOListOpen, setDPOListOpen] = useState(false);
  const [data, setData] = useState(gdprDefaultData);

  const classes = useStyles();

  const toggleOpen = () => setIsOpen(!isOpen);
  const toggleDPOListOpen = () => setDPOListOpen(!isDPOListOpen);

  return (
    <React.Fragment>
      <div
        className="secondary-redirect"
        onClick={toggleOpen}
      >
        {t('translations:auth.GDPR')}
      </div>
      <Dialog
        fullWidth
        maxWidth="md"
        open={isOpen}
        onClose={toggleOpen}
        aria-labelledby={t('translations:auth.GDPR')}
      >
        <DialogTitle>
          {t('translations:auth.GDPR')}
        </DialogTitle>
        <DialogContent
          className={classes.dialogContent}
        >
          <GDPRTabs
            data={data}
            setData={setData}
            gdprDefaultData={gdprDefaultData}
          />
        </DialogContent>
        <DialogActions
          className={classes.actionBar}
        >
          <Button
            variant="contained"
            onClick={toggleOpen}
            color="primary"
            className={classes.okButton}
          >
            {t('translations:utils.confirmDialogClose')}
          </Button>
          <Button
            variant="outlined"
            startIcon={<ListIcon />}
            onClick={toggleDPOListOpen}
            color="primary"
            className={classes.okButton}
          >
            {t('translations:platformRoles.dataProtectionOfficers')}
          </Button>
          <RequestGDPR
            requestAction={data.action}
            data={data}
            subject={data.subject}
            onError={() => addAlert({ text: t('translations:organizations.failedRequest'), level: 'error' })}
            onSuccess={() => {
              addAlert({ text: t('translations:utils.requestErasureSuccess'), level: 'success' });
              setData(gdprDefaultData);
              toggleOpen();
            }}
          />
        </DialogActions>
      </Dialog>
      {isDPOListOpen && (
        <CountryRolesDialog
          title={t('translations:platformRoles.dataProtectionOfficers')}
          role="data_protection_officer"
          onClose={toggleDPOListOpen}
        />
      )}
    </React.Fragment>
  );
}

function RequestGDPR(props) {
  const { onError, onSuccess, requestAction, data } = props;
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useTranslation('translations');

  const [sendGDPRRequest] = useMutation(SEND_GDPR_REQUEST, {
    client: apolloClient,
    onError: () => onError(),
    onCompleted: (response) => {
      onSuccess(response);
      handleClose();
    }
  });

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <React.Fragment>
      <Button
        variant="contained"
        color="primary"
        disabled={!canSendGDPR(data)}
        onClick={() => handleOpen()}
      >
        {requestAction === 'DELETE' ?
          t('utils.requestErasureLabel') :
          t('utils.requestExtractionLabel')
        }
      </Button>
      <Dialog
        open={isOpen}
        onClose={handleClose}
      >
        <DialogTitle>{t('utils.confirmRequest')}</DialogTitle>
        <DialogContent>
          <Typography>
            {requestAction === 'DELETE' ?
              t('utils.requestErasureConfirm') :
              t('utils.requestExtractionConfirm')
            }
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            color="primary"
            onClick={handleClose}
          >
            {t('navigation.no')}
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={() => sendGDPRRequest({
              variables: {
                request: {
                  requesterName: data.requesterName,
                  requesterAddress: data.requesterAddress,
                  requesterPhone: data.requesterPhone,
                  requesterEmail: data.requesterEmail,
                  name: data.subject === 'self' ? data.requesterName : data.name,
                  address: data.subject === 'self' ? data.requesterAddress : data.address,
                  phone: data.subject === 'self' ? data.requesterPhone : data.phone,
                  email: data.subject === 'self' ? data.requesterEmail : data.email,
                  action: requestAction,
                  reason: data.action === 'DELETE' ? t(`privacy:appendix_5.r_00${data.reason}`) : data.reason,
                  information: data.information,
                  files: data.files,
                }
              }
            })}
          >
            {t('navigation.yes')}
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}

export default connect(
  null,
  dispatch => ({
    addAlert: (err) => dispatch(addAlertAction({ text: err.text, level: err.level })),
  })
)(GDPRDialog);
