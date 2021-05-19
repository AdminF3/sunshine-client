import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {
  makeStyles,
} from '@material-ui/core';

import UserTooltip from './UserTooltip';

const useStyles = makeStyles({
  root: {
    position: 'relative',
    padding: '20px 12px',
  },
  line: {
    height: 1,
    boxShadow: '0 2px 0 0 #DFE2E5',
  },
  content: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',

    '& .SeparatorMenu-item': {
      position: 'relative',
      backgroundColor: '#EFF2F6',
      padding: '0 20px',
      color: '#7F8FA4',
      cursor: 'pointer',
      fontWeight: 600,
      textTransform: 'uppercase',

      '&.active': {
        textDecoration: 'underline',
      },
    },

    '& .SpearatorMenu-separator': {
      width: 1,
      height: 14,
      backgroundColor: '#7F8FA4',
    },
  },
});

function SeparatorMenu(props) {
  const {
    items,
    active,
    onChange,
  } = props;

  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className={classes.line} />
      <div className={classes.content}>
        {items.map((item, i) => {
          return (
            <MenuItem
              key={i}
              item={item}
              withSeparator={i + 1 < items.length}
              active={active === i}
              onChange={() => onChange(i)}
            />
          );
          })}
      </div>
    </div>
  );
}

SeparatorMenu.propTypes = {
  items: PropTypes.arrayOf(PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.shape({
      tooltip: PropTypes.node.isRequired,
      title: PropTypes.node.isRequired,
    }),
  ])).isRequired,
  active: PropTypes.number,
  onChange: PropTypes.func,
};

SeparatorMenu.defaultProps = {
  items: [],
};

function MenuItem(props) {
  const {
    item,
    withSeparator,
    active,
    onChange,
  } = props;

  const separator = withSeparator && <div className="SpearatorMenu-separator" />;
  const className = clsx('SeparatorMenu-item', { active });

  if (typeof item === 'string') {
    return (
      <React.Fragment>
        <div className={className} onClick={onChange}>
          {item}
        </div>
        {separator}
      </React.Fragment>
    );
  }

  if (item.tooltip) {
    return (
      <React.Fragment>
        <div className={className} onClick={onChange}>
          <UserTooltip
            placement="bottom"
            title={item.tooltip}
          >
            {item.title}
          </UserTooltip>
        </div>
        {separator}
      </React.Fragment>
    );
  }

  return item;
}

MenuItem.propTypes = {
  item: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.shape({
      tooltip: PropTypes.node.isRequired,
      title: PropTypes.node.isRequired,
    }),
  ]).isRequired,
  withSeparator: PropTypes.bool,
  active: PropTypes.bool,
  onChange: PropTypes.func,
};

export default SeparatorMenu;
