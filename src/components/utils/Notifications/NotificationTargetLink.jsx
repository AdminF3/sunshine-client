import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  Tooltip,
  makeStyles,
} from '@material-ui/core';
import { parseAddress } from '../../asset/utils';

const useStyles = makeStyles({
  link: {
    display: 'inline-block',
  },
});

function NotificationTargetLink(props) {
  const {
    notification: {
      targetType,
      targetID,
      targetKey,
      country,
    },
    withPrefix,
    children,
    ...linkProps
  } = props;

  const { t } = useTranslation('translations');
  const classes = useStyles();

  if (targetType === 'plartformRole') {
    return <strong>{country}</strong>;
  }

  const targetName = parseTargetKey({ targetType, targetKey });

  return (
    <React.Fragment>
      {!children && withPrefix ? `${t(`notifications.single.${targetType}`)} ` : null}
      <Tooltip
        title={t(`notifications.view.${targetType}`)}
        placement="top"
      >
        <Link to={`/${targetType}/${targetID}`} className={classes.link} {...linkProps}>
          {children || targetName}
        </Link>
      </Tooltip>
    </React.Fragment>
  );
}

function parseTargetKey({ targetType, targetKey }) {
  if (targetType !== 'asset') {
    return targetKey;
  }

  try {
    const targetKeyJSON = JSON.parse(targetKey);
    const address = parseAddress(targetKeyJSON.address);

    if (!address) {
      throw new Error();
    }

    return address;
  } catch {
    return parseAddress(targetKey);
  }
}

NotificationTargetLink.propTypes = {
  notification: PropTypes.shape({
    targetType: PropTypes.string.isRequired,
    targetID: PropTypes.string,
    targetKey: PropTypes.string,
  }).isRequired,
  withPrefix: PropTypes.bool,
};

NotificationTargetLink.defaultProps = {
  withPrefix: true,
};

export default NotificationTargetLink;
