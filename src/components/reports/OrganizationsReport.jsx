import React from 'react';
import { useQuery } from '@apollo/client';
import { useTranslation } from 'react-i18next';
import {
  CircularProgress,
  makeStyles,
} from '@material-ui/core';

import apolloClient from '../../utils/apolloClient';
import { LIST_ORGANIZATION_REPORTS } from '../../actions/organizationsQueries';
import DataTable from '../utils/DataTable';

const useStyles = makeStyles(theme => ({
  contentWrapper: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
}));

const fields = [
  { key: 'name', titleKey: 'organizations.legalName' },
  { key: 'address', titleKey: 'organizations.address' },
  { key: 'ownProjects', titleKey: 'organizations.ownProjects' },
  { key: 'relatedProjects', titleKey: 'organizations.relatedProjects' },
  { key: 'email', titleKey: 'organizations.email' },
  { key: 'lear', titleKey: 'organizations.lear' },
  { key: 'legalForm', titleKey: 'organizations.legalForm' },
  { key: 'usersCount', titleKey: 'organizations.usersCount' },
  { key: 'telephone', titleKey: 'organizations.phone' },
  { key: 'valid', titleKey: 'organizations.status' },
  { key: 'website', titleKey: 'organizations.website' },
  { key: 'vat', titleKey: 'organizations.vat' },
  { key: 'registrationNumber', titleKey: 'organizations.registrationNumber' },
  { key: 'registered', titleKey: 'organizations.registrationDate' },
];

const fieldsEnabled = [
  'name', 'address', 'telephone', 'lear', 'valid', 'registered',
];

function OrganizationsReport() {
  const classes = useStyles();
  const { t } = useTranslation('translations');

  const { loading, data } = useQuery(LIST_ORGANIZATION_REPORTS, {
    client: apolloClient,
  });

  if (loading) {
    return (
      <div className={classes.contentWrapper}>
        <CircularProgress />
      </div>
    );
  }

  const reportsData = data?.listOrganizationReports?.entities.map(o => ({
    ...o,
    lear: `${o.learName} - ${o.learEmail}`,
    ownProjects: [
      `${t('organizations.totalCount')}: ${o.ownProjects.totalCount}`,
      `${t('organizations.ongoingCount')}: ${o.ownProjects.ongoingCount}`,
      `${t('organizations.monitoringPhaseCount')}: ${o.ownProjects.monitoringPhaseCount}`,
      `${t('organizations.approvedForfaitingCount')}: ${o.ownProjects.approvedForfaitingCount}`,
    ],
    relatedProjects: [
      `${t('organizations.totalCount')}: ${o.relatedProjects.totalCount}`,
      `${t('organizations.ongoingCount')}: ${o.relatedProjects.ongoingCount}`,
      `${t('organizations.monitoringPhaseCount')}: ${o.relatedProjects.monitoringPhaseCount}`,
      `${t('organizations.approvedForfaitingCount')}: ${o.relatedProjects.approvedForfaitingCount}`,
    ],
  }));

  return (
    <DataTable
      data={reportsData}
      fields={fields}
      fieldsEnabled={fieldsEnabled}
      csvFilename="organizations-report"
    />
  );
}

export default OrganizationsReport;
