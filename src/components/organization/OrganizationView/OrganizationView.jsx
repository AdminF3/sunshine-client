import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { useMutation } from '@apollo/client';
import { useTranslation } from 'react-i18next';
import moment from 'moment';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  Divider,
  Grid,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
  Paper,
  TextField,
  Typography,
  makeStyles,
} from '@material-ui/core';
import {
  EditAttributes as EditAttributesIcon,
  Create as CreateIcon,
  Cancel as DeclineIcon,
  CheckCircle as VerifyIcon,
} from '@material-ui/icons';
import clsx from 'clsx';

import apolloClient from '../../../utils/apolloClient';
import {
  approveEntity as canApproveEntity,
  requestOrgMembership as canRequestMembership,
  canEditOrganization,
  canUploadFiles,
  canDeleteFiles,
  canViewOrganization,
} from '../../../utils/can';
import { ASSIGN_ROLE, REMOVE_ROLE, VALIDATE_ORGANIZATION } from '../../../actions/organizationsMutations';
import { LEGAL_FORMS, isResidentsCommunity } from '../../../constants/legalStatusTypes';
import ListRecord from '../../utils/ListRecord';
import Widget from '../../utils/Widget';
import StatusBadge from '../../utils/StatusBadge';
import Tooltip from '../../utils/TooltipWrapper';
import MarkdownText from '../../utils/MarkdownText';
import UploadFile from '../.././../containers/smartcomponents/UploadFile/UploadFile';
import PageNotFound from '../.././../containers/pages/PageNotFound/PageNotFound';
import ApplyToOrganization from '../ApplyToOrganization/ApplyToOrganization';
import OrganizationLogo from '../OrganizationLogo';
import OrganizationMeetingsList from '../OrganizationMeetings/OrganizationMeetingsList/OrganizationMeetingsList';
import OrganizationEditor from '../OrganizationEditor/OrganizationEditor';
import AssetsList from '../../asset/AssetsList/AssetsList';
import ProjectsList from '../../project/ProjectsList/ProjectsList';
import RolesManager from '../../roles/RolesManager';
import styles from './styles';

const useStyles = makeStyles(styles);

function OrganizationView(props) {
  const {
    user,
    publicOrg,
    refetch,
  } = props;
  const { t } = useTranslation('translations');

  const classes = useStyles();

  if (!publicOrg.data) {
    return <PageNotFound />;
  }

  const isRC = isResidentsCommunity(publicOrg.data.legal_form);

  if (!canViewOrganization(user, publicOrg)) {
    return (
      <div className={classes.root}>
        <Grid container spacing={4}>
          <Grid item sm={6} xs={12}>
            <Summary {...props} hideLegalDetails={isRC} />
          </Grid>
          <Grid item sm={6} xs={12}>
            <Roles {...props} />
          </Grid>
        </Grid>
      </div>
    );
  }

  return (
    <div className={classes.root}>
      <Grid container spacing={4}>
        <Grid item sm={6} xs={12}>
          <Grid container direction="column" spacing={4}>
            <Grid item xs={12}>
              <Summary {...props} hideLegalDetails={isRC} />
            </Grid>
            <Grid item xs={12}>
              <Roles {...props} />
            </Grid>
          </Grid>
        </Grid>
        <Grid item sm={6} xs={12}>
          <Grid container direction="column" spacing={4}>
            {!isRC && (
              <Grid item xs={12}>
                <OrganizationMeetingsList
                  organization={{
                    name: publicOrg.data.name,
                    id: publicOrg._id
                  }}
                />
              </Grid>
            )}
            <Grid item xs={12}>
              <Widget
                title={isRC ? t('organizations.residentsProjects') : t('organizations.organizationProjects')}
                withDivider
                className={classes.projectsList}
              >
                <ProjectsList
                  params={{ owner: publicOrg._id, assetOwner: publicOrg._id, relatedOrganizationID: publicOrg._id }}
                  noResultsWarning={t('organizations.noProjects')}
                />
              </Widget>
            </Grid>
            <Grid item xs={12}>
              <Widget
                title={isRC ? t('organizations.residentsAssets') : t('organizations.organizationAssets')}
                withDivider
              >
                <AssetsList
                  filterParams={{ [isRC ? 'esco' : 'owner']: publicOrg._id }}
                  itemsPerPage={3}
                  noResultsWarning={t('organizations.noAssets')}
                />
              </Widget>
            </Grid>
            <Grid item xs={12}>
              <UploadFile
                entity={{
                  id: publicOrg._id,
                  attachments: Object.values(publicOrg._attachments || {}),
                  type: 'organization',
                }}
                alertText={t('translations:documents.unsupportedFileType')}
                canUpload={canUploadFiles(user, publicOrg)}
                canDelete={canDeleteFiles(user, publicOrg)}
                onSuccess={refetch}
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}

function Summary(props) {
  const {
    user,
    publicOrg,
    isDialogOpen,
    // eslint-disable-next-line id-length
    toggleEditOrganizationDialog,
    hideLegalDetails,
    refetch,
    addAlert,
  } = props;
  const { t } = useTranslation('translations');
  const classes = useStyles(styles);

  let details;
  if (hideLegalDetails) {
    details = [
      { key: t('organizations.legalForm'), value: t(`legalForms.${LEGAL_FORMS[publicOrg.data.legal_form]}`) },
    ];
  } else {
    details = [
      { key: t('organizations.email'), value: publicOrg.data.email },
      { key: t('organizations.phone'), value: publicOrg.data.telephone || 'N/A' },
      { key: t('organizations.website'), value: publicOrg.data.website },
      { key: t('organizations.legalForm'), value: t(`legalForms.${LEGAL_FORMS[publicOrg.data.legal_form]}`) },
      {
        key: t('organizations.registrationDate'),
        value: moment(publicOrg.data.registered).format('DD MMMM YYYY'),
      },
      { key: t('organizations.registrationNumber'), value: publicOrg.data.registration_number },
    ];
  }

  return (
    <React.Fragment>
      <Grid
        container
        direction="column"
        alignItems="center"
        className={classes.card}
        component={Paper}
      >
        <Grid item xs={12} className={classes.cardHeader}>
          <div className={classes.validationStatus}>
            <StatusBadge validationStatus={publicOrg.data.valid} />
            {canApproveEntity(user, publicOrg) && (
              <ValidationStatusMenu
                organization={publicOrg}
                refetch={refetch}
                onError={() => addAlert(t('errors.internal'), 'error')}
              />
            )}
          </div>
          {canEditOrganization(user, publicOrg) && !isResidentsCommunity(publicOrg.data.legal_form) && (
            <Tooltip title={t('organizations.editOrganization')}>
              <IconButton
                onClick={toggleEditOrganizationDialog}
              >
                <CreateIcon color="action" />
              </IconButton>
            </Tooltip>
          )}
        </Grid>
        <Grid item sm={12} xs={4} className={classes.logoWrapper}>
          <OrganizationLogo
            cover
            organization={publicOrg.data}
          />
        </Grid>
        <Grid item sm={12} xs={8} className={classes.titleWrapper}>
          <Typography variant="h5">
            {publicOrg.data.name}
          </Typography>
          {!hideLegalDetails && (
            <React.Fragment>
              <Typography className="address">
                {publicOrg.data.address}
              </Typography>
              <ListRecord
                items={[{ key: `${t('translations:organizations.vat')}:`, value: publicOrg.data.vat }]}
              />
            </React.Fragment>
          )}
        </Grid>
        <Divider className={classes.divider} />
        <Grid item xs={12} className={classes.contentWrapper}>
          <ListRecord items={details} />
        </Grid>
      </Grid>

      <OrganizationEditor
        open={isDialogOpen}
        handleClose={toggleEditOrganizationDialog}
        title={t('organizations.editOrganization')}
        data={publicOrg.data}
      />
    </React.Fragment>
  );
}

function Roles(props) {
  const {
    publicOrg,
    user,
    searchUsers,
    clearResults,
    foundUsers,
    refetch,
  } = props;

  const { t } = useTranslation('translations');

  if (!publicOrg?.data) {
    return null;
  }

  const roles = [];

  if (isResidentsCommunity(publicOrg.data.legal_form)) {
    roles.push(
      {
        title: t('organizations.lear'),
        assigned: [
          publicOrg.data.roles.lear && publicOrg.dependencies[publicOrg.data.roles.lear]?.data,
        ].filter((v) => Boolean(v)),
        locked: true,
        assignMutation: ASSIGN_ROLE,
        assignMutationVariables: { orgID: publicOrg._id, role: 'LEAR' },
      },
      {
        title: t('organizations.residents'),
        multiple: true,
        assigned: publicOrg.data.roles.members.map(userID => publicOrg.dependencies[userID].data),
        assignMutation: ASSIGN_ROLE,
        assignMutationVariables: { orgID: publicOrg._id, role: 'MEMBERS' },
        deleteMutation: REMOVE_ROLE,
        deleteMutationVariables: { orgID: publicOrg._id, role: 'MEMBERS' },
      },
    );
  } else {
    roles.push(
      {
        title: t('organizations.lear'),
        assigned: [
          publicOrg.data.roles.lear && publicOrg.dependencies[publicOrg.data.roles.lear]?.data,
        ].filter((v) => Boolean(v)),
        locked: true,
        assignMutation: ASSIGN_ROLE,
        assignMutationVariables: { orgID: publicOrg._id, role: 'LEAR' },
      },
      {
        title: t('organizations.lsigns'),
        multiple: true,
        assigned: publicOrg.data.roles.lsigns.map(userID => publicOrg.dependencies[userID].data),
        assignMutation: ASSIGN_ROLE,
        assignMutationVariables: { orgID: publicOrg._id, role: 'LSIGNS' },
        deleteMutation: REMOVE_ROLE,
        deleteMutationVariables: { orgID: publicOrg._id, role: 'LSIGNS' },
      },
      {
        title: t('organizations.leaas'),
        multiple: true,
        assigned: publicOrg.data.roles.leaas.map(userID => publicOrg.dependencies[userID].data),
        assignMutation: ASSIGN_ROLE,
        assignMutationVariables: { orgID: publicOrg._id, role: 'LEAAS' },
        deleteMutation: REMOVE_ROLE,
        deleteMutationVariables: { orgID: publicOrg._id, role: 'LEAAS' },
      },
      {
        title: t('organizations.members'),
        multiple: true,
        assigned: publicOrg.data.roles.members.map(userID => publicOrg.dependencies[userID].data),
        assignMutation: ASSIGN_ROLE,
        assignMutationVariables: { orgID: publicOrg._id, role: 'MEMBERS' },
        deleteMutation: REMOVE_ROLE,
        deleteMutationVariables: { orgID: publicOrg._id, role: 'MEMBERS' },
      },
    );
  }

  return (
    <RolesManager
      viewOnly={!canEditOrganization(user, publicOrg)}
      type="organization"
      title={t('organizations.organizationRoles')}
      titleButton={canRequestMembership(user, publicOrg) && (
        <ApplyToOrganization
          organization={publicOrg.data}
        />
      )}
      wihDivider
      withPadding
      roles={roles}
      searchUsers={searchUsers}
      clearResults={clearResults}
      foundUsers={foundUsers}
      refetch={refetch}
      tooltip={<MarkdownText text={t('tooltips:organizations.roles', { returnObjects: true })} />}
    />
  );
}

function ValidationStatusMenu(props) {
  const {
    organization,
    refetch,
    onError,
  } = props;
  const { t } = useTranslation('translations');
  const [anchorEl, setAnchorEl] = useState(null);
  const [statusDialog, setStatusDialog] = useState(null);
  const [validateOrganization] = useMutation(VALIDATE_ORGANIZATION, {
    client: apolloClient,
    onError: (err) => onError(err),
    onCompleted: () => refetch(),
    variables: { orgID: organization._id },
  });

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
          disabled={organization.data.valid === 2}
        >
          <ListItemIcon>
            <VerifyIcon fontSize="small" color="primary" />
          </ListItemIcon>
          <Typography variant="inherit">{t('adminActions.approve')}</Typography>
        </MenuItem>
        <MenuItem
          onClick={() => setStatusDialog('DECLINED')}
          disabled={organization.data.valid === 3}
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
          validateOrganization({ variables: { status: statusDialog, comment } });
        }}
      />
    </React.Fragment>
  );
}

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
  state => ({
    user: state.user,
  }),
)(OrganizationView);
