import React from 'react';
import PropTypes from 'prop-types';

// WRAPPERS
import { withRouter } from 'react-router-dom';
import { withTranslation } from 'react-i18next';
import { connect } from 'react-redux';

// COMPONENTS
import { Helmet } from 'react-helmet';
import NavContainer from './../../smartcomponents/navcontainer';
import OuterTabs from '../../../components/project/ProjectTabs/OuterTabs';

// ACTIONS
import { searchMyAssets, getAllAssets, clearMyAssets } from './../../../actions/assets';
import { getMyOrganizations, getAllOrganizations } from './../../../actions/organizations';
import {
  getSingleProject as getSingleProjectAction,
  updateIndoorClima,
  isFetchingSingleProjectSetDefault,
} from './../../../actions/projects';
import {
  updateBudgetTable,
  updateEnergyTable,
  updateMaintenanceTable,
  updateFeesTable,
  updateAnnexesFields
} from './../../../actions/annex';
import { toggleEditAssetDialog, toggleEditProjectDialog } from './../../../actions/dialogs';
import { searchUsers } from './../../../actions/users';
import SnackbarNotification from './../../smartcomponents/SnackbarNotification';

class ProjectView extends React.Component {

  UNSAFE_componentWillMount() {
    const { match, getSingleProject, userIsLogged } = this.props;
    getSingleProject(match.params.id, userIsLogged);
  }

  componentDidUpdate() {
    const { userIsLogged } = this.props;
    if (!userIsLogged) {
      this.props.history.push('/');
    }
  }

  componentWillUnmount() {
    const { unsetLoggedUserRole, isFetchingSingleProjectSetDefault } = this.props;
    unsetLoggedUserRole();
    isFetchingSingleProjectSetDefault();
  }

  render() {
    const {
      user,
      userIsLogged,
      toggleEditAssetDialog,
      isDialogOpen,
      singleProject,
      fetchingProj,
      singleAssetReady,
      singleProjectReady,
      singleOrganizationReady,
      annex1Ready,
      annex3Ready,
      annex4Ready,
      annex5Ready,
      annexes,
      updateBudgetTable,
      foundUsers,
      searchUsers,
      clearUsersSearchResults,
      updateEnergyTable,
      updateMaintenanceTable,
      updateFeesTable,
      toggleEditProjectDialog,
      outerIndex,
      innerIndex,
      clearMyAssets,
      isProjectDialogOpen,
      searchMyAssets,
      getAllAssets,
      getAllOrganizations,
      foundAssets,
      foundOrganizations,
      clearAssetSearchResults,
      forfaitingFields,
      loggedUserRole,
      match,
      updateAnnexesFields,
      userIsSuperUser,
      annex67Ready,
      forfaitingReady,
      indoorClimaFields,
      updateIndoorClima,
      alerts,
      getSingleProject
    } = this.props;

    const projectId = match.params.id;
    let clientName;
    let asset;
    let organization;

    if (!fetchingProj && singleProjectReady) {
      asset = singleProject?.dependencies?.[singleProject.data.asset];
      organization = singleProject?.dependencies?.[singleProject.data.owner];
      clientName = singleProject?.dependencies?.[asset?.data?.owner].data?.name;
    }

    return (
      <React.Fragment>
        <Helmet title='Energy Service Companies | SUNShINE' />
        <NavContainer />
        {alerts && alerts.map((a, index) => <SnackbarNotification open alert={a} key={index} />)}

        {singleProjectReady &&
          <OuterTabs
            user={user}
            fetchingProj={fetchingProj}
            singleAsset={asset}
            singleProject={singleProject}
            userIsLogged={userIsLogged}
            projectClientName={clientName}
            toggleEditAssetDialog={toggleEditAssetDialog}
            toggleEditProjectDialog={toggleEditProjectDialog}
            isDialogOpen={isDialogOpen}
            isProjectDialogOpen={isProjectDialogOpen}
            annexes={annexes}
            foundUsers={foundUsers}
            singleOrganizationReady={singleOrganizationReady}
            singleAssetReady={singleAssetReady}
            clearResults={clearUsersSearchResults}
            updateBudgetTable={updateBudgetTable}
            singleProjectReady={singleProjectReady}
            singleOrganization={organization}
            searchUsers={searchUsers}
            annex1Ready={annex1Ready}
            annex3Ready={annex3Ready}
            annex4Ready={annex4Ready}
            annex5Ready={annex5Ready}
            updateEnergyTable={updateEnergyTable}
            updateMaintenanceTable={updateMaintenanceTable}
            updateFeesTable={updateFeesTable}
            searchMyAssets={searchMyAssets}
            getAllAssets={getAllAssets}
            getAllOrganizations={getAllOrganizations}
            foundAssets={foundAssets}
            foundOrganizations={foundOrganizations}
            clearAssetSearchResults={clearAssetSearchResults}
            loggedUserRole={loggedUserRole}
            match={match}
            updateAnnexesFields={updateAnnexesFields}
            userIsSuperUser={userIsSuperUser}
            annex67Ready={annex67Ready}
            forfaitingReady={forfaitingReady}
            forfaitingFields={forfaitingFields}
            indoorClimaFields={indoorClimaFields}
            updateIndoorClima={updateIndoorClima}
            outerIndex={outerIndex}
            innerIndex={innerIndex}
            clearMyAssets={clearMyAssets}
            getSingleProject={(id, settings = { refetch: false }) => getSingleProject(id, userIsLogged, settings)}
            projectId={projectId}
          />
        }
      </React.Fragment>
    );
  }
}

ProjectView.propTypes = {
  toggleEditAssetDialog: PropTypes.func.isRequired,
  toggleEditProjectDialog: PropTypes.func.isRequired,
  isDialogOpen: PropTypes.bool.isRequired,
  isProjectDialogOpen: PropTypes.bool.isRequired,
  fetching: PropTypes.bool.isRequired,
  updateBudgetTable: PropTypes.func.isRequired,
  searchUsers: PropTypes.func.isRequired,
  clearUsersSearchResults: PropTypes.func.isRequired,
  updateEnergyTable: PropTypes.func.isRequired,
  updateMaintenanceTable: PropTypes.func.isRequired,
  updateFeesTable: PropTypes.func.isRequired,
  searchMyAssets: PropTypes.func.isRequired,
  foundOrganizations: PropTypes.arrayOf(PropTypes.object),
  clearAssetSearchResults: PropTypes.func.isRequired,
  updateAnnexesFields: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  return {
    user: state.user,
    userIsLogged: state.user.isAuthenticated,
    isDialogOpen: state.dialogs.editAssetDialog,
    isProjectDialogOpen: state.dialogs.editProjectDialog,
    singleProject: state.project.singleProject,
    fetching: state.project.isFetchingSingle,
    fetchingProj: state.project.isFetchingProj,
    fetchingAst: state.asset.fetchingAst,
    singleAsset: state.asset.singleAsset,
    singleOrganization: state.organization.publicOrgData,
    singleAssetReady: state.asset.singleAssetReady,
    singleProjectReady: state.project.singleProjectReady,
    singleOrganizationReady: state.organization.singleOrganizationReady,
    annex1Ready: state.project.annexes.annex1.annex1Ready,
    annex3Ready: state.project.annexes.annex3.annex3Ready,
    annex4Ready: state.project.annexes.annex4.annex4Ready,
    annex5Ready: state.project.annexes.annex5.annex5Ready,
    annexes: state.project.annexes,
    foundUsers: state.users.users,
    foundAssets: state.asset.myAssets,
    foundOrganizations: state.organization.myOrganizations,
    loggedUserRole: state.project.loggedUserRole,
    userIsSuperUser: state.user.isSuperUser,
    annex67Ready: state.project.annexes.annex67.annex67Ready,
    forfaitingReady: state.project.forfaitingAgreement.forfaitingReady,
    forfaitingFields: state.project.forfaitingAgreement.forfaitingFields,
    indoorClimaFields: state.project.indoorClima.indoorClimaFields,
    alerts: state.alerts.pending,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    toggleEditAssetDialog: () => {
      dispatch(toggleEditAssetDialog());
    },
    toggleEditProjectDialog: () => {
      dispatch(toggleEditProjectDialog());
    },
    getSingleProject: (params, userIsLogged, settings = { refetch: false }) => {
      dispatch(getSingleProjectAction(params, userIsLogged, settings));
    },
    updateBudgetTable: (params, data, id) => {
      dispatch(updateBudgetTable(params, data, id));
    },
    updateEnergyTable: (params, data, id) => {
      dispatch(updateEnergyTable(params, data, id));
    },
    updateMaintenanceTable: (params, data, id) => {
      dispatch(updateMaintenanceTable(params, data, id));
    },
    updateFeesTable: (params, data, id, monthsInputValue) => {
      dispatch(updateFeesTable(params, data, id, monthsInputValue));
    },
    searchUsers: (value) => {
      dispatch(searchUsers(value));
    },
    clearUsersSearchResults: () => {
      dispatch({ type: 'SEARCH_USERS_FAILURE' });
    },
    searchMyAssets: (userId, params) => {
      dispatch(searchMyAssets(userId, params));
    },
    getMyOrganizations: (userId) => {
      dispatch(getMyOrganizations(userId));
    },
    clearAssetSearchResults: () => {
      dispatch({ type: 'SEARCH_ASSETS_FAILURE' });
    },
    unsetLoggedUserRole: () => {
      dispatch({ type: 'UNSET_LOGGED_USER_ROLE' });
    },
    getAllAssets: (params) => {
      dispatch(getAllAssets(params));
    },
    getAllOrganizations: (params) => {
      dispatch(getAllOrganizations(params));
    },
    updateAnnexesFields: (params, id) => {
      dispatch(updateAnnexesFields(params, id));
    },
    updateIndoorClima: (params, projectId) => {
      dispatch(updateIndoorClima(params, projectId));
    },
    isFetchingSingleProjectSetDefault: () => {
      dispatch(isFetchingSingleProjectSetDefault());
    },
    clearMyAssets: () => {
      dispatch(clearMyAssets());
    }
  };
};

export default withRouter(withTranslation('translations')(connect(
  mapStateToProps,
  mapDispatchToProps
)(ProjectView)));
