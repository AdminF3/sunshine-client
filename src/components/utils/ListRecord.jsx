import React from 'react';
import PropTypes from 'prop-types';
import {
  Grid,
  Typography,
} from '@material-ui/core';

function ListRecord(props) {
  const { items, className } = props;

  return (
    <Grid
      container
      alignItems="center"
      className={className}
      spacing={1}
    >
      {items.map(({ key, value }) => (
        <React.Fragment key={key}>
          <Grid item xs={4}>
            <Typography color="textSecondary" component="span">
              {key}
            </Typography>
          </Grid>
          <Grid item xs={8} align="right">
            <Value>{value}</Value>
          </Grid>
        </React.Fragment>
      ))}
    </Grid>
  );
}

function Value({ children }) {
  if (typeof children !== 'string') {
    return children;
  }

  return (
    <Typography component="span">
      <strong>{children}</strong>
    </Typography>
  );
}

ListRecord.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({
    key: PropTypes.string.node,
    value: PropTypes.string.node,
  })),
};

ListRecord.defaultProps = {
  items: [],
  className: null,
};

export default ListRecord;
