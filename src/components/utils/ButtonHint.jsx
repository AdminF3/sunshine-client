import React, { useState } from 'react';

import {
  Typography,
  Popover,
  IconButton,
  makeStyles,
} from '@material-ui/core';

import {
  Info as InfoIcon,
  Close as CloseIcon,
} from '@material-ui/icons';

const useStyles = makeStyles({
  popover: {
    '& .MuiPaper-root': {
      backgroundColor: 'rgba(0, 0, 0, .8)',
      color: '#fff',
      border: '1px solid #fff',
      borderRadius: 10,
    },
    '& .MuiPopover-paper': {
      overflow: 'visible',
    },
  },
  popoverContent: {
    padding: 20,
  },
  closeIcon: {
    position: 'absolute',
    top: -10,
    right: -10,
    border: '1px solid #fff',
    borderRadius: '100%',
    backgroundColor: 'rgba(0, 0, 0, .8)',
    cursor: 'pointer',
  },
});

function ButtonHint(props) {
  const {
    hint,
  } = props;

  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClose = () => setAnchorEl(null);

  return (
    <React.Fragment>
      <IconButton
        onClick={e => setAnchorEl(e.currentTarget)}
        size="small"
      >
        <InfoIcon fontSize="small" />
      </IconButton>
      <Popover
        className={classes.popover}
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'center',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
        <Typography className={classes.popoverContent}>
          {hint}
        </Typography>

        <CloseIcon
          className={classes.closeIcon}
          fontSize="default"
          onClick={handleClose}
        />
      </Popover>
    </React.Fragment>
  );
}

export default ButtonHint;
