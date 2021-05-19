import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import {
  Grid,
  Typography,
  TextField,
  makeStyles,
} from '@material-ui/core';
import {
  EditLocation as EditLocationIcon,
} from '@material-ui/icons';

import IconWidget from '../../../containers/smartcomponents/IconWidget/IconWidget';
import styles from './styles';

const useStyles = makeStyles(styles);

const fields = [
  { label: 'assets.city', key: 'city' },
  { label: 'assets.streetAddress', key: 'streetAddress' },
  { label: 'assets.postcode', key: 'postcode' },
];

function AssetAddressForm(props) {
  const {
    addressLocationMap,
    handleSetData,
    disabled
  } = props;
  const { t } = useTranslation('translations');
  const classes = useStyles();

  return (
    <IconWidget
      className={classes.formWidget}
      icon={<EditLocationIcon color="primary" />}
      title={
        <Typography variant="subtitle1">
          {t('assets.addressIn')} <strong>{addressLocationMap.country}</strong>
        </Typography>
      }
    >
      <Grid
        container
        direction="column"
        spacing={2}
      >
        {fields.map(f => (
          <Grid item key={f.key}>
            <TextField
              required
              label={t(f.label)}
              value={addressLocationMap[f.key] || ''}
              variant="outlined"
              fullWidth
              onChange={e => handleSetData({ addressLocationMap: { [f.key]: e.target.value } })}
              disabled={disabled}
            />
          </Grid>
        ))}
      </Grid>
    </IconWidget>
  );
}

AssetAddressForm.propTypes = {
  addressLocation: PropTypes.shape({
    address: PropTypes.object.isRequired,
  }),
  handleSetData: PropTypes.func.isRequired,
};

export default AssetAddressForm;
