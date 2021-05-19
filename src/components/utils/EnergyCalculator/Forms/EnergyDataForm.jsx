import React from 'react';
import PropTypes from 'prop-types';
import {
  Grid,
  InputAdornment,
  TextField,
  Typography,
  makeStyles,
} from '@material-ui/core';
import moment from 'moment';

const useStyles = makeStyles({
  textField: {
    marginTop: 0,
    marginBottom: 0,
  },
  columnLabel: {
    '& span': {
      fontSize: 10,
    },
  },
});

function EnergyDataForm(props) {
  const { data, errors, setData } = props;
  const classes = useStyles();

  return (
    <Grid container alignItems="center" spacing={1}>
      <Grid item xs={3} align="center">
        <Typography variant="subtitle1">Month</Typography>
      </Grid>
      <Grid item xs={3} align="center" className={classes.columnLabel}>
        <Typography variant="subtitle1">Space heating</Typography>
      </Grid>
      <Grid item xs={3} align="center" className={classes.columnLabel}>
        <Typography variant="subtitle1">Circulation losses</Typography>
      </Grid>
      <Grid item xs={3} align="center" className={classes.columnLabel}>
        <Typography variant="subtitle1">Domestic hot water</Typography>
      </Grid>

      {Array(12).fill(0).map((_, i) => {
        const m = i + 1;

        return (
          <Grid item xs={12} key={i}>
            <Grid container spacing={1} justify="center">
              <Grid item xs={3}>
                <Typography variant="subtitle2">
                  {moment(`2006-${m}`, 'YYYY-MM').format('MMMM')}
                </Typography>
              </Grid>
              <Grid item xs={3}>
                <TextField
                  className={classes.textField}
                  id={`${m}-sh`}
                  type="number"
                  margin="dense"
                  variant="outlined"
                  fullWidth
                  value={data[`${m}-sh`]}
                  error={Boolean(errors[`${m}-sh`])}
                  helperText={errors[`${m}-sh`] || null}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="start">
                        MWh
                      </InputAdornment>
                    ),
                  }}
                  onChange={(e) => setData({ [`${m}-sh`]: e.target.value })}
                />
              </Grid>
              <Grid item xs={3}>
                <TextField
                  className={classes.textField}
                  id={`${m}-cl`}
                  type="number"
                  margin="dense"
                  variant="outlined"
                  fullWidth
                  value={data[`${m}-cl`]}
                  error={Boolean(errors[`${m}-cl`])}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="start">
                        MWh
                      </InputAdornment>
                    ),
                  }}
                  onChange={(e) => setData({ [`${m}-cl`]: e.target.value })}
                />
              </Grid>
              <Grid item xs={3}>
                <TextField
                  className={classes.textField}
                  id={`${m}-dhw`}
                  type="number"
                  margin="dense"
                  variant="outlined"
                  fullWidth
                  value={data[`${m}-dhw`]}
                  error={Boolean(errors[`${m}-dhw`])}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="start">
                        MWh
                      </InputAdornment>
                    ),
                  }}
                  onChange={(e) => setData({ [`${m}-dhw`]: e.target.value })}
                />
              </Grid>
            </Grid>
          </Grid>
        );
      })}
    </Grid>
  );
}

EnergyDataForm.defaultProps = {
  '1-sh': '', '1-cl': '', '1-dhw': '',
  '2-sh': '', '2-cl': '', '2-dhw': '',
  '3-sh': '', '3-cl': '', '3-dhw': '',
  '4-sh': '', '4-cl': '', '4-dhw': '',
  '5-sh': '', '5-cl': '', '5-dhw': '',
  '6-sh': '', '6-cl': '', '6-dhw': '',
  '7-sh': '', '7-cl': '', '7-dhw': '',
  '8-sh': '', '8-cl': '', '8-dhw': '',
  '9-sh': '', '9-cl': '', '9-dhw': '',
  '10-sh': '', '10-cl': '', '10-dhw': '',
  '11-sh': '', '11-cl': '', '11-dhw': '',
  '12-sh': '', '12-cl': '', '12-dhw': '',
};

EnergyDataForm.propTypes = {
  data: PropTypes.shape({
    '1-sh': PropTypes.string.isRequired,
    '1-cl': PropTypes.string.isRequired,
    '1-dhw': PropTypes.string.isRequired,
    '2-sh': PropTypes.string.isRequired,
    '2-cl': PropTypes.string.isRequired,
    '2-dhw': PropTypes.string.isRequired,
    '3-sh': PropTypes.string.isRequired,
    '3-cl': PropTypes.string.isRequired,
    '3-dhw': PropTypes.string.isRequired,
    '4-sh': PropTypes.string.isRequired,
    '4-cl': PropTypes.string.isRequired,
    '4-dhw': PropTypes.string.isRequired,
    '5-sh': PropTypes.string.isRequired,
    '5-cl': PropTypes.string.isRequired,
    '5-dhw': PropTypes.string.isRequired,
    '6-sh': PropTypes.string.isRequired,
    '6-cl': PropTypes.string.isRequired,
    '6-dhw': PropTypes.string.isRequired,
    '7-sh': PropTypes.string.isRequired,
    '7-cl': PropTypes.string.isRequired,
    '7-dhw': PropTypes.string.isRequired,
    '8-sh': PropTypes.string.isRequired,
    '8-cl': PropTypes.string.isRequired,
    '8-dhw': PropTypes.string.isRequired,
    '9-sh': PropTypes.string.isRequired,
    '9-cl': PropTypes.string.isRequired,
    '9-dhw': PropTypes.string.isRequired,
    '10-sh': PropTypes.string.isRequired,
    '10-cl': PropTypes.string.isRequired,
    '10-dhw': PropTypes.string.isRequired,
    '11-sh': PropTypes.string.isRequired,
    '11-cl': PropTypes.string.isRequired,
    '11-dhw': PropTypes.string.isRequired,
    '12-sh': PropTypes.string.isRequired,
    '12-cl': PropTypes.string.isRequired,
    '12-dhw': PropTypes.string.isRequired,
  }),
  setData: PropTypes.func.isRequired,
};

export default EnergyDataForm;
