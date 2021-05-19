import React from 'react';
import { connect } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Typography, makeStyles } from '@material-ui/core';
import { CommentRounded as CommentIcon } from '@material-ui/icons';

import diff from '../../../utils/diff';
import { SERVER as backendURL } from '../../../constants/endpoints';
import TextWithIcon from '../../utils/TextWithIcon';
import NotificationUploadLink from './NotificationUploadLink';
import NotificationTargetLink from './NotificationTargetLink';
import NotificationUserLink from './NotificationUserLink';

const useStyles = makeStyles({
  sentencize: {
    '&:first-letter': {
      textTransform: 'uppercase',
    },
  },
  plainList: {
    padding: 0,
    listStyle: 'none',
  },
  gdprElement: {
    marginBottom: 10
  },
});

// eslint-disable-next-line complexity
function NotificationTitle(props) {
  const {
    notification,
    currentUser: {
      isAuthenticated,
    },
  } = props;

  switch (notification.action) {
    case 'upload':
      return <UploadTitle notification={notification} currentUserID={isAuthenticated} />;
    case 'create':
      return <CreateTitle notification={notification} />;
    case 'assign':
    case 'remove':
      return <AssignTitle notification={notification} currentUserID={isAuthenticated} />;
    case 'update':
      return <UpdateTitle notification={notification} />;
    case 'request_membership':
      return <RequestMembershipTitle notification={notification} />;
    case 'request_project_creation':
      return <RequestProjectCreationTitle notification={notification} />;
    case 'gdpr':
      return <GDPRTitle notification={notification} />;
    case 'lear_apply':
      return <LEARApplyTitle notification={notification} />;
    case 'claim_residency':
      return <ClaimResidencyTitle notification={notification} />;
    case 'reject_lear_application':
      return <RejectLEARTitle notification={notification} />;
    case 'accept_lear_application':
      return <AcceptLEARTitle notification={notification} />;
    case 'forfaiting_application':
      return <FATitle notification={notification} />;
    case 'approve_forfaiting_application':
      return <ApproveFATitle notification={notification} />;
    case 'approve_forfaiting_payment':
      return <ApproveFPTitle notification={notification} />;
    default:
      return (
        <Typography variant="body1">
          {notification.new} in {notification.targetType} <NotificationTargetLink notification={notification} />
        </Typography>
      );
  }
}

function UploadTitle(props) {
  const {
    currentUserID,
    notification,
  } = props;

  const {
    userID,
    targetID,
  } = notification;

  const { t } = useTranslation('translations');

  if (userID === currentUserID) {
    return (
      <Typography variant="body1">
        {t('notifications.youHaveUploaded')} <NotificationUploadLink notification={notification} />&nbsp;
        {t('notifications.to')}&nbsp;
        {targetID === currentUserID ? t('notifications.yourProfile') : <NotificationTargetLink notification={notification} />} {/* eslint-disable-line max-len */}
      </Typography>
    );
  }
  return (
    <Typography variant="body1">
      {t('notifications.file')} <NotificationUploadLink notification={notification} />&nbsp;
      {t('notifications.uploadedIn')} <NotificationTargetLink notification={notification} />
    </Typography>
  );
}

function CreateTitle(props) {
  const { notification } = props;

  const classes = useStyles();

  const { t } = useTranslation('translations');

  return (
    <Typography variant="body1" className={classes.sentencize}>
      <NotificationTargetLink notification={notification} /> {t('notifications.hasBeenCreated')}&nbsp;
      {t('notifications.by')} <NotificationUserLink notification={notification} /> {t('notifications.awaitsApproval')}
    </Typography>
  );
}

const platformRolesTitles = {
  pd: 'platformRoles.portfolio_director',
  dpo: 'platformRoles.data_protection_officer',
  fm: 'platformRoles.fund_manager',
  investor: 'platformRoles.investor',
  admin_network_manager: 'platformRoles.admin_network_manager',
};
const platformRoles = Object.keys(platformRolesTitles);

function AssignTitle(props) {
  const {
    currentUserID,
    notification,
  } = props;

  const {
    userID,
    userKey,
    action,
    targetID,
    targetKey,
    country,
  } = notification;

  let youAssignedAsKey = 'notifications.youAssignedAs';
  let assignedAsKey = 'notifications.assignedAs';
  const role = notification.new?.toUpperCase();
  if (action === 'remove') {
    youAssignedAsKey = 'notifications.youRemovedAs';
    assignedAsKey = 'notifications.removedAs';
  }

  const { t } = useTranslation('translations');

  if (platformRoles.indexOf(notification.new) > -1) {
    return (
      <AssignTitle
        currentUserID={currentUserID}
        notification={{
          userID: targetID,
          userKey: targetKey,
          targetID: country,
          targetType: 'plartformRole',
          targetKey: country,
          new: t(platformRolesTitles[notification.new]),
          action,
          country,
        }}
      />
    );
  }

  if (userID === currentUserID) {
    return (
      <Typography variant="body1">
        {t(youAssignedAsKey)} <strong>{role}</strong>&nbsp;
        {notification.targetKey && t('notifications.in')} <NotificationTargetLink notification={notification} />
      </Typography>
    );
  }

  return (
    <Typography variant="body1">
      <Link to={`/user/${userID}`}>{userKey}</Link>&nbsp;
      {t(assignedAsKey)} <strong>{role}</strong>&nbsp;
      {t('notifications.in')} <NotificationTargetLink notification={notification} />
    </Typography>
  );
}

function UpdateTitle(props) {
  const {
    notification,
  } = props;

  const classes = useStyles();

  const { t } = useTranslation('translations');

  let infoText;
  switch (notification.new) {
    case 'valid':
      infoText = t('notifications.hasBeenApproved');
      break;
    case 'declined':
      infoText = t('notifications.hasBeenRejected');
      break;
    default:
      try {
        const o = JSON.parse(notification.old);
        const n = JSON.parse(notification.new);
        const d = diff(o, n, ['valid']);
        const fields = Object.keys(d);

        infoText = t('notifications.fieldsUpdated', { fields: '`' + fields.join('`, `') + '`', count: fields.length });

      } catch (err) {
        infoText = t('notifications.hasBeenUpdated');
      }
  }

  return (
    <React.Fragment>
      <Typography variant="body1" className={classes.sentencize}>
        <NotificationTargetLink notification={notification} /> {infoText}
      </Typography>
      {notification.comment && (
        <TextWithIcon
          icon={<CommentIcon fontSize="small" color="disabled" />}
          variant="caption"
          className={classes.sentencize}
        >
          {notification.comment}
        </TextWithIcon>
      )}
    </React.Fragment>
  );
}

function RequestMembershipTitle(props) {
  const {
    notification,
  } = props;

  const { t } = useTranslation('translations');

  return (
    <Typography variant="body1">
      <NotificationUserLink notification={notification} /> {t('notifications.requestedMembership')}&nbsp;
      {t('notifications.with')} <NotificationTargetLink notification={notification} />
    </Typography>
  );
}

function GDPRTitle(props) {
  const {
    notification,
  } = props;
  const classes = useStyles();
  const { t } = useTranslation('translations');
  const gdpr = JSON.parse(notification.new);

  return (
    <React.Fragment>
      <Typography className={classes.gdprElement}>
        {`${t('notifications.gdprRequest')}
          ${t(`notifications.${gdpr.GDPRRequest?.action}`)}
          ${t('notifications.informationFor')}
          ${gdpr.GDPRRequest?.name},
          ${gdpr.GDPRRequest?.email},
          ${gdpr.GDPRRequest?.address},
          ${gdpr.GDPRRequest?.phone}`}
      </Typography>
      <Typography className={classes.gdprElement}>
        {`${t('notifications.requestedBy')}
          ${gdpr.GDPRRequest?.requester_name},
          ${gdpr.GDPRRequest?.requester_email},
          ${gdpr.GDPRRequest?.requester_address},
          ${gdpr.GDPRRequest?.requester_phone}`}
      </Typography>
      <Typography className={classes.gdprElement}>
        {`${t('notifications.gdprReason')} ${gdpr.GDPRRequest?.reason}`}
      </Typography>
      <Typography className={classes.gdprElement}>
        {`${t('notifications.informationType')} ${gdpr.GDPRRequest?.information}`}
      </Typography>
      <Typography style={{ display: 'grid' }}>
        {`${t('notifications.relatedDocuments')} `}
        {Object.values(gdpr.Attachments || {})?.map(f => (
          <Typography
            key={f.ID}
            component="a"
            href={`${backendURL}/gdpr/${gdpr.GDPRRequest.ID}/${f.name}`}
            taget="_blank"
            rel="noopener noreferrer"
          >
            {f.name}
          </Typography>
        ))}
      </Typography>
    </React.Fragment>
  );
}

function LEARApplyTitle(props) {
  const {
    notification,
  } = props;

  const { t } = useTranslation('translations');

  return (
    <div>
      <Typography variant="body1">
        <NotificationUserLink notification={notification} /> {t('notifications.learApply')}&nbsp;
        {t('notifications.in')} <NotificationTargetLink notification={notification} />
      </Typography>
      <Typography variant="body1">
        {t('notifications.file')}&nbsp;
        <a
          href={`${backendURL}/user/${notification.userID}/${notification.new}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          {notification.new}
        </a>
      </Typography>
    </div>
  );
}

// eslint-disable-next-line id-length
function RequestProjectCreationTitle(props) {
  const {
    notification,
  } = props;

  const { t } = useTranslation('translations');

  return (
    <Typography variant="body1">
      <NotificationUserLink notification={notification} />&nbsp;
      {t(`notifications.projectCreationRequest_${notification.new}`)}&nbsp;
      <NotificationTargetLink notification={notification} />
    </Typography>
  );
}

function ClaimResidencyTitle(props) {
  const {
    notification,
  } = props;

  const classes = useStyles();
  const { t } = useTranslation('translations');

  return (
    <div>
      <Typography variant="body1">
        <NotificationUserLink notification={notification} />&nbsp;
        {t('notifications.userHasClaimedResidency')}&nbsp;
        <NotificationTargetLink notification={notification} />
      </Typography>
      <React.Fragment>
        <Typography variant="body1" component="div">
          {t('notifications.file', { count: notification.documents.length })}:
          <ul className={classes.plainList}>
            {notification.documents.map(d => (
              <li key={d.notificationID}>
                <a
                  href={`${backendURL}/user/${notification.userID}/${d.url}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {d.name}
                </a>
              </li>
            ))}
          </ul>
        </Typography>
      </React.Fragment>
    </div>
  );
}

function RejectLEARTitle(props) {
  const {
    notification,
  } = props;

  const { t } = useTranslation('translations');
  return (
    <div>
      <Typography display="inline">
        {t('notifications.learApplicationRejected')}
      </Typography>&nbsp;
      <NotificationTargetLink notification={notification} withPrefix={false} style={{ display: 'inline' }} />&nbsp;
      <Typography display="inline">{t('notifications.hasBeenRejected')}</Typography>
      <Typography>
        {t('notifications.reason')}: {notification.new}
      </Typography>
    </div>
  );
}

function FATitle(props) {
  const {
    notification,
  } = props;

  const { t } = useTranslation('translations');
  return (
    <Typography variant="body1">
      <NotificationTargetLink notification={notification} />&nbsp;
      {t('notifications.projectAppliedForForfaiting', { country: notification.country })}
    </Typography>
  );
}

function AcceptLEARTitle(props) {
  const {
    notification,
  } = props;
  const { t } = useTranslation('translations');
  return (
    <div>
      <NotificationUserLink notification={notification} />&nbsp;
      <Typography display="inline" style={{ textTransform: 'lowercase' }}>
        {t('notifications.accept_lear_application')}
      </Typography>&nbsp;
      <Typography display="inline">
        {t('notifications.in')}
      </Typography>&nbsp;
      <NotificationTargetLink notification={notification} withPrefix={false} style={{ display: 'inline' }} />&nbsp;
      <Typography display="inline">{t('notifications.hasBeenApproved')}</Typography>
    </div>
  );
}

function ApproveFATitle(props) {
  const {
    notification,
  } = props;

  const { t } = useTranslation('translations');

  return (
    <div>
      <NotificationTargetLink notification={notification} />
      <Typography>{t('notifications.approvedForForfaiting')}</Typography>
    </div>
  );
}

function ApproveFPTitle(props) {
  const {
    notification,
  } = props;

  const { t } = useTranslation('translations');

  return (
    <div>
      <NotificationTargetLink notification={notification} />
      <Typography>{t('notifications.approvedForPayment')}</Typography>
    </div>
  );
}

export default connect(
  state => ({
    currentUser: state.user,
  }),
)(NotificationTitle);
