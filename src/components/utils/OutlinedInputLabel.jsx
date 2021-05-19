import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {
  InputLabel,
  makeStyles,
} from '@material-ui/core';
import {
  InfoOutlined as InfoIcon,
} from '@material-ui/icons';

import UserTooltip from './UserTooltip';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'inline-flex',

    '& .UserTooltip-grow': {
      width: 'auto',
      height: 'auto',
      marginTop: -6,
      position: 'absolute',
      right: -theme.spacing(5),
      background: theme.palette.background.paper,
      padding: `0 ${theme.spacing(0.5)}px`,
    },
  },
  pointerEvents: {
    pointerEvents: 'auto',
  },
}));

function OutlinedInputLabel(props) {
  const {
    tooltip,
    children,
    className,
    setLabelWidth,
    ...inputLabelProps
  } = props;

  delete inputLabelProps.component;

  const labelRef = React.useRef(null);
  React.useEffect(() => setLabelWidth && setLabelWidth(labelRef.current?.offsetWidth || 0), [setLabelWidth]);

  const classes = useStyles();

  if (!children && !tooltip) {
    return null;
  }

  return (
    <props.component
      ref={labelRef}
      className={clsx(classes.root, className, { [classes.pointerEvents]: Boolean(tooltip) })}
      {...inputLabelProps}
    >
      {tooltip && (
        <UserTooltip
          title={tooltip}
          icon={<InfoIcon />}
          iconButtonProps={{ size: 'small', color: 'primary' }}
          placement="top"
        />
      )}
      <span>{children}</span>
    </props.component>
  );
}

OutlinedInputLabel.propTypes = {
  ...InputLabel.propTypes,
  tooltip: PropTypes.node,
  component: PropTypes.elementType,
  setLabelWidth: PropTypes.func,
};

OutlinedInputLabel.defaultProps = {
  component: InputLabel,
};

export default OutlinedInputLabel;
