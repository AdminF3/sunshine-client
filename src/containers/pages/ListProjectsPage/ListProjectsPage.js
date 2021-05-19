import React, { useState } from 'react';
import PropTypes from 'prop-types';

// WRAPPERS
import { withRouter } from 'react-router-dom';
import { withTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';

// COMPONENTS
import { Helmet } from 'react-helmet';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button
} from '@material-ui/core';
import NavContainer from './../../smartcomponents/navcontainer';
import ProgressBar from './../../../components/utils/ProgressBar';
import ProjectCard from './../../../components/project/ProjectCard/ProjectCard';
import ProjectEditor from './../../../components/project/ProjectEditor/ProjectEditor';
import SnackbarNotification from './../../smartcomponents/SnackbarNotification';
import SearchAndFilter from './../../smartcomponents/SearchAndFilter';
import Pagination from 'react-js-pagination';
import OrganizationAssetsForm from '../../../components/project/ProjectForms/BuildingForm/OrganizationAssetsForm';

// ACTIONS
import {
  setTypeFilter,
  searchMyAssets,
  getSingleAsset,
  getAllAssets,
  clearMyAssets
} from './../../../actions/assets';

import {
  searchMyOrganizations,
  getAllOrganizations
} from './../../../actions/organizations';

import {
  getAllProjects,
  searchProjects,
  getMyProjects,
  getSingleProject,
  isFetchingListProjectSetDefault,
  searchMyProjects,
} from './../../../actions/projects';

import { toggleProjectDialog } from './../../../actions/dialogs';
import { validStatus, projectStatusTypes } from '../../../constants/statusTypes';

// OTHER RESOURCES
import projectSVG from './../../../images/svgIcons/Project.svg';
import requestPermissionSVG from './../../../images/svgIcons/Project_Request_Approval.svg';
import { canViewPublicProjects } from '../../../utils/can';
import MarkdownText from '../../../components/utils/MarkdownText';
import styles from './styles';

const allProjectsNumberPerPage = 12;
const myProjectsNumberPerPage = 10;

class ListProjecstPage extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      total: 0,
      allProjects: 0,
      number: 0,
      publicPage: 1,
      privatePage: 1,
      isPublic: window.location.hash === '#all',
      viewInitialized: false,
      searchAll: '',
      filterAll: '',
      searchMine: '',
      filterMine: '',
      projectEditorOpen: false,
    };
  }

  componentDidMount() {
    const {
      getAllProjects,
      getMyProjects,
      searchMyOrganizations,
      userIsLogged,
      clearMyAssets,
      user,
    } = this.props;

    if (canViewPublicProjects(user)) {
      getAllProjects();
      getMyProjects(userIsLogged, true, 0, myProjectsNumberPerPage);
      searchMyOrganizations(userIsLogged, { status: validStatus });
    } else if (userIsLogged) {
      getMyProjects(userIsLogged, true, 0, myProjectsNumberPerPage);
      searchMyOrganizations(userIsLogged, { status: validStatus });
    }
    getAllOrganizations();
    clearMyAssets();
  }

  componentDidUpdate() {
    const {
      registered,
      fetching,
      myProjectsNumber,
      user,
    } = this.props;
    if (registered !== '' && registered !== undefined) {
      this.props.history.push('/project/' + registered);
    }

    const { isPublic, viewInitialized } = this.state;

    if (!fetching && !isPublic && !viewInitialized && myProjectsNumber === 0 && canViewPublicProjects(user)) {
      this.handleChangeView(true);
    }
  }

  componentWillUnmount() {
    this.props.isFetchingListProjectSetDefault();
  }

  handleChangeView = (newValue) => {
    this.setState({ isPublic: newValue, viewInitialized: true });
  }

  handleChangeFilter = (search, filter) => {
    if (this.state.isPublic) {
      this.setState({ searchAll: search, filterAll: filter.value });
    } else {
      this.setState({ searchMine: search, filterMine: filter });
    }
  }

  handleSetActivePageToDefault = () => {
    if (this.state.isPublic) {
      this.setState({ publicPage: 1 });
    } else {
      this.setState({ privatePage: 1 });
    }
  }

  /* eslint-disable complexity */
  render() {
    const {
      userIsLogged, typeFilter, searchProjects, allProjects, fetching, userIsSuperUser, user,
      getSingleProject, getSingleAsset, alerts,
      myProjects, getAllProjects, getMyProjects, allProjectsNumber,
      myProjectsNumber, searchMyProjects, classes, t,
    } = this.props;

    const separators = [
      {
        href: '#private',
        title: t('translations:projects.privateProjects'),
      },
      {
        href: '#all',
        title: t('translations:projects.allProjects'),
      },
    ].filter(v => (v.href === '#all' && canViewPublicProjects(user)) || v.href === '#private');

    const { isPublic, searchAll, filterAll, searchMine, filterMine } = this.state;

    const Separator = () => (
      <div className={classes.prjPageSeparatorContainer}>
        {separators.map((s, i) => {
          const isActive = (isPublic && s.href === '#all') || (!isPublic && s.href === '#private');
          const className = isActive ? classes.prjPageSeparatorTextActive : classes.prjPageSeparatorTextInactive;

          return (
            <React.Fragment key={s.href}>
              <a
                href={s.href}
                className={className}
                onClick={() => this.handleChangeView(s.href === '#all')}
              >
                {s.title}
              </a>
              {i === 0 && separators.length === 2 && <span className={classes.prjPageSeparatorLine}>|</span>}
            </React.Fragment>
          );
        })}
      </div>
    );

    const registerProjectCard = (
      <div className="col-xs" style={{ width: '300px', flexGrow: 0 }}>
        <div onClick={() => this.setState({ projectEditorOpen: true })} className={classes.prjCardBasePrjsList}>
          <div className={`row ${classes.projectRegisterCardInnerContainer}`}>
            <img
              alt='Register Project'
              src={projectSVG}
              width='150px'
              height='120px'
              style={{ alignSelf: 'center', marginTop: '66px' }}
            />
          </div>
          <div className={`row ${classes.projectRegisterCardInnerContainer}`}>
            <div className={classes.projectPageRegisterText} >
              {t('translations:projects.registerProject')}
            </div>
          </div>
        </div>
      </div>
    );

    const allProject = (
      <div>
        <div className={`row ${classes.cardContainerInner}`}>
          {allProjects && allProjects.map((prj, i) => i < allProjectsNumberPerPage && (
            <ProjectCard
              userIsSuperUser={userIsSuperUser}
              typeOfView="public"
              key={prj._id}
              data={prj}
            />
          ))}
        </div>
        { fetching ? '' :
          <div style={{ display: 'flex' }}>
            {allProjectsNumber > allProjectsNumberPerPage && <Pagination
              activePage={this.state.publicPage}
              itemsCountPerPage={allProjectsNumberPerPage}
              totalItemsCount={parseInt(allProjectsNumber, 10)}
              pageRangeDisplayed={5}
              onChange={publicPage => {
                this.setState({ publicPage });
                const offset = parseInt(publicPage + '0', allProjectsNumberPerPage);
                if (searchAll !== '' || filterAll !== '') {
                  searchProjects(searchAll, filterAll, offset - allProjectsNumberPerPage);
                } else {
                  getAllProjects(offset - allProjectsNumberPerPage);
                }
              }}
              firstPageText='<<'
              prevPageText='<'
              nextPageText='>'
              lastPageText='>>'
              innerClass={classes.innerClass}
              itemClass={classes.itemClass}
              linkClass={classes.linkClass}
              activeClass={classes.activeClass}
              activeLinkClass={classes.activeLinkClass}
              itemClassFirst={classes.itemClassFirst}
              itemClassLast={classes.itemClassLast}
            />}
          </div>
        }
      </div>
    );

    const myProject = (
      <React.Fragment>
        <div className={`row ${classes.cardContainerInner}`}>
          {registerProjectCard}
          <RequestAssetPermission {...this.props} />
          <ProjectEditor
            open={this.state.projectEditorOpen}
            handleClose={() => this.setState({ projectEditorOpen: false })}
            title={t('projects.registerNewProject')}
          />
          {myProjects && myProjects.map((prj, i) => i < myProjectsNumberPerPage && (
            <ProjectCard
              typeOfView='private'
              key={prj._id}
              data={prj}
              userIsLogged={userIsLogged}
              getSingleProject={getSingleProject}
              getSingleAsset={getSingleAsset}
            />
          ))}
        </div>
        { fetching ? '' :
          <div style={{ display: 'flex' }}>
            {myProjectsNumber > myProjectsNumberPerPage && <Pagination
              activePage={this.state.privatePage}
              itemsCountPerPage={myProjectsNumberPerPage}
              totalItemsCount={myProjectsNumber}
              pageRangeDisplayed={5}
              onChange={privatePage => {
                this.setState({ privatePage });
                const offset = parseInt(privatePage + '0', myProjectsNumberPerPage);
                if (searchMine !== '' || filterMine !== '') {
                  searchMyProjects(userIsLogged, {
                    search: searchMine,
                    status: filterMine,
                    offset: offset - myProjectsNumberPerPage,
                    limit: myProjectsNumberPerPage
                  });
                } else {
                  getMyProjects(userIsLogged, true, offset - myProjectsNumberPerPage);
                }
              }}
              firstPageText='<<'
              prevPageText='<'
              nextPageText='>'
              lastPageText='>>'
              innerClass={classes.innerClass}
              itemClass={classes.itemClass}
              linkClass={classes.linkClass}
              activeClass={classes.activeClass}
              activeLinkClass={classes.activeLinkClass}
              itemClassFirst={classes.itemClassFirst}
              itemClassLast={classes.itemClassLast}
            />}
          </div>
        }
      </React.Fragment>
    );

    return (
      <div style={{ height: '100%' }}>
        <Helmet title='Energy Service Companies | SUNShINE' />
        <NavContainer />

        <div className={classes.searchAndFilterContainer}>
          <SearchAndFilter
            filterValue={typeFilter || 0}
            searchAndFilter={isPublic ? searchProjects : searchMyProjects}
            menuItems={projectStatusTypes(t)}
            adminView={false}
            placeHolder={'Search By Name'}
            isPublic={isPublic}
            userID={userIsLogged}
            setFilter={this.handleChangeFilter}
            handleSetActivePageToDefault={this.handleSetActivePageToDefault}
            offset={0}
            limit={isPublic ? 10 : 9}
            tooltip={<MarkdownText text={t('tooltips:projects.info', { returnObjects: true })} />}
          />
        </div>

        {alerts && alerts.map((msg, index) => (
          <SnackbarNotification open alert={msg} key={index} />
        ))}

        { fetching
          ?
          <ProgressBar />
          :
          <div className={classes.cardContainerOuter}>
            <Separator />
            {isPublic
              ?
              allProject
              :
              myProject
            }
          </div>
        }
      </div>
    );
  }
}

ListProjecstPage.propTypes = {
  allProjects: PropTypes.arrayOf(PropTypes.object),
  myProjects: PropTypes.arrayOf(PropTypes.object),
  typeFilter: PropTypes.number,
  fetching: PropTypes.bool.isRequired,
  setFilter: PropTypes.func.isRequired,
  getAllProjects: PropTypes.func.isRequired,
  getSingleProject: PropTypes.func.isRequired,
  isDialogOpen: PropTypes.bool.isRequired,
  toggleProjectDialog: PropTypes.func,
  searchProjects: PropTypes.func.isRequired,
  searchMyAssets: PropTypes.func.isRequired,
  foundOrganizations: PropTypes.arrayOf(PropTypes.object),
  clearAssetSearchResults: PropTypes.func.isRequired
};

const defaultData = {
  publicOrganizationQuery: '',
  publicOrganization: null,
};

function RequestAssetPermission(props) {
  const { classes, t } = props;
  const [isOpen, setIsOpen] = useState(false);
  const [data, setData] = useState(defaultData);

  function handleIsOpen() {
    setIsOpen(!isOpen);
    setData(defaultData);
  }

  return (
    <div className="col-xs" style={{ width: '300px', flexGrow: 0 }}>
      <div onClick={handleIsOpen} className={classes.prjCardBasePrjsList}>
        <div className={`row ${classes.projectRegisterCardInnerContainer}`}>
          <img
            alt='Register Project'
            src={requestPermissionSVG}
            width='150px'
            height='120px'
            style={{ alignSelf: 'center', marginTop: '66px' }}
          />
        </div>
        <div className={`row ${classes.projectRegisterCardInnerContainer}`}>
          <div className={classes.projectPageRegisterText} >
            {t('assets.requestPermission')}
          </div>
        </div>
      </div>

      <Dialog
        open={isOpen}
        onClose={handleIsOpen}
        maxWidth="md"
        fullWidth={true}
      >
        <DialogTitle>
          {t('assets.requestProjectCreationPermission')}
        </DialogTitle>
        <DialogContent>
          <OrganizationAssetsForm
            publicOrganization={data.publicOrganization}
            publicOrganizationQuery={data.publicOrganizationQuery}
            handleSetData={setData}
            ownerUUID={data.publicOrganization?.ID}
            requestOnly
          />
        </DialogContent>
        <DialogActions>
          <Button
            variant="outlined"
            color="primary"
            onClick={handleIsOpen}
          >
            {t('utils.confirmDialogClose')}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    foundAssets: state.asset.myAssets,
    foundOrganizations: state.organization.myOrganizations,
    allOrganizations: state.organization.allOrganizations,
    user: state.user,
    userIsLogged: state.user.isAuthenticated,
    userIsSuperUser: state.user.isSuperUser,
    typeFilter: state.project.typeFilter,
    allProjects: state.project.allProjects,
    myProjects: state.project.myProjects,
    fetching: state.project.isFetchingList,
    organizationOwner: state.user.profileInfo.data ? state.user.profileInfo.data.organization : '',
    isDialogOpen: state.dialogs.registerProjectDialog,
    singleProject: state.project.singleProject,
    singleAsset: state.asset.singleAsset,
    registered: state.project.registered,
    allProjectsNumber: state.project.allProjectsNumber,
    myProjectsNumber: state.project.myProjectsNumber,
    alerts: state.alerts.pending,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    toggleProjectDialog: () => {
      dispatch(toggleProjectDialog());
    },
    setFilter: (type, value) => {
      dispatch(setTypeFilter(value));
    },
    searchMyProjects: (userId, params) => {
      dispatch(searchMyProjects(userId, params));
    },
    searchMyAssets: (userId, value) => {
      dispatch(searchMyAssets(userId, value));
    },
    searchMyOrganizations: (userId, params) => {
      dispatch(searchMyOrganizations(userId, params));
    },
    clearAssetSearchResults: () => dispatch({ type: 'SEARCH_ASSETS_FAILURE' }),
    searchProjects: (value, filter, offset) => {
      dispatch(searchProjects(value, filter, offset));
    },
    getAllProjects: (offset, limit = allProjectsNumberPerPage) => {
      dispatch(getAllProjects(offset, limit));
    },
    getMyProjects: (userIsLogged, isMine, offset, limit = myProjectsNumberPerPage) => {
      dispatch(getMyProjects(userIsLogged, isMine, offset, limit));
    },
    getSingleProject: (params) => {
      dispatch(getSingleProject(params));
    },
    getSingleAsset: (params) => {
      dispatch(getSingleAsset(params));
    },
    getAllAssets: (params) => {
      dispatch(getAllAssets(params));
    },
    getAllOrganizations: (params) => {
      dispatch(getAllOrganizations(params));
    },
    isFetchingListProjectSetDefault: () => dispatch(isFetchingListProjectSetDefault()),
    clearMyAssets: () => dispatch(clearMyAssets())
  };
};

export default withRouter(withTranslation('translations')(connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(ListProjecstPage))));
