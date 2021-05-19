import React from 'react';
import PropTypes from 'prop-types';
import {
  FormControl,
  FormHelperText,
  Select,
  OutlinedInput,
} from '@material-ui/core';

import OutlinedInputLabel from '../utils/OutlinedInputLabel';

function OutlinedSelect(props) {
  const {
    label,
    tooltip,
    value,
    required,
    disableNotched,
    options,
    helperText,
    onChange,
    startAdornment,
    endAdornment,
  } = props;

  const [labelWidth, setLabelWidth] = React.useState(0);

  return (
    <FormControl
      variant="outlined"
      fullWidth
      required={required}
    >
      {label && (
        <OutlinedInputLabel
          shrink={disableNotched ? undefined : true}
          tooltip={tooltip}
          setLabelWidth={setLabelWidth}
        >
          {label}
        </OutlinedInputLabel>
      )}
      <Select
        native
        labelWidth={labelWidth}
        value={value}
        onChange={onChange}
        input={
          <OutlinedInput
            notched={disableNotched ? undefined : true}
            labelWidth={labelWidth}
            startAdornment={startAdornment}
            endAdornment={endAdornment}
          />
        }
      >
        <option value="" />
        {options.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
      </Select>
      {helperText && <FormHelperText>{helperText}</FormHelperText>}
    </FormControl>
  );
}

OutlinedSelect.propTypes = {
  label: PropTypes.string,
  value: PropTypes.string.isRequired,
  required: PropTypes.bool.isRequired,
  options: PropTypes.array,
  helperText: PropTypes.node,
  onChange: PropTypes.func.isRequired,
  disableNotched: PropTypes.bool.isRequired,
};

OutlinedSelect.defaultProps = {
  required: true,
  disableNotched: false,
};

export default OutlinedSelect;
