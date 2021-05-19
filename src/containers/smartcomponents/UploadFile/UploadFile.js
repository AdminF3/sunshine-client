import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Dropzone from 'react-dropzone';
import { withTranslation, useTranslation } from 'react-i18next';
import {
  Typography,
  Avatar,
  Button,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Fab,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Slide,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  makeStyles,
  withStyles
} from '@material-ui/core';
import {
  CloudUpload,
  CloudDownload,
  DeleteForever,
  Folder as FolderIcon,
} from '@material-ui/icons';

import ENDPOINTS from '../../../constants/endpoints';
import Tooltip from '../../../components/utils/TooltipWrapper';
import { allowedMimeTypes } from '../../../utils/mimeTypes';
import { addAlert as alertAction } from '../../../actions/alerts';
import { uploadFile, deleteFile } from '../../../actions/uploads';
import ProgressBar from '../../../components/utils/ProgressBar';
import ButtonHint from '../../../components/utils/ButtonHint';
import MarkdownText from '../../../components/utils/MarkdownText';

import styles from './styles';

class UploadFile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      document: '',
      preview: '',
      error: '',
    };
    this.dropAccept = this.dropAccept.bind(this);
  }

  dropAccept(filesToUpload) {
    this.setState({ document: filesToUpload[0], preview: URL.createObjectURL(filesToUpload[0]) });
  }

  /* eslint-disable complexity */
  render() {
    const {
      classes,
      addAlert,
      entity,
      uploadDocument,
      alertText,
      canUpload,
      canDelete,
      disabled,
      deleteDocument,
      mimeTypes,
      onSuccess,
      uploads,
      hint,
      buttonOnly,
      table,
      t,
    } = this.props;

    const { document, preview } = this.state;

    const handleUploadDocument = () => {
      const file = this.state.document;

      if (!file) {
        addAlert(t('translations:documents.missingFile'), 'error');
      } else if (this.state.error) {
        addAlert(alertText, 'error');
      } else {
        uploadDocument(file, entity, onSuccess);
      }

      this.setState({ document: '', preview: '', error: '' });
    };

    if (table) {
      return (
        <UploadForTable
          entity={entity}
          dropAccept={this.dropAccept}
          uploads={uploads}
          mimeTypes={mimeTypes}
          handleUploadDocument={handleUploadDocument}
          document={document}
          preview={preview}
          deleteDocument={deleteDocument}
          onSuccess={onSuccess}
        />
      );
    }

    if (buttonOnly) {
      return (
        <React.Fragment>
          <Dropzone
            onDropAccepted={(filesToUpload) => this.dropAccept(filesToUpload)}
            onDropRejected={() => addAlert(alertText, 'error')}
            accept={mimeTypes}
            className={classes.dropzoneContainer}
            disabled={disabled}
          >
            {({ getInputProps, getRootProps }) => {
              return (
                <div {...getRootProps()}
                  style={{
                    display: 'inline-flex',
                    marginRight: 6,
                  }}
                >
                  <input {...getInputProps()} />

                  <span>
                    <Button
                      variant="contained"
                      color="primary"
                      disabled={uploads.uploading || disabled}
                    >
                      {t('utils.addFile')}
                    </Button>

                    <Tooltip
                      placement="top"
                      title={(this.state.document && this.state.document.name) || 'Click the button above to add a file for upload'}
                      disabled={disabled}
                    >
                      <Typography
                        variant="caption"
                        component="p"
                        gutterBottom={false}
                        style={{
                          position: 'absolute',
                          overflow: 'hidden',
                          whiteSpace: 'nowrap',
                          textOverflow: 'ellipsis',
                          cursor: 'pointer',
                          width: 200
                        }}
                      >
                        {!this.state.document ? t('utils.noFileAdded') : this.state.document.name}
                      </Typography>
                    </Tooltip>
                  </span>
                </div>
              );
            }}
          </Dropzone>
          <Button
            variant="contained"
            onClick={handleUploadDocument}
            color="secondary"
            endIcon={<CloudUpload />}
            disabled={uploads.uploading || !this.state.document}
          >
            {t('notifications.upload')}
          </Button>
        </React.Fragment>
      );
    }

    return (
      <div className={`${classes.root} UploadFile-root`}>
        {hint && (
          <div className={`${classes.hintContainer} row`}>
            <ButtonHint hint={hint} />
          </div>
        )}
        <div className="row">
          <div className={`col-xs-12 col-lg-4 ${classes.dropzoneOuterContainer}`}>
            {
              dropZoneUpload({
                classes,
                uploads,
                mimeTypes,
                addAlert,
                alertText,
                handleUploadDocument,
                document,
                preview,
                canUpload,
                t,
              }, this.dropAccept)}
          </div>
          <div
            className={`col-xs-12 col-lg-8 UploadedFile-container ${classes.uploadedFilesContainer}`}
          >
            {
              uploads.deleting &&
              <div className={`${classes.dropzoneLoading} ${classes.dropzoneDeleteOverlay}`}>
                <ProgressBar addStyle={{ marginLeft: null }} />
              </div>
            }
            {listOfUploads({ classes, entity, canUpload, deleteDocument, onSuccess, canDelete, t })}
          </div>
        </div>
      </div>
    );
  }
  /* eslint-enable complexity */
}

UploadFile.defaultProps = {
  mimeTypes: allowedMimeTypes,
  canDelete: true,
};

UploadFile.propTypes = {
  entity: PropTypes.shape({
    id: PropTypes.string,
    attachments: PropTypes.array,
    type: PropTypes.string,
  }).isRequired,
  mimeTypes: PropTypes.string,
  onSuccess: PropTypes.func,
  canDelete: PropTypes.bool.isRequired,
};

export default withStyles(styles)(withTranslation('translations')(connect(
  state => ({
    uploads: state.uploads,
  }),
  dispatch => ({
    uploadDocument: (file, entity, onSuccess) => dispatch(uploadFile(file, entity, { onSuccess })),
    deleteDocument: (name, entity, onSuccess) => dispatch(deleteFile(name, entity, { onSuccess })), // eslint-disable-line no-shadow
    addAlert: (text, level) => dispatch(alertAction({ text, level })),
  })
)(UploadFile)));

function dropZoneUpload(props, dropAccept) {
  const {
    classes,
    uploads,
    mimeTypes,
    addAlert,
    alertText,
    handleUploadDocument,
    document, // eslint-disable-line no-shadow
    preview,
    canUpload,
    t,
  } = props;
  return (
    <React.Fragment>
      {uploads.uploading &&
        <div className={classes.dropzoneLoading}>
          <ProgressBar addStyle={{ marginLeft: null }} />
        </div>
      }
      <Dropzone
        onDropAccepted={(filesToUpload) => {
          dropAccept(filesToUpload);
        }}
        onDropRejected={() => addAlert(alertText, 'error')}
        accept={mimeTypes}
        className={classes.dropzoneContainer}
        disabled={!canUpload}
      >
        {({ getInputProps, getRootProps }) => {
          if (uploads.uploading) {
            return null;
          }
          return (
            <section className={classes.section}>
              <div {...getRootProps()} className={classes.dropzoneInputWrapper}>
                <input {...getInputProps()} />
                {document ? document.type === 'image/jpeg' || document.type === 'image/png' ?
                  <React.Fragment>
                    <Avatar
                      className={classes.avatar}
                      src={preview
                        ? preview
                        : null
                      }
                    />
                    <div className={classes.selectedFileOnHoverMessage}>
                      <MarkdownText text={t('utils.dragOrUploadCTA', { maxSize: 50 })} variant="caption" />
                    </div>
                  </React.Fragment> :
                  <div className={classes.droppedFileContainer}>
                    <div className={classes.droppedFileDocumentStyle}>
                      <span className={classes.dropzoneLabelSpan}>{document.name}</span>
                    </div>
                    <div className={classes.selectedFileOnHoverMessage}>
                      <MarkdownText text={t('utils.dragOrUploadCTA', { maxSize: 50 })} variant="caption" />
                    </div>
                  </div> :
                  <div className={classes.logoDropzoneContainer}>
                    <div className={classes.logoDropzoneInner}>
                      <div className={classes.dashedIconContainer}>
                        <CloudUpload style={{ width: '45px', height: '45px', color: '#e2e3e9' }} />
                      </div>
                    </div>
                    <div className={classes.dropzoneLabel}>
                      <MarkdownText text={t('utils.dragOrUploadCTA', { maxSize: 50 })} variant="caption" />
                    </div>
                  </div>}
              </div>
            </section>
          );
        }}
      </Dropzone>
      <Button
        variant='contained'
        onClick={handleUploadDocument}
        className={`${classes.uploadButton} UploadFile-button`}
        disabled={uploads.uploading || !canUpload}
      >
        {t('notifications.upload')}
      </Button>
    </React.Fragment>
  );
}

function listOfUploads(props) {
  const { classes, entity, canUpload, deleteDocument, onSuccess, canDelete, t } = props;
  if (!entity.attachments) {
    return (
      <div className={classes.noUploads}>
        {t('utils.noUploadedFilesYet')}
      </div>
    );
  }
  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell padding="none" className={classes.fileNames}>{t('documents.fileNames')}</TableCell>
          <TableCell padding="none" className={classes.actions} align="right">{t('documents.actions')}</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {(entity.attachments || []).map((attachment, i) => (
          <TableRow key={i}>
            <TableCell padding='none' scope='row'>
              {decodeURI(attachment.name)}
            </TableCell>
            <TableCell padding='none' align='right'>
              {canUpload &&
                <Fab
                  disabled={!canDelete}
                  onClick={() => deleteDocument(attachment.name, entity, onSuccess)}
                  className={classes.floatingButton}
                >
                  <DeleteForever />
                </Fab>
              }
              <a
                href={ENDPOINTS.SERVER + `/${entity.type}/` + entity.id + '/' + attachment.name}
                style={{ textDecoration: 'none' }}
                download
              >
                <Fab className={classes.floatingButton}>
                  <CloudDownload />
                </Fab>
              </a>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

const useStyles = makeStyles(() => (styles));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="left" ref={ref} {...props} />;
});

function UploadForTable(props) {
  const [isOpen, setOpen] = React.useState(false);
  const classes = useStyles('translations');
  const {
    entity,
    dropAccept,
    mimeTypes,
    uploads,
    document, // eslint-disable-line no-shadow
    preview,
    handleUploadDocument,
    deleteDocument,
    onSuccess
  } = props;

  const { t } = useTranslation('translations');

  const handleOpen = () => {
    setOpen(!isOpen);
  };

  return (
    <React.Fragment>
      <Button
        variant="contained"
        color="primary"
        onClick={handleOpen}
        className={classes.button}
      >
        {t('navigation.documents')}
      </Button>
      <Dialog
        open={isOpen}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleOpen}
        className={classes.documents}
      >
        <DialogTitle>{entity.comment}</DialogTitle>
        <DialogContent style={{ marginTop: 50, position: 'relative' }}>
          <Dropzone
            onDropAccepted={(filesToUpload) => {
              dropAccept(filesToUpload);
            }}
            accept={mimeTypes}
            className={classes.dropzoneContainer}
          >
            {({ getInputProps, getRootProps }) => {
              if (uploads.uploading) {
                return null;
              }
              return (
                <section className={classes.section}>
                  <div {...getRootProps()} className={classes.dropzoneInputWrapper}>
                    <input {...getInputProps()} />
                    {document ? document.type === 'image/jpeg' || document.type === 'image/png' ?
                      <React.Fragment>
                        <Avatar
                          className={classes.avatar}
                          src={preview
                            ? preview
                            : null
                          }
                        />
                        <div className={classes.selectedFileOnHoverMessage}>
                          <MarkdownText text={t('utils.dragOrUploadCTA', { maxSize: 50 })} variant="caption" />
                      </div>
                      </React.Fragment> :
                      <div className={classes.droppedFileContainer}>
                        <div className={classes.droppedFileDocumentStyle}>
                          <span className={classes.dropzoneLabelSpan}>{document.name}</span>
                        </div>
                        <div className={classes.selectedFileOnHoverMessage}>
                          <MarkdownText text={t('utils.dragOrUploadCTA', { maxSize: 50 })} variant="caption" />
                        </div>
                      </div> :
                      <div className={classes.logoDropzoneContainer}>
                        <div className={classes.logoDropzoneInner}>
                          <div className={classes.dashedIconContainer}>
                            <CloudUpload style={{ width: '45px', height: '45px', color: '#e2e3e9' }} />
                          </div>
                        </div>
                        <div className={classes.dropzoneLabel}>
                          <MarkdownText text={t('utils.dragOrUploadCTA', { maxSize: 50 })} variant="caption" />
                        </div>
                      </div>
                    }
                  </div>
                </section>
              );
            }}
          </Dropzone>
          <Button
            variant='contained'
            onClick={handleUploadDocument}
            className={`${classes.uploadButton} UploadFile-button`}
          >
            {t('notifications.upload')}
          </Button>
          <Typography variant="h6" style={{ marginTop: 50 }}>
            {t('notifications.relatedDocuments')}
          </Typography>
          <List>
            {entity.attachments.map((file, i) => (
              <ListItem key={i}>
                <ListItemAvatar>
                  <FolderIcon style={{ color: '#757575' }}/>
                </ListItemAvatar>
                <ListItemText
                  disableTypography
                  primary={
                    <Typography
                      style={{ textDecoration: 'none', color: '#000' }}
                      component="a"
                      href={ENDPOINTS.SERVER + `/${entity.type}/` + entity.id + '/' + file.name}
                      target="_blank"
                    >
                      {file.name}
                    </Typography>
                  }
                />
                <ListItemSecondaryAction>
                  <IconButton
                    edge="end"
                    onClick={() => deleteDocument(file.name, entity, onSuccess)}
                  >
                    <DeleteForever />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            ))}
          </List>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleOpen} color="primary">
            {t('utils.confirmDialogClose')}
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
