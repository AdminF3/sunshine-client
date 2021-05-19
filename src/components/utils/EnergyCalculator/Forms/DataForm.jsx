import React from 'react';
import {
  FormControl,
  Grid,
  TextField,
  Select,
  InputLabel,
  InputAdornment,
  FormHelperText,
} from '@material-ui/core';

import { coefficients } from '../utils';

const fieldComponentsMap = {
  project: {
    component: SelectWrapper,
    label: 'Building project',
    options: Object.keys(coefficients),
  },
  heatedArea: { label: 'Building heated area', type: 'number', adornment: 'm²' },
  numFloors: { label: 'Nr. of floors', type: 'number' },
  numStaircases: { label: 'Nr. of staircases', type: 'number' },
  numFlats: { label: 'Nr. of flats', type: 'number' },
  energyPrice: { label: 'Energy price', type: 'number', adornment: 'EUR' },
  grant: { label: 'Grant', adornment: '%', type: 'number' },
  equityFinancing: { label: 'Equity financing', adornment: '%', type: 'number' },
  debtFinancing: { label: 'Debt financing', adornment: '%', type: 'number' },
  interestRate: { label: 'Interest rate', adornment: '%', type: 'number' },
  loanTerm: { label: 'Loan term', adornment: 'years', type: 'number' },
  epcTerm: { label: 'EPC term', adornment: 'years', type: 'number' },
  inflation: { label: 'Inflation', adornment: '%', type: 'number' },
  feeBeforeRenovation: { label: 'Fee before renovation', adornment: '€/m² month', type: 'number' },
  feeAfterRenovation: { label: 'Fee after renovation', adornment: '€/m² month', type: 'number' },
  administrationFee: { label: 'Administration fee', adornment: '%', type: 'number' },
  maintenanceFee: { label: 'Maintenance fee', adornment: '%', type: 'number' },
  insuranceFee: { label: 'Insuranse fee', adornment: '%', type: 'number' },
  yearlyFee: { label: 'Yearly fee', adornment: '%', type: 'number' },
  monthlyFee: { label: 'Monthly fee', adornment: '%', type: 'number' },
};

function DataForm(props) {
  const {
    data,
    errors,
    setData,
  } = props;

  return (
    <Grid container spacing={2}>
      {Object.keys(data).map(key => {
        const { component, adornment, ...componentProps } = fieldComponentsMap[key];
        const DataField = component || TextField;

        return (
          <Grid item md={4} sm={12} key={key}>
            <FormControl
              key={key}
              variant="outlined"
              margin="normal"
              fullWidth
              error={Boolean(errors[key])}
            >
              <DataField
                {...componentProps}
                InputProps={adornment && {
                  endAdornment: <InputAdornment position="end">{adornment}</InputAdornment>,
                }}
                key={key}
                value={data[key]}
                error={Boolean(errors[key])}
                helperText={errors[key]}
                variant="outlined"
                onChange={(e) => setData({ [key]: e.target.value })}
              />

            </FormControl>
          </Grid>
        );
      })}
    </Grid>
  );
}

function SelectWrapper(props) {
  const {
    label,
    value,
    variant,
    options,
    error,
    helperText,
    onChange,
  } = props;

  const labelRef = React.useRef(null);
  const [labelWidth, setLablWidth] = React.useState(0);
  React.useEffect(() => {
    setLablWidth(labelRef.current.offsetWidth);
  }, []);

  return (
    <React.Fragment>
      <InputLabel htmlFor="project" ref={labelRef}>
        {label}
      </InputLabel>
      <Select
        native
        variant={variant}
        labelWidth={labelWidth}
        value={value}
        error={error}
        onChange={onChange}
      >
        <option value="" />
        {options.map((o) => <option key={o} value={o}>{o}</option>)}
      </Select>
      {helperText && <FormHelperText>{helperText}</FormHelperText>}
    </React.Fragment>
  );
}

export default DataForm;
