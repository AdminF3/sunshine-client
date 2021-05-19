import React from 'react';
import { connect } from 'react-redux';
import { useTranslation } from 'react-i18next';
import moment from 'moment';
import {
  Grid,
  Typography,
  makeStyles,
} from '@material-ui/core';
import {
  BusinessCenter as NameAndAddressIcon,
  HomeWork as ResidentsCommunityIcon,
} from '@material-ui/icons';

import IconWidget from '../../../containers/smartcomponents/IconWidget/IconWidget';
import { isResidentsCommunity } from '../../../constants/legalStatusTypes';
import { countriesLabels } from '../../../constants/countries';
import Input from '../../utils/Input';
import AssetsGrid from '../../asset/AssetsGrid/AssetsGrid';
import { parseAddress } from '../../asset/utils';
import styles from './styles';

const useStyles = makeStyles(styles);

function OrganizationNameForm(props) {
  const { t } = useTranslation('translations');
  const classes = useStyles();

  let titleKey = 'organizations.nameAndAddress';
  let TileIcon = NameAndAddressIcon;
  if (isResidentsCommunity(props.legal_form) && !props.ID) {
    titleKey = 'organizations.residentsCommunityAsset';
    TileIcon = ResidentsCommunityIcon;
  }
  return (
    <IconWidget
      className={classes.formWidget}
      icon={<TileIcon color="primary" />}
      title={
        <Typography variant="subtitle1">
          {t(titleKey)}
        </Typography>
      }
    >
      <Form {...props} />
    </IconWidget>
  );
}

function Form(props) {
  const {
    legal_form,
    communityAssetUUID,
    handleSetData,
    user,
  } = props;

  const { t } = useTranslation('translations');

  const handleSelectAsset = (asset) => {
    const address = parseAddress(asset.address);

    handleSetData({
      communityAssetUUID: asset.ID,
      name: address,
      address,
      country: asset.country,
      vat: `RC_${asset.ID}`,
      registration_number: `RC_${asset.ID}`,
      registered: moment().format('YYYY-MM-DD'),
      website: `sunshine.stageai.tech/asset/${asset.ID}`,
      email: user?.profileInfo?.data?.email,
    });
  };

  // If selected `legal_form` is a `RESIDENTS_COMMUNITY` don't render
  // name and address input fields but extract the data from the
  // residential asset itself.
  if (isResidentsCommunity(legal_form) && !props.ID) {
    return (
      <AssetsGrid
        userAssets
        selectable
        claimResidencyButton={false}
        value={communityAssetUUID}
        onChange={handleSelectAsset}
        filterParams={{ esco: 'null' }}
      />
    );
  }

  return (
    <Grid
      container
      spacing={3}
    >
      <Grid item xs={12}>
        <Input
          label={t('organizations.legalNamePlaceholder')}
          required
          value={props.name}
          onChange={e => handleSetData({ name: e.target.value })}
          fullWidth
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <Input
          label={t('organizations.addressPlaceholder')}
          required
          value={props.address}
          onChange={e => handleSetData({ address: e.target.value })}
          fullWidth
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <Input
          label={t('organizations.regCountry')}
          required
          value={countriesLabels.indexOf(props.country).toString()}
          onChange={e => handleSetData({ country: countriesLabels[e.target.value] })}
          options={countriesLabels.map((c, i) => ({ value: i, label: c }))}
          fullWidth
        />
      </Grid>
    </Grid>
  );

}

export default connect(
  state => ({
    user: state.user,
  }),
)(OrganizationNameForm);
