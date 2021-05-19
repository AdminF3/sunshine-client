import React, { useState } from 'react';
import { connect } from 'react-redux';
import { useTranslation } from 'react-i18next';
import Dropzone from 'react-dropzone';
import {
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
  makeStyles,
} from '@material-ui/core';
import {
  PersonPinCircle as ClaimResidencyIcon,
  Attachment as AttachmentIcon,
  CloudUpload as UploadIcon,
} from '@material-ui/icons';

import { allowedMimeTypes } from '../../utils/mimeTypes';
import { uploadFile as uploadFileAction } from '../../actions/uploads';
import { addAlert } from '../../actions/alerts';
import Tooltip from '../utils/TooltipWrapper';
import { parseAddress } from './utils';

const useStyles = makeStyles(theme => ({
  uploadButtonContainer: {
    marginTop: theme.spacing(2),
  },
  uploadedFilesContainer: {
    marginTop: theme.spacing(2),
    '& > *': {
      marginRight: theme.spacing(1),
      marginBottom: theme.spacing(1),

      '&:last-child': {
        marginRight: 0,
      },
    },
  },
}));

function ClaimResidencyButton(props) {
  const {
    user,
    asset,
    submitAssetResidencyClaim,
  } = props;

  const { t } = useTranslation('translations');
  const classes = useStyles();

  const [isOpen, setIsOpen] = useState(false);
  const [files, setUploadedFiles] = useState([]);

  const toggleDialogOpen = () => setIsOpen(!isOpen);
  const handleDeleteAttachment = (i) => {
    setUploadedFiles(files.filter((_, _i) => _i !== i));
  };

  const handleSubmit = () => {
    for (const i in files) {
      submitAssetResidencyClaim({
        userID: user.profileInfo._id,
        file: files[i],
        assetID: asset.ID,
        assetAddress: parseAddress(asset.address),
        assetOwnerID: asset.owner?._id,
        assetEscoID: asset.esco?._id,
        country: asset.country,
      });
    }
    toggleDialogOpen();
  };

  const canClaim = Boolean(user?.profileInfo?._id);
  const tooltipTitle = canClaim ? t('assets.claimResidencyTooltip') : t('assets.claimResidencyTooltipPublic');

  return (
    <React.Fragment>
      <Tooltip title={tooltipTitle}>
        <span>
          <Button
            variant="outlined"
            color="primary"
            className="ClaimResidencyButton"
            endIcon={<ClaimResidencyIcon />}
            onClick={toggleDialogOpen}
            disabled={!canClaim}
          >
            <Typography>{t('assets.claimResidency')}</Typography>
          </Button>
        </span>
      </Tooltip>
      <Dialog
        open={isOpen}
        onClose={toggleDialogOpen}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>
          {t('assets.claimResidencyTitle')}
        </DialogTitle>
        <DialogContent>
          <FileUpload
            onDropAcceted={af => setUploadedFiles(af)}
            className={classes.uploadButtonContainer}
          />
          <Typography variant="caption" gutterBottom>
            {t('assets.claimResidencyInfo')}
          </Typography>
          <div className={classes.uploadedFilesContainer}>
            {files.map((f, i) => (
              <Chip
                key={i}
                icon={<AttachmentIcon />}
                label={f.name}
                onDelete={() => handleDeleteAttachment(i)}
              />
            ))}
          </div>

        </DialogContent>
        <DialogActions>
          <Button
            color="inherit"
            onClick={toggleDialogOpen}
          >
            {t('utils.confirmDialogCancel')}
          </Button>
          <Button
            color="primary"
            variant="contained"
            disabled={!asset?.ID || files.length === 0}
            onClick={handleSubmit}
          >
            {t('utils.confirmDialogОК')}
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}

function FileUpload(props) {
  const {
    onDropAcceted,
    className,
  } = props;

  const { t } = useTranslation('translations');

  return (
    <Dropzone
      onDrop={(acceptedFiles) => onDropAcceted(acceptedFiles)}
      accept={allowedMimeTypes}
    >
      {({ getRootProps, getInputProps }) => {
        return (
          <div {...getRootProps()} tabIndex="none" className={className}>
            <input {...getInputProps()} />
            <Button
              color="primary"
              startIcon={<UploadIcon />}
            >
              {t('documents.uploadDocument')}
            </Button>
          </div>
        );
      }}
    </Dropzone>
  );
}

export default connect(
  state => ({
    user: state.user,
    organization: state.organization,
  }),
  dispatch => ({
    submitAssetResidencyClaim: ({ userID, file, assetID, assetOwnerID, assetEscoID, assetAddress, country }) => dispatch(uploadFileAction(
      file,
      {
        id: userID,
        type: 'user',
        comment: JSON.stringify({ assetID, assetAddress, assetOwnerID, assetEscoID, country }),
        kind: 'claimResidency'
      },
      { successMessageKey: 'translations:assets.claimResidencySuccess' },
    )),
    onSuccess: (msg) => dispatch(addAlert({ text: msg, level: 'success' })),
  }),
)(ClaimResidencyButton);
