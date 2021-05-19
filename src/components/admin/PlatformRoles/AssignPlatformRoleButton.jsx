import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useMutation } from '@apollo/client';
import { useTranslation } from 'react-i18next';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  Typography,
  makeStyles,
} from '@material-ui/core';
import {
  Add as AddIcon,
} from '@material-ui/icons';

import apolloClient from '../../../utils/apolloClient';
import { ADD_ADMIN_NW_MANAGER } from '../../../actions/usersMutations';
import InputWithValidation from '../../organization/OrganizationInputWithValidation/OrganizationInputWithValidation';

const useStyles = makeStyles(theme => ({
  dialog: {
    '& .MuiDialog-paper': {
      minHeight: `calc(80% - ${theme.spacing(6)}px)`,
    }
  },
  inputWithValidation: {
    marginTop: theme.spacing(4),

    '& > *': {
      padding: '0 !important',
      margin: '0 !important',
    },
  },
}));

function AddPlatformRoleButton(props) {
  const {
    searchUsers,
    foundUsers,
    clearResults,
    refetch,
    refetchLoading,
  } = props;

  const loading = false;

  const classes = useStyles();
  const { t } = useTranslation('translations');
  const [userID, setUserID] = useState(null);
  const [error, setError] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const toggleDialogOpen = () => setIsOpen(!isOpen);

  const [assign] = useMutation(ADD_ADMIN_NW_MANAGER, {
    client: apolloClient,
    onError: (err) => setError(err.message),
    onCompleted: () => {
      refetch();
      toggleDialogOpen();
    },
  });

  const submit = () => {
    assign({ variables: { userID } });
  };

  return (
    <React.Fragment>
      <Button
        variant="outlined"
        color="primary"
        endIcon={<AddIcon />}
        onClick={toggleDialogOpen}
      >
        {t('projects.assign')} {t('platformRoles.admin_network_manager')}
      </Button>
      <Dialog
        fullWidth={true}
        maxWidth="sm"
        open={isOpen}
        onClose={toggleDialogOpen}
        className={classes.dialog}
      >
        <DialogContent>
          <Typography variant="h6">
            {t('projects.assign')} {t('platformRoles.admin_network_manager')}
          </Typography>
          <InputWithValidation
            className={classes.inputWithValidation}
            name="userEmail"
            type="email"
            headline={t('translations:projects.searchUser')}
            handleEmailInput={(error, u) => {
              setUserID(u._id);
              setError(error || null);
            }}
            searchUsers={searchUsers}
            foundUsers={foundUsers}
            clearResults={clearResults}
          />
          {error && (
            <Typography color="error" className={classes.error}>{error}</Typography>
          )}
        </DialogContent>
        <DialogActions>
          <Button
            disabled={loading || refetchLoading}
            onClick={toggleDialogOpen}
            color="default"
          >
            {t('utils.confirmDialogCancel')}
          </Button>
          <Button
            disabled={loading || refetchLoading}
            onClick={submit}
            color="primary"
            variant="contained"
          >
            {t('projects.assign')}
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}

AddPlatformRoleButton.propTypes = {
  foundUsers: PropTypes.array.isRequired,
  refetch: PropTypes.func.isRequired,
  refetchLoading: PropTypes.bool.isRequired,
};

export default AddPlatformRoleButton;
