import React from 'react';
import { useTranslation } from 'react-i18next';
import {
    ListItem,
    ListItemAvatar,
    Avatar,
    ListItemText,
    ListItemSecondaryAction,
    IconButton,
    makeStyles
} from '@material-ui/core';
import {
    InsertDriveFile as FileIcon,
    CloudUpload as UploadIcon,
} from '@material-ui/icons';

import Dropzone from 'react-dropzone';

const useStyles = makeStyles(theme => ({
    logoUpload: {
        border: '1px solid',
        borderColor: theme.palette.action.disabled,
        borderRadius: theme.shape.borderRadius,
        paddingLeft: theme.spacing(1),

        '&:hover': {
            borderColor: theme.palette.text.primary,
        },
        '& .MuiAvatar-root': {
            width: 80,
            marginRight: theme.spacing(1),
        },
        '& .MuiListItemText-root': {
            textAlign: 'center',
        },
    },
}));

function GDPRUploads(props) {
    const {
        files,
        onDropAccepted,
        className
    } = props;

    const { t } = useTranslation('translations');
    const classes = useStyles();

    return (
        <ListItem
            component="div"
            ContainerComponent="div"
            className={classes.logoUpload}
        >
            <ListItemAvatar>
                <Avatar variant="square">
                    <FileIcon />
                </Avatar>
            </ListItemAvatar>
            <ListItemText
                primary={
                    files.length > 0 ?
                        files.map(f => f.name + '; ') :
                        t('navigation.documents')
                }
            />
            <ListItemSecondaryAction>
                <Dropzone
                    accept="image/jpeg, image/png"
                    onDropAccepted={(acceptedFiles) => onDropAccepted(acceptedFiles)}
                >
                    {({ getRootProps, getInputProps }) => {
                        return (
                            <div {...getRootProps()} tabIndex="none" className={className}>
                                <input {...getInputProps()} />
                                <IconButton>
                                    <UploadIcon />
                                </IconButton>
                            </div>
                        );
                    }}
                </Dropzone>
            </ListItemSecondaryAction>
        </ListItem>
    );
}

export default GDPRUploads;