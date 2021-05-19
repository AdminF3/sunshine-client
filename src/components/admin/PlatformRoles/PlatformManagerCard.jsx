import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import {
  Button,
  CardActions,
  Paper,
  Typography,
  makeStyles,
} from '@material-ui/core';
import {
  InfoOutlined as InfoIcon,
} from '@material-ui/icons';

import UserAvatar from '../../utils/UserAvatar';
import UserTooltip from '../../utils/UserTooltip';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    alignItems: 'stretch',
    '& > *': {
      display: 'flex',
      justifyContent: 'center',
      position: 'relative',
    },
  },
  top: {
    padding: `${theme.spacing(2)}px 0`,
  },
  'top-default': {
    backgroundImage: 'linear-gradient(-20deg,#2b5876,#4e4376)',
    color: '#f4f5fd',
  },
  'top-plain': {
    backgroundColor: theme.palette.action.selected,
    color: theme.palette.text.primary,
  },
  bottom: {
    padding: `${theme.spacing(4)}px ${theme.spacing(2)}px 0 ${theme.spacing(2)}px`,

    '& .MuiAvatar-root': {
      position: 'absolute',
      top: -20,
      boxShadow: theme.shadows[2],
    },
  },
  userInfo: {
    textAlign: 'center',
    '& a': {
      textDecoration: 'none',
      color: theme.palette.text.primary,
      '&:hover': {
        color: theme.palette.action.active,
      },
    },
  },
  cardActions: {
    justifyContent: 'flex-end',
  },
}));

function PlatformManagerCard(props) {
  const {
    title,
    variant,
    user,
    onUnassign,
    tooltip,
    tooltipIconButtonProps,
  } = props;
  const classes = useStyles();
  const { t } = useTranslation('translations');

  return (
    <Paper className={classes.root}>
      <div className={`${classes.top} ${classes[`top-${variant}`]}`}>
        <Typography variant="overline">{title}</Typography>
        {tooltip && (
          <UserTooltip
            icon={<InfoIcon />}
            iconButtonProps={{ ...tooltipIconButtonProps }}
            title={tooltip}
            action="click"
          />
        )}
      </div>
      <div className={classes.bottom}>
        <UserAvatar user={user} tooltip={false} />
        <div className={classes.userInfo}>
          <Typography variant="subtitle2" display="block">
            {user.name}
          </Typography>
          <Typography variant="caption" display="block">
            {user.email}
          </Typography>
        </div>
      </div>
      <CardActions className={classes.cardActions}>
        {onUnassign && (
          <Button
            onClick={onUnassign}
            color="default"
            variant="outlined"
            size="small"
          >
            {t('roles.unassign')}
          </Button>
        )}
      </CardActions>
    </Paper>
  );
}

PlatformManagerCard.defaultProps = {
  variant: 'default',
  tooltipIconButtonProps: {
    size: 'small',
    color: 'primary',
  }
};

PlatformManagerCard.propTypes = {
  title: PropTypes.node.isRequired,
  variant: PropTypes.oneOf([ 'plain', 'default' ]).isRequired,
  tooltipIconButtonProps: PropTypes.shape({
    size: PropTypes.oneOf(['small', 'normal', 'large']),
    color: PropTypes.oneOf(['primary', 'secondary', 'default', 'inherit']),
  }),
  onUnassign: PropTypes.func,
};

export default PlatformManagerCard;
