import React, { useState } from 'react';
import { connect } from 'react-redux';
import { useTranslation } from 'react-i18next';

import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Button,
    TextField,
    makeStyles
} from '@material-ui/core';

import { forgotPassword } from '../../../actions/authentication';

const useStyles = makeStyles({
    textField: {
        width: '100%'
    }
});

function ResetPassword(props) {
    const [isOpen, setIsOpen] = useState(false);
    const [email, setEmail] = useState('');
    const classes = useStyles();
    const { t } = useTranslation('translations');

    function handleIsOpen() {
        setIsOpen(!isOpen);
    }

    function handleForgotPassword() {
        props.forgotPassword(email);
        handleIsOpen();
        setEmail('');
    }

    return (
        <React.Fragment>
            <p className='primary-redirect' onClick={handleIsOpen} style={{ cursor: 'pointer', margin: 0 }}>
                {t('translations:auth.forgotPassword')}
            </p>
            <Dialog
                open={isOpen}
                onClose={handleIsOpen}
                fullWidth
                maxWidth="xs"
            >
                <DialogTitle>
                    {t('auth.forgotPassword')}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        {t('auth.enterAccountEmail')}
                    </DialogContentText>
                    <TextField
                        label={t('auth.email')}
                        variant="outlined"
                        className={classes.textField}
                        value={email}
                        onChange={v => setEmail(v.target.value)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button
                        variant="contained"
                        onClick={handleForgotPassword}
                        color="secondary"
                        disabled={email.length < 3}
                    >
                        {t('profile.confirm')}
                    </Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}

export default connect(
    null,
    dispatch => ({
      forgotPassword: (data) => dispatch(forgotPassword(data))
    }),
)(ResetPassword);