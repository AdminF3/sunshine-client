import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { useTranslation } from 'react-i18next';
import {
  FeatureGroup,
  GeoJSON,
  Map as LeafletMap,
  Popup,
  TileLayer,
  ZoomControl,
} from 'react-leaflet';
import {
  Button,
  Divider,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Grid,
  ListItem,
  ListItemText,
  Paper,
  Typography,
  makeStyles,
} from '@material-ui/core';
import {
  ArrowBackIos as ArrowBackIcon,
  Close as CloseIcon,
  ExpandMore as ExpandMoreIcon,
} from '@material-ui/icons';

import * as countriesGeoJSON from '../../../constants/GeoJSON';
import { getCountryStats as getCountryStatsAction } from '../../../actions/stats';
import ListRecord from '../../../components/utils/ListRecord';
import { constructionPeriod } from '../../../components/project/utils';
import CountryAssetMarkers from './CountryAssetMarkers';
import styles from './styles';

const useStyles = makeStyles(styles);

function CountriesMap(props) {
  const {
    position,
    zoom,
    countries,
    getCountryStats,
  } = props;

  const classes = useStyles();
  const { t } = useTranslation('translations');

  useEffect(() => {
    getCountryStats();
  }, [getCountryStats]);

  const [activeCountry, setActiveCountry] = useState(null);
  const [selectedAsset, setSelectedAsset] = useState(null);

  const mapRef = useRef(null);
  const groupRef = useRef(null);

  const fitBounds = () => {
    const map = mapRef.current.leafletElement;
    const group = groupRef.current.leafletElement;
    map.fitBounds(group.getBounds());
  };
  const centerMap = (bounds) => {
    mapRef.current.leafletElement.setView(bounds);
  };

  return (
    <Grid container className={classes.mapContainer}>
      <Grid item xs={selectedAsset ? 9 : 12}>
        <div className={classes.mapRoot}>
          {activeCountry && (
            <Button
              className={classes.navBackButton}
              startIcon={<ArrowBackIcon />}
              variant="outlined"
              color="default"
              onClick={() => {
                setActiveCountry(null);
                fitBounds();
              }}
            >
              {t('navigation.back')}
            </Button>
          )}
          <LeafletMap
            ref={mapRef}
            center={Object.values(position)}
            zoom={zoom}
            zoomControl={false}
            touchZoom={false}
            boxZoom={true}
            keyboard={true}
            doubleClickZoom={false}
            scrollWheelZoom={false}
            dragging={true}
            zoomSnap={0.1}
            minZoom={2}
            maxBounds={[
              [-200, 200],
              [200, -200]
            ]}
            whenReady={fitBounds}
          >
            <TileLayer
              url="https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png"
              attribution='&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="http://cartodb.com/attributions">CartoDB</a>'
            />
            <ZoomControl position="bottomleft" />
            <FeatureGroup ref={groupRef}>
              <CountriesGroup
                countries={countries}
                activeCountry={activeCountry}
                onSelectCountry={(c) => {
                  setActiveCountry(c);
                  fitBounds();
                }}
              />
            </FeatureGroup>
            {activeCountry && (
              <CountryAssetMarkers
                country={activeCountry}
                onClickAsset={a => {
                  setSelectedAsset(a);
                  centerMap(a.location);
                }}
              />
            )}
          </LeafletMap>
        </div>
      </Grid>
      {selectedAsset && (
        <Grid item xs={3} className={classes.sidebar} component={Paper} square>
          <div className={classes.sidebarContentWrapper}>
            <ListItem component="div" disableGutters>
              <ListItemText>
                <Typography variant="subtitle2">{selectedAsset.address}</Typography>
              </ListItemText>
              <CloseIcon
                className={classes.sidebarCloseIcon}
                onClick={() => setSelectedAsset(null)}
              />
            </ListItem>
            <Divider />
            <div className={classes.sidebarContent}>
              <Grid container justify="space-between">
                <Grid item>{t('assets.assetType')}</Grid>
                <Grid item>{selectedAsset.buildingType}</Grid>
              </Grid>
              <Grid container justify="space-between">
                <Grid item>{t('assets.heatedArea')}</Grid>
                <Grid item>{selectedAsset.heatedArea}</Grid>
              </Grid>
              <Grid container justify="space-between">
                <Grid item>{t('assets.typeOfHeating')}</Grid>
                <Grid item>{selectedAsset.heatingType}</Grid>
              </Grid>
              <Typography variant="subtitle2" align="center">
                {t('navigation.projects')}: {selectedAsset.projects.length}
              </Typography>
              {selectedAsset.projects.map(p => (
                <Accordion key={p.ID} defaultExpanded>
                  <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography>{p.name}</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <ListRecord
                      items={[
                        { key: t('projects.constructionPeriod'), value: constructionPeriod(p, ' - ') },
                        { key: t('projects.paybackTime'), value: `${p.contractTerm} ${t('projects.years')}` },
                        { key: t('projects.energySavingsPlaceholder'), value: `${p.guaranteedSavings}%` },
                      ]}
                    />
                  </AccordionDetails>
                </Accordion>
              ))}
            </div>
          </div>
        </Grid>
      )}
    </Grid>
  );
}

function CountriesGroup(props) {
  const {
    countries,
    activeCountry,
    onSelectCountry,
  } = props;

  const classes = useStyles();
  const { t } = useTranslation('translations');

  if (activeCountry) {
    return (
      <GeoJSON
        className={`${classes.country} active`}
        data={countriesGeoJSON[activeCountry]}
      />
    );
  }

  const countryNames = Object.keys(countries);

  return countryNames.map(c => (
    <GeoJSON
      key={c}
      className={classes.country}
      data={countriesGeoJSON[c]}
      onMouseOver={e => e.target.openPopup()}
      onMouseOut={e => {
        if (e.originalEvent?.relatedTarget?.className === 'leaflet-popup-content-wrapper') {
          e.originalEvent.relatedTarget.onmouseleave = e.target.closePopup.bind(e.target);
          return;
        }
        e.target.closePopup();
      }}
      onClick={() => onSelectCountry(c)}
    >
      <Popup className="index-map-popup" closeButton={false}>
        <Typography align="center" variant="h6" className={classes.popupWhiteColor}>{c}</Typography>
        <hr className={classes.divider}/>
        {Object.keys(countries[c]).map(stat => (
          <Grid container justify="space-between" className={classes.popupWhiteColor} key={stat}>
            <Grid item>{t(`navigation.${stat}`)}</Grid>
            <Grid item>{countries[c][stat]}</Grid>
          </Grid>
        ))}
      </Popup>
    </GeoJSON>
  ));
}

CountriesMap.propTypes = {
  position: PropTypes.shape({
    lat: PropTypes.number.isRequired,
    lng: PropTypes.number.isRequired,
  }).isRequired,
  zoom: PropTypes.number.isRequired,
};

CountriesMap.defaultProps = {
  position: {
    lat: 51.73743,
    lng: 20.57549,
  },
  zoom: 4,
};

export default connect(
  state => ({
    countries: state.stats.countries,
  }),
  dispatch => ({
    getCountryStats: () => dispatch(getCountryStatsAction()),
  }),
)(CountriesMap);
