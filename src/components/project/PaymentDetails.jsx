import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useMutation } from '@apollo/react-hooks';
import moment from 'moment';
import {
    Button,
    Grid,
    Typography,
    CircularProgress,
    makeStyles
} from '@material-ui/core';

import {
    Event as DateIcon,
} from '@material-ui/icons';

import apolloClient from '../../utils/apolloClient';
import Input from '../utils/Input';

import { refetchSingleProject } from '../../actions/projects';

import { addAlert as addAlertAction } from '../../actions/alerts';

import {
    CREATE_FORFAITING_PAYMENT,
    UPDATE_FORFAITING_PAYMENT,
} from '../../actions/projectsMutations';

import currencies from '../../constants/currencies';

const useStyles = makeStyles(theme => ({
    paymentsContainer: {
        padding: 10
    },
    transitionButton: {
        marginTop: theme.spacing(4),
        marginBottom: theme.spacing(2),
        marginRight: theme.spacing(2),
        float: 'right'
    }
}));

function PaymentDetails(props) {
    const classes = useStyles();
    const { t } = useTranslation('translations');
    const {
        disabled,
        project,
        refetchProject,
        addNewAlert
    } = props;

    const forfaitingPaymentData = project.data?.ForfaitingPayment;
    const currencyOptions = currencies.map(c => ({ value: c, label: c }));

    const [paymentData, setPaymentData] = useState({
        date: new Date(forfaitingPaymentData?.TransferDate || Date()),
        value: forfaitingPaymentData?.TransferValue || 0,
        currency: {
            value: forfaitingPaymentData?.Currency.toUpperCase() || 'EUR',
            label: forfaitingPaymentData?.Currency.toUpperCase() || 'EUR',
        }
    });

    const [createForfaitingPayment, create] = useMutation(CREATE_FORFAITING_PAYMENT, {
        client: apolloClient,
        variables: {
            pid: project._id,
            transferValue: paymentData.value,
            currency: paymentData.currency.value,
            transferDate: paymentData.date.toISOString()
        },
        onCompleted: () => {
            refetchProject(project._id);
            addNewAlert({ text: t('utils.changesSaved'), level: 'success' });
        },
        onError: () => addNewAlert({ text: t('error.internal'), level: 'error' })
    });

    const [updateForfaitingPayment, update] = useMutation(UPDATE_FORFAITING_PAYMENT, {
        client: apolloClient,
        variables: {
            pid: project._id,
            faid: forfaitingPaymentData?.ID,
            transferValue: paymentData.value || 0,
            currency: paymentData.currency.value,
            transferDate: paymentData.date.toISOString()
        },
        onCompleted: () => {
            refetchProject(project._id);
            addNewAlert({ text: t('utils.changesSaved'), level: 'success' });
        },
        onError: () => addNewAlert({ text: t('error.internal'), level: 'error' })
    });

    return (
        <Grid
            container
            spacing={2}
            className={classes.paymentsContainer}
        >
            <Grid
                item
                xs={12}
            >
                <Typography>
                    {t('milestones.paymentConfirmationDetails')}
                </Typography>
            </Grid>
            <Grid
                item
                xs={12}
                md={5}
            >
                <Input
                    type="datepicker"
                    label={t('milestones.dateTransfer')}
                    value={moment(paymentData.date).format('YYYY/MM/DD')}
                    startAdornment={<DateIcon color="disabled" />}
                    onChange={e => setPaymentData({
                        ...paymentData,
                        date: e.target.value ? e.target.value : '',
                    })}
                />
            </Grid>
            <Grid
                item
                xs={2}
                md={2}
            >
                <Input
                    label={t('milestones.selectCurrency')}
                    options={currencyOptions}
                    value={paymentData.currency}
                    onChange={e => setPaymentData({
                        ...paymentData, currency: {
                            value: e.value,
                            label: e.value
                        }
                    })}
                    search
                />
            </Grid>
            <Grid
                item
                xs={10}
                md={5}
            >
                <Input
                    label={t('milestones.valueTransfer')}
                    value={paymentData.value}
                    onChange={e => setPaymentData({ ...paymentData, value: e.target.value })}
                    type="number"
                />
            </Grid>
            <Grid
                item
                xs={12}
            >
                <Button
                    onClick={!forfaitingPaymentData ? createForfaitingPayment : updateForfaitingPayment}
                    className={classes.transitionButton}
                    variant="contained"
                    color="secondary"
                    disabled={disabled || create.loading || update.loading}
                >
                    {
                        (create.loading || update.loading)
                        ? <CircularProgress size={24} />
                        : t('meetings.save')
                    }
                </Button>
            </Grid>
        </Grid>
    );
}

PaymentDetails.propTypes = {
    project: PropTypes.shape({
        _id: PropTypes.string.isRequired,
        data: PropTypes.object.isRequired,
    })
};

export default connect(
    state => ({
        project: state.project.refetchProject,
    }),
    dispatch => ({
        refetchProject: (projectId) => dispatch(refetchSingleProject(projectId)),
        addNewAlert: (a) => dispatch(addAlertAction(a))
    })
)(PaymentDetails);
