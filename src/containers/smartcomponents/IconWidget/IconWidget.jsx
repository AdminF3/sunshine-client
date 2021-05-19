import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {
    position: 'relative',
    padding: '80px 20px 20px 20px',
    border: `1px solid ${theme.palette.divider}`,
  },
  titleWrapper: {
    padding: 15,
    borderRadius: 3,
    background: 'linear-gradient(-60deg, #ffffff, #fafafa)',
    boxShadow: theme.shadows[3],
    position: 'absolute',
    top: -20,
    display: 'flex',
    alignItems: 'center',
    '& > *': {
      display: 'inline-flex',
      paddingRight: theme.spacing(1),
      '&:last-child': {
        paddingRight: 0,
      }
    },
  },
}));

function IconWidget(props) {
  const {
    icon,
    title,
    className,
  } = props;
  const classes = useStyles();

  return (
    <div className={['IconWidget', classes.root, className].filter(v => Boolean(v)).join(' ')}>
      <div className={classes.titleWrapper}>
        <div>{icon}</div>
        <div>{title}</div>
      </div>
      {props.children}
    </div>
  );
}

IconWidget.propTypes = {
  icon: PropTypes.element.isRequired,
  title: PropTypes.node.isRequired,
};

export default IconWidget;
