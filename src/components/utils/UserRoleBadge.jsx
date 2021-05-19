import React from 'react';
import { useTranslation } from 'react-i18next';
import {
  IconButton,
  makeStyles,
} from '@material-ui/core';
import {
  AccountCircle as AccountCircleIcon,
  SupervisorAccount as SupervisorAccountIcon,
  Stars as StarsIcon,
} from '@material-ui/icons';

import Tooltip from './TooltipWrapper';

const useStyles = makeStyles({
  rolesList: {
    margin: 0,
    padding: 0,
    listStyle: 'none',
  },
  button: {
    marginRight: 6,
  },
});

function UserRoleBadge(props) {
  const { user } = props;
  const { t } = useTranslation('translations');
  const classes = useStyles();

  if (user.superuser) {
    return (
      <Tooltip title="Admin">
        <IconButton disableRipple color="primary" className={classes.button}>
          <StarsIcon />
        </IconButton>
      </Tooltip>
    );
  }

  if (user.platform_manager || user.admin_nw_manager || user.country_roles?.length > 0) {
    const roles = user.country_roles.map(r => t(`platformRoles.${r.role}`));

    if (user.platform_manager) {
      roles.push('platform manager');
    }
    if (user.admin_nw_manager) {
      roles.push('admin network manager');
    }
    return (
      <Tooltip
        title={
          <ul className={classes.rolesList}>
            {roles.map((r, i) => <li key={i}>{r}</li>)}
          </ul>
        }
      >
        <IconButton disableRipple className={classes.button}>
          <SupervisorAccountIcon />
        </IconButton>
      </Tooltip>
    );
  }

  return (
    <IconButton disableRipple disabled className={classes.button}>
      <AccountCircleIcon />
    </IconButton>
  );
}

export default UserRoleBadge;
