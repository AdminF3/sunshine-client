import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Collapse,
  makeStyles,
} from '@material-ui/core';
import {
  ArrowDropDown as DropDownIcon,
} from '@material-ui/icons';

const useStyles = makeStyles(theme => ({
  divider: {
    display: 'block',
    position: 'relative',
    borderTop: `.1rem solid ${theme.palette.divider}`,
    height: '.1rem',
    margin: `${theme.spacing(3)}px ${theme.spacing(8)}px ${theme.spacing(3)}px ${theme.spacing(3)}px`,
    textAlign: 'center',
    cursor: 'pointer',

    '&:after': {
      background: theme.palette.background.paper,
      content: 'attr(data-content)',
      display: 'inline-block',
      fontSize: '.75rem',
      padding: '.4rem .8rem',
      textAlign: 'left',
      position: 'absolute',
      marginTop: '-1.1rem',
      marginLeft: -theme.spacing(6),
    },
    '& .collapseButton': {
      position: 'absolute',
      top: '50%',
      marginTop: -theme.spacing(1.5),
      right: -theme.spacing(5),
    },
  }
}));

function Collapsable(props) {
  const classes = useStyles();

  const [isOpen, setIsOpen] = useState(props.in);

  return (
    <props.component>
      <div
        data-content={props.dividerTitle}
        className={classes.divider}
        onClick={() => setIsOpen(!isOpen)}
      >
        <DropDownIcon className="collapseButton" />
      </div>
      <Collapse in={isOpen}>
        {props.children}
      </Collapse>
    </props.component>
  );
}

Collapsable.propTypes = {
  component: PropTypes.elementType,
  dividerTitle: PropTypes.string,
};

Collapsable.defaultProps = {
  component: React.Fragment,
};

export default Collapsable;
