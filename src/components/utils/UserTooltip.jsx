import React, { useState } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {
  ClickAwayListener,
  IconButton,
  Tooltip,
  makeStyles,
  withStyles,
} from '@material-ui/core';

const useStyles = makeStyles({
  grow: {
    display: 'inline-flex',
  },
  growStretch: {
    display: 'block',
    width: '100%',
    height: '100%',
  },
});

function UserTooltip(props) {
  const {
    icon,
    iconButtonProps,
    action,
    html,
    children,
    title,
    className,
    ...tooltipProps
  } = props;

  const classes = useStyles();

  const content = (
    <React.Fragment>
      {icon && <IconButton {...iconButtonProps}>{icon}</IconButton>}
      {children}
    </React.Fragment>
  );

  const growClassName = clsx({
    [classes.growStretch]: Boolean(children),
  }, classes.grow, className, 'UserTooltip-grow');

  if (action === 'hover') {
    if (html) {
      return (
        <HtmlTooltip title={title} arrow {...tooltipProps}>
          <span className={growClassName}>
            {content}
          </span>
        </HtmlTooltip>
      );
    }
    return (
      <Tooltip title={title} arrow {...tooltipProps}>
        <span className={growClassName}>
          {content}
        </span>
      </Tooltip>
    );
  }

  return (
    <ClickTooltip title={title} className={className}>
      {content}
    </ClickTooltip>
  );

}

function ClickTooltip(props) {
  const {
    title,
    children,
    placement,
    className,
  } = props;
  const [open, setOpen] = useState(false); // eslint-disable-line no-shadow
  const handleClose = () => setOpen(false);
  const toggleOpen = () => setOpen(!open);

  return (
    <ClickAwayListener onClickAway={handleClose}>
      <div className="UserTooltip-grow">
        <HtmlTooltip
          arrow
          onClose={handleClose}
          open={open}
          disableFocusListener
          disableHoverListener
          disableTouchListener
          title={title}
          placement={placement}
        >
          <span
            className={clsx(className)}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              toggleOpen();
            }}
          >
            {children}
          </span>
        </HtmlTooltip>
      </div>
    </ClickAwayListener>
  );
}

const HtmlTooltip = withStyles(theme => ({
  tooltip: {
    backgroundColor: theme.palette.background.paper,
    color: theme.palette.text.primary,
    maxWidth: 550,
    border: `1px solid ${theme.palette.divider}`,
    boxShadow: theme.shadows[2],
    padding: theme.spacing(1),
    textAlign: 'left',
  },
  arrow: {
    color: theme.palette.background.paper,

    '&:before': {
      border: `1px solid ${theme.palette.divider}`
    },
  },
}))(Tooltip);

UserTooltip.propTypes = {
  action: PropTypes.oneOf(['click', 'hover']).isRequired,
  icon: PropTypes.element,
  html: PropTypes.bool,
  iconButtonProps: PropTypes.shape({
    size: PropTypes.oneOf(['small', 'medium', 'large']),
    color: PropTypes.oneOf(['primary', 'secondary', 'default']),
  }),
  info: PropTypes.node,
};

UserTooltip.defaultProps = {
  action: 'hover',
  icon: null,
  html: false,
  iconButtonProps: { size: 'medium', color: 'primary' },
  placement: 'bottom-end',
};

export default UserTooltip;
