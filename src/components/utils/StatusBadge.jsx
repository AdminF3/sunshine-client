import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import {
  Avatar,
  Badge,
  Grid,
  Typography,
  makeStyles,
} from '@material-ui/core';
import {
  red,
  blue,
  green,
  orange,
} from '@material-ui/core/colors';
import {
  RadioButtonUnchecked as RegisteredBadgeIcon,
  TrackChanges as PendingBadgeIcon,
  CheckCircleOutline as ValidBadgeIcon,
  NotInterested as DeclinedBadgeIcon,
} from '@material-ui/icons';

import Tooltip from './TooltipWrapper';

const useStyles = makeStyles({
  statusBadgeValid_bg: {
    backgroundColor: green[300],
  },
  statusBadgeValid_fg: {
    '& .MuiBadge-badge': {
      color: '#ffffff',
      backgroundColor: green[300],
    },
  },
  statusBadgeRegistered_bg: {
    backgroundColor: blue[300],
  },
  statusBadgeRegistered_fg: {
    '& .MuiBadge-badge': {
      color: '#ffffff',
      backgroundColor: blue[300],
    },
  },
  statusBadgePending_bg: {
    backgroundColor: orange[300],
  },
  statusBadgePending_fg: {
    '& .MuiBadge-badge': {
      color: '#ffffff',
      backgroundColor: orange[300],
    },
  },
  statusBadgeDeclined_bg: {
    backgroundColor: red[300],
  },
  statusBadgeDeclined_fg: {
    '& .MuiBadge-badge': {
      color: '#ffffff',
      backgroundColor: red[300],
    },
  },
});

const statuses = {
  all: {
    1: {
      icon: <RegisteredBadgeIcon />,
      classNameKey: 'statusBadgeRegistered',
      titleKey: 'validStatus.registered',
      titleExplanationKey: 'validStatus.registeredExplanation',
    },
    2: {
      icon: <ValidBadgeIcon />,
      classNameKey: 'statusBadgeValid',
      titleKey: 'validStatus.valid',
      titleExplanationKey: 'validStatus.validExplanation',
    },
    3: {
      icon: <DeclinedBadgeIcon />,
      classNameKey: 'statusBadgeDeclined',
      titleKey: 'validStatus.declined',
      titleExplanationKey: 'validStatus.declinedExplanation',
    },
    4: {
      icon: <PendingBadgeIcon />,
      classNameKey: 'statusBadgePending',
      titleKey: 'validStatus.pending',
      titleExplanationKey: 'validStatus.pendingExplanation',
    },
  },
  project: {
    1: {
      icon: <RegisteredBadgeIcon />,
      classNameKey: 'statusBadgeRegistered',
      titleKey: 'validStatus.planning',
      titleExplanationKey: 'validStatus.planningExplanation',
    },
    2: {
      icon: <PendingBadgeIcon />,
      classNameKey: 'statusBadgePending',
      titleKey: 'validStatus.inProgress',
      titleExplanationKey: 'validStatus.inProgressExplanation',
    },
    3: {
      icon: <ValidBadgeIcon />,
      classNameKey: 'statusBadgeValid',
      titleKey: 'validStatus.finished',
      titleExplanationKey: 'validStatus.finishedExplanation',
    },
    4: {
      icon: <DeclinedBadgeIcon />,
      classNameKey: 'statusBadgeDeclined',
      titleKey: 'validStatus.abandoned',
      titleExplanationKey: 'validStatus.abandonedExplanation',
    },
  },
};

function StatusBadge(props) {
  const {
    validationStatus,
    type,
    variant,
    children,
  } = props;
  const { t } = useTranslation('translations');
  const classes = useStyles();

  if (!validationStatus || !(validationStatus in statuses[type])) {
    return null;
  }

  const {
    icon,
    classNameKey,
    titleKey,
    titleExplanationKey,
  } = statuses[type][validationStatus];

  if (variant === 'badge') {
    return (
      <Badge
        badgeContent={t(titleKey)}
        className={classes[`${classNameKey}_fg`]}
      >
        {children}
      </Badge>
    );
  }

  return (
    <Tooltip
      title={
        <Grid container direction="column">
          <Grid item xs={12}>
            <Typography variant="overline">
              {`${t('organizations.status')}: ${t(titleKey)}`}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography>
              {t(titleExplanationKey)}
            </Typography>
          </Grid>
        </Grid>
      }
    >
      <Avatar
        variant="rounded"
        className={classes[`${classNameKey}_bg`]}
      >
        {icon}
      </Avatar>
    </Tooltip>
  );
}

StatusBadge.propTypes = {
  validationStatus: PropTypes.oneOf([1, 2, 3, 4]).isRequired,
  type: PropTypes.oneOf(['all', 'project']).isRequired,
  variant: PropTypes.oneOf(['icon', 'badge']).isRequired,
};

StatusBadge.defaultProps = {
  type: 'all',
  variant: 'icon',
};

export default StatusBadge;
