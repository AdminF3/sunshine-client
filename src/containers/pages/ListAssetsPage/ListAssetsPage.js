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
import NavContainer from './../../smartcomponents/navcontainer';
import ProgressBar from './../../../components/utils/ProgressBar';
import Pagination from '../../../components/utils/Pagination/Pagination';
import AssetCard from './../../../components/asset/AssetCard/AssetCard';
import AssetEditor from './../../../components/asset/AssetEditor/AssetEditor';
import SnackbarNotification from './../../smartcomponents/SnackbarNotification';
import SearchAndFilter from './../../smartcomponents/SearchAndFilter';

// ACTIONS
import {
  setTypeFilter,
  getAllAssets,
  getMyAssets,
  searchAssets,
  searchMyAssets,
  isFetchingListAssetSetDefault,
} from './../../../actions/assets';
import {
  searchMyOrganizations,
  findOrganizations
} from './../../../actions/organizations';

import { assetTypeOptions } from './../../../constants/assetTypes';
import { validStatus } from '../../../constants/statusTypes';

import RegisterAssetCard from '../../../components/asset/AssetCard/RegisterAsserCard';
import UserTooltip from '../../../components/utils/UserTooltip';
import MarkdownText from '../../../components/utils/MarkdownText';

import styles from './styles';

const allAssetsNumberPerPage = 12;
const myAssetsNumberPerPage = 11;

class ListAssetsPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      total: 0,
      allAssets: 0,
      publicPage: 1,
      privatePage: 1,
      isPublic: !this.props.userId,
      searchAll: '',
      filterAll: '',
      searchMine: '',
      filterMine: '',
      registerDialogOpen: false,
    };
  }

  componentDidMount() {
    const {
      getAllAssets,
      getMyAssets,
      searchMyOrganizations,
      findOrganizations,
      userIsSuperUser,
      userId
    } = this.props;

    if (userIsSuperUser && userId) {
      getAllAssets(0, allAssetsNumberPerPage);
      getMyAssets(userId, 0, myAssetsNumberPerPage);
      searchMyOrganizations(userId, { status: validStatus });
      findOrganizations('', 0, 1000, { status: validStatus });
    } else {
      getAllAssets(0, allAssetsNumberPerPage);
      findOrganizations('', 0, 1000, { status: validStatus });
      if (userId) {
        getMyAssets(userId, 0, myAssetsNumberPerPage);
        searchMyOrganizations(userId, { status: validStatus });
      }
    }
  }

  componentWillUnmount() {
    this.props.isFetchingListAssetSetDefault();
  }

  handleChangeView = (newValue) => {
    this.setState({ isPublic: newValue });
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

  // eslint-disable-next-line complexity
  render() {
    const {
      userIsLogged,
      typeFilter,
      searchAssets,
      classes,
      alerts,
      t,
      allAssets,
      fetching,
      userIsSuperUser,
      getAllAssets,
      myAssets,
      userId,
      getMyAssets,
      allAssetsNumber,
      myAssetsNumber,
      searchMyAssets
    } = this.props;

    const {
      isPublic,
      searchAll,
      filterAll,
      searchMine,
      filterMine
    } = this.state;

    const Separator = () => {
      if (!userId) {
        return null;
      }

      return (
        <div className={classes.assetPageSeparatorContainer}>
          {
            <div>
              <span
                onClick={() => this.handleChangeView(false)}
                className={!isPublic ? classes.assetPageSeparatorTextActive : classes.assetPageSeparatorTextInactive}
              >
                {t('translations:assets.myAssets')}
              </span>
              <span className={classes.orgPageSeparatorLine}>|</span>
              <span
                onClick={() => this.handleChangeView(true)}
                className={isPublic ? classes.assetPageSeparatorTextActive : classes.assetPageSeparatorTextInactive}
              >
                {t('translations:assets.allAssets')}
              </span>
            </div>
          }
        </div>
      );
    };

    const allAsset = (
      <Grid container item xs={12} spacing={4} className={classes.cardContainerInner}>
        {allAssets && allAssets.map((ast) => (
          <Grid item lg={3} sm={4} xs={12} key={ast._id}>
            <AssetCard
              userIsSuperUser={userIsSuperUser}
              data={ast}
            />
          </Grid>
        ))}
        {allAssetsNumber > allAssetsNumberPerPage && (
          <Grid item xs={12} align="center">
            <Pagination
              activePage={this.state.publicPage}
              itemsCountPerPage={allAssetsNumberPerPage}
              totalItemsCount={allAssetsNumber}
              onChange={publicPage => {
                this.setState({ publicPage });
                const offset = parseInt(publicPage + '0', allAssetsNumberPerPage);
                if (searchAll !== '' || filterAll !== '') {
                  searchAssets(searchAll, filterAll, offset - allAssetsNumberPerPage);
                } else {
                  getAllAssets(offset - allAssetsNumberPerPage, allAssetsNumberPerPage);
                }
              }}
            />
          </Grid>
        )}
      </Grid>
    );

    const myAsset = (
      <Grid container item xs={12} spacing={4} className={classes.cardContainerInner}>
        <AssetEditor
          open={this.state.registerDialogOpen}
          handleClose={() => this.setState({ registerDialogOpen: false })}
          title={t('assets.registerAsset')}
        />
        <Grid item lg={3} sm={4} xs={12}>
          <UserTooltip
            html
            title={<MarkdownText text={t('tooltips:assets.register', { returnObjects: true })} />}
            placement="right-start"
          >
            <RegisterAssetCard
              onClick={() => this.setState({ registerDialogOpen: true })}
            />
          </UserTooltip>
        </Grid>
          {myAssets && myAssets.map((ast) => (
            <Grid item lg={3} sm={4} xs={12} key={ast._id}>
              <AssetCard
                typeOfView="private"
                data={ast}
                userIsLogged={userIsLogged}
              />
            </Grid>
          ))}
          {myAssetsNumber > myAssetsNumberPerPage && (
            <Grid item xs={12} align="center">
              <Pagination
                activePage={this.state.privatePage}
                itemsCountPerPage={myAssetsNumberPerPage}
                totalItemsCount={myAssetsNumber}
                onChange={privatePage => {
                  this.setState({ privatePage });
                  const offset = parseInt(privatePage + '0', myAssetsNumberPerPage);
                  if (searchMine !== '' || filterMine !== '') {
                    searchMyAssets(userId, {
                      search: searchMine,
                      building_type: filterMine,
                      offset: offset - myAssetsNumberPerPage,
                      limit: myAssetsNumberPerPage
                    });
                  } else {
                    getMyAssets(userId, offset - myAssetsNumberPerPage);
                  }
                }}
              />
            </Grid>
          )}
      </Grid>
    );

    return (
      <div style={{ height: '100%' }}>
        <Helmet title='Energy Service Companies | SUNShINE' />
        <NavContainer />

        <div className={classes.searchAndFilterContainer}>
          <SearchAndFilter
            filterValue={typeFilter || 0}
            searchAndFilter={isPublic ? searchAssets : searchMyAssets}
            menuItems={assetTypeOptions}
            adminView={false}
            placeHolder={'Search By Address'}
            isPublic={isPublic}
            userID={userIsLogged}
            setFilter={this.handleChangeFilter}
            handleSetActivePageToDefault={this.handleSetActivePageToDefault}
            queryParam='building_type'
            offset={0}
            limit={isPublic ? allAssetsNumberPerPage : myAssetsNumberPerPage}
            tooltip={<MarkdownText text={t('tooltips:assets.info', { returnObjects: true })} />}
            searchInfoTooltip={
              <MarkdownText text={t('tooltips:assets.publicSearchHint', { returnObjects: true })} />
            }
          />
        </div>

        {alerts && alerts.map((text, index) => (
          <SnackbarNotification open alert={text} key={index} />
        ))}
        {fetching
          ?
          <ProgressBar />
          :
          <div className={classes.cardContainerOuter}>
            <Separator />
            {isPublic
              ?
              allAsset
              :
              myAsset
            }
          </div>
        }
      </div>
    );
  }
  /* eslint-enable complexity */
}

ListAssetsPage.propTypes = {
  userIsLogged: PropTypes.string,
  allAssets: PropTypes.arrayOf(PropTypes.object),
  myAssets: PropTypes.arrayOf(PropTypes.object),
  typeFilter: PropTypes.number,
  fetching: PropTypes.bool.isRequired,
  setFilter: PropTypes.func.isRequired,
  getAllAssets: PropTypes.func.isRequired,
  getMyAssets: PropTypes.func.isRequired,
  userId: PropTypes.string
};

const mapStateToProps = (state) => {
  return {
    userIsLogged: state.user.isAuthenticated,
    userIsSuperUser: state.user.isSuperUser,
    typeFilter: state.asset.typeFilter,
    allAssets: state.asset.allAssets,
    myAssets: state.asset.myAssets,
    fetching: state.asset.isFetchingList,
    registered: state.asset.registered,
    userId: state.user.profileInfo ? state.user.profileInfo._id : '',
    allAssetsNumber: state.asset.allAssetsNumber,
    myAssetsNumber: state.asset.myAssetsNumber,
    alerts: state.alerts.pending,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setFilter: (type, value) => {
      dispatch(setTypeFilter(value));
    },
    searchAssets: (value, filter) => {
      dispatch(searchAssets(value, filter));
    },
    searchMyAssets: (userId, params) => {
      dispatch(searchMyAssets(userId, params));
    },
    searchMyOrganizations: (search, offset, limit, params) => {
      dispatch(searchMyOrganizations(search, offset, limit, params));
    },
    findOrganizations: (search, offset, limit, params) => {
      dispatch(findOrganizations(search, offset, limit, params));
    },
    getAllAssets: (params, offset, limit) => {
      dispatch(getAllAssets(params, offset, limit));
    },
    getMyAssets: (userId, offset, limit) => {
      dispatch(getMyAssets(userId, offset, limit));
    },
    isFetchingListAssetSetDefault: () => dispatch(isFetchingListAssetSetDefault()),
  };
};

export default withRouter(withTranslation('translations')(connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(ListAssetsPage))));
