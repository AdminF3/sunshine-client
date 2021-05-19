import React, { useState } from 'react';
import { connect } from 'react-redux';
import { useQuery } from '@apollo/client';
import { useTranslation } from 'react-i18next';
import {
    Grid,
    withStyles,
} from '@material-ui/core';

import apolloClient from '../../../utils/apolloClient';
import {
    canEditProject,
    isMilestoneEnabled,
    canCompleteMilestone,
    canCommentMilestone,
} from '../../../utils/can';
import { isPayoutUnlocked, ForfaitingPayoutDateTitle } from '../../../utils/payoutUtils';
import { isNullUUID } from '../../../utils/uuid';
import { LIST_MEETINGS } from '../../../actions/organizationsQueries';
import MilestoneStepper from './MilestoneStepper';
import MilestonesAccordion from './MilestonesAccordion';
import CommentsAndUploads from './CommentsAndUploads';
import ExpandableSections from './ExpandableSections';
import styles from './styles';
import { stepStatus } from './utils';

import ForfaitingStepper from '../ForfaitingAgreement/ForfaitingStepper';

/* eslint-disable-next-line complexity */
function Milestones(props) {
    const {
        milestones,
        singleProjectReady,
        project,
        classes,
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
        userIsSuperUser,
        userIsLogged,
        user,
        labelIconBlank,
    } = props;
    const { t } = useTranslation('translations');
    const listMeetings = useQuery(LIST_MEETINGS, {
        client: apolloClient,
        variables: {
            id: project._id
        }
    });
    const constructionWorksIndex = 5;
    const projectMilestone = singleProjectReady && project.data?.milestone?.toUpperCase();
    const currentMilestoneIndex = milestones.findIndex(milestone => projectMilestone === milestone.milestoneEnum);
    const [activeStep, setActiveStep] = useState(parseInt(window.location.hash.replace('#', ''), 10) || 0);

    const handleChange = (prps) => {
        const { nextStep, cursor } = prps;
        if (nextStep >= milestones.length) {
            return;
        }
        setActiveStep(nextStep);
        window.location.hash = !isNaN(cursor) ? `#${nextStep}-${cursor}` : `#${nextStep}`;
    };

    if (!singleProjectReady || listMeetings?.loading) {
        return null;
    }

    function lockAfterCommissioning() {
        if (project.data.milestone === 'commissioning' && (
            milestones[activeStep].milestoneEnum === 'RENOVATION_AND_ENGINEERING_WORKS' ||
            milestones[activeStep].milestoneEnum === 'COMMISSIONING')
        ) {
            return true;
        }
        return false;
    }

    function lockLoan() {
        const technicalClosingDate = project.data.MonitoringPhase.CreatedAt;
        if (milestones[activeStep].milestoneEnum === 'FORFAITING_PAYMENT' && !isPayoutUnlocked(technicalClosingDate)) {
            return true;
        }

        return false;
    }

    let expandableSections;

    if (milestones[activeStep].milestoneEnum === 'RENOVATION_AND_ENGINEERING_WORKS') {
        expandableSections = {
            tables: {
                items: [],
                labelKey: t('milestones.tableWithTheWorks'),
            },
            uploads: {
                items: [],
                labelKey: t('milestones.controlOfCosts'),
            },
            meetings: {
                items: [],
                labelKey: t('milestones.meetings'),
            },
        };

        milestones[activeStep].sections.forEach(el => {
            if (el.meeting || el.meetingSection) {
                expandableSections.meetings.items.push(el);
            } else if (el.table) {
                expandableSections.tables.items.push(el);
            } else {
                expandableSections.uploads.items.push(el);
            }
        });
    } else if (milestones[activeStep].milestoneEnum === 'SIGNED_CONSTRUCTIONS_AND_SUBCONTRACTING_CONTRACTS') {
        expandableSections = {
            active: 0,
            requiredUploads: {
                items: [],
                labelKey: t('milestones.requiredContracts'),
            },
            otherUploads: {
                items: [],
                labelKey: t('milestones.otherContracts'),
            },
        };

        milestones[activeStep].sections.forEach(el => {
            if (el.required) {
                expandableSections.requiredUploads.items.push(el);
            } else {
                expandableSections.otherUploads.items.push(el);
            }
        });
    } else if (milestones[activeStep].milestoneEnum === 'FORFAITING_PAYMENT') {
        expandableSections = {
            title: (
                <ForfaitingPayoutDateTitle
                    project={project}
                    paragraph
                    variant="overline"
                    align="center"
                    gutterBottom
                    className={classes.forfaitingPayoutDateTitle}
                />
            ),
            documents: {
                items: [],
                labelKey: t('milestones.provideFollowingDocumentation'),
                progress: 0,
            },
            bankAccount: {
                items: [],
                labelKey: t('milestones.bankAccountConfirmation'),
                progress: 0,
            },
            reviews: {
                items: [],
                labelKey: t('milestones.fundManagersReviews'),
                progress: 0,
            },
            payment: {
                items: [],
                labelKey: t('milestones.paymentConfirmation'),
                progress: 0,
            }
        };

        milestones[activeStep].sections.forEach(el => {
            let expandableSectionKey;
            if (el.uploadType) {
                if (el.uploadType === 'proof of transfer') {
                    expandableSectionKey = 'payment';
                } else {
                    expandableSectionKey = 'documents';
                }
            } else if (el.bankAccount) {
                expandableSectionKey = 'bankAccount';
            } else if (el.payment) {
                expandableSectionKey = 'payment';
            } else if (el.reviews) {
                if (el.reviews[0] === 'BANK_ACCOUNT') {
                    expandableSectionKey = 'bankAccount';
                } else {
                    expandableSectionKey = 'reviews';
                }
            }

            if (expandableSectionKey) {
                const validStatus = stepStatus(
                    el,
                    project._attachments,
                    listMeetings?.data?.listMeetings,
                    phase?.reviews,
                );
                expandableSections[expandableSectionKey].items.push(el);
                if (
                    validStatus.progress !== undefined &&
                    expandableSections[expandableSectionKey].progress !== undefined
                ) {
                    expandableSections[expandableSectionKey].progress += validStatus.progress;
                }
            } else if (el.paymentDetails) {
                expandableSections.payment.items.push(el);
            }
        });
    }

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
        <div className={classes.gridWrapper}>
            <Grid
                container
                spacing={4}
                direction="row-reverse"
            >
                <Grid item md={3} sm={12}>
                    <MilestoneStepper
                        activeStep={disabled ? null : activeStep}
                        labelIconBlank={labelIconBlank}
                        milestones={milestones}
                        handleStepChange={(nextStep) => handleChange({ nextStep })}
                        currentMilestoneIndex={project.data.milestone !== 'commissioning' ? currentMilestoneIndex + 1 : constructionWorksIndex}
                        unlocked={unlocked}
                        disabled={disabled}
                        project={project}
                        phase={phase}
                    />
                    {window.location.pathname.split('/').pop() === 'asset-aquisition' &&
                        <ForfaitingStepper
                            disabled={disabled}
                            milestones={milestones}
                            phase={phase}
                        />
                    }
                </Grid>
                <Grid item md={9} sm={12}>
                    {expandableSections ?
                        <ExpandableSections
                            user={user}
                            project={project}
                            expandableSections={expandableSections}
                            meetings={listMeetings?.data?.listMeetings}
                            activeStep={activeStep}
                            milestone={milestones[activeStep]}
                            milestones={milestones}
                            unlocked={unlocked}
                            phase={phase}
                            disabled={disabled || lockAfterCommissioning() || lockLoan()}
                            handleReview={handleReview}
                            currentMilestoneIndex={currentMilestoneIndex}
                            refetchPhase={refetchPhase}
                            advanceToNextPhase={advanceToNextPhase}
                            updateTable={updateTable}
                            monitoringTable={monitoringTable}
                            maintenanceTable={maintenanceTable}
                            updateMaintenanceTable={updateMaintenanceTable}
                            updateMonitoringTable={updateMonitoringTable}
                            handleStepChange={(nextStep, cursor) => {
                                handleChange(!isNaN(nextStep) ? { nextStep, cursor } : { nextStep: activeStep + 1 });
                            }}
                            shouldRenderCompletePhase={
                                shouldRenderCompletePhase({ project, activeStep, milestoneLength: milestones.length })
                            }
                            canCompleteMilestone={
                                canCompleteMilestone(userIsSuperUser, userIsLogged, project) &&
                                currentMilestoneIndex < activeStep
                            }
                        /> :
                        <MilestonesAccordion
                            sections={milestones[activeStep].sections}
                            label={milestones[activeStep].label}
                            meetings={listMeetings?.data?.listMeetings}
                            activeStep={activeStep}
                            milestone={milestones[activeStep]}
                            milestones={milestones}
                            unlocked={unlocked}
                            phase={phase}
                            disabled={disabled || lockAfterCommissioning() || lockLoan()}
                            handleReview={handleReview}
                            refetchPhase={refetchPhase}
                            advanceToNextPhase={advanceToNextPhase}
                            updateTable={updateTable}
                            monitoringTable={monitoringTable}
                            maintenanceTable={maintenanceTable}
                            updateMaintenanceTable={updateMaintenanceTable}
                            updateMonitoringTable={updateMonitoringTable}
                            handleStepChange={(nextStep, cursor) => {
                                handleChange(!isNaN(nextStep) ? { nextStep, cursor } : { nextStep: activeStep + 1 });
                            }}
                            shouldRenderCompletePhase={
                                shouldRenderCompletePhase({ project, activeStep, milestoneLength: milestones.length })
                            }
                            canCompleteMilestone={
                                canCompleteMilestone(userIsSuperUser, userIsLogged, project) &&
                                currentMilestoneIndex < activeStep
                            }
                        />
                    }
                    {milestones[activeStep].milestoneEnum !== 'SIGNED_CONSTRUCTIONS_AND_SUBCONTRACTING_CONTRACTS' &&
                        <CommentsAndUploads
                            renderElements={milestones[activeStep].milestoneEnum === 'FORFAITING_ANNUAL_CHECK' ? ['comments'] : undefined}
                            uploadType={milestones[activeStep].otherUploadType}
                            commentsTopic={milestones[activeStep].milestoneEnum}
                            entity={{
                                id: project._id,
                                attachments: project.attachments,
                                type: 'project'
                            }}
                            disabled={!canComment}
                        />
                    }
                </Grid>
            </Grid>
        </div>
    );
}

function shouldRenderCompletePhase(props) {
    const { project, activeStep, milestoneLength } = props;
    const currentPhase = window.location.href.split('/').pop().split('#')[0];

    if (currentPhase === 'asset-aquisition' &&
        activeStep === milestoneLength - 1 &&
        isNullUUID(project.data?.WorkPhase?.ID)
    ) {
        return true;
    }

    if (currentPhase === 'works-phase' &&
        activeStep === milestoneLength - 2 &&
        isNullUUID(project.data?.MonitoringPhase?.ID)
    ) {
        return true;
    }

    return false;
}

Milestones.defaultProps = {
    disabled: false,
    labelIconBlank: false,
};

const mapStateToProps = (state) => {
    return {
        singleProjectReady: state.project.singleProjectReady,
        project: state.project.refetchProject,
        user: state.user,
        userIsLogged: state.user.isAuthenticated,
        userIsSuperUser: state.user.isSuperUser
    };
};

export default withStyles(styles)(connect(
    mapStateToProps,
)(Milestones));
