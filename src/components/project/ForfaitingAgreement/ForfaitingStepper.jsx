import React, { useState } from 'react';
import { connect } from 'react-redux';
import { useTranslation } from 'react-i18next';

import {
    Stepper,
    Step,
    StepLabel,
    makeStyles
} from '@material-ui/core';

import ForfaitingForm from './ForfaitingForm';
import ForfaitingApplication from './ForfaitingApplication';
import ButtonHint from '../../utils/ButtonHint';

import isSupportedCountry from '../../../utils/isSupportedCountry';
import { isMilestoneEnabled } from '../../../utils/can';

const useStyles = makeStyles({
    root: {
        marginTop: 20
    },
    stepLabel: {
        cursor: 'pointer',
        '& .MuiStepLabel-label': {
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
        },
    },
});

function ForfaitingStepper(props) {
    const {
        project,
        milestones,
        phase
    } = props;
    const { t } = useTranslation('translations');
    const classes = useStyles();
    const [isOpenForm, setIsOpenForm] = useState(false);
    const [isOpenApp, setIsOpenApp] = useState(window.location.hash === '#forfaiting-application');
    const fa = project.data?.ForfaitingApplication;

    function handleIsOpenForm(value) {
        setIsOpenForm(value);
    }

    function handleIsOpenApp(value) {
        window.history.pushState(
            '',
            window.document.title,
            window.location.pathname + (isOpenApp ? '' : '#forfaiting-application'),
        );
        setIsOpenApp(value);
    }

    function canOpenForm() {
        if (!isMilestoneEnabled(project, { milestoneEnum: 'PROJECT_DESIGN' }, milestones, phase)) {
            return false;
        }
        if (Boolean(fa)) {
            return false;
        }
        if (!isSupportedCountry(project.data.country)) {
            return false;
        }

        return true;
    }

    return (
        <React.Fragment>
            <Stepper
                className={classes.root}
                orientation="vertical"
                elevation={2}
            >
                <Step
                    onClick={
                        canOpenForm() ?
                            () => handleIsOpenForm(true) :
                            null
                    }
                    completed={Boolean(fa)}
                    active={
                        isMilestoneEnabled(project, { milestoneEnum: 'PROJECT_DESIGN' }, milestones, phase) &&
                        isSupportedCountry(project.data.country)
                    }
                >
                    <StepLabel
                        className={classes.stepLabel}
                    >
                        {t('forfaitingApplication.forfaitingForm')}
                        <ButtonHint hint={t('forfaitingApplication.availableForCountries')} />
                    </StepLabel>
                </Step>
                <Step
                    onClick={fa ? () => handleIsOpenApp(true) : null}
                    active={Boolean(fa)}
                >
                    <StepLabel
                        className={classes.stepLabel}
                    >
                        {t('forfaitingApplication.forfaitingApplication')}
                    </StepLabel>
                </Step>
            </Stepper>
            <ForfaitingForm isOpen={isOpenForm} handleIsOpen={handleIsOpenForm} />
            <ForfaitingApplication isOpen={isOpenApp} handleIsOpen={handleIsOpenApp} />
        </React.Fragment>
    );
}

export default connect(
    state => ({
        project: state.project.refetchProject
    })
)(ForfaitingStepper);
