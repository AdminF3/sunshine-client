import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { useMutation } from '@apollo/client';
import {
  Grid,
  Tabs,
  Tab,
  makeStyles,
} from '@material-ui/core';
import { useTranslation } from 'react-i18next';

import apolloClient from '../../../utils/apolloClient';
import Widget from '../../utils/Widget';
import ProgressBar from '../../../components/utils/ProgressBar';
import MarkdownText from '../../../components/utils/MarkdownText';
import RolesManager from '../../roles/RolesManager';
import {
  ASSIGN_PORTFOLIO_ROLE,
  REMOVE_PORTFOLIO_ROLE,
  ASSIGN_COUNTRY_ADMIN,
  REMOVE_COUNTRY_ADMIN,
  REMOVE_ADMIN_NW_MANAGER,
} from '../../../actions/usersMutations';
import {
  searchUsers as searchUsersAction,
  getUsersByPlatformRoles as getPRUsersAction,
} from '../../../actions/users';
import { addAlert } from '../../../actions/alerts';
import PlatformManagerCard from './PlatformManagerCard';
import AssignPlatformRoleButton from './AssignPlatformRoleButton';
import { canAssignAdminNWManager, isSuperuser } from '../../../utils/can';
import { LV, BG, SK, AT, RO, PL } from '../../utils/SVGflags';

const useStyles = makeStyles(theme => ({
  root: {
    padding: '20px 0 20px 20px',
    width: '100%',
    '& > div': {
      marginBottom: theme.spacing(2),
      '&:last-child': {
        marginBottom: 0,
      },
    },
  },
  tabs: {
    borderTop: `1px solid ${theme.palette.divider}`,
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
  tab: {
    minWidth: 'inherit !important',
    minHeight: `${theme.spacing(6)}px !important`,
    '& .MuiTab-wrapper': {
      flexDirection: 'row',
      justifyContent: 'flex-start',
      '& > :first-child': {
        margin: '0 10px 0',
      },
    },
    '&.Mui-selected': {
      backgroundColor: theme.palette.action.selected,
      color: theme.palette.text.primary,
    },
  },
}));

const roles = [
  {
    key: 'portfolio_director',
    title: 'Portfolio Director',
    multiple: true,
    assigned: [],
    assignMutation: ASSIGN_PORTFOLIO_ROLE,
    assignMutationVariables: { role: 'PD' },
    deleteMutation: REMOVE_PORTFOLIO_ROLE,
    deleteMutationVariables: { role: 'PD' },
  },
  {
    key: 'data_protection_officer',
    title: 'Data Protection Officer',
    multiple: true,
    assigned: [],
    assignMutation: ASSIGN_PORTFOLIO_ROLE,
    assignMutationVariables: { role: 'DPO' },
    deleteMutation: REMOVE_PORTFOLIO_ROLE,
    deleteMutationVariables: { role: 'DPO' },
  },
  {
    key: 'country_admin',
    title: 'Super User',
    multiple: true,
    assigned: [],
    assignMutation: ASSIGN_COUNTRY_ADMIN,
    assignMutationVariables: {},
    deleteMutation: REMOVE_COUNTRY_ADMIN,
    deleteMutationVariables: {},
  },
  {
    key: 'fund_manager',
    title: 'Fund Manager',
    multiple: true,
    assigned: [],
    assignMutation: ASSIGN_PORTFOLIO_ROLE,
    assignMutationVariables: { role: 'FM' },
    deleteMutation: REMOVE_PORTFOLIO_ROLE,
    deleteMutationVariables: { role: 'FM' },
  },
  {
    key: 'investor',
    title: 'Investor',
    multiple: true,
    assigned: [],
    assignMutation: ASSIGN_PORTFOLIO_ROLE,
    assignMutationVariables: { role: 'INVESTOR' },
    deleteMutation: REMOVE_PORTFOLIO_ROLE,
    deleteMutationVariables: { role: 'INVESTOR' },
  },
];

const countryTabs = [
  { key: 'BG', label: 'Bulgaria', icon: <BG width={22} height={22} padding={0} /> },
  { key: 'LV', label: 'Latvia', icon: <LV width={22} height={22} padding={0} /> },
  { key: 'SK', label: 'Slovakia', icon: <SK width={22} height={22} padding={0} /> },
  { key: 'AT', label: 'Austria', icon: <AT width={22} height={22} padding={0} /> },
  { key: 'RO', label: 'Romania', icon: <RO width={22} height={22} padding={0} /> },
  { key: 'PL', label: 'Poland', icon: <PL width={22} height={22} padding={0} /> },
];

// eslint-disable-next-line complexity
function PlatformRoles(props) {
  const {
    user,
    allUsers,
    platformRoles,
    searchUsers,
    getPRUsers,
    clearUsersSearchResults,
    showAlert,
  } = props;

  const country = user?.profileInfo?.data?.country;
  const canEditAdminNWManagers = canAssignAdminNWManager(user);
  const canAssignPlatformRoles = isSuperuser(user);

  const { t } = useTranslation('translations');
  const [unassignAdminNWManager] = useMutation(REMOVE_ADMIN_NW_MANAGER, {
    client: apolloClient,
    onError: (err) => {
      showAlert({ text: `${t('roles.errorUnassign')}: ${err.message}`, level: 'error' });
      setLoading(false);
    },
    onCompleted: () => {
      setLoading(false);
      getPRUsers();
    },
  });

  useEffect(() => {
    if (!platformRoles.initialized && !platformRoles.loading) {
      getPRUsers();
    }
  }, [getPRUsers, platformRoles]);

  const classes = useStyles();
  const [currTabIDX, setCurrTabIDX] = useState(
    countryTabs.findIndex(tab => tab.label.toLowerCase() === country.toLowerCase()) || 0
  );

  const currCountry = countryTabs[currTabIDX].label;

  const [loading, setLoading] = useState(!allUsers.allUsersReady || platformRoles.loading);
  if (allUsers.allUsersReady && !platformRoles.loading && loading) {
    setLoading(false);
  }

  if (loading || platformRoles.loading) {
    return <ProgressBar />;
  }

  const platformManager = platformRoles.users.find(u => u?.data?.platform_manager);
  const adminNetworkManagers = platformRoles.users.map(
    u => u?.data?.admin_nw_manager ? u : null
  ).filter(v => Boolean(v));

  return (
    <Grid container className={classes.root}>
      <Grid container item spacing={2} xs={12} justify="center">
        {platformManager && (
          <Grid item sm={4} xs={12} key={platformManager._id}>
            <PlatformManagerCard
              user={platformManager.data}
              title={t('platformRoles.platform_manager')}
              tooltip={<MarkdownText text={t('tooltips:admin.rolePFM', { returnObjects: true })} />}
              tooltipIconButtonProps={{ size: 'small', color: 'secondary' }}
            />
          </Grid>
        )}
      </Grid>
      <Grid container item spacing={2} xs={12}>
        {adminNetworkManagers.map(u => (
          <Grid item key={u._id} sm={3} xs={6}>
            <PlatformManagerCard
              user={u.data}
              variant="plain"
              title={t('platformRoles.admin_network_manager')}
              tooltip={<MarkdownText text={t('tooltips:admin.roleNWM', { returnObjects: true })} />}
              onUnassign={canEditAdminNWManagers ?
                () => {
                  setLoading(true);
                  unassignAdminNWManager({ variables: { userID: u._id } });
                } :
                null
              }
            />
          </Grid>
        ))}
      </Grid>

      {canEditAdminNWManagers && (
        <Grid container spacing={2} item xs={12} justify="flex-end">
          <Grid item>
            <AssignPlatformRoleButton
              searchUsers={searchUsers}
              foundUsers={allUsers.users.documents || []}
              clearResults={clearUsersSearchResults}
              refetch={getPRUsers}
              refetchLoading={platformRoles.loading}
            />
          </Grid>
        </Grid>
      )}

      <Grid container spacing={2} item xs={12}>
        <Grid item md={2} xs={12}>
          <Widget
            title={t('platformRoles.countries')}
            tooltip={t('platformRoles.selectCountry')}
          >
            <Tabs
              className={classes.tabs}
              orientation="vertical"
              value={currTabIDX}
              indicatorColor="primary"
              textColor="primary"
              onChange={(_, v) => setCurrTabIDX(v)}
            >
              {countryTabs.map(tp => <Tab className={classes.tab} {...tp} label={t(`countriesKeys.${tp.label}`)} />)}
            </Tabs>
          </Widget>
        </Grid>

        <Grid item md={10} xs={12}>
          <RolesManager
            title={t('platformRoles.manageRolesIn', { country: t(`countriesKeys.${currCountry}`) })}
            tooltip={<MarkdownText text={t('tooltips:admin.platformRoles', { returnObjects: true })} />}
            type="user"
            roles={roles.map(r => ({
              ...r,
              assigned: ((platformRoles.users || []).map(u => {
                if (u.data.country_roles.some(v => v.role === r.key && v.country === currCountry)) {
                  return u.data;
                }
                return null;
              })).filter(v => Boolean(v)),
              assignMutationVariables: {
                ...r.assignMutationVariables,
                country: currCountry,
              },
              deleteMutationVariables: {
                ...r.deleteMutationVariables,
                country: currCountry,
              },
            }))}
            viewOnly={!canAssignPlatformRoles}
            searchUsers={searchUsers}
            foundUsers={allUsers.users.documents || []}
            clearResults={clearUsersSearchResults}
            refetch={getPRUsers}
            refetchLoading={platformRoles.loading}
          />
        </Grid>
      </Grid>
    </Grid>
  );
}

export default connect(
  state => ({
    user: state.user,
    allUsers: state.users,
    platformRoles: state.platformRoles,
  }),
  dispatch => ({
    searchUsers: (search, filter) => {
      dispatch(searchUsersAction(search, filter, 0, 1000));
    },
    getPRUsers: () => dispatch(getPRUsersAction()),
    clearUsersSearchResults: () => dispatch({ type: 'SEARCH_USERS_FAILURE' }),
    showAlert: (params) => dispatch(addAlert(params)),
  })
)(PlatformRoles);
