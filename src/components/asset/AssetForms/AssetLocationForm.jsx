import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import {
  Map as ReactLeafletMap,
  LayersControl,
  ZoomControl,
  Marker,
  TileLayer,
} from 'react-leaflet';
import {
  Grid,
  Paper,
  Typography,
  InputBase,
  IconButton,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  makeStyles,
} from '@material-ui/core';
import {
  Search as SearchIcon,
  Place as PlaceIcon,
  ArrowLeft as ArrowLeftIcon,
  Explore as LoadingIcon,
} from '@material-ui/icons';

import { search, reverse } from '../../../utils/openStreetMap';
import Tooltip from '../../utils/TooltipWrapper';
import { locationToStreetAddress, locationToAddressMap } from '../utils';
import styles from './styles';

const useStyles = makeStyles(styles);

const minQueryLength = 6;
const loadAddressError = new Error('assets.errorLoadingAddress');
const searchAddressError = new Error('assets.errorSearchingAddress');
const noResultsError = new Error('assets.noResultsFound');

function AsetLocationForm(props) {
  const {
    mapCenter,
    mapZoom,
    searchQuery,
    searchResults,
    addressLocation,
    handleSetData,
    loading,
    error,
    disabled
  } = props;
  const classes = useStyles();
  const { t } = useTranslation('translations');

  return (
    <div className={classes.container}>
      <div className={classes.sidebar}>
        <div className={classes.searchInputs}>
          <Paper className="formWrapper">
            <form
              action={window.location.href}
              method="POST"
              onSubmit={(e) => {
                e.preventDefault();
                if (searchQuery.length < minQueryLength) {
                  return;
                }

                handleSetData({ loading: true });
                search(searchQuery)
                  .then(res => {
                    const results = res || [];

                    handleSetData({
                      addressLocation: null,
                      addressLocationMap: {},
                      address: '',
                      searchResults: results,
                      error: results.length === 0 && noResultsError,
                    });
                  })
                  .catch(() => handleSetData({
                    searchResults: [],
                    error: searchAddressError,
                  }));
              }}
            >
              <InputBase
                className={classes.input}
                placeholder="Enter address"
                inputProps={{ 'aria-label': 'enter address' }}
                value={searchQuery}
                onChange={e => handleSetData({ searchQuery: e.target.value })}
                disabled={disabled || loading}
              />
              <Tooltip
                title={t(`assets.${searchQuery.length >= minQueryLength ? 'searchMap' : 'searchMapShortQuery'}`)}
              >
                <span>
                  <IconButton
                    type="submit"
                    className={classes.iconButton}
                    aria-label="search"
                    disabled={loading || searchQuery.length < minQueryLength}
                  >
                    <SearchIcon />
                  </IconButton>
                </span>
              </Tooltip>
            </form>
          </Paper>
        </div>

        <ResultsSidebar
          searchResults={searchResults}
          pinnedLocation={addressLocation}
          error={error}
          onClickResult={result => handleSetData({
            addressLocation: { ...result },
            addressLocationMap: { ...locationToAddressMap(result) },
            mapCenter: [Number(result.lat), Number(result.lon)],
          })}
          onClearPinnedResult={() => handleSetData({
            addressLocation: null,
            addressLocationMap: {},
          })}
        />
      </div>

      <ReactLeafletMap
        className={classes.map}
        center={mapCenter}
        zoom={mapZoom}
        zoomControl={false}
        onClick={e => {
          if (!disabled) {
            handleSetData({ searchResults: [], loading: true });
            reverse(e.latlng)
              .then(res => handleSetData({
                addressLocation: res,
                addressLocationMap: { ...locationToAddressMap(res) },
              }))
              .catch(() => handleSetData({
                addressLocation: {
                  lat: e.latlng.lat,
                  lon: e.latlng.lng,
                  address: null,
                },
                addressLocationMap: {},
                error: loadAddressError,
              }));
          }
        }}
      >
        <LayersControl>
          <ZoomControl position="bottomright" />
        </LayersControl>
        {addressLocation && (
          <Marker position={[addressLocation.lat, addressLocation.lon]} />
        )}
        <TileLayer
          url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
      </ReactLeafletMap>

      {loading && (
        <Grid
          container
          direction="column"
          justify="center"
          alignItems="center"
          className={classes.loadingOverlay}
          spacinh={2}
        >
          <Grid item>
            <LoadingIcon fontSize="large" />
          </Grid>
          <Grid item>
            <Typography variant="h5">
              Loading...
            </Typography>
          </Grid>
        </Grid>
      )}
    </div>
  );
}

function ResultsSidebar(props) {
  const {
    pinnedLocation,
    searchResults,
    error,
    onClickResult,
    onClearPinnedResult,
  } = props;

  const classes = useStyles();
  const { t } = useTranslation('translations');

  if (error) {
    return (
      <Paper className={classes.resultsContainer}>
        <div className="ErrorContainer">
          <Typography variant="h6">
            {t(error.message)}
          </Typography>
          <Typography variant="caption">
            {error === searchAddressError && t('assets.errorSearchingAddressNextStep')}
            {error === loadAddressError && t('assets.errorLoadingAddressNextStep')}
          </Typography>
        </div>
      </Paper>
    );
  }

  if (pinnedLocation && pinnedLocation.address) {
    return (
      <Paper className={classes.resultsContainer}>
        <div className="PinnedResultContainer">
          <div className="TitleContainer">
            <Typography variant="h6">
              {locationToStreetAddress(pinnedLocation)}
            </Typography>
            {searchResults.length > 0 && (
              <Tooltip title={t('assets.regBackToSearchResults')}>
                <button onClick={onClearPinnedResult}>
                  <ArrowLeftIcon />
                </button>
              </Tooltip>
            )}
          </div>
          <Typography variant="caption">
            {pinnedLocation.display_name}
          </Typography>
        </div>
      </Paper>
    );
  }

  if (searchResults.length > 0) {
    return (
      <Paper className={classes.resultsContainer}>
        <List dense>
          {searchResults.map(item => {
            return (
              <ListItem
                button
                key={item.place_id}
                onClick={() => onClickResult(item)}
              >
                <ListItemIcon>
                  <PlaceIcon />
                </ListItemIcon>
                <ListItemText
                  primary={item.display_name}
                />
              </ListItem>
            );
          })}
        </List>
      </Paper>
    );
  }

  return null;
}

AsetLocationForm.propTypes = {
  mapZoom: PropTypes.number.isRequired,
  mapCenter: PropTypes.arrayOf(PropTypes.number).isRequired,
  addressLocation: PropTypes.shape({
    lat: PropTypes.string.isRequired,
    lon: PropTypes.string.isRequired,
    address: PropTypes.object.isRequired,
  }),
  handleSetData: PropTypes.func.isRequired,
};

AsetLocationForm.defaultProps = {
  mapZoom: 15,
  mapCenter: [56.9496, 24.1052],
};

export default AsetLocationForm;
