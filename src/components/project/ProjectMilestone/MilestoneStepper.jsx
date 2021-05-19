import React from 'react';

import {
    Stepper,
    Step,
    StepLabel,
    withStyles,
} from '@material-ui/core';
import {
    RadioButtonChecked as StepLabelBlankIcon,
} from '@material-ui/icons';

import { isMilestoneEnabled } from '../../../utils/can';
import styles from './styles';

function MilestoneStepper(props) {
    const {
        classes,
        milestones,
        activeStep,
        handleStepChange,
        currentMilestoneIndex,
        unlocked,
        labelIconBlank,
        project,
        phase,
        disabled,
    } = props;

    const iconProps = {};
    if (labelIconBlank) {
        iconProps.icon = <StepLabelBlankIcon color={disabled ? 'disabled' : 'primary'} />;
    }

    return (
        <React.Fragment>
            <Stepper
                className={classes.stepper}
                activeStep={activeStep}
                orientation="vertical"
                elevation={2}
            >
                {
                    milestones.map((milestone, i) => {
                        return (
                            <Step
                                className={classes.step}
                                key={milestone.label}
                                onClick={() => {
                                    handleStepChange(i);
                                }}
                                completed={!unlocked && currentMilestoneIndex > i}
                                active={isMilestoneEnabled(project, milestone, milestones, phase) || unlocked}
                            >
                                <StepLabel
                                    style={{ cursor: 'pointer' }}
                                    className={activeStep === i ? classes.activeStep : null}
                                    {...iconProps}
                                >
                                    {milestone.label}
                                </StepLabel>
                            </Step>
                        );
                    })
                }
            </Stepper>
        </React.Fragment>
    );
}

export default withStyles(styles)(MilestoneStepper);
