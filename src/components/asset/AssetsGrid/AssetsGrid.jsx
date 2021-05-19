import React, { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { useTranslation } from 'react-i18next';
import {
  Grid,
  CircularProgress,
} from '@material-ui/core';
import {
  Error as ErrorIcon,
} from '@material-ui/icons';

import Pagination from '../../utils/Pagination/Pagination';
import TextWithIcon from '../../utils/TextWithIcon';
import {
  searchMyAssets,
  getAssets,
} from '../../../actions/assets';
import AssetCard from '../AssetCard/AssetCard';

function AssetsGrid(props) {
  const {
    user,
    assets,
    userAssets,
    filterParams,
    claimResidencyButton,
    selectable,
    value,
    itemsPerPage,
    onChange,
    requestingOrgUUID,
    myAssetsGet,
    publicAssetsGet,
    requestOnly
  } = props;

  const [activePage, setActivePage] = useState(0);
  const { t } = useTranslation('translations');
  const userID = user.isAuthenticated;

  const offset = activePage * itemsPerPage;

  const fetchData = useCallback(() => {
    const paginationParams = { offset, limit: itemsPerPage };

    if (userAssets) {
      myAssetsGet(userID, { ...filterParams, ...paginationParams, status: 2 });
      return;
    }
    publicAssetsGet({ ...filterParams, ...paginationParams, status: 2 });
  }, [offset, itemsPerPage, userAssets, userID, filterParams, myAssetsGet, publicAssetsGet]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  if (assets.isFetchingList) {
    return (
      <Grid container justify="center">
        <Grid item><CircularProgress /></Grid>
      </Grid>
    );
  }

  const entities = userAssets ? assets.myAssets : assets.allAssets;
  const totalCount = userAssets ? assets.myAssetsNumber : assets.allAssetsNumber;

  if (totalCount === 0) {
    return (
      <TextWithIcon
        icon={<ErrorIcon color="disabled" />}
        variant="h6"
        gutterBottom
      >
        {t('assets.noResultsFound')}
      </TextWithIcon>
    );
  }

  return (
    <Grid container spacing={4}>
      {entities.map(asset => (
        <Grid item xl={3} lg={4} sm={6} xs={12} key={asset._id}>
          <AssetCard
            data={asset}
            claimResidencyButton={claimResidencyButton}
            selectable={selectable}
            requestingOrgUUID={requestingOrgUUID}
            selected={value === asset._id}
            onChange={onChange}
            requestOnly={requestOnly}
          />
        </Grid>
      ))}
      {totalCount > itemsPerPage && (
        <Grid item xs={12} align="center">
          <Pagination
            activePage={activePage + 1}
            itemsCountPerPage={itemsPerPage}
            totalItemsCount={totalCount}
            onChange={p => setActivePage(p - 1)}
          />
        </Grid>
      )}
    </Grid>
  );
}

AssetsGrid.propTypes = {
  userAssets: PropTypes.bool.isRequired,
  filterParams: PropTypes.shape({
    owner: PropTypes.string,
  }),
  itemsPerPage: PropTypes.number.isRequired,
  claimResidencyButton: PropTypes.bool.isRequired,
  selectable: PropTypes.bool.isRequired,
  requestingOrgUUID: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
};

AssetsGrid.defaultProps = {
  userAssets: false,
  claimResidencyButton: true,
  selectable: false,
  filterParams: {},
  itemsPerPage: 12,
};

export default connect(
  state => ({
    user: state.user,
    assets: state.asset,
  }),
  dispatch => ({
    myAssetsGet: (userID, params) => dispatch(searchMyAssets(userID, params)),
    publicAssetsGet: (params) => dispatch(getAssets(params)),
  }),
)(AssetsGrid);
