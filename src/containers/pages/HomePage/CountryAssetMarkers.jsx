import React from 'react';
import { useTranslation } from 'react-i18next';
import { useQuery } from '@apollo/client';
import {
  Marker,
  Tooltip,
} from 'react-leaflet';
import MarkerClusterGroup from 'react-leaflet-markercluster';
import { Typography } from '@material-ui/core';

import apolloClient from '../../../utils/apolloClient';
import { LIST_ASSETS } from '../../../actions/assetsQueries';
import { parseAddress } from '../../../components/asset/utils';

function CountryAssetMarkers(props) {
  const {
    country,
    onClickAsset,
  } = props;
  const { t } = useTranslation('translations');

  const { loading, data } = useQuery(LIST_ASSETS, {
    client: apolloClient,
  });

  if (loading) {
    return null;
  }

  const assets = [];
  for (const i in data?.listAssets?.entities) {
    const a = data.listAssets.entities[i];
    if (a.country !== country) {
      continue;
    }
    const m = a.coords.match(/^\{(\d+\.\d+),\s(\d+\.\d+)\}$/);
    if (!m) {
      continue;
    }
    assets.push({
      ...a,
      location: [m[1], m[2]],
      address: parseAddress(a.address),
      building_type: a.buildingType,
    });
  }

  return (
    <MarkerClusterGroup>
      {assets.map(a => (
        <Marker
          key={a.ID}
          position={a.location}
          onMouseOver={(e) => e.target.openPopup()}
          onMouseOut={e => e.target.closePopup()}
          onClick={() => onClickAsset(a)}
        >
          <Tooltip
            className="index-map-tooltip"
            direction="bottom"
            permanent
          >
            <Typography variant="caption" display="block"><strong>{a.address}</strong></Typography>
            <Typography variant="caption" display="block" align="center">
              {t('navigation.projects')}: {a.projects.length}
            </Typography>
          </Tooltip>
        </Marker>
      ))}
    </MarkerClusterGroup>
  );
}

export default CountryAssetMarkers;
