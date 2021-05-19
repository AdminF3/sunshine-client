import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  Avatar,
  CircularProgress,
  Grid,
  List,
  ListItemAvatar,
  ListItem,
  ListItemText,
  makeStyles,
} from '@material-ui/core';
import {
  Error as ErrorIcon,
} from '@material-ui/icons';

import Pagination from '../../utils/Pagination/Pagination';
import TextWithIcon from '../../utils/TextWithIcon';
import { getAssets } from '../../../actions/assets';
import { assetTypeImage } from '../../../constants/assetTypes';
import { parseAddress } from '../utils';

const useStyles = makeStyles({
  noResultsWrapper: {
    padding: 20,
  },
});

function AssetsList(props) {
  const {
    assets,
    filterParams,
    itemsPerPage,
    noResultsWarning,
    publicAssetsGet,
  } = props;

  const [activePage, setActivePage] = useState(0);
  const { t } = useTranslation('translations');

  const classes = useStyles();

  useEffect(() => {
    const paginationParams = { offset: activePage * itemsPerPage, limit: itemsPerPage };

    publicAssetsGet({ ...filterParams, ...paginationParams });
  }, [activePage, itemsPerPage, filterParams, publicAssetsGet]);

  if (assets.isFetchingList) {
    return (
      <Grid container justify="center" className={classes.noResultsWrapper}>
        <Grid item><CircularProgress /></Grid>
      </Grid>
    );
  }

  const totalCount = assets.allAssetsNumber;

  if (totalCount === 0) {
    return (
      <TextWithIcon
        icon={<ErrorIcon color="disabled" />}
        className={classes.noResultsWrapper}
      >
        {noResultsWarning || t('assets.noResultsFound')}
      </TextWithIcon>
    );
  }

  return (
    <Grid container spacing={2}>
      <List component={Grid} item xs={12} disablePadding>
        {assets.allAssets.map(asset => (
          <ListItem key={asset._id}>
            <ListItemAvatar>
              <Avatar src={assetTypeImage(asset.data)} />
            </ListItemAvatar>
            <ListItemText>
              <Link to={`/asset/${asset._id}`}>{parseAddress(asset.data.address)}</Link>
            </ListItemText>
          </ListItem>
        ))}
      </List>
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

AssetsList.propTypes = {
  filterParams: PropTypes.object,
  itemsPerPage: PropTypes.number.isRequired,
  noResultsWarning: PropTypes.node,
};

AssetsList.defaultProps = {
  filterParams: {},
  itemsPerPage: 12,
  noResultsWarning: null,
};

export default connect(
  state => ({
    assets: state.asset,
  }),
  dispatch => ({
    publicAssetsGet: (params) => dispatch(getAssets(params)),
  }),
)(AssetsList);
