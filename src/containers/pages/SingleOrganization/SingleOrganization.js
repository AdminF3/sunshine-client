import React from 'react';
import PropTypes from 'prop-types';

// WRAPPERS
import { withRouter } from 'react-router-dom';
import { withTranslation } from 'react-i18next';
import { connect } from 'react-redux';

// COMPONENTS
import { Helmet } from 'react-helmet';
import NavContainer from './../../smartcomponents/navcontainer';
import OrganizationView from './../../../components/organization/OrganizationView/OrganizationView';
import ProgressBar from './../../../components/utils/ProgressBar';
import SnackbarNotification from './../../smartcomponents/SnackbarNotification';

// ACTIONS
import {
  getSingleOrganization as getSingleOrganizationAction,
  isFetchingSingleOrganizationSetDefault
} from './../../../actions/organizations';
import { addAlert } from './../../../actions/alerts';
import { searchUsers } from './../../../actions/users';
import { toggleEditOrganizationDialog } from './../../../actions/dialogs';

class SingleOrganization extends React.Component {

  componentDidMount() {
    const { getSingleOrganization, match, userIsLogged } = this.props;
    const orgId = match.params.id;
    getSingleOrganization(orgId, userIsLogged);
  }
  componentWillUnmount() {
    const { unsetLoggedUserRoleInOrg, isFetchingSingleOrganizationSetDefault } = this.props;
    unsetLoggedUserRoleInOrg();
    isFetchingSingleOrganizationSetDefault();
  }

  // eslint-disable-next-line complexity
  render() {
    const {
      getSingleOrganization,
      fetching,
      userIsLogged,
      userIsSuperUser,
      publicOrgData,
      clearUsersSearchResults,
      isDialogOpen,
      toggleEditOrganizationDialog,
      searchUsers,
      foundUsers,
      alerts,
      addAlert,
      loggedUserRoleInOrg
    } = this.props;

    return (
      <div style={{ height: '100%' }}>
        <Helmet title='Energy Service Companies | SUNShINE'/>
        <NavContainer formName='organizationUpdate'/>
        {alerts && alerts.map((alert, index) => (
          <SnackbarNotification open alert={alert} key={index}/>
        ))}
        {fetching
          ? <ProgressBar />
          : <OrganizationView
              userIsLogged={userIsLogged}
              userIsSuperUser={userIsSuperUser}
              clearResults={clearUsersSearchResults}
              isDialogOpen={isDialogOpen}
              toggleEditOrganizationDialog={toggleEditOrganizationDialog}
              refetch={() => getSingleOrganization(publicOrgData._id, userIsLogged)}
              publicOrg={publicOrgData}
              searchUsers={searchUsers}
              foundUsers={foundUsers ? foundUsers.documents : []}
              addAlert={addAlert}
              loggedUserRoleInOrg={loggedUserRoleInOrg}
              initialValues={publicOrgData.data
                ? {
                    id: publicOrgData._id,
                    name: publicOrgData.data.name,
                    address: publicOrgData.data.address,
                    vat: publicOrgData.data.vat,
                    email: publicOrgData.data.email ? publicOrgData.data.email : '',
                    telephone: publicOrgData.data.telephone ? publicOrgData.data.telephone : '',
                    website: publicOrgData.data.website ? publicOrgData.data.website : '',
                    reg_date: publicOrgData.data.registered ? publicOrgData.data.registered : '',
                    legal_form: publicOrgData.data.legal_form ? publicOrgData.data.legal_form : '',
                    logo: publicOrgData.data.logo ? publicOrgData.data.logo : '',
                    legal_status: publicOrgData.data.legal_status ? Object.values(publicOrgData.data.legal_status) : [],
                    roles: publicOrgData.data.roles ? publicOrgData.data.roles : {},
                    country: publicOrgData.data.country ? publicOrgData.data.country : '',
                  }
                : {}
              }
          />
        }
      </div>
    );
  }
}

SingleOrganization.propTypes = {
  fetching: PropTypes.bool.isRequired,
  publicOrgData: PropTypes.object,
  getSingleOrganization: PropTypes.func.isRequired,
  toggleEditOrganizationDialog: PropTypes.func.isRequired,
  isDialogOpen: PropTypes.bool.isRequired,
  userIsSuperUser: PropTypes.bool.isRequired,
  searchUsers: PropTypes.func.isRequired,
  clearUsersSearchResults: PropTypes.func.isRequired
};

const mapStateToProps = (state) => {
  return {
    userIsLogged: state.user.isAuthenticated,
    fetching: state.organization.isFetchingSingle,
    publicOrgData: state.organization.publicOrgData,
    isDialogOpen: state.dialogs.editOrganizationDialog,
    userIsSuperUser: state.user.isSuperUser,
    foundUsers: state.users.users,
    loggedUserRoleInOrg: state.organization.loggedUserRoleInOrganization,
    alerts: state.alerts.pending,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addAlert: (text, level) => {
      dispatch(addAlert({ text, level }));
    },
    getSingleOrganization: (params, userIsLogged) => {
      dispatch(getSingleOrganizationAction(params, userIsLogged));
    },
    toggleEditOrganizationDialog: () => {
      dispatch(toggleEditOrganizationDialog());
    },
    searchUsers: (value) => {
      dispatch(searchUsers(value));
    },
    unsetLoggedUserRoleInOrg: () => {
      dispatch({ type: 'UNSET_LOGGED_USER_ROLE_IN_ORGANIZATION' });
    },
    clearUsersSearchResults: () => dispatch({ type: 'SEARCH_USERS_FAILURE' }),
    isFetchingSingleOrganizationSetDefault: () => dispatch(isFetchingSingleOrganizationSetDefault())
  };
};
export default withRouter(withTranslation('translations')(connect(
  mapStateToProps,
  mapDispatchToProps
)(SingleOrganization)));
