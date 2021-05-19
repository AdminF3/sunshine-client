import React, { useState} from 'react';
import { useTranslation } from 'react-i18next';
import moment from 'moment';
import {
  Grid,
  Tabs,
  Tab,
  Typography,
  makeStyles,
} from '@material-ui/core';
import {
  Apartment as ApartmentIcon,
} from '@material-ui/icons';

import IconWidget from '../../../../containers/smartcomponents/IconWidget/IconWidget';
import AssetsGrid from '../../../asset/AssetsGrid/AssetsGrid';
import { parseAddress } from '../../../asset/utils';
import { assetTypeTitleKey } from '../../../../constants/assetTypes';
import OrganizationAssetsForm from './OrganizationAssetsForm';

const useStyles = makeStyles({
  tabsContent: {
    position: 'relative',
  },
});

function BuildingForm(props) {
  const {
    assetUUID,
    ownerUUID,
    handleSetData,
  } = props;

  const { t } = useTranslation('translations');
  const [activeTab, setActiveTab] = useState(0);

  const classes = useStyles();

  const handleSetAsset = (a) => {
    let projectName = '';
    let uuid = '';
    if (a) {
      const prefix = moment().format('YYYY-MM');
      projectName = `${prefix} ${parseAddress(a.address, { short: true })}, ${t(`assets.${assetTypeTitleKey(a)}`)}`;
      uuid = a.ID;
    }
    handleSetData({
      assetUUID: uuid,
      name: projectName,
    });
  };

  return (
    <IconWidget
      icon={<ApartmentIcon color="primary" />}
      title={
        <Typography variant="subtitle1">
          {t('projects.building')}
        </Typography>
      }
    >
      <Grid
        container
        spacing={2}
      >
        <Grid item sm={2}>
          <Tabs
            orientation="vertical"
            value={activeTab}
            onChange={(_, idx) => setActiveTab(idx) || handleSetData({ assetUUID: '', name: '' })}
          >
            <Tab label={t('assets.ownerOrgAssets')} />
            <Tab label={t('assets.otherOrgAssets')} />
          </Tabs>
        </Grid>
        <Grid item sm={10} className={classes.tabsContent}>
          {activeTab === 0 && (
            <AssetsGrid
              filterParams={{ owner: ownerUUID }}
              claimResidencyButton={false}
              selectable
              value={assetUUID}
              onChange={handleSetAsset}
            />
          )}
          {activeTab === 1 && (
            <OrganizationAssetsForm
              {...props}
              onSelectAsset={handleSetAsset}
              requestOnly
            />
          )}
        </Grid>
      </Grid>
    </IconWidget>
  );
}

export default BuildingForm;
