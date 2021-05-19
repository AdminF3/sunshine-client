import React from 'react';
import { connect } from 'react-redux';
import { useQuery } from '@apollo/client';
import { useTranslation } from 'react-i18next';

import {
  CircularProgress,
  makeStyles,
} from '@material-ui/core';

import apolloClient from '../../utils/apolloClient';
import { access as canViewAllAssets } from '../../utils/can';
import { LIST_ASSETS } from '../../actions/assetsQueries';
import { parseAddress } from '../../components/asset/utils';
import DataTable from '../utils/DataTable';

import { getProjectPhase } from '../../constants/milestones';

const useStyles = makeStyles(theme => ({
  contentWrapper: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
}));

const fields = [
  { key: 'address', titleKey: 'assets.address' },
  { key: 'residentsCount', titleKey: 'assets.residentsCount' },
  { key: 'cadastre', titleKey: 'assets.cadastreNumber' },
  { key: 'ownerName', titleKey: 'projects.owner' },
  { key: 'coords', titleKey: 'assets.coordinates' },
  { key: 'area', titleKey: 'assets.totalArea' },
  { key: 'heatedArea', titleKey: 'assets.heatedArea' },
  { key: 'billingArea', titleKey: 'assets.billingArea' },
  { key: 'flats', titleKey: 'assets.numberOfFlats' },
  { key: 'floors', titleKey: 'assets.numberOfFloors' },
  { key: 'stairCases', titleKey: 'assets.numberOfStaircases' },
  { key: 'buildingType', titleKey: 'assets.assetType' },
  { key: 'heatingType', titleKey: 'assets.typeOfHeating' },
  { key: 'status', titleKey: 'organizations.status' },
  { key: 'country', titleKey: 'auth.country' },
  { key: 'createdAt', titleKey: 'assets.createdAt' },
  { key: 'numberProjects', titleKey: 'projects.numberProjects' },
  { key: 'projects', titleKey: 'navigation.projects'},
  { key: 'isFAApproved', titleKey: 'projects.faStatus'},
  { key: 'projectPhase', titleKey: 'projects.projectPhase'}
];

const fieldsEnabled = [
  'address',
  'residentsCount',
  'buildingType',
  'heatingType',
  'status',
  'createdAt',
];

function AssetsReport(props) {
  const { user } = props;
  const classes = useStyles();
  const { t } = useTranslation('translations');

  const canViewAll = canViewAllAssets(user, { admin: true, countryRole: ['country_admin', 'portfolio_director'] });

  const { loading, data } = useQuery(LIST_ASSETS, {
    client: apolloClient,
    variables: {
      filterMine: !canViewAll,
    },
  });

  if (loading) {
    return (
      <div className={classes.contentWrapper}>
        <CircularProgress />
      </div>
    );
  }

  const assetsData = data?.listAssets?.entities.map(a => ({
    ...a,
    address: parseAddress(a.address),
    numberProjects: a.projects.length,
    projects: `${a.projects.map(p => p.name + '\n').join('')}`,
    isFAApproved: `${a.projects.map(p => p.isFAApproved ? t('utils.approved') : t('utils.notApproved') + '\n').join('')}`,
    projectPhase: `${a.projects.map(p => getProjectPhase(p, t).label + '\n').join('')}`
  }));

  return (
    <DataTable
      data={assetsData}
      fields={fields}
      fieldsEnabled={fieldsEnabled}
      csvFilename="assets-report"
    />
  );
}

export default connect(
  state => ({
    user: state.user,
  }),
)(AssetsReport);
