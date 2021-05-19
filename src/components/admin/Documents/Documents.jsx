import React, { useState } from 'react';
import { connect } from 'react-redux';
import { useTranslation } from 'react-i18next';
import {
  TextField,
  makeStyles,
} from '@material-ui/core';
import {
  Assignment as AssignmentIcon,
  AssignmentTurnedIn as AssignmentTurnedInIcon,
} from '@material-ui/icons';
import Autocomplete from '@material-ui/lab/Autocomplete';

import Tabbable from '../../../containers/smartcomponents/Tabbable/Tabbable';
import DocumentsList from './DocumentsList';
import { isSuperuser } from '../../../utils/can';
import { countriesLabels } from '../../../constants/countries';

const useStyles = makeStyles({
  root: {
    position: 'relative',
    marginTop: 30,
    padding: 20,
    width: '100%',
  },
});

function Documents(props) {
  const { user } = props;
  const { t } = useTranslation('translations');
  const classes = useStyles();

  const listOfCountries = isSuperuser(user) ? countriesLabels : user.countryAdminCountries;
  const countriesFilter = listOfCountries.map(c => ({ value: c, label: c}));
  countriesFilter.unshift({ value: null, label: t('assets.all') });
  const [countryFilter, setCountryFilter] = useState(countriesFilter[0]);
  const [currentTab, setCurrentTab] = useState(window.location.hash === '#reviewed' ? 1 : 0);

  if (countryFilter.label === 'assets.all' && countriesFilter[0].label !== 'assets.all') {
    setCountryFilter(countriesFilter[0]);
  }

  return (
    <div className={classes.root}>
      <Tabbable
        defaultTab={currentTab}
        onChange={idx => {
          window.history.pushState(
            '',
            window.document.title,
            window.location.pathname + (idx === 0 ? '' : '#reviewed'),
          );
          setCurrentTab(idx);
        }}
        tabs={[
          { label: t('documents.titlePending'), icon: <AssignmentIcon /> },
          { label: t('documents.titleReviewed'), icon: <AssignmentTurnedInIcon /> },
        ]}
        secondaryHeader={
          <CountriesHeader
            user={user}
            options={countriesFilter}
            value={countryFilter}
            onChange={setCountryFilter}
          />
        }
      >
        <DocumentsList
          seen={currentTab === 1}
          country={countryFilter.value}
        />
      </Tabbable>
    </div>
  );
}

function CountriesHeader(props) {
  const {
    user,
    value,
    options,
    onChange,
  } = props;

  if (!isSuperuser(user)) {
    return null;
  }

  return (
    <Autocomplete
      options={options}
      getOptionLabel={(option) => option.label}
      getOptionSelected={(option, v) => option.value === v.value}
      renderInput={(params) =>
        <TextField
          {...params}
          label="Country"
          variant="outlined"
          InputLabelProps={{
            shrink: true,
          }}
        />
      }
      onChange={(_, v) => onChange(v)}
      value={value}
      disableClearable
    />
  );
}

export default connect(
  state => ({
    user: state.user
  }),
  null
)(Documents);
