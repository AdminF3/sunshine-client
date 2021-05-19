import React, { useEffect, useCallback } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import {
  CircularProgress,
  makeStyles,
} from '@material-ui/core';

import { access as canViewAllProjects } from '../../utils/can';
import {
  getProjects as getAllProjectsAction,
  getMyProjects as getMyProjectsAction,
} from '../../actions/projects';
import { parseAddress } from '../../components/asset/utils';
import { milestonePhase } from '../../constants/milestones';
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
  { key: 'name', titleKey: 'projects.name' },
  { key: 'owner', titleKey: 'projects.owner' },
  { key: 'asset', titleKey: 'assets.asset' },
  { key: 'phase', titleKey: 'projects.phase' },
  { key: 'status', titleKey: 'organizations.status' },
  { key: 'airtemp', titleKey: 'projects.indoorAirTemperature' },
  { key: 'watertemp', titleKey: 'projects.hotWaterSupplyTemp' },
  { key: 'savings', titleKey: 'projects.energySavings' },
  { key: 'construction_period', titleKey: 'projects.construction_period' },
  { key: 'contract_term', titleKey: 'projects.contractTermsInYears' },
  { key: 'first_year', titleKey: 'projects.firstYearOfContract' },
  { key: 'country', titleKey: 'auth.country' },
  { key: 'portfolio_director', titleKey: 'platformRoles.portfolio_director' },
  { key: 'fund_manager', titleKey: 'platformRoles.fund_manager' },
  { key: 'milestone', titleKey: 'projects.milestone' },
  { key: 'consortium_organizations', titleKey: 'projects.consortiumOrganizations'}
];
const fieldsEnabled = [
  'name',
  'owner',
  'phase',
  'asset',
  'construction_period',
  'portfolio_director',
  'fund_manager',
  'consortium_organizations',
];

function ProjectsReport(props) {
  const {
    user,
    projects,
    getAllProjects,
    getMyProjects,
  } = props;
  const classes = useStyles();
  const userID = user.profileInfo?._id;

  const canViewAll = canViewAllProjects(user, { admin: true, countryRole: ['country_admin', 'portfolio_director'] });

  const getProjects = useCallback(() => {
    if (canViewAll) {
      getAllProjects();
      return;
    }
    getMyProjects(userID);
  }, [getAllProjects, getMyProjects, canViewAll, userID]);

  useEffect(() => {
    getProjects(canViewAll);
  }, [canViewAll, getProjects]);

  if (projects.isFetchingList) {
    return (
      <div className={classes.contentWrapper}>
        <CircularProgress />
      </div>
    );
  }

  const pKey = canViewAll ? 'allProjects' : 'myProjects';

  const projectsData = projects[pKey].map(p => ({
    ...p.data,
    owner: p.data?.owner?.data?.name,
    asset: parseAddress(p.data?.asset?.data?.address),
    portfolio_director: p.data?.portfolio_director?.data?.name,
    fund_manager: p.data?.fund_manager?.data?.name,
    construction_period: `
      ${moment(p.data?.construction_from).format('YYYY-MM-DD')}
      -
      ${moment(p.data?.construction_to).format('YYYY-MM-DD')}
    `,
    phase: milestonePhase(p.data?.milestone).toUpperCase(),
    consortium_organizations: p.data?.consortium_organizations?.length || 0
  }));

  return (
    <DataTable
      data={projectsData}
      fields={fields}
      fieldsEnabled={fieldsEnabled}
      csvFilename="projects-report"
    />
  );
}

export default connect(
  state => ({
    user: state.user,
    projects: state.project,
  }),
  dispatch => ({
    getAllProjects: () => dispatch(getAllProjectsAction()),
    getMyProjects: (userID) => dispatch(getMyProjectsAction(userID, true)),
  }),
)(ProjectsReport);
