import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Tooltip from '@material-ui/core/Tooltip';

function TooltipWrapper(props) {
  const { disabled, size, ...forwardProps } = props;

  if (disabled) {
    return <React.Fragment>{props.children}</React.Fragment>;
  }
  if (size === 'large') {
    return <LargeTooltip {...forwardProps} />;
  }
  return <Tooltip {...forwardProps} />;
}

TooltipWrapper.propTypes = {
  ...Tooltip.propTypes,
  disabled: PropTypes.bool.isRequired,
  size: PropTypes.oneOf(['large', 'normal']),
};

TooltipWrapper.defaultProps = {
  size: 'large',
  disabled: false,
  placement: 'top',
};

const LargeTooltip = withStyles(theme => ({
  tooltip: {
    maxWidth: 600,
    fontSize: theme.typography.pxToRem(14),
    padding: `${theme.spacing(1.5)}px ${theme.spacing(3)}px`,
    margin: 5,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
}))(Tooltip);

export default TooltipWrapper;
