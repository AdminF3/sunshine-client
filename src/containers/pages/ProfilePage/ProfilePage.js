import React from 'react';
import PropTypes from 'prop-types';

// WRAPPERS
import { withRouter } from 'react-router-dom';
import { withTranslation } from 'react-i18next';
import { connect } from 'react-redux';

// COMPONENTS
import { Helmet } from 'react-helmet';
import NavContainer from '../../smartcomponents/navcontainer';
import SnackbarNotification from '../../smartcomponents/SnackbarNotification';
import RestorePassword from '../../../components/authentication/RestorePassword/RestorePassword';
import UserProfile from '../../../components/user/UserProfile/UserProfile';
import ProgressBar from '../../../components/utils/ProgressBar';

// ACTIONS
import {
  getMyUserData as getMyUserDataAction,
  getPublicUserdata as getPublicUserdataAction,
  updateUserProfile as updateUserProfileAction,
  updateAnotherUserProfile as updateAnotherUserProfileAction,
} from '../../../actions/user';
import { getMyOrganizations as getMyOrganizationsAction } from '../../../actions/organizations';
import { getMyProjects as getMyProjectsAction } from '../../../actions/projects';
import { getMyAssets as getMyAssetsAction } from '../../../actions/assets';

class ProfilePage extends React.Component {
  componentDidMount() {
    const {
      getPublicUserdata,
      getMyUserData,
      match,
      getMyOrganizations,
      getMyProjects,
      getMyAssets,
      userIsLogged,
    } = this.props;

    const userId = match.params.id;

    if (match.path === '/profile') {
      getMyUserData(userIsLogged);
      getMyOrganizations(userIsLogged, true);
      getMyProjects(userIsLogged, true);
      getMyAssets(userIsLogged);
    } else {
      getPublicUserdata(userId);
      getMyOrganizations(userId, false);
      getMyProjects(userId, false);
      getMyAssets(userId);
    }
  }

  render() {
    const {
      alerts,
      match,
      myUserData,
      publicUserData,
      getMyUserData,
      getPublicUserdata,
      loadingUser,
      isFetchingOrganizations,
      updateUser,
      updateAnotherUser,
    } = this.props;

    const loading = loadingUser || isFetchingOrganizations;
    const isPrivate = match.path === '/profile' && true;
    const restorePassView = (match.path === '/profile/:')
      ? <RestorePassword />
      : '';

    return (
      <div style={{ height: '100%' }}>
        <Helmet title='User Profile | SUNShINE' />
        <NavContainer formName='profileUpdate' />
        {alerts && alerts.map((a, index) => (
          <SnackbarNotification open alert={a} key={index} />
        ))}
        {restorePassView
          ? restorePassView
          : !loading
            ?
            <UserProfile
              userData={isPrivate ? myUserData : publicUserData}
              refetch={isPrivate ? getMyUserData : getPublicUserdata}
              updateUser={isPrivate ? updateUser : updateAnotherUser}
              isPrivate={isPrivate}
            />
            : <ProgressBar />
        }
      </div>
    );
  }
}

ProfilePage.propTypes = {
  myOrganizations: PropTypes.arrayOf(PropTypes.object),
  getMyOrganizations: PropTypes.func.isRequired,
};

export default withRouter(withTranslation('translations')(connect(
  state => ({
    userIsLogged: state.user.isAuthenticated,
    myUserData: state.user.profileInfo,
    publicUserData: state.user.publicUserdata,
    loadingUser: state.user.isFetching,
    isFetchingOrganizations: state.organization.isFetchingMine,
    alerts: state.alerts.pending,
    changePassword: state.auth.changePassword,
  }),
  dispatch => ({
    getPublicUserdata: (userId) => dispatch(getPublicUserdataAction(userId)),
    getMyUserData: (userId) => dispatch(getMyUserDataAction(userId)),
    getMyOrganizations: (userId, isMine) => dispatch(getMyOrganizationsAction(userId, isMine)),
    getMyProjects: (userId, isMine) => dispatch(getMyProjectsAction(userId, isMine)),
    getMyAssets: (userId) => dispatch(getMyAssetsAction(userId)),
    updateUser: (data) => dispatch(updateUserProfileAction(data)),
    updateAnotherUser: (data) => dispatch(updateAnotherUserProfileAction(data)),
  })
)(ProfilePage)));
