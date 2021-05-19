import React from 'react';
import PropTypes from 'prop-types';
import {
  Typography,
  Divider,
  makeStyles,
} from '@material-ui/core';
import {
  InfoOutlined as InfoIcon,
} from '@material-ui/icons';

import ButtonHint from './ButtonHint';
import UserTooltip from './UserTooltip';

const styles = {
  root: {
    position: 'relative',
    width: '100%',
    border: '1px solid #DFE2E5',
    borderRadius: '4px',
    backgroundColor: '#FFFFFF',
    margin: '20px 0 20px 0',
    '&:first-child': {
      marginTop: 0,
    },
    '&:last-child': {
      marginBottom: 0,
    },
    '& > .row': {
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: 20,
      position: 'relative',

      '& > div': {
        position: 'relative',
        display: 'inline-flex',
        alignItems: 'center',
      }
    },
  },
  noTitleRoot: {
    borderTop: 'none',
  },
  contentWithPadding: {
    padding: '20px 0',
  },
  title: {
    color: '#354052',
    fontSize: '17px',
    lineHeight: '22px',
  },
  tooltipButton: {
    marginLeft: 12,
  },
};

const useStyles = makeStyles(styles);

function Widget(props) {
  const {
    title,
    titleButton,
    overline,
    hint,
    tooltip,
    className,
    withDivider,
    withPadding,
  } = props;

  const classes = useStyles();

  return (
    <div className={`${classes.root} ${className || ''} ${!title ? classes.noTitleRoot : ''}`.trim()}>
      {title && (
        <div className="row">
          <div>
            {typeof title === 'string' ?
              (
                <Typography className={classes.title}>
                  {title}
                  {overline && (
                    <Typography component="span" variant="overline"> - {overline}</Typography>
                  )}
                </Typography>
              ) :
              (
                title
              )
            }
            {tooltip && (
              <UserTooltip
                action="click"
                icon={<InfoIcon />}
                iconButtonProps={{ size: 'small', color: 'primary', className: classes.tooltipButton }}
                title={tooltip}
              />
            )}
          </div>
          <div>
            {titleButton}
            {hint && <ButtonHint hint={hint} />}
          </div>
        </div>
      )}
      {withDivider && <Divider />}
      <div className={`${withPadding ? classes.contentWithPadding : ''}`}>
        {props.children}
      </div>
    </div>
  );
}

Widget.propTypes = {
  title: PropTypes.node,
  overline: PropTypes.node,
  hint: PropTypes.node,
  tooltip: PropTypes.node,
  className: PropTypes.string,
  wihDivider: PropTypes.bool,
  withPadding: PropTypes.bool,
  classes: PropTypes.object,
};

Widget.defaultProps = {
  titleButton: null,
};

export default Widget;
