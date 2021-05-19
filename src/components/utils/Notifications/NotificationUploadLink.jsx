import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import {
  Tooltip,
  makeStyles,
} from '@material-ui/core';

import { SERVER as backendURL} from '../../../constants/endpoints';

const useStyles = makeStyles({
  link: {
    display: 'inline-block',
    maxWidth: '100%',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
});

function NotificationUploadLink(props) {
  const {
    notification,
    children,
  } = props;

  const { t } = useTranslation('translations');
  const classes = useStyles();

  return (
    <Tooltip
      title={t('notifications.view.document')}
      placement="top"
    >
      <a
        href={`${backendURL}${notification.url}`}
        target="_blank"
        rel="noopener noreferrer"
        className={classes.link}
      >
        {children || notification.new}
      </a>
    </Tooltip>
  );
}

NotificationUploadLink.propTypes = {
  notification: PropTypes.shape({
    targetType: PropTypes.string.isRequired,
    targetID: PropTypes.string.isRequired,
    new: PropTypes.string.isRequired,
  }).isRequired,
};

export default NotificationUploadLink;
