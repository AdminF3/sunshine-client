import React, { useState } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { useTranslation } from 'react-i18next';
import DatePicker from 'react-datepicker';
import clsx from 'clsx';
import Autocomplete from '@material-ui/lab/Autocomplete';
import {
  InputAdornment,
  TextField,
  Typography,
  makeStyles,
} from '@material-ui/core';

import OutlinedSelect from './OutlinedSelect';
import OutlinedInputLabel from './OutlinedInputLabel';

const useStyles = makeStyles(theme => ({
  gutterBottom: {
    marginBottom: theme.spacing(2),
  },
  rangedInput: {
    display: 'flex',
    '& > div': {
      width: 'auto',

      '&:first-child': {
        marginRight: theme.spacing(1),
      },
    },
  },
  label: {
    display: 'flex',
  },
}));

function Input(props) {
  const {
    type,
    options,
    search,
    value,
    label,
    tooltip,
    inputProps,
    placeholder,
    required,
    disableNotched,
    errors,
    startAdornment,
    endAdornment,
    multiline,
    rows,
    onChange,
    onBlur,
    disabled,
  } = props;

  const classes = useStyles();

  const { t } = useTranslation('translations');

  if (search) {
    return (
      <Autocomplete
        options={options}
        getOptionLabel={(option) => option.label}
        getOptionSelected={(option, v) => option.value === v.value}
        value={value}
        renderInput={(params) =>
          <TextField
            {...params}
            label={label}
            variant="outlined"
            InputLabelProps={{
              shrink: true,
            }}
          />
        }
        onChange={(_, v) => onChange && onChange(v)}
        disableClearable
        disabled={disabled}
      />
    );
  }

  if (options) {
    return (
      <OutlinedSelect
        label={label}
        tooltip={tooltip}
        value={value}
        required={required}
        disableNotched={disableNotched}
        options={options}
        onChange={onChange}
        disabled={disabled}
        endAdornment={endAdornment && <InputAdornment position="end">{endAdornment}</InputAdornment>}
        startAdornment={startAdornment && <InputAdornment position="start">{startAdornment}</InputAdornment>}
      />
    );
  }

  if (type === 'datepicker') {
    return (
      <DatePicker
        selected={value ? new Date(value) : null}
        onChange={v => onChange({ target: { value: v } })}
        showTimeSelect={inputProps?.showTimeSelect !== false}
        minDate={inputProps?.minDate}
        minTime={inputProps?.minTime}
        timeFormat="HH:mm"
        timeIntervals={15}
        timeCaption="time"
        dateFormat={inputProps?.dateFormat || 'dd/MM/yyyy H:mm'}
        showMonthYearPicker={Boolean(inputProps?.showMonthYearPicker)}
        customInput={
          <TextField
            inputProps={{
              id: inputProps?.id,
              name: inputProps?.name,
            }}
            label={label}
            variant={inputProps?.variant || 'outlined'}
            required={required}
            fullWidth={inputProps?.fullWidth !== false}
            InputLabelProps={{
              shrink: true,
            }}
            InputProps={{
              endAdornment: endAdornment && <InputAdornment position="end">{endAdornment}</InputAdornment>,
              startAdornment: startAdornment && <InputAdornment position="start">{startAdornment}</InputAdornment>,
            }}
          />
        }
      />
    );
  }

  if (type === 'range-month') {
    return <RangeInput {...props} type="month" />;
  }

  return (
    <TextField
      type={type}
      value={value}
      label={<OutlinedInputLabel tooltip={tooltip} component="div">{label}</OutlinedInputLabel>}
      placeholder={placeholder}
      variant="outlined"
      required={required}
      multiline={multiline}
      rows={rows}
      error={Boolean(errors)}
      helperText={errors && errors.map((err, i) => <Typography key={i} component="span">{t(err)}</Typography>)}
      fullWidth
      InputLabelProps={{
        shrink: true,
        className: classes,
      }}
      InputProps={{
        endAdornment: endAdornment && <InputAdornment position="end">{endAdornment}</InputAdornment>,
        startAdornment: startAdornment && <InputAdornment position="start">{startAdornment}</InputAdornment>,
      }}
      inputProps={inputProps}
      onChange={onChange}
      onKeyDown={(e) => {
        if (type !== 'number') {
          return;
        }
        // e.keyCode 69 is the "e" key on the keyboard, which
        // is valid as number input can accept floating-point numbers,
        // including negative symbols and the e or E character.
        if (e.keyCode === 69) {
          e.preventDefault();
        }
      }}
      onBlur={onBlur}
      disabled={disabled}
    />
  );
}

Input.propTypes = {
  type: PropTypes.string,
  options: PropTypes.array,
  search: PropTypes.bool.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.object]),
  inputProps: PropTypes.object,
  label: PropTypes.node,
  tooltip: PropTypes.node,
  placeholder: PropTypes.string,
  required: PropTypes.bool.isRequired,
  disableNotched: PropTypes.bool.isRequired,
  errors: PropTypes.array,
  multiline: PropTypes.bool,
  rows: PropTypes.number,
  endAdornment: PropTypes.node,
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
};

Input.defaultProps = {
  errors: null,
  required: false,
  disableNotched: false,
  search: false,
  onBlur: null,
  multiline: false,
};

function RangeInput(props) {
  const {
    value,
    className,
    gutterBottom,
    inputProps,
  } = props;
  const { t } = useTranslation('translations');

  const classes = useStyles();

  const valueParts = value.split(' ');
  const [range, setRange] = useState({ from: valueParts[0] || '', to: valueParts[1] || '' });
  const inputID1 = inputProps?.id && `${inputProps.id}1`;
  const inputID2 = inputProps?.id && `${inputProps.id}2`;

  return (
    <div
      className={clsx(className, classes.rangedInput, {
        [classes.gutterBottom]: gutterBottom,
      })}
    >
      <Input
        type="datepicker"
        label={t('utils.fromYearMonth')}
        value={range.from}
        onChange={e => {
          const from = e.target.value;
          setRange({
            from: moment(from).format('YYYY-MM'),
            to: moment(from).add(12, 'months').format('YYYY-MM'),
          });
        }}
        inputProps={{
          id: inputID1,
          name: inputID1,
          variant: 'standard',
          dateFormat: 'yyyy-MM',
          showTimeSelect: false,
          showMonthYearPicker: true,
          fullWidth: false,
        }}
      />
      <Input
        type="datepicker"
        label={t('utils.toYearMonth')}
        value={range.to}
        onChange={e => {
          const to = e.target.value;
          setRange({
            from: moment(to).subtract(12, 'months').format('YYYY-MM'),
            to: moment(to).format('YYYY-MM'),
          });
        }}
        inputProps={{
          id: inputID2,
          name: inputID2,
          variant: 'standard',
          dateFormat: 'yyyy-MM',
          showTimeSelect: false,
          showMonthYearPicker: true,
          fullWidth: false,
        }}
      />
    </div>
  );
}

RangeInput.propTypes = {
  type: PropTypes.oneOf(['month', 'date']).isRequired,
  value: PropTypes.string.isRequired,
};

RangeInput.defaultProps = {
  type: 'month',
  value: '',
};

export default Input;
