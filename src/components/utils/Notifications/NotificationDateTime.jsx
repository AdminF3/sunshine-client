import React from 'react';
import moment from 'moment';

import {
    Typography,
    makeStyles
} from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    dateStyle: {
        marginTop: 15,
        fontSize: 13,
        color: theme.palette.text.disabled,
    },
}));

function NotificationDateTime(props) {
    const { notification } = props;
    const classes = useStyles();

    return (
        <Typography className={classes.dateStyle}>{moment(notification.date).format('DD-MM-YYYY HH:MM')}</Typography>
    );
}

export default NotificationDateTime;