import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Popover from '@material-ui/core/Popover';
import Badge from '@material-ui/core/Badge';
import IconButton from '@material-ui/core/IconButton';
import NotificationsIcon from '@material-ui/icons/Notifications';
import NotificationsList from './NotificationsList';

const useStyles = makeStyles(theme => ({
  notificationButton: {
    height: 48,
    width: 48,
    margin: 'auto',
  },
  popover: {
    '& .MuiPopover-paper': {
      paddingTop: theme.spacing(5),
      width: 'calc(50% - 32px)',
      maxWidth: 500,
      overflowY: 'hidden',
    },
  },
  popoverContent: {
    maxHeight: 'calc(90vh - 32px)',
    overflowY: 'auto',
  },
  popoverHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    padding: `${theme.spacing(1)}px ${theme.spacing(2)}px`,
    borderBottom: `1px solid ${theme.palette.divider}`,
    backgroundColor: theme.palette.background.paper,
    zIndex: 2,
  },
}));

function Notifications() {
  const [anchorEl, setAnchorEl] = useState(null);
  const [totalCount, setTotalCount] = useState(null);
  const classes = useStyles();
  const { t } = useTranslation('translations');

  return (
    <React.Fragment>
      <IconButton
        className={classes.notificationButton}
        aria-label="show notifications"
        color="inherit"
        tooltip="Notifications"
        onClick={(e) => setAnchorEl(e.currentTarget)}
      >
        <Badge badgeContent={totalCount} color="secondary">
          <NotificationsIcon style={{ color: 'darkgrey' }} />
        </Badge>
      </IconButton>
      <Popover
        className={classes.popover}
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={() => setAnchorEl(null)}
        anchorOrigin={{
          vertical: 'center',
          horizontal: 'left',
        }}
        keepMounted
      >
        <div className={classes.popoverHeader}>
          <Typography component="span">
            {t('notifications.titleUnread')}
          </Typography>
          <Typography component="span">
            <Link to="/profile/notifications">{t('notifications.view.all')}</Link>
          </Typography>
        </div>
        <div className={classes.popoverContent}>
          <NotificationsList
            seen={false}
            pollInterval={15000}
            onUpdateTotalCount={(n) => setTotalCount(n)}
          />
        </div>
      </Popover>
    </React.Fragment>
  );
}

export default Notifications;
