import React, { useState, useCallback, useEffect } from 'react';
import { connect } from 'react-redux';
import ReactGA from 'react-ga';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { Map as LeafletMap, Marker, TileLayer } from 'react-leaflet';
import {
  Grid,
  IconButton,
  Paper,
  makeStyles,
  Typography,
} from '@material-ui/core';
import {
  Create as CreateIcon,
} from '@material-ui/icons';

import { VALIDATE_ASSET } from '../../../actions/assetsMutations';
import {
  getSingleAsset as getAssetAction,
} from '../../../actions/assets';
import { addAlert } from '../../../actions/alerts';
import {
  approveEntity as canApproveAset,
  canEditEntity as canEditAsset,
  canUploadFiles,
  canDeleteFiles,
} from '../../../utils/can';
import UploadFile from '../../../containers/smartcomponents/UploadFile/UploadFile';
import Tooltip from '../../utils/TooltipWrapper';
import Loader from '../../utils/ProgressBar';
import StatusBadge from '../../utils/StatusBadge';
import ValidationStatusMenu from '../../utils/ValidationStatusMenu';
import Widget from '../../utils/Widget';
import OrganizationListItem from '../../organization/OrganizationListItem/OrganizaionListItem';
import AssetEditor from '../AssetEditor/AssetEditor';
import PublicAssetInfo from '../PublicAssetInfo/PublicAssetInfo';
import EntitiesList from '../../utils/EntitiesList';

import { parseAddress } from '../utils';
import styles from './styles';

const useStyles = makeStyles(styles);

function AssetPublicView(props) {
  const {
    asset,
    user,
    getAsset,
  } = props;

  const classes = useStyles();
  const { t } = useTranslation('translations');
  const params = useParams();

  const assetID = params.id;
  const userID = user.isAuthenticated;

  const performGetAsset = useCallback(() => {
    getAsset(assetID, userID);
  }, [getAsset, assetID, userID]);

  useEffect(() => {
    performGetAsset();
  }, [performGetAsset]);
  const refetch = () => getAsset(assetID, userID);

  const [editDialogOpen, setEditDialogOpen] = useState(false);

  const handleEditAsset = () => {
    ReactGA.event({
      category: 'Super user / Lear',
      action: 'Asset',
      label: 'Open dialog for editing',
    });

    setEditDialogOpen(true);
  };

  if (asset.isFetchingSingle) {
    return <Loader />;
  }

  if (!asset?.data) {
    return null;
  }

  console.log(asset)
  const assetTitle = parseAddress(asset.data.address || '');
  const coordinates = [asset.data.coordinates.lat, asset.data.coordinates.lng];

  return (
    <div className={classes.root}>
      <Grid container spacing={4}>
        <Grid container direction="column" alignItems="stretch" item sm={7} xs={12} spacing={2}>
          <Grid item>
            <Grid container component={Paper}>
              <Grid item xs={12} className={classes.cardHeader}>
                <div className={classes.validationStatus}>
                  <StatusBadge validationStatus={asset.data.valid} />
                  {canApproveAset(user, asset) && (
                    <ValidationStatusMenu
                      entity={asset}
                      validateMutation={VALIDATE_ASSET}
                      mutationVariables={{ assetID: asset._id }}
                      refetch={refetch}
                      onError={() => addAlert(t('errors.internal'), 'error')}
                    />
                  )}
                </div>
                {canEditAsset(user, asset) && (
                  <Tooltip title={t('assets.editAsset')}>
                    <IconButton
                      onClick={() => handleEditAsset()}
                    >
                      <CreateIcon color="action" />
                    </IconButton>
                  </Tooltip>
                )}
              </Grid>
              <Grid item xs={12} align="center">
                <Typography variant="h5" gutterBottom>{assetTitle}</Typography>
              </Grid>
              <Grid container item xs={12}>
                <div className={classes.mapContainer}>
                  <LeafletMap
                    center={coordinates}
                    zoom={18}
                  >
                    <TileLayer
                      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                      attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    />
                    <Marker
                      position={coordinates}
                    />
                  </LeafletMap>
                </div>
              </Grid>
            </Grid>
          </Grid>

          {/* Asset uploads */}
          <Grid item>
            <Grid container direction="column" alignItems="center" component={Paper}>
              <UploadFile
                entity={{
                  id: asset._id,
                  attachments: Object.values(asset._attachments || {}),
                  type: 'asset',
                }}
                alertText={t('documents.unsupportedFileType')}
                canUpload={canUploadFiles(user, asset)}
                canDelete={canDeleteFiles(user, asset)}
                onSuccess={refetch}
              />
            </Grid>
          </Grid>

        </Grid>
        <Grid container direction="column" alignItems="stretch" item sm={5} xs={12} spacing={2}>
          <Grid item>
            <Widget title={t('assets.ownerOfAsset')} withDivider>
              <OrganizationListItem organization={asset.data.owner} />
            </Widget>
          </Grid>
          <Grid item>
            <Widget title={t('assets.communityOrganization')} withDivider>
              <OrganizationListItem
                organization={asset.data.esco}
                errorMessage={t('assets.noCommunityOrganization')}
              />
            </Widget>
          </Grid>
          <Grid item>
            <EntitiesList
              entities={asset.data.Projects || []}
              label={t('navigation.projects')}
              type="project"
              zeroEntriesMessage={t('utils.noProjectsInAsset')}
            />
          </Grid>
          <Grid item>
            <Grid container item component={Paper}>
              <PublicAssetInfo singleAsset={asset} />
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      {editDialogOpen && (
        <AssetEditor
          title={t('assets.editAsset')}
          open
          data={asset.data}
          handleClose={() => setEditDialogOpen(false)}
        />
      )}
    </div>
  );
}

export default connect(
  state => ({
    user: state.user,
    asset: state.asset.singleAsset,
  }),
  dispatch => ({
    showError: (err) => dispatch(addAlert({ text: err.message, level: 'error' })),
    getAsset: (assetID, userID) => dispatch(getAssetAction(assetID, userID)),
  })
)(AssetPublicView);
