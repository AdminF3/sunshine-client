import React, { useState, useEffect, useCallback } from 'react';
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
  AssignmentInd as ApplyIcon,
  Attachment as AttachmentIcon,
  CloudUpload as UploadIcon,
  InfoOutlined as InfoIcon,
} from '@material-ui/icons';

import { allowedMimeTypes } from '../../../utils/mimeTypes';
import { isResidentsCommunity } from '../../../constants/legalStatusTypes';
import { getAllOrganizations as getAllOrganizationsAction } from '../../../actions/organizations';
import { uploadFile as uploadFileAction } from '../../../actions/uploads';
import { addAlert } from '../../../actions/alerts';
import Input from '../../utils/Input';
import UserTooltip from '../../utils/UserTooltip';

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

function LEARApplyButton(props) {
  const {
    user,
    organizations,
    getOrganizations,
    submitLEARApplication,
  } = props;

  const { t } = useTranslation('translations');
  const classes = useStyles();

  const [isOpen, setIsOpen] = useState(false);
  const [selectedOrganization, setSelectedOrganization] = useState(null);
  const [files, setUploadedFiles] = useState([]);
  const [state, setState] = useState({ ready: false, loading: false });

  const { ready, loading } = state;
  const performGetOrganizations = useCallback(() => {
    if (!ready && !loading) {
      setState({ ready: false, loading: true });
      getOrganizations().then(() => setState({ ready: true, loading: false }));
    }
  }, [getOrganizations, setState, ready, loading]);

  useEffect(() => {
    performGetOrganizations();
  }, [performGetOrganizations]);

  const toggleDialogOpen = () => setIsOpen(!isOpen);
  const handleDeleteAttachment = (i) => {
    setUploadedFiles(files.filter((_, _i) => _i !== i));
  };

  const handleSubmit = () => {
    for (const i in files) {
      submitLEARApplication({
        userID: user.profileInfo._id,
        file: files[i],
        organizationID: selectedOrganization.value,
        organizationName: selectedOrganization.label,
      });
    }
    toggleDialogOpen();
  };

  return (
    <React.Fragment>
      <Button
        startIcon={<ApplyIcon color="inherit" />}
        endIcon={
          <UserTooltip
            title={t('tooltips:users.applyLEAR')}
            icon={<InfoIcon />}
            iconButtonProps={{ size: 'small', color: 'primary', component: 'span' }}
            placement="bottom"
            html
          />
        }
        onClick={toggleDialogOpen}
      >
        {t('organizations.learShort')}
      </Button>
      <Dialog
        open={isOpen}
        onClose={toggleDialogOpen}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>
          {t('roles.applyAsLEAR')}
        </DialogTitle>
        <DialogContent>
          <Input
            label={t('organizations.nameOfOrganization')}
            value={selectedOrganization}
            search
            options={organizations.filter(
                o => !isResidentsCommunity(o.data.legal_form)).map(o => ({ value: o._id, label: o.data.name })
            )}
            onChange={(e) => setSelectedOrganization({ value: e.value, label: e.label })}
          />
          <FileUpload
            onDropAcceted={af => setUploadedFiles(af)}
            className={classes.uploadButtonContainer}
          />
          <Typography variant="caption" gutterBottom>
            {t('roles.applyAsLEARFilesTitle')}
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
            disabled={!selectedOrganization?.value || files.length === 0}
            onClick={handleSubmit}
          >
            {t('utils.apply')}
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
    organizations: state.organization.allOrganizations,
  }),
  dispatch => ({
    getOrganizations: (offset = 0, limit = null) => dispatch(getAllOrganizationsAction(offset, limit)),
    submitLEARApplication: ({ userID, file, organizationID }) => dispatch(uploadFileAction(
      file,
      {
        id: userID,
        type: 'user',
        comment: JSON.stringify({ organizationID }),
        uploadType: 'lear apply',
        kind: 'learApply',
      },
      { successMessageKey: 'translations:roles.applyAsLEARSuccess' },
    )),
    onSuccess: (msg) => dispatch(addAlert({ text: msg, level: 'success' })),
  }),
)(LEARApplyButton);
