import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import {
  CircularProgress,
  makeStyles,
} from '@material-ui/core';

import { getAllUsers as getUsersAction } from '../../actions/users';
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
  { key: 'email', titleKey: 'auth.email' },
  { key: 'name', titleKey: 'projects.name' },
  { key: 'telephone', titleKey: 'organizations.phone' },
  { key: 'valid', titleKey: 'organizations.status' },
  { key: 'country', titleKey: 'auth.country' },
  { key: 'platformRoles', titleKey: 'navigation.platformRoles' },
  { key: 'organizationRoles', titleKey: 'organizations.organizationRoles' },
  { key: 'projectRoles', titleKey: 'projects.projectRoles' },
];
const fieldsEnabled = [
  'email', 'name', 'telephone', 'valid', 'country', 'platformRoles', 'organizationRoles', 'projectRoles',
];

function UsersReport(props) {
  const {
    users,
    getUsers,
  } = props;
  const classes = useStyles();

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  if (users.isUsersFetching) {
    return (
      <div className={classes.contentWrapper}>
        <CircularProgress />
      </div>
    );
  }

  const usersData = users?.users?.documents.map(u => ({
    ...u.data,
    platformRoles: (u.data?.country_roles || []).map(r => `${r.role} ${r.country}`),
    organizationRoles: (u.data?.organization_roles || []).map(r => `${r.position} ${r.organization_id}`),
    projectRoles: (u.data?.project_roles || []).map(r => `${r.position} ${r.project_id}`),
  }));

  return (
    <DataTable
      data={usersData}
      fields={fields}
      fieldsEnabled={fieldsEnabled}
      csvFilename="users-report"
    />
  );
}

export default connect(
  state => ({
    users: state.users,
  }),
  dispatch => ({
    getUsers: () => dispatch(getUsersAction()),
  }),
)(UsersReport);
