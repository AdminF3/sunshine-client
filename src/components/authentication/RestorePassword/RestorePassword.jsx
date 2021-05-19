import React, { useState } from 'react';
import { connect } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { withRouter } from 'react-router-dom';

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

import { restorePassword } from '../../../actions/authentication';

const useStyles = makeStyles({
    textField: {
        width: '100%',
        marginTop: 20,
        marginBottom: 20,
    }
});

const defaultValues = {
    newPassword: '',
    repeatPassword: ''
};

function RestorePassword(props) {
    const [passwords, setPasswords] = useState(defaultValues);

    const classes = useStyles();
    const { t } = useTranslation('translations');

    function handleForgotPassword() {
        props.restorePassword({
            password: passwords.newPassword,
            token: props.match.params.token
        }).then(() => props.history.push('/login'));
        setPasswords(defaultValues);
    }

    function canConfirm() {
        if (!passwords.newPassword) {
            return false;
        } else if (!passwords.repeatPassword) {
            return false;
        } else if (passwords.newPassword !== passwords.repeatPassword) {
            return false;
        }

        return true;
    }

    return (
        <React.Fragment>
            <Dialog
                open
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
                        type="password"
                        label={t('auth.newPassword')}
                        variant="outlined"
                        className={classes.textField}
                        value={passwords.newPassword}
                        onChange={v => setPasswords({ ...passwords, newPassword: v.target.value})}
                    />
                    <TextField
                        type="password"
                        label={t('auth.repeatPassword')}
                        variant="outlined"
                        className={classes.textField}
                        value={passwords.repeatPassword}
                        onChange={v => setPasswords({ ...passwords, repeatPassword: v.target.value})}
                    />
                </DialogContent>
                <DialogActions>
                    <Button
                        variant="contained"
                        onClick={handleForgotPassword}
                        color="secondary"
                        disabled={!canConfirm()}
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
        restorePassword: (data) => dispatch(restorePassword(data))
    }),
)(withRouter(RestorePassword));