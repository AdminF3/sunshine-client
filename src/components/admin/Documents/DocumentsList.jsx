import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { useQuery, useMutation } from '@apollo/client';
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import InfiniteScroll from 'react-infinite-scroller';
import moment from 'moment';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  TextField,
  Tooltip,
  Typography,
  IconButton,
  CircularProgress,
  LinearProgress,
  makeStyles,
} from '@material-ui/core';
import {
  CheckCircleOutline as OKIcon,
  Search as OKViewIcon,
  NotInterested as DeclineIcon,
  ErrorOutline as InfoNavigateIcon,
} from '@material-ui/icons';

import apolloClient from '../../../utils/apolloClient';
import {
  NotificationUploadLink,
  NotificationTargetLink,
} from '../../utils/Notifications';
import { VALIDATE_ORGANIZATION, ASSIGN_ROLE, ACCEPT_LEAR_APPLICATION } from '../../../actions/organizationsMutations';
import { VALIDATE_ASSET } from '../../../actions/assetsMutations';
import {
  GET_NOTIFICATIONS_LISTING,
  SEE_NOTIFICATION,
} from '../../../actions/notificationsQueries';
import { getAllUsers as getAllUsersAction } from '../../../actions/users';
import { getAllOrganizations as getAllOrganizationsAction } from '../../../actions/organizations';
import { getAllAssets as getAllAssetsAction } from '../../../actions/assets';
import { addAlert } from '../../../actions/alerts';
import { parseAddress } from '../../asset/utils';
import { getDocumentsList } from './utils';
import { table as tableStyles } from './styles';

const perPage = 20;

const useStyles = makeStyles(tableStyles);

function DocumentsList(props) {
  const {
    users,
    assets,
    organizations,
    isFetching,
    seen,
    setError,
    setSuccess,
    country,
  } = props;
  const classes = useStyles();
  const { t } = useTranslation('translations');

  const {
    loading,
    data = { notificationListing: { edges: [], totalCount: 0, pageInfo: { hasNextPage: false } } },
    refetch,
    fetchMore,
  } = useQuery(
    GET_NOTIFICATIONS_LISTING,
    {
      client: apolloClient,
      variables: {
        first: perPage,
        action: ['UPLOAD', 'CLAIM_RESIDENCY', 'ACCEPT_LEAR_APPLICATION'],
        country,
        seen: Boolean(seen),
      },
    }
  );

  const documents = getDocumentsList(
    data.notificationListing.edges,
    { users, assets, organizations },
    { ignoreTargetTypes: ['project'] },
  );

  if (loading) {
    return (
      <div className={classes.contentWrapper}>
        <CircularProgress />
      </div>
    );
  }

  if (documents.length === 0) {
    return (
      <div className={classes.contentWrapper}>
        <Typography variant="h5">
          {t('documents.noDocuments')}
        </Typography>
      </div>
    );
  }

  return (
    <React.Fragment>
      {isFetching && (
        <div className={classes.loadingPlaceholder}>
          <CircularProgress />
        </div>
      )}

      <div className={classes.tableHeader}>
        <Grid container spacing={2}>
          <Grid item md={1}>
            <Typography variant="h6">Date</Typography>
          </Grid>
          <Grid item md={1}>
            <Typography variant="h6">{t('documents.action')}</Typography>
          </Grid>
          <Grid item md={2}>
            <Typography variant="h6">{t('documents.target')}</Typography>
          </Grid>
          <Grid item md={seen ? 3 : 2}>
            <Typography variant="h6">{t('documents.document')}</Typography>
          </Grid>
          <Grid item md={seen ? 3 : 2}>
            <Typography variant="h6">{t('documents.uploadedBy')}</Typography>
          </Grid>
          <Grid item md={1}>
            <Typography variant="h6">{t('meetings.comments')}</Typography>
          </Grid>
          <Grid item md={1}>
            <Typography variant="h6">{t('auth.country')}</Typography>
          </Grid>
          {!seen && (
            <Grid item md={2} align="center">
              <Typography variant="h6">{t('documents.actions')}</Typography>
            </Grid>
          )}
        </Grid>
      </div>
      <div className={classes.tableContent}>
        <InfiniteScroll
          pageStart={0}
          loadMore={() => {
            fetchMore({
              variables: {
                cursor: data.notificationListing.pageInfo.endCursor,
              },
              updateQuery: (previousResult, { fetchMoreResult }) => {
                const newEdges = fetchMoreResult.notificationListing.edges;
                const pageInfo = fetchMoreResult.notificationListing.pageInfo;

                if (!fetchMoreResult.notificationListing.edges) {
                  return previousResult;
                }

                return {
                  notificationListing: {
                    __typename: previousResult.notificationListing.__typename,
                    totalCount: previousResult.notificationListing.totalCount,
                    edges: [...previousResult.notificationListing.edges, ...newEdges],
                    pageInfo,
                  },
                };
              },
            });
          }}
          hasMore={data.notificationListing.pageInfo.hasNextPage}
          loader={<div key={0}><LinearProgress className={classes.loader} /></div>}
        >

          {documents.map((node, i) => {
            return (
              <div className={classes.tableRow} key={node.key}>
                <Grid container spacing={2} alignItems="center">
                  <Grid item md={1}>
                    <Typography variant="overline">{moment(node.date).format('DD-MM-YYYY HH:mm')}</Typography>
                  </Grid>
                  <Grid item md={1}>
                    <Typography variant="overline">{t(`notifications.${node.action}`)}</Typography>
                  </Grid>
                  <Grid item md={2} className={classes.sentencize}>
                    <NotificationTargetLink
                      notification={node}
                      target="_blank"
                      rel="noopener noreferrer"
                    />
                  </Grid>
                  <Grid item md={seen ? 3 : 2}>
                    <Grid container direction="column" spacing={0}>
                      {node.documents.map((d, j) => (
                        <NotificationUploadLink
                          key={j}
                          notification={{
                            targetType: node.targetType,
                            targetID: node.targetID,
                            new: d.name,
                            url: d.url
                          }}
                        />
                      ))}
                    </Grid>
                  </Grid>
                  <Grid item md={seen ? 3 : 2}>
                    <Tooltip title="View user" placement="top">
                      <Link
                        to={`/user/${node.userID}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {node.userKey}
                      </Link>
                    </Tooltip>
                  </Grid>
                  <Grid item md={1}>
                    <Typography variant="overline">{node.comment}</Typography>
                  </Grid>
                  <Grid item md={1}>
                    <Typography variant="overline">{node.country}</Typography>
                  </Grid>
                  {!seen && (
                    <Grid item md={2} align="center" className={classes.actionButtons}>
                      <Actions
                        node={node}
                        onError={setError}
                        onSuccess={setSuccess}
                        refetch={refetch}
                      />
                    </Grid>
                  )}
                </Grid>
              </div>
            );
          })}
        </InfiniteScroll>
      </div>
    </React.Fragment>
  );
}

function Actions(props) {
  const {
    node,
    onError,
    onSuccess,
    refetch,
  } = props;
  const classes = useStyles();
  const { t } = useTranslation('translations');
  const h = useHistory();

  const [validateOrganization, validateOrgState] = useMutation(VALIDATE_ORGANIZATION, {
    client: apolloClient,
    onError: (err) => onError(err),
  });

  const [validateAsset, validateAssetState] = useMutation(VALIDATE_ASSET, {
    client: apolloClient,
    onError: (err) => onError(err),
  });

  const [acknowledgeNotification, acknowledgeState] = useMutation(SEE_NOTIFICATION, {
    client: apolloClient,
    onError: (err) => onError(err),
  });

  const [assignRole] = useMutation(ASSIGN_ROLE, {
    client: apolloClient,
    onError: (err) => onError(err),
  });

  const [acceptLEARApplication] = useMutation(ACCEPT_LEAR_APPLICATION, {
    client: apolloClient,
    onError: (err) => addAlert(err.message, 'error'),
    onCompleted: () => addAlert(t('notifications.requestAcceptedSentToAdmin'), 'success'),
  });

  const ack = (comment) => Promise.all(
    node.documents.map(({ notificationID }) => acknowledgeNotification(
      { variables: { notificationID, comment } }
    ))
  ).then(refetch);

  const acknowledgeAndNavigate = () => {
    ack().then(() => h.push(`/${node.targetType}/${node.targetID}`));
  };
  const acknowledgeAndValidate = (validationStatus, comment) => {
    if (node.targetType === 'organization') {
      return validateOrganization({ variables: { orgID: node.targetID, status: validationStatus, comment } })
        .then(ack);
    }
    if (node.targetType === 'asset') {
      return validateAsset({ variables: { assetID: node.targetID, status: validationStatus, comment } })
        .then(ack);
    }
    return Promise.reject(new Error('invalid targetType'));
  };
  const acknowledgeAndSetRole = (orgID, role) => {
    assignRole({
      variables: { orgID, userID: node.userID, role },
    })
      .then(
        () => onSuccess(t(`documents.setRole_${role}_success`, { user: node.userKey, entity: node.targetKey })),
        (err) => { throw err; },
      )
      .then(ack)
      .catch(err => onError(
        t(`documents.setRole_${role}_error`, { user: node.userKey, entity: node.targetKey, err: err.message }))
      );
  };

  const loading = validateAssetState.loading || validateOrgState.loading || acknowledgeState.loading;

  if (node.action === 'accept_lear_application') {
    return (
      <React.Fragment>
        <Tooltip
          title={t('documents.approve_lear_apply', { user: node.userKey, entity: node.targetKey })}
          placement="top"
        >
          <IconButton
            size="small"
            onClick={() => acknowledgeAndSetRole(node.targetID, 'LEAR')}
            className={classes.buttonApprove}
          >
            <OKIcon />
          </IconButton>
        </Tooltip>
        <DeclineButton
          node={node}
          disabled={loading}
          title={t('documents.decline_lear_apply')}
          decline={(cmnt) => acceptLEARApplication({
            variables: {
              userID: node.userID,
              organizationID: node.targetID,
              comment: cmnt,
              filename: node.documents[0].name,
              approved: false
            }
          }).then(() => ack())}
        />
      </React.Fragment>
    );
  }

  if (node.action === 'claim_residency') {
    const targedKeyJSON = parseAssetTargetKey(node.targetKey);
    if (!targedKeyJSON.communityOrganizationID) {
      return (
        <Tooltip
          title={t('documents.assetNoCommunityOrganization', { name: targedKeyJSON.address })}
          placement="top"
        >
          <IconButton
            size="small"
            disabled={loading}
            onClick={acknowledgeAndNavigate}
            className={classes.buttonWarning}
          >
            <InfoNavigateIcon />
          </IconButton>
        </Tooltip>
      );
    }
    return (
      <React.Fragment>
        <Tooltip
          title={t(`documents.approve_${node.action}`, { user: node.userKey, entity: targedKeyJSON.address })}
          placement="top"
        >
          <IconButton
            size="small"
            onClick={() => acknowledgeAndSetRole(targedKeyJSON.communityOrganizationID, 'MEMBERS')}
            className={classes.buttonApprove}
          >
            <OKIcon />
          </IconButton>
        </Tooltip>
        <Tooltip
          title={t(`documents.decline_${node.action}`, { user: node.userKey, entity: targedKeyJSON.address })}
          placement="top"
        >
          <IconButton
            size="small"
            onClick={ack}
            className={classes.buttonDecline}
          >
            <DeclineIcon />
          </IconButton>
        </Tooltip>
      </React.Fragment>
    );
  }

  if (node.targetType === 'organization' || node.targetType === 'asset') {
    return (
      <React.Fragment>
        <Tooltip
          title={t('documents.approveEntityAndAcknowledge', { entity: t(`notifications.single.${node.targetType}`) })}
          placement="top"
        >
          <IconButton
            size="small"
            disabled={loading}
            onClick={() => acknowledgeAndValidate('VALID')}
            className={classes.buttonApprove}
          >
            <OKIcon />
          </IconButton>
        </Tooltip>

        <DeclineButton
          node={node}
          disabled={loading}
          decline={reason => acknowledgeAndValidate('DECLINED', reason)}
          title={t('documents.declineEntityAndAcknowledge', { entity: t(`notifications.single.${node.targetType}`) })}
        />
      </React.Fragment>
    );
  }

  return (
    <Tooltip
      title={t('documents.viewEntityAndAcknowledge', { entity: t(`notifications.single.${node.targetType}`) })}
      placement="top"
    >
      <IconButton
        size="small"
        onClick={acknowledgeAndNavigate}
      >
        <OKViewIcon />
      </IconButton>
    </Tooltip>
  );
}

function parseAssetTargetKey(targetKey) {
  try {
    const targetKeyJSON = JSON.parse(targetKey);
    if (targetKeyJSON.address) {
      return {
        address: parseAddress(targetKeyJSON.address),
        communityOrganizationID: targetKeyJSON.communityOrganizationID,
      };
    }
    return {
      address: parseAddress(targetKey),
      communityOrganizationID: null,
    };
  } catch {
    return { address: parseAddress(targetKey), communityOrganizationID: null };
  }
}

function DeclineButton(props) {
  const {
    disabled,
    node,
    decline,
    title
  } = props;

  const { t } = useTranslation('translations');
  const classes = useStyles();
  const [isDialogOpen, setDialogOpen] = useState(false);
  const toggleDialog = () => setDialogOpen(!isDialogOpen);

  const inputRef = useRef();

  return (
    <React.Fragment>
      <Tooltip
        title={title}
        placement="top"
      >
        <IconButton
          size="small"
          disabled={disabled}
          onClick={toggleDialog}
          className={classes.buttonDecline}
        >
          <DeclineIcon />
        </IconButton>
      </Tooltip>

      <Dialog
        open={isDialogOpen}
        onClose={toggleDialog}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>{t('adminActions.decline')}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {t('documents.declineReason', { entity: node.targetType })}
          </DialogContentText>
          <TextField
            autoFocus
            variant="outlined"
            label="Rejection reason"
            multiline
            fullWidth
            inputProps={{ ref: inputRef }}
          />
        </DialogContent>
        <DialogActions >
          <Button
            disabled={disabled}
            onClick={toggleDialog}
            color="primary"
            variant="outlined"
          >
            {t('utils.confirmDialogCancel')}
          </Button>
          <Button
            disabled={disabled}
            onClick={() => decline(inputRef.current.value)}
            color="primary"
            variant="contained"
          >
            {t('adminActions.decline')}
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}

export default connect(
  state => ({
    users: state.users.users.documents,
    assets: state.asset.allAssets,
    organizations: state.organization.allOrganizations,
    isFetching: state.organization.isFetchingList || state.users.isUsersFetching || state.asset.isFetchingList,
  }),
  dispatch => ({
    setError: (err) => dispatch(addAlert({ text: err.message, level: 'error' })),
    setSuccess: (msg) => dispatch(addAlert({ text: msg, level: 'success' })),
    getAllUsers: (offset = 0, limit = 1000) => dispatch(getAllUsersAction(offset, limit)),
    getAllOrganizations: (offset = 0, limit = 1000) => dispatch(getAllOrganizationsAction(offset, limit)),
    getAllAssets: (offset = 0, limit = 1000) => dispatch(getAllAssetsAction(offset, limit)),
  })
)(DocumentsList);
