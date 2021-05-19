import React from 'react';
import { Link } from 'react-router-dom';
import {
    Button,
    Dialog,
    DialogContent,
    Typography,
    withStyles,
} from '@material-ui/core';
import { styles } from './styles';
import SunshineLogo from '../../../images/Sunshine.png';

const PageNotFound = (props) => {
    const { classes } = props;
    return (
        <Dialog fullScreen open>
            <DialogContent className={classes.container}>
                <img src={SunshineLogo} className={classes.logo} alt='Sunshine circle logo' />
                <Typography variant="h1" gutterBottom>404</Typography>
                <Typography variant="h4" gutterBottom>Page Not Found</Typography>
                <Button component={Link} to="/" variant="contained" color="primary" size="large">
                    Go back to home
                </Button>
            </DialogContent>
        </Dialog>
    );
};

export default withStyles(styles)(PageNotFound);
