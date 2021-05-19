import React from 'react';
import { useTranslation } from 'react-i18next';
import {
  Grid,
  Typography,
} from '@material-ui/core';
import {
  DateRange as DateRangeIcon,
  Today as TodayIcon,
} from '@material-ui/icons';

import IconWidget from '../../../containers/smartcomponents/IconWidget/IconWidget';
import Input from '../../utils/Input';

const now = new Date();
const fields = [
  {
    label: 'projects.contractTermsInYears',
    key: 'contract_term',
    type: 'number',
    endAdornment: 'years',
    inputProps: {
      min: 1,
    },
  },
  {
    label: 'projects.firstYearOfContract',
    key: 'first_year',
    type: 'number',
    inputProps: {
      min: now.getFullYear(),
      max: now.getFullYear() + 20,
    },
  },
  {
    label: 'projects.constructionStartDate',
    key: 'construction_from',
    type: 'datepicker',
    startAdornment: <TodayIcon color="disabled" />,
    inputProps: {
      minDate: now,
      showTimeSelect: false,
      dateFormat: 'dd.MM.yyyy'
    },
  },
  {
    label: 'projects.constructionEndDate',
    key: 'construction_to',
    type: 'datepicker',
    startAdornment: <TodayIcon color="disabled" />,
    inputProps: (state) => {
      if (state?.construction_from) {
        return {
          minDate: new Date(state.construction_from),
          showTimeSelect: false,
          dateFormat: 'dd.MM.yyyy'
        };
      }
      return {
        minDate: now,
        showTimeSelect: false,
        dateFormat: 'dd.MM.yyyy'
      };
    },
  },
];

function ConstructionPeriodForm(props) {
  const { handleSetData } = props;
  const { t } = useTranslation('translations');

  return (
    <IconWidget
      icon={<DateRangeIcon color="primary" />}
      title={
        <Typography variant="subtitle1">
          {t('projects.constructionPeriod')}
        </Typography>
      }
    >
      <Grid container spacing={2}>
        {fields.map(f => {
          let inputProps;
          switch (typeof f.inputProps) {
            case 'object':
              inputProps = f.inputProps;
              break;
            case 'function':
              inputProps = f.inputProps(props);
              break;
            default:
              inputProps = undefined;
          }

          return (
            <Grid item sm={6} xs={12} key={f.key}>
              <Input
                type={f.type || 'text'}
                value={props[f.key]}
                label={t(f.label)}
                required
                fullWidth
                startAdornment={f.startAdornment}
                endAdornment={f.endAdornment}
                inputProps={inputProps}
                onChange={e => handleSetData({ [f.key]: e.target.value })}
              />
            </Grid>
          );
        })}
      </Grid>
    </IconWidget>
  );
}

export default ConstructionPeriodForm;
