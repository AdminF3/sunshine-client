import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

import endpoints from '../../constants/endpoints';
import TooltipWrapper from './TooltipWrapper';

const styles = {
  small: {
    width: 24,
    height: 24,
  },
  medium: {
    width: 40,
    height: 40,
  },
  large: {
    width: 56,
    height: 56,
  },
};

function UserAvatar(props) {
  const { size, user, defaultIcon, tooltip, className, classes } = props;

  const AvatarIcon = defaultIcon;

  return (
    <TooltipWrapper
      disabled={!tooltip || !user.name}
      title={user.name}
    >
      <Avatar
        className={`${classes[size]} ${className || ''}`}
        src={user.avatar && endpoints.SERVER + user.avatar}
      >
        {!user.avatar && <AvatarIcon />}
      </Avatar>
    </TooltipWrapper>
  );
}

UserAvatar.propTypes = {
  size: PropTypes.oneOf(['small', 'medium', 'large']).isRequired,
  user: PropTypes.shape({
    avatar: PropTypes.string,
  }).isRequired,
  defaultIcon: PropTypes.elementType.isRequired,
  tooltip: PropTypes.bool.isRequired,
};

UserAvatar.defaultProps = {
  size: 'medium',
  user: { avatar: '' },
  defaultIcon: AccountCircleIcon,
  tooltip: true,
};

export default withStyles(styles)(UserAvatar);
