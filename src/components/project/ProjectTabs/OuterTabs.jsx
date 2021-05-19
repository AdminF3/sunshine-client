import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import {
    Tabs,
    Tab,
    makeStyles,
} from '@material-ui/core';

import { canEditProject } from '../../../utils/can';
import ProjectOverview from '../ProjectOverview';
import ProjectManager from '../ProjectManager';
import ForfaitingAgreement from '../ForfaitingAgreement/ForfaitingAgreement';
import Milestones from '../ProjectMilestone/Milestones';
import { Annexes, GeneralTerms, SpecialConditions } from '../Contract';
import WorkPhaseWrapper from '../ProjectMilestone/WorkPhaseWrapper';
import MonitoringPhaseWrapper from '../ProjectMilestone/MonitoringPhaseWrapper';
import ContractHistory from '../Contract/ContractHistory';

import InnerTabs from './InnerTabs';
import styles from './styles';

import { assetAquisition } from '../../../constants/milestones';

const useStyles = makeStyles(styles);

const outerTabs = [
    {
        labelKey: 'projects.projectOverview',
        defaultTab: 'overview',
    },
    {
        labelKey: 'projects.epcContract',
        defaultTab: 'contract',
    },
    {
        labelKey: 'projects.projectPhases',
        defaultTab: 'asset-aquisition',
    },
];

const innerTabs = (props, t) => {
    const canEdit = canEditProject(props.singleProject, props.user);

    return [
        [
            {
                labelKey: 'projects.projectDescription',
                urlEnding: 'overview',
                component: ProjectOverview,
                componentProps: {
                    singleProject: props.singleProject,
                    singleAsset: props.singleAsset,
                    singleProjectReady: props.singleProjectReady,
                    toggleEditProjectDialog: props.toggleEditProjectDialog,
                    isProjectDialogOpen: props.isProjectDialogOpen,
                    singleOrganization: props.singleOrganization,
                    userIsLogged: props.userIsLogged,
                    user: props.user,
                    searchMyAssets: props.searchMyAssets,
                    searchMyOrganizations: props.searchMyOrganizations,
                    foundAssets: props.foundAssets,
                    foundOrganizations: props.foundOrganizations,
                    clearAssetSearchResults: props.clearAssetSearchResults,
                    clearMyAssets: props.clearMyAssets,
                    loggedUserRole: props.loggedUserRole,
                    userIsSuperUser: props.userIsSuperUser,
                    projectClientName: props.projectClientName,
                },
                tooltip: 'tooltips:projects.overview',
            },
            canEdit && {
                labelKey: 'projects.managerDashboard',
                urlEnding: 'project-manager',
                component: ProjectManager,
                componentProps: {
                    singleProject: props.singleProject,
                    searchUsers: props.searchUsers,
                    clearResults: props.clearResults,
                    foundUsers: props.foundUsers,
                    user: props.user,
                    singleOrganization: props.singleOrganization,
                    annexes: props.annexes,
                    annex1Ready: props.annex1Ready,
                    annex3Ready: props.annex3Ready,
                    annex4Ready: props.annex4Ready,
                    singleAsset: props.singleAsset,
                    singleAssetReady: props.singleAssetReady,
                    singleProjectReady: props.singleProjectReady,
                    forfaitingFields: props.forfaitingFields,
                    forfaitingReady: props.forfaitingReady,
                    refetch: () => props.getSingleProject(props.singleProject._id, { refetch: true }),
                },
            },
        ],
        [
            {
                label: t('projects.specialConditions'),
                urlEnding: 'contract',
                component: SpecialConditions,
            },
            {
                label: t('projects.epcAnnexes'),
                urlEnding: 'annexes',
                component: Annexes,
                tooltip: 'tooltips:projects.epc.annexesInfo',
            },
            {
                label: t('projects.epcTerms'),
                urlEnding: 'terms',
                component: GeneralTerms,
                tooltip: 'tooltips:projects.epc.generalTerms',
            },
            {
                label: t('projects.forfAgreement'),
                urlEnding: 'forfaiting-agreement',
                component: ForfaitingAgreement,
                componentProps: {
                    viewOnly: !canEdit,
                },
                tooltip: 'tooltips:projects.epc.forfaitingAgreement',
            },
            {
                label: t('projects.contractHistory'),
                urlEnding: 'contract-history',
                component: ContractHistory,
            },
        ],
        [
            {
                label: t('projects.assetAcquisition'),
                urlEnding: 'asset-aquisition',
                component: Milestones,
                componentProps: {
                    milestones: assetAquisition(t),
                },
                tooltip: 'tooltips:projects.epc.assetAcquisition',
            },
            {
                label: t('projects.worksPhase'),
                urlEnding: 'works-phase',
                component: WorkPhaseWrapper,
                tooltip: 'tooltips:projects.epc.worksPhase',
            },
            {
                label: t('projects.resultsMonitoring'),
                urlEnding: 'results-monitoring',
                component: MonitoringPhaseWrapper,
                tooltip: 'tooltips:projects.epc.monitoringPhase',
            },
        ],
    ];
};

function OuterTabs(props) {
    const {
        fetchingProj,
        projectId,
    } = props;

    const { t } = useTranslation('translations');
    const classes = useStyles();

    const [indexState, setIndexState] = useState({
        outerIndex: props.outerIndex || 0,
        innerIndex: props.innerIndex || 0,
    });

    const { outerIndex, innerIndex } = indexState;

    const content = innerTabs(props, t)[outerIndex].filter(v => Boolean(v));
    return (
        <React.Fragment>
            <header
                className={classes.header}
            >
                <Tabs
                    value={outerIndex}
                    onChange={(_, value) => setIndexState({ ...indexState, outerIndex: value })}
                >
                    {
                        outerTabs.map((tab, index) => (
                            <Tab
                                component={Link}
                                to={`/project/${projectId}/${tab.defaultTab}`}
                                label={tab.labelKey ? t(tab.labelKey) : tab.label}
                                key={index}
                                className={classes.tabLabelStyle}
                            />
                        ))
                    }
                </Tabs>
            </header>
            <InnerTabs
                projectId={projectId}
                value={outerIndex}
                innerIndex={innerIndex}
                content={content}
                fetchingProj={fetchingProj}
                onChange={(_, value) => setIndexState({ ...indexState, innerIndex: value })}
            />
        </React.Fragment>
    );
}

export default OuterTabs;
