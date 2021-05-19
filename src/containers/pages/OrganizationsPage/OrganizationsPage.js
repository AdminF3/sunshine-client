import React from 'react';
import PropTypes from 'prop-types';

// WRAPPERS
import { withRouter } from 'react-router-dom';
import { withTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import {
  Grid,
  withStyles,
} from '@material-ui/core';

// COMPONENTS
import { Helmet } from 'react-helmet';
import NavContainer from '../../smartcomponents/navcontainer';
import SnackbarNotification from '../../smartcomponents/SnackbarNotification';
import OrganizationCard from '../../../components/organization/OrganizationCard/OrganizationCard';
import RegisterOrganizationCard from '../../../components/organization/OrganizationCard/RegisterOrganizationCard';
import SearchAndFilter from '../../smartcomponents/SearchAndFilter';
import OrganizationEditor from '../../../components/organization/OrganizationEditor/OrganizationEditor';
import ProgressBar from '../../../components/utils/ProgressBar';
import Pagination from '../../../components/utils/Pagination/Pagination';
import UserTooltip from '../../../components/utils/UserTooltip';
import MarkdownText from '../../../components/utils/MarkdownText';
import SeparatorMenu from '../../../components/utils/SeparatorMenu';

// ACTIONS
import { setLegalFormFilter, getAllOrganizations, getMyOrganizations,
  searchOrganizations, searchMyOrganizations,
  isFetchingListOrganizationSetDefault,
} from './../../../actions/organizations';
import { toggleOrganizationDialog } from '../../../actions/dialogs';
import { requestOrgMembership as canRequestMembership } from '../../../utils/can';

// Sources
import { legalForms } from '../../../constants/legalStatusTypes';

import styles from './styles';

class OrganizationList extends React.Component {
    state = {
      total: 0,
      allOrgs: 0,
      number: 0,
      publicPage: 1,
      privatePage: 1,
      isPublic: !Boolean(this.props.userId),
      searchAll: '',
      filterAll: '',
      searchMine: '',
      filterMine: '',
  }

  componentDidMount() {
    const { getAllOrganizations, getMyOrganizations, userId } = this.props;
    getAllOrganizations();
    if (userId) {
      getMyOrganizations(userId, true);
    }

  }
  componentDidUpdate() {
    const { registered } = this.props;
    if (Boolean(registered)) {
      this.props.history.push('/organization/' + registered);
    }
  }

  componentWillUnmount() {
    this.props.isFetchingListOrganizationSetDefault();
  }

  handleChangeView = (newValue) => {
    this.setState({ isPublic: newValue })
  }

  handleChangeFilter = (search, filter) => {
    if (this.state.isPublic) {
      this.setState({ searchAll: search, filterAll: filter.value})
    } else {
      this.setState({ searchMine: search, filterMine: filter})
    }
  }

  handleSetActivePageToDefault = () => {
    if (this.state.isPublic) {
      this.setState({ publicPage: 1 });
    } else {
      this.setState({ privatePage: 1 });
    }
  }

  render() {
    const { user, userIsLogged, legalFormFilterValue, classes, t,
      searchOrganizations, allOrganizations, fetching, alerts,
      toggleOrganizationDialog, isDialogOpen,
      myOrganizations, getAllOrganizations, getMyOrganizations, userId,
      allOrganizationsNumber, myOrganizationsNumber, searchMyOrganizations
    } = this.props;

    const { isPublic, searchAll, filterAll, searchMine, filterMine } = this.state;
    const allOrganizationsNumberPerPage = 12;
    const myOrganizationsNumberPerPage = 11;

    const allOrg = allOrganizations && (
      <Grid container item xs={12} spacing={4} className={classes.cardContainerInner}>
        {allOrganizations.map((org) => (
          <Grid item xl={3} lg={4} sm={6} xs={12} key={org._id}>
            <OrganizationCard
              data={org}
              withApplyButton={canRequestMembership(user, org)}
              withStatusBadge={Boolean(userIsLogged)}
            />
          </Grid>
        ))}
        {allOrganizationsNumber > 12 && (
          <Grid item xs={12} align="center">
            <Pagination
              activePage={this.state.publicPage}
              itemsCountPerPage={allOrganizationsNumberPerPage}
              totalItemsCount={allOrganizationsNumber}
              onChange = { publicPage => {
                this.setState({ publicPage });
                const offset = parseInt(publicPage + '0', allOrganizationsNumberPerPage);
                if (searchAll !== '' || filterAll !== '') {
                  searchOrganizations(searchAll, filterAll, offset - allOrganizationsNumberPerPage);
                } else {
                  getAllOrganizations(offset - allOrganizationsNumberPerPage);
                }
              }}
            />
          </Grid>
        )}
      </Grid>
    );

    const myOrg = (
      <Grid container item xs={12} spacing={4} className={classes.cardContainerInner}>
        <OrganizationEditor
          open={isDialogOpen}
          handleClose={toggleOrganizationDialog}
          title={t('organizations.registerNewOrganization')}
        />
        <Grid item xl={3} lg={4} sm={6} xs={12}>
          <UserTooltip
            html
            title={t('tooltips:organizations.register')}
          >
            <RegisterOrganizationCard
              onClick={toggleOrganizationDialog}
            />
          </UserTooltip>
        </Grid>
        {myOrganizations && myOrganizations.map((org) => (
          <Grid item xl={3} lg={4} sm={6} xs={12} key={org._id}>
            <OrganizationCard data={org} />
          </Grid>
        ))}
        {myOrganizationsNumber > 11 && (
          <Grid item xs={12}>
            <Pagination
              activePage={this.state.privatePage}
              itemsCountPerPage={myOrganizationsNumberPerPage}
              totalItemsCount={myOrganizationsNumber}
              onChange={privatePage => {
                this.setState({ privatePage });
                const offset = parseInt(privatePage + '0', myOrganizationsNumberPerPage);
                if (searchMine !== '' || filterMine !== '') {
                  searchMyOrganizations(userId, {
                    search: searchMine,
                    legal_form: filterMine,
                    offset: offset - myOrganizationsNumberPerPage,
                    limit: myOrganizationsNumberPerPage
                  });
                } else {
                  getMyOrganizations(userId, true, offset - myOrganizationsNumberPerPage);
                }
              }}
            />
          </Grid>
        )}
      </Grid>
    );

    return (
      <div style={{ height: '100%' }}>
        <Helmet title="Energy Service Companies | SUNShINE" />
        <NavContainer formName="profileUpdate"/>

        <div className={ classes.searchAndFilterContainer }>
          <SearchAndFilter
            filterValue={ legalFormFilterValue || 0 }
            searchAndFilter={ isPublic ? searchOrganizations : searchMyOrganizations }
            menuItems={legalForms(t, true)}
            adminView={false}
            placeHolder={'Search By Name'}
            isPublic={isPublic}
            userID={userIsLogged}
            setFilter={this.handleChangeFilter}
            handleSetActivePageToDefault={this.handleSetActivePageToDefault}
            queryParam="legal_form"
            offset={0}
            limit={isPublic ? 12 : 11}
            tooltip={<MarkdownText text={t('tooltips:organizations.info', { returnObjects: true })} />}
            searchInfoTooltip={
              <MarkdownText text={t('tooltips:organizations.publicSearchHint', { returnObjects: true })} />
            }
          />
        </div>

        {alerts && alerts.map((msg, index) => (
          <SnackbarNotification open alert={msg} key={index}/>
        ))}
        {fetching
          ?
            <ProgressBar />
          :
          <div className={classes.cardContainerOuter}>
            <SeparatorMenu
              items={[
                t('translations:organizations.myOrganizations'),
                t('translations:organizations.allOrganizations'),
              ]}
              active={Number(isPublic)}
              onChange={i => this.handleChangeView(Boolean(i))}
            />
            {isPublic ? allOrg : myOrg}
          </div>
        }
      </div>
    );
  }
}

OrganizationList.propTypes = {
  allOrganizations: PropTypes.arrayOf(PropTypes.object),
  myOrganizations: PropTypes.arrayOf(PropTypes.object),
  legalFormFilterValue: PropTypes.number,
  fetching: PropTypes.bool.isRequired,
  setLegalFormFilter: PropTypes.func.isRequired,
  searchOrganizations: PropTypes.func.isRequired,
  getAllOrganizations: PropTypes.func.isRequired,
  toggleOrganizationDialog: PropTypes.func,
  isDialogOpen: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => {
  return {
    user: state.user,
    userIsLogged: state.user.isAuthenticated,
    legalFormFilterValue: state.organization.legalFormFilterValue,
    allOrganizations: state.organization.allOrganizations,
    myOrganizations: state.organization.myOrganizations,
    fetching: state.organization.isFetchingList,
    isDialogOpen: state.dialogs.registerOrganizationDialog,
    registered: state.organization.registered,
    userId: state.user.profileInfo ? state.user.profileInfo._id : '',
    allOrganizationsNumber: state.organization.allOrganizationsNumber,
    myOrganizationsNumber: state.organization.myOrganizationsNumber,
    alerts: state.alerts.pending,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    toggleOrganizationDialog: () => {
      dispatch(toggleOrganizationDialog());
    },
    setLegalFormFilter: ( value ) => {
      dispatch(setLegalFormFilter( value ));
    },
    searchOrganizations: ( search, filter, offset) => {
      dispatch(searchOrganizations(search, filter, offset));
    },
    searchMyOrganizations: (userId, params) => {
      dispatch(searchMyOrganizations(userId, params));
    },
    getAllOrganizations: (offset) => {
      dispatch(getAllOrganizations(offset));
    },
    getMyOrganizations: ( userId, isMine, offset ) => {
      dispatch(getMyOrganizations( userId, isMine, offset ));
    },
    isFetchingListOrganizationSetDefault: () => {
      dispatch(isFetchingListOrganizationSetDefault());
    },
  };
};

export default withRouter(withTranslation('translations')(connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(OrganizationList))));
