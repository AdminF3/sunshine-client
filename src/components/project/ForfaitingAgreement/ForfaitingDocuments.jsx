import React from 'react';

import {
    Typography,
    makeStyles
} from '@material-ui/core';

import {
    Description,
} from '@material-ui/icons';

import TextWithIcon from '../../utils/TextWithIcon';
import ENDPOINTS from '../../../constants/endpoints';

const useStyles = makeStyles(theme => ({
    fileLabel: {
        marginTop: 10,
        marginLeft: 10,
        color: theme.palette.primary.light,
        textDecoration: 'none',
    },
    file: {
        marginLeft: 20,
        color: theme.palette.text.secondary,
        textDecoration: 'none',
        display: 'block',
    },
    missingFile: {
        marginLeft: 10,
        color: theme.palette.error.dark,
        textDecoration: 'none',
    },
    presentFileIcon: {
        color: theme.palette.primary.light
    },
    missingFileIcon: {
        color: theme.palette.error.dark
    },
}));

function ForfaitingDocuments(props) {
    const { label, files, missingLabel, projectId } = props;
    const classes = useStyles();

    return (
        files.length > 0 ?
            <React.Fragment>
                <TextWithIcon
                    icon={<Description className={classes.presentFileIcon} />}
                    className={classes.fileLabel}
                >
                    {label}
                </TextWithIcon>
                {
                    files.map(el => (
                        <Typography
                            component="a"
                            href={ENDPOINTS.SERVER + '/project/' + projectId + '/' + el.name}
                            download
                            target="_blank"
                            className={classes.file}
                            key={el.ID}
                        >
                            {decodeURI(el.name)}
                        </Typography>
                    ))
                }
            </React.Fragment>
            :
            <TextWithIcon
                icon={<Description className={classes.missingFileIcon} />}
                className={classes.missingFile}
            >
                {missingLabel}
            </TextWithIcon>
    );
}

export default ForfaitingDocuments;
