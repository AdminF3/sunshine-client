import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';
import InfiniteScroll from 'react-infinite-scroller';
import {
  Typography,
  Button,
  IconButton,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Tooltip,
  Avatar,
  CircularProgress,
  LinearProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  makeStyles,
} from '@material-ui/core';
import {
  FileCopy as FileCopyIcon,
  AttachFile as AttachFileIcon,
  HowToReg as HowToRegIcon,
  Person as PersonIcon,
  Business as BusinessIcon,
  Assignment as AssignmentIcon,
  Done as DoneIcon,
  Accessibility as RequestProjectCreationIcon,
  Home as ClaimResidencyIcon,
  Block as RejectIcon,
  CheckCircleOutline as OKIcon,
  NotInterested as DeclineIcon,
  ErrorOutline as InfoNavigateIcon,
  Block as UnassignedIcon,
  PostAdd as FAIcon,
} from '@material-ui/icons';

import apolloClient from '../../../utils/apolloClient';
import { hasCountryRole } from '../../../utils/userRoles';
import {
  GET_NOTIFICATIONS_LISTING,
  SEE_NOTIFICATION,
} from '../../../actions/notificationsQueries';
import { PROCESS_PROJECT_CREATION } from '../../../actions/projectsMutations';
import { ASSIGN_ROLE, ACCEPT_LEAR_APPLICATION } from '../../../actions/organizationsMutations';
import { addAlert as alertAction } from '../../../actions/alerts';
import NotificationTitle from './NotificationTitle';
import { groupNotifications, parseAssetTargetKey } from './utils';
import styles from './styles';

import NotificationDateTime from './NotificationDateTime';

const useStyles = makeStyles(styles);

function NotificationsList(props) {
  const {
    user,
    seen,
    action,
    pollInterval,
    perPage,
    useWindowScroll,
    onUpdateTotalCount,
    addAlert,
  } = props;

  const classes = useStyles();
  const { t } = useTranslation('translations');

  const [totalCount, setTotalCount] = useState(0);
  const [initialized, setInitialized] = useState(false);
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
        seen,
        action,
      },
      pollInterval,
      onCompleted: (u) => {
        onUpdateTotalCount(u.notificationListing.totalCount);
        setInitialized(true);
      },
    },
  );

  if (totalCount !== data.notificationListing.totalCount && !loading) {
    setTotalCount(data.notificationListing.totalCount);
  }

  if (!initialized) {
    return (
      <div className={classes.contentWrapper}>
        <CircularProgress />
      </div>
    );
  }

  if (totalCount === 0) {
    return (
      <div className={classes.contentWrapper}>
        <Typography variant="subtitle2">
          {t('notifications.noItems')}
        </Typography>
      </div>
    );
  }

  const notifications = groupNotifications(data.notificationListing.edges);

  return (
    <InfiniteScroll
      pageStart={0}
      useWindow={useWindowScroll}
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
      <List dense className={classes.list}>
        {notifications.map((n, i) => (
          <NotificationListItem
            key={i}
            notification={n}
            user={user}
            refetch={refetch}
            addAlert={addAlert}
            onUpdateTotalCount={onUpdateTotalCount}
          />
        ))}
      </List>
    </InfiniteScroll>
  );

}

NotificationsList.defaultProps = {
  perPage: 20,
  action: [
    'CREATE',
    'UPDATE',
    'UPLOAD',
    'ASSIGN',
    'REMOVE',
    'REJECT',
    'GDPR',
    'REQUEST_MEMBERSHIP',
    'LEAR_APPLY',
    'REQUEST_PROJECT_CREATION',
    'CLAIM_RESIDENCY',
    'REJECT_LEAR_APPLICATION',
    'ACCEPT_LEAR_APPLICATION',
    'FORFAITING_APPLICATION',
    'APPROVE_FORFAITING_APPLICATION',
    'APPROVE_FORFAITING_PAYMENT',
  ],
  useWindowScroll: false,
  onUpdateTotalCount: () => { },
};

NotificationsList.propTypes = {
  perPage: PropTypes.number.isRequired,
  action: PropTypes.array.isRequired,
  seen: PropTypes.bool,
  pollInterval: PropTypes.number,
  useWindowScroll: PropTypes.bool.isRequired,
  onUpdateTotalCount: PropTypes.func.isRequired,
};

const typesIcons = {
  upload: <FileCopyIcon />,
  assign: <HowToRegIcon />,
  remove: <UnassignedIcon />,
  user: <PersonIcon />,
  request_project_creation: <RequestProjectCreationIcon />,
  claim_residency: <ClaimResidencyIcon />,
  organization: <BusinessIcon />,
  forfaiting_application: <FAIcon />,
};

function NotificationListItem(props) {
  const { notification, user, refetch, addAlert, onUpdateTotalCount } = props;

  return (
    <ListItem>
      <ListItemAvatar>
        <Avatar>
          {typesIcons[notification.action] || typesIcons[notification.targetType] || <AttachFileIcon />}
        </Avatar>
      </ListItemAvatar>
      <ListItemText
        secondaryTypographyProps={{ component: 'div' }}
        primary={
          <React.Fragment>
            <NotificationTitle notification={notification} />
            <NotificationDateTime notification={notification} />
          </React.Fragment>
        }
        secondary={
          <NotificationActionButtons
            notification={notification}
            user={user}
            refetch={refetch}
            addAlert={addAlert}
            onUpdateTotalCount={onUpdateTotalCount}
          />
        }
      />
    </ListItem>
  );
}

NotificationListItem.propTypes = {
  notification: PropTypes.shape({
    ID: PropTypes.string.isRequired,
    action: PropTypes.string.isRequired,
    new: PropTypes.string.isRequired,
    old: PropTypes.string,
    targetID: PropTypes.string.isRequired, // eg. organization
    targetKey: PropTypes.string.isRequired, // eg. Organization Foo
    targetType: PropTypes.string.isRequired, // eg. organization
    userID: PropTypes.string.isRequired,
    userKey: PropTypes.string.isRequired,
  }).isRequired,
};

function NotificationActionButtons(props) {
  const { notification, user, refetch, addAlert, onUpdateTotalCount } = props;
  const { t } = useTranslation('translations');
  const classes = useStyles();

  const h = useHistory();
  const [seeNotification] = useMutation(SEE_NOTIFICATION, {
    client: apolloClient,
    onError: (err) => addAlert(err.message, 'error'),
  });

  const [processProjectCreation] = useMutation(PROCESS_PROJECT_CREATION, {
    client: apolloClient,
    onError: (err) => addAlert(err.message, 'error'),
    onCompleted: () => addAlert(t('notifications.projectCreationUpdated'), 'success'),
  });

  const [acceptLEARApplication] = useMutation(ACCEPT_LEAR_APPLICATION, {
    client: apolloClient,
    onError: (err) => addAlert(err.message, 'error'),
    onCompleted: () => addAlert(t('notifications.requestAcceptedSentToAdmin'), 'success'),
  });

  const [assignRole] = useMutation(ASSIGN_ROLE, {
    client: apolloClient,
    onError: (err) => addAlert(err.message, 'error'),
  });

  const ack = () => Promise.all((notification.documents || [{ notificationID: notification.ID }]).map(
    ({ notificationID }) => seeNotification({ variables: { notificationID } }))
  ).then(refetch).then(({ data: { notificationListing: { totalCount } } }) => onUpdateTotalCount(totalCount));
  const acknowledgeAndNavigate = () => {
    ack().then(() => h.push(`/${notification.targetType}/${notification.targetID}`));
  };
  const acknowledgeAndSetRole = (orgID, role) => {
    assignRole({
      variables: { orgID, userID: notification.userID, role },
    })
      .then(
        () => addAlert(t(`documents.setRole_${role}_success`, {
          user: notification.userKey,
          entity: parseAssetTargetKey(notification.targetKey).address,
        }), 'success'),
        (err) => { throw err; },
      )
      .then(ack)
      .catch(err => addAlert(
        t(`documents.setRole_${role}_error`, {
          user: notification.userKey,
          entity: parseAssetTargetKey(notification.targetKey).address, err: err.message,
        }), 'error')
      );
  };

  if (notification.seen) {
    return null;
  }

  if (notification.action === 'claim_residency') {
    const targedKeyJSON = parseAssetTargetKey(notification.targetKey);
    if (!targedKeyJSON.communityOrganizationID) {
      return (
        <div className={classes.iconButtons}>
          <Tooltip
            title={t('documents.assetNoCommunityOrganization', { name: targedKeyJSON.address })}
            placement="top"
            className={classes.iconButtons}
          >
            <IconButton
              size="small"
              onClick={acknowledgeAndNavigate}
              className={classes.buttonWarning}
            >
              <InfoNavigateIcon />
            </IconButton>
          </Tooltip>
        </div>
      );
    }
    return (
      <div className={classes.iconButtons}>
        <Tooltip
          title={t(`documents.approve_${notification.action}`, {
            user: notification.userKey,
            entity: targedKeyJSON.address,
          })}
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
          title={t(`documents.decline_${notification.action}`, {
            user: notification.userKey,
            entity: targedKeyJSON.address,
          })}
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
      </div>
    );
  }

  const buttons = [];
  if (!notification.seen) {
    if (notification.action === 'lear_apply') {
      buttons.push(
        <React.Fragment>
          <Button
            variant="outlined"
            color="primary"
            startIcon={<DoneIcon />}
            onClick={() => acceptLEARApplication({
              variables: {
                userID: notification.userID,
                organizationID: notification.targetID,
                comment: '',
                filename: notification.new,
                approved: true
              }
            }).then(() => ack())}
          >
            {t('notifications.approveProjectCreate')}
          </Button>
          <NotificationActionDialog
            handleAction={(cmnt) => acceptLEARApplication({
              variables: {
                userID: notification.userID,
                organizationID: notification.targetID,
                comment: cmnt,
                filename: notification.new,
                approved: false
              }
            }).then(() => ack())}
          />
        </React.Fragment>
      );
    } else if (notification.action !== 'request_project_creation' || ['accepted', 'rejected'].indexOf(notification.new) > -1) {
      buttons.push(
        <Button
          variant="text"
          color="inherit"
          startIcon={<DoneIcon />}
          onClick={ack}
        >
          {t('notifications.markAsRead')}
        </Button>
      );
    } else {
      buttons.push(
        <React.Fragment>
          <Button
            variant="outlined"
            color="primary"
            startIcon={<DoneIcon />}
            onClick={() => processProjectCreation({
              variables: {
                userID: notification.userID,
                assetID: notification.targetID,
                approve: true,
              }
            }).then(() => ack())}
          >
            {t('notifications.approveProjectCreate')}
          </Button>
          <Button
            variant="outlined"
            color="default"
            startIcon={<RejectIcon />}
            onClick={() => processProjectCreation({
              variables: {
                userID: notification.userID,
                assetID: notification.targetID,
                approve: false,
              }
            }).then(() => ack())}
          >
            {t('notifications.rejectProjectCreate')}
          </Button>
        </React.Fragment>
      );
    }
  }

  if (
    !notification.seen &&
    ['upload', 'lear_apply', 'accept_lear_application'].indexOf(notification.action) > -1 &&
    hasCountryRole(user.profileInfo.data, { role: 'country_admin' }) &&
    notification.targetType !== 'project'
  ) {
    buttons.push(
      <Button
        variant="text"
        color="inherit"
        startIcon={<AssignmentIcon />}
        component={Link}
        to="/admin/documents"
      >
        {t('notifications.view.documents')}
      </Button>
    );
  }

  return (
    <Typography component="span" display="block" align="left" className="actions">
      {buttons.map((b, i) => <React.Fragment key={i}>{b}</React.Fragment>)}
    </Typography>
  );
}

function NotificationActionDialog(props) {
  const { handleAction } = props;
  const { t } = useTranslation('translations');

  const [isOpen, setIsOpen] = React.useState(false);

  const commentRef = useRef();

  const handleOpenClose = () => {
    setIsOpen(!isOpen);
  };

  return (
    <React.Fragment>
      <Button
        variant="outlined"
        color="default"
        startIcon={<RejectIcon />}
        onClick={handleOpenClose}
      >
        {t('notifications.rejectProjectCreate')}
      </Button>
      <Dialog
        open={isOpen}
        onClose={handleOpenClose}
      >
        <DialogTitle>{t('notifications.leaveCommentRejection')}</DialogTitle>
        <DialogContent>
          <TextField
            multiline
            fullWidth
            inputProps={{ ref: commentRef }}
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleOpenClose}
            color="primary"
          >
            {t('utils.confirmDialogClose')}
          </Button>
          <Button
            onClick={() => handleAction(commentRef.current.value).then(handleOpenClose)}
            color="primary"
            autoFocus
            disabled={commentRef.current?.value.length < 5}
          >
            {t('notifications.rejectProjectCreate')}
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}

export default connect(
  state => ({
    user: state.user,
  }),
  dispatch => ({
    addAlert: (text, level) => dispatch(alertAction({ text, level })),
  })
)(NotificationsList);
