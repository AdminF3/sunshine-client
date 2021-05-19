import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import clsx from 'clsx';
import {
  AppBar,
  Tabs,
  Tab,
  withStyles,
} from '@material-ui/core';

import { canEditEntity as canEditUser } from '../../../utils/can';
import AdminTable from '../AdminTable/AdminTable';
import UserRoleBadge from '../../utils/UserRoleBadge';
import ProgressBar from '../../utils/ProgressBar';
import Tooltip from '../../utils/TooltipWrapper';
import { legalForms } from '../../../constants/legalStatusTypes';
import { assetTypeOptions } from '../../../constants/assetTypes';
import { projectStatusTypes } from '../../../constants/statusTypes';
import { countries } from '../../../constants/countries';
import PlatformRoles from '../PlatformRoles/PlatformRoles';
import Documents from '../Documents/Documents';
import styles from './styles';

class AdminTabs extends Component {
  tabs = [
    { label: 'Users', labelKey: 'navigation.users', path: '/admin/users' },
    { label: 'Platform roles', labelKey: 'navigation.platformRoles', path: '/admin/roles' },
    { label: 'Organizations', labelKey: 'navigation.organizations', path: '/admin/organizations' },
    { label: 'Assets', labelKey: 'navigation.assets', path: '/admin/assets' },
    { label: 'Projects', labelKey: 'navigation.projects', path: '/admin/projects' },
    { label: 'Required Approvals', labelKey: 'navigation.requiredApprovals', path: '/admin/documents' },
  ];

  get tabContent() {
    switch (this.state.currentRoute) {
      case '/admin/roles':
        return <PlatformRoles />;
      case '/admin/documents':
        return <Documents />;
      case '/admin/organizations':
        return (
          <AdminTable
            entity={this.props.allOrganizations}
            type="organization"
            searchEntity={this.props.searchOrganizations}
            menuItems={legalForms(this.props.t, true)}
          />
        );
      case '/admin/assets':
        return (
          <AdminTable
            entity={this.props.allAssets}
            type="asset"
            searchEntity={this.props.searchAssets}
            menuItems={assetTypeOptions}
          />
        );
      case '/admin/projects':
        return (
          <AdminTable
            entity={this.props.allProjects}
            type="project"
            searchEntity={this.props.searchProjects}
            menuItems={projectStatusTypes(this.props.t)}
          />
        );
      default:
        return (
          <AdminTable
            entity={this.props.allUsers.documents}
            type="user"
            searchEntity={this.props.searchUsers}
            menuItems={countries}
            itemRenderer={entity => <UserRoleBadge user={entity.data} />}
            wrapperRenderer={props => <UserWrapper {...props} t={this.props.t} user={this.props.user} />}
            getLinkProps={entity => ({ disabled: !canEditUser(this.props.user, entity)})}
          />
        );
    }
  }

  get currentTabIndex() {
    for (let i = 0; i < this.tabs.length; i++) {
      if (this.state.currentRoute === this.tabs[i].path) {
        return i;
      }
    }

    return 0;
  }

  constructor(props) {
    super(props);

    this.state = {
      userSearch: '',
      userFilter: '',
      organizationSearch: '',
      organizationFilter: '',
      assetSearch: '',
      assetFilter: '',
      projectSearch: '',
      projectFilter: '',
      currentRoute: window.location.pathname,
    };

    this.handleChangeFilterUsers = this.handleChangeFilterUsers.bind(this);
    this.handleChangeFilterOrgs = this.handleChangeFilterOrgs.bind(this);
    this.handleChangeFilterAssets = this.handleChangeFilterAssets.bind(this);
    this.handleChangeFilterProjs = this.handleChangeFilterProjs.bind(this);
  }

  handleChangeFilterUsers(search, filter) {
    this.setState({ userSearch: search, userFilter: filter });
  }

  handleChangeFilterOrgs(search, filter) {
    this.setState({
      organizationSearch: search,
      organizationFilter: filter
    });
  }

  handleChangeFilterAssets(search, filter) {
    this.setState({ assetSearch: search, assetFilter: filter });
  }

  handleChangeFilterProjs(search, filter) {
    this.setState({ projectSearch: search, projectFilter: filter });
  }

  render() {
    const {
      classes,
      isUsersFetching,
      isOrganizationFetching,
      isAssetFetching,
      isProjectFetching,
    } = this.props;

    // NOTE (edimov): Do not set loading state if searching users
    // in `PlatformRoles` and `Documents components, as they
    // will handle their own loading state.
    const loading = (
      isUsersFetching ||
      isOrganizationFetching ||
      isAssetFetching ||
      isProjectFetching
    ) && ['/admin/roles', '/admin/documents'].indexOf(this.state.currentRoute) === -1;

    return (
      <React.Fragment>
        <AppBar position="static" color="default" classes={{ root: classes.header }}>
          <Tabs
            value={this.currentTabIndex}
            variant="scrollable"
            classes={{
              root: classes.root,
              indicator: classes.indicator,
            }}
          >
            {this.tabs.map(({ labelKey, path }) => (
              <Tab
                key={path}
                label={this.props.t(labelKey)}
                onClick={() => {
                  window.history.pushState('', '', path);
                  this.setState({ currentRoute: path });
                }}
                className={classes.tabLabelStyle}
              />
            ))}
          </Tabs>
        </AppBar>
        <div className={classes.tabsContainer}>
          {loading && <ProgressBar />}
          <div className={clsx(classes.tabsContainerInner, { loading })}>
            {this.tabContent}
          </div>
        </div>
      </React.Fragment>
    );
  }
}

function UserWrapper(props) {
  const {
    user,
    entity,
    t,
  } = props;

  if (!canEditUser(user, entity)) {
    return (
      <Tooltip title={t('errors.adminUserCounttyNotAllowed')}>
        {props.children}
      </Tooltip>
    );
  }

  return (
    <React.Fragment>{props.children}</React.Fragment>
  );
}

export default connect(
  state => ({
    user: state.user,
  }),
)(withTranslation('translations')(withStyles(styles)(AdminTabs)));
