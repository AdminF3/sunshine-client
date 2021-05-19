import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useMutation } from '@apollo/client';
import clsx from 'clsx';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
  TextField,
  Typography,
  makeStyles,
} from '@material-ui/core';
import {
  EditAttributes as EditAttributesIcon,
  Cancel as DeclineIcon,
  CheckCircle as VerifyIcon,
} from '@material-ui/icons';

import { addAlert } from '../../actions/alerts';
import apolloClient from '../../utils/apolloClient';
import Tooltip from './TooltipWrapper';

function ValidationStatusMenu(props) {
  const {
    entity,
    validateMutation,
    mutationVariables,
    refetch,
    onError,
  } = props;
  const { t } = useTranslation('translations');
  const [anchorEl, setAnchorEl] = useState(null);
  const [statusDialog, setStatusDialog] = useState(null);
  const [validateEntity] = useMutation(validateMutation, {
    client: apolloClient,
    onError: (err) => onError(err),
    onCompleted: () => refetch(),
    variables: { ...mutationVariables },
  });

  if (!entity?.data) {
    return null;
  }

  return (
    <React.Fragment>
      <Tooltip title={t('organizations.manageStatus')}>
        <IconButton onClick={e => setAnchorEl(e.currentTarget)}>
          <EditAttributesIcon color="action" />
        </IconButton>
      </Tooltip>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={() => setAnchorEl(null)}
      >
        <MenuItem
          onClick={() => setStatusDialog('VALID')}
          disabled={entity.data.valid === 2}
        >
          <ListItemIcon>
            <VerifyIcon fontSize="small" color="primary" />
          </ListItemIcon>
          <Typography variant="inherit">{t('adminActions.approve')}</Typography>
        </MenuItem>
        <MenuItem
          onClick={() => setStatusDialog('DECLINED')}
          disabled={entity.data.valid === 3}
        >
          <ListItemIcon>
            <DeclineIcon fontSize="small" color="error" />
          </ListItemIcon>
          <Typography variant="inherit">{t('adminActions.decline')}</Typography>
        </MenuItem>
      </Menu>
      <ValidationStatusDialog
        validationStatus={statusDialog}
        onClose={() => setStatusDialog(null)}
        onConfirm={(comment) => {
          validateEntity({ variables: { status: statusDialog, comment } });
        }}
      />
    </React.Fragment>
  );
}

ValidationStatusMenu.propTypes = {
  entity: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    data: PropTypes.shape({
      valid: PropTypes.number.isRequired,
    }).isRequired,
  }).isRequired,
  validateMutation: PropTypes.object.isRequired,
  mutationVariables: PropTypes.object.isRequired,
  onError: PropTypes.func,
};

const useDialgStyles = makeStyles(theme => ({
  buttonError: {
    color: theme.palette.error.dark,
  },
}));

function ValidationStatusDialog(props) {
  const {
    validationStatus,
    onConfirm,
    onClose,
  } = props;
  const classes = useDialgStyles();

  const { t } = useTranslation('translations');
  const [comment, setComment] = useState('');

  if (!validationStatus) {
    return null;
  }

  let texts = {
    action: 'adminActions.approve',
    helperText: 'adminActions.approveRasonHelperText'
  };
  if (validationStatus === 'DECLINED') {
    texts = {
      action: 'adminActions.decline',
      helperText: 'adminActions.declineRasonHelperText'
    };
  }

  return (
    <Dialog
      fullWidth
      maxWidth="sm"
      open
      onClose={onClose}
    >
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          label={t('notifications.reason')}
          fullWidth
          helperText={t(texts.helperText)}
          value={comment}
          onChange={e => setComment(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button
          color="primary"
          onClick={onClose}
        >
          {t('utils.confirmDialogCancel')}
        </Button>
        <Button
          color="primary"
          onClick={() => onConfirm(comment)}
          className={clsx({
            [classes.buttonError]: validationStatus === 'DECLINED',
          })}
        >
          {t(texts.action)}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

ValidationStatusDialog.propTypes = {
  validationStatus: PropTypes.oneOf(['VALID', 'DECLINED']),
  onConfirm: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default connect(
  null,
  dispatch => ({
    onError: err => dispatch(addAlert({ text: err.message, level: 'error' })),
  }),
)(ValidationStatusMenu);
