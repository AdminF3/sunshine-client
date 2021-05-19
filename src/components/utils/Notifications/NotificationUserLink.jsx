import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  Tooltip,
  makeStyles,
} from '@material-ui/core';

const useStyles = makeStyles({
  link: {
    display: 'inline-block',
  },
});

function NotificationUserLink(props) {
  const {
    notification: {
      userID,
      userKey,
    },
    disableLink,
  } = props;

  const { t } = useTranslation('translations');
  const classes = useStyles();

  if (disableLink) {
    return (
      <strong>
        {userKey}
      </strong>
    );
  }

  return (
    <Tooltip
      title={t('notifications.view.user')}
      placement="top"
    >
      <Link to={`/user/${userID}`} className={classes.link}>{userKey}</Link>
    </Tooltip>
  );
}

NotificationUserLink.propTypes = {
  notification: PropTypes.shape({
    userID: PropTypes.string.isRequired,
    userKey: PropTypes.string.isRequired,
  }).isRequired,
  withPrefix: PropTypes.bool,
  disableLink: PropTypes.bool,
};

NotificationUserLink.defaultProps = {
  disableLink: true,
};

export default NotificationUserLink;
