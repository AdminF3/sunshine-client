import React, { useState } from 'react';
import { connect } from 'react-redux';
import { useMutation } from '@apollo/client';
import { useTranslation } from 'react-i18next';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@material-ui/core';

import apolloClient from '../../../utils/apolloClient';
import { addAlert } from '../../../actions/alerts';
import { REQUEST_MEMBERSHIP_ORG } from '../../../actions/organizationsMutations';

import Tooltip from '../../utils/TooltipWrapper';

function ApplyToOrganization(props) {
  const {
    organization,
    onError,
    onSuccess,
  } = props;

  const { t } = useTranslation('translations');
  const [isOpen, setIsOpen] = useState(false);

  const [requestOrganizationMembership] = useMutation(REQUEST_MEMBERSHIP_ORG, {
    client: apolloClient,
    onError: () => onError(new Error(t('organizations.failedRequest'))),
    onCompleted: () => {
      handleClose();
      onSuccess(t('organizations.successfullRequest'));
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
      <Tooltip
        title={t('organizations.applyToOrgHint')}
        placement="top"
      >
        <Button
          onClick={handleOpen}
          variant="contained"
          color="primary"
        >
          {t('organizations.applyToOrg')}
        </Button>
      </Tooltip>
      <Dialog
        open={isOpen}
        onClose={handleClose}
      >
        <DialogTitle>{t('organizations.applyToOrg')}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {t('organizations.applyToOrgConfirm', { name: organization.name })}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleClose}
            color="primary"
          >
            {t('utils.confirmDialogCancel')}
          </Button>
          <Button
            onClick={() => requestOrganizationMembership({
              variables: {
                organizationID: organization.ID,
              }
            })}
            color="primary"
            autoFocus
          >
            {t('utils.apply')}
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}

export default connect(
  null,
  dispatch => ({
    onError: (err) => dispatch(addAlert({ text: err.message, level: 'error' })),
    onSuccess: (msg) => dispatch(addAlert({ text: msg, level: 'success' })),
  })
)(ApplyToOrganization);
