import React, { useState } from 'react';
import {
    Typography,
    Accordion,
    AccordionSummary,
    makeStyles,
} from '@material-ui/core';
import {
    ExpandMore as ExpandMoreIcon
} from '@material-ui/icons';

import {
    canEditProject,
    isMilestoneEnabled,
    canCommentMilestone,
} from '../../../utils/can';
import MilestonesAccordion from './MilestonesAccordion';
import CommentsAndUploads from './CommentsAndUploads';

const useStyles = makeStyles({
    expansionPanelSummary: {
        '& .MuiAccordionSummary-content': {
            alignItems: 'center',
        },
    },
});

function ExpandableSections(props) {
    const {
        milestones,
        unlocked,
        disabled,
        phase,
        handleReview,
        refetchPhase,
        advanceToNextPhase,
        updateTable,
        monitoringTable,
        maintenanceTable,
        updateMaintenanceTable,
        updateMonitoringTable,
        meetings,
        activeStep,
        handleStepChange,
        shouldRenderCompletePhase,
        canCompleteMilestone,
        expandableSections,
        project,
        user
    } = props;

    const classes = useStyles();
    const { active = null, title = null, ...sections } = expandableSections;
    const [expanded, setExpanded] = useState(active);

    const canEdit = canEditProject(project, user);
    const milestoneEnabled = isMilestoneEnabled(project, milestones[activeStep], milestones, phase);
    const isDisabled = disabled || !canEdit || !milestoneEnabled;

    const canComment = !isDisabled || canCommentMilestone({
        user,
        project,
        milestone: milestones[activeStep],
        milestones,
        phase,
    });

    return (
        <React.Fragment>
            <SectionTitle title={title} />
            {Object.values(sections).map((s, i) => {
                const progressLabel = s.progress !== undefined ? `(${s.progress * 100}%)` : null;
                return (
                    <Accordion
                        key={i}
                        expanded={expanded === i}
                        onChange={() => setExpanded(expanded === i ? null : i)}
                    >
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            className={classes.expansionPanelSummary}
                        >
                            <Typography>
                                {s.labelKey}
                            </Typography>
                            {progressLabel && (
                                <Typography variant="caption">
                                    &nbsp;<strong>{progressLabel}</strong>
                                </Typography>
                            )}
                        </AccordionSummary>
                        <MilestonesAccordion
                            sections={s.items}
                            label={
                                <React.Fragment>
                                    {milestones[activeStep].label} - <Typography variant="overline">{s.labelKey}</Typography>  {/* eslint-disable-line max-len */}
                                </React.Fragment>
                            }
                            meetings={meetings}
                            activeStep={activeStep}
                            milestone={milestones[activeStep]}
                            milestones={milestones}
                            unlocked={unlocked}
                            phase={phase}
                            disabled={disabled}
                            handleReview={handleReview}
                            refetchPhase={refetchPhase}
                            advanceToNextPhase={advanceToNextPhase}
                            updateTable={updateTable}
                            monitoringTable={monitoringTable}
                            maintenanceTable={maintenanceTable}
                            updateMaintenanceTable={updateMaintenanceTable}
                            updateMonitoringTable={updateMonitoringTable}
                            handleStepChange={handleStepChange}
                            shouldRenderCompletePhase={shouldRenderCompletePhase}
                            canCompleteMilestone={canCompleteMilestone}
                        />
                        {/* Add other uploads and comments component only for 'Other contracts' section */}
                        {milestones[activeStep].milestoneEnum === 'SIGNED_CONSTRUCTIONS_AND_SUBCONTRACTING_CONTRACTS' && expanded === 1 && // eslint-disable-line max-len
                            <div style={{ padding: 10 }}>
                                <CommentsAndUploads
                                    uploadType={milestones[activeStep].otherUploadType}
                                    commentsTopic={milestones[activeStep].milestoneEnum}
                                    entity={{
                                        id: project._id,
                                        attachments: project.attachments,
                                        type: 'project'
                                    }}
                                    disabled={!canComment}
                                />
                            </div>
                        }
                    </Accordion>
                );
            })}
        </React.Fragment>
    );
}

function SectionTitle(props) {
    const { title } = props;

    if (!title) {
        return null;
    }

    if (typeof title !== 'string') {
        return title;
    }
    return (
        <Typography variant="h5" gutterBottom>
            {title}
        </Typography>
    );
}

export default ExpandableSections;
