import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import Dropzone from 'react-dropzone';
import clsx from 'clsx';
import {
  Avatar,
  Badge,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  Typography,
  makeStyles,
  ListItemIcon,
} from '@material-ui/core';
import {
  CloudUpload as UploadIcon,
  CloudDownload as DownloadIcon,
  DeleteForever as DeleteIcon,
  Description as FileIcon,
} from '@material-ui/icons';

import { convertBytes } from '../../../utils/math';
import { entityFileURL } from '../../../utils/file';
import { allowedMimeTypes } from '../../../utils/mimeTypes';

const useStyles = makeStyles(theme => ({
  dropzone: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: theme.spacing(2),
    border: `2px dashed ${theme.palette.divider}`,
    borderRadius: 8,
    '&:focus': {
      borderColor: theme.palette.action.selected,
      outline: 0,
    },
    '&.dragenter': {
      borderColor: theme.palette.action.active,
      '& .Dropzone-caption': {
        textDecoration: 'underline',
      },
    },
  },
  filesList: {
    width: '100%',

    '& .MuiListItem-container': {
      '&:hover': {
        backgroundColor: theme.palette.background.default,
      },
    },
    '& .MuiListItem-secondaryAction': {
      paddingLeft: 0,
      paddingRight: theme.spacing(11),
    },
    '& .MuiBadge-badge': {
      fontSize: 8,
      transform: 'scale(1) translate(30%, 60%)',
    },
  },
}));

function FilesManager(props) {
  const {
    title,
    files,
    subtitle,
    entityID,
    entityType,
    onFileAdded,
    onFileDeleted,
  } = props;

  const { t } = useTranslation('translations');
  const classes = useStyles();
  const [isDragActive, setIsDragActive] = useState(false);

  const alignment = files.length > 0 ? 'flex-start' : 'center';
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        {title && (
          <Typography variant="h6" color="textPrimary">
            {title}
          </Typography>
        )}
        {subtitle && (
          <Typography variant="caption" color="textPrimary">
            {subtitle}
          </Typography>
        )}
      </Grid>
      <Grid item container sm={10} xs={12} justify={alignment} alignItems={alignment}>
        <FilesList
          files={files}
          entityID={entityID}
          entityType={entityType}
          onDelete={onFileDeleted}
        />
      </Grid>
      <Grid item sm={2} x={12}>
        <Dropzone
          accept={allowedMimeTypes}
          onDropAccepted={f => {
            setIsDragActive(false);
            onFileAdded(f);
          }}
          onDragEnter={() => !isDragActive && setIsDragActive(true)}
          onDragLeave={() => isDragActive && setIsDragActive(false)}
        >
          {({ getRootProps, getInputProps }) => {
            return (
              <div {...getRootProps()} className={clsx(classes.dropzone, { dragenter: isDragActive })}>
                <input {...getInputProps()} />
                <UploadIcon color={isDragActive ? 'primary' : 'disabled'} />
                <Typography variant="caption" className="Dropzone-caption" align="center">
                  {t('documents.dragOrBrowse')}
                </Typography>

              </div>
            );
          }}
        </Dropzone>
      </Grid>
    </Grid>
  );
}

FilesManager.propTypes = {
  files: PropTypes.array,
  entityType: PropTypes.string,
  entityID: PropTypes.string,
  title: PropTypes.node,
  subtitle: PropTypes.node,
};

function FilesList(props) {
  const {
    files,
    entityID,
    entityType,
    onDelete,
  } = props;
  const { t } = useTranslation('translations');

  const classes = useStyles();

  if (files.length < 1) {
    return (
      <Typography variанt="h5">
        {t('documents.noDocumentsUploaded')}
      </Typography>
    );
  }

  return (
    <List dense disablePadding className={classes.filesList}>
      {files.map((f, i) => (
        <ListItem key={i}>
          <ListItemIcon>
            <FilePreviewIcon
              file={f}
              entityID={entityID}
              entityType={entityType}
            />
          </ListItemIcon>
          <ListItemText
            primary={decodeURI(f.name)}
            secondary={convertBytes(f.size)}
          />
          <ListItemSecondaryAction>
            {f.ID && (
              <IconButton
                component="a"
                href={entityFileURL({ ID: entityID, type: entityType }, f.name)}
                target="_blank"
                rel="noopener noreferrer"
                download
                size="small"
              >
                <DownloadIcon />
              </IconButton>
            )}
            <IconButton size="small" onClick={() => onDelete(f)}>
              <DeleteIcon />
            </IconButton>
          </ListItemSecondaryAction>
        </ListItem>
      ))}
    </List>
  );
}

function FilePreviewIcon(props) {
  const {
    file,
    entityID,
    entityType,
  } = props;

  const contentType = file.ID ? file.content_type : file.type;
  const ext = file.name.substring(file.name.lastIndexOf('.'));
  const badgeProps = {
    badgeContent: ext,
    color: 'secondary',
    anchorOrigin: {
      vertical: 'bottom',
      horizontal: 'right',
    },
  };

  if (['image/jpeg', 'image/png'].indexOf(contentType) > -1) {
    const src = file.ID ? entityFileURL({ ID: entityID, type: entityType }, file.name) : URL.createObjectURL(file);
    return (
      <Badge {...badgeProps}>
        <Avatar
          alt={file.name}
          src={src}
          variant="square"
        />
      </Badge>
    );
  }

  return (
    <Badge {...badgeProps}>
      <FileIcon fontSize="large" />
    </Badge>
  );
}

FilesList.defaultProps = {
  files: [],
  title: null,
  subtitle: null,
};

export default FilesManager;
