import React from 'react';
import { makeStyles } from '@material-ui/core';
import ErrorOutline from '@material-ui/icons/ErrorOutline';

const useStyles = makeStyles({
    container: {
        textAlign: 'center',
        marginTop: 200
    },
    label: {
        textAlign: 'center',
        fontSize: 28,
        color: '#848c98',
        marginTop: 20
    },
    icon: {
        width: 100,
        height: 100,
        color: '#848c98'
    }
});

function NotAvailable(props) {
    const { message } = props;
    const classes = useStyles('translations');
    return (
        <div className={classes.container}>
            <ErrorOutline className={classes.icon} />
            <div className={classes.label}>
                {message}
            </div>
        </div>
    );
}

export default NotAvailable;