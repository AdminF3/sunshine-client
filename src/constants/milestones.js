export const assetAquisition = (t) => [
    {
        label: t('translations:milestones.acquisitionMeeting'),
        milestoneEnum: 'ACQUISITION_MEETING',
        nextMilestone: 'FEASIBILITY_STUDY',
        nextMilestoneLabel: t('translations:milestones.feasibilityStudy'),
        otherUploadType: 'acquisition other',
        sections: [
            {
                label: t('translations:milestones.generalLeafletAgenda'),
                uploadType: 'general leaflet'
            },
            {
                label: t('translations:milestones.procesLeafletOwners'),
                uploadType: 'process leaflet'
            },
            {
                label: t('translations:milestones.signedProtocolMeeting'),
                uploadType: 'aquisition protocol meeting',
                meeting: 'ACQUISITION',
                required: true
            },
        ]
    },
    {
        label: t('translations:milestones.feasibilityStudy'),
        milestoneEnum: 'FEASIBILITY_STUDY',
        nextMilestone: 'COMMITMENT_STUDY',
        nextMilestoneLabel: t('translations:milestones.commitmentMeeting'),
        otherUploadType: 'feasibility other',
        sections: [
            {
                label: t('translations:milestones.energyAuditReport'),
                uploadType: 'energy audit report',
                required: true
            },
            {
                label: t('translations:milestones.energyTablesData'),
                progress: true,
                required: false
            },
            {
                label: t('translations:milestones.technicalInspectionReport'),
                uploadType: 'technical inspection report',
                required: true
            },
            {
                label: t('translations:milestones.escoTendetDocument'),
                uploadType: 'esco tender',
                required: true
            }
        ]
    },
    {
        label: t('translations:milestones.commitmentMeeting'),
        milestoneEnum: 'COMMITMENT_STUDY',
        nextMilestone: 'PROJECT_DESIGN',
        nextMilestoneLabel: t('translations:milestones.projectDesign'),
        otherUploadType: 'commitment other',
        sections: [
            {
                label: t('translations:milestones.signedProtocolMeeting'),
                uploadType: 'commitment protocol meeting',
                meeting: 'ACQUISITION_COMMITMENT',
                required: true
            },
            {
                label: t('translations:milestones.preEpcAgreement'),
                uploadType: 'pre epc agreement',
                required: true
            },
        ]
    },
    {
        label: t('translations:milestones.projectDesign'),
        milestoneEnum: 'PROJECT_DESIGN',
        nextMilestone: 'PROJECT_PREPARATION',
        nextMilestoneLabel: t('translations:milestones.projectPreparation'),
        otherUploadType: 'design other',
        sections: [
            {
                label: t('translations:milestones.constructionProjectDoc'),
                uploadType: 'construction project',
                required: true
            }
        ]
    },
    {
        label: t('translations:milestones.projectPreparation'),
        milestoneEnum: 'PROJECT_PREPARATION',
        nextMilestone: 'KICK_OFF_MEETING',
        unlocksOn: 'COMMITMENT_STUDY',
        nextMilestoneLabel: t('translations:milestones.kickoffMeeting'),
        otherUploadType: 'preparation other',
        sections: [
            {
                label: t('translations:milestones.procurementConstructInstall'),
                uploadType: 'procurement construction installation',
                required: true
            },
            {
                label: t('translations:milestones.finincingOfferAltum'),
                uploadType: 'finincing offer and altum',
                required: true
            },
            {
                label: t('translations:milestones.draftEpc'),
                uploadType: 'draft epc contract',
            }
        ]
    },
    {
        label: t('translations:milestones.kickoffMeeting'),
        milestoneEnum: 'KICK_OFF_MEETING',
        nextMilestone: null,
        nextMilestoneLabel: null,
        otherUploadType: 'kickoff other',
        sections: [
            {
                label: t('translations:milestones.signedProtocolMeeting'),
                uploadType: 'kickoff protocol meeting',
                meeting: 'ACQUISITION_KICK_OFF',
                required: true
            },
            {
                label: t('translations:milestones.signedEpc'),
                uploadType: 'signed epc',
                required: true
            },
            {
                label: t('translations:milestones.altumBankLoan'),
                uploadType: 'agreement altum bank loan',
                required: true
            },
            {
                label: t('translations:milestones.altumGrantAgreement'),
                uploadType: 'agreement altum grand agreement',
                required: true
            }
        ]
    },
];

export const workPhase = (t) => [
    {
        label: t('milestones.signedConstructions'),
        milestoneEnum: 'SIGNED_CONSTRUCTIONS_AND_SUBCONTRACTING_CONTRACTS',
        otherUploadType: 'signed other',
        sections: [
            {
                label: t('milestones.projectManagement'),
                uploadType: 'project management contract',
                required: true
            },
            {
                label: t('milestones.constructionWorks'),
                uploadType: 'construction works company contract',
                required: true
            },
            {
                label: t('milestones.engineeringNetworks'),
                uploadType: 'engineering networks company contract',
                required: true
            },
            {
                label: t('milestones.supervision'),
                uploadType: 'supervision contract',
                required: true
            },
            {
                label: t('milestones.energyManagement'),
                uploadType: 'energy management system company',
                required: true
            },
            {
                label: t('milestones.contractWithMaintenance'),
                uploadType: 'maintenance company contract',
            },
            {
                label: t('milestones.contractWithLandOwners'),
                uploadType: 'land owners contract',
            },
            {
                label: t('milestones.contractWithHouseHeatingSupliers'),
                uploadType: 'house heating contract',
            },
            {
                label: t('milestones.windowContracts'),
                uploadType: 'windows contract',
            }
        ]
    },
    {
        label: t('milestones.renovationEngineeringWorks'),
        milestoneEnum: 'RENOVATION_AND_ENGINEERING_WORKS',
        otherUploadType: 'renovation other',
        sections: [
            {
                label: t('milestones.listOfTasksFromAnnex1'),
                table: 'workPhase_scope_renovation',
            },
            {
                label: t('milestones.kickOffMeetingProvideMoM'),
                uploadType: 'kick-off meeting document',
                meeting: 'WORKS_KICK_OFF',
                uploadsList: [
                    t('milestones.minutesMeetings'),
                    t('milestones.beginningOfRenovation'),
                ],
                attendants: [
                    t('milestones.ESCO'),
                    t('milestones.constructionManager'),
                    t('milestones.constructionSupervisor')
                ],
            },
            {
                label: t('milestones.initialInformationMeeting'),
                uploadType: 'initial information meeting document',
                meeting: 'WORKS_INITIAL_INFORMATION',
                uploadsList: [
                    t('milestones.minutesMeetings'),
                    t('milestones.presentation'),
                ],
            },
            {
                label: t('milestones.weeklyReportMeetings'),
                uploadType: 'weekly meeting report document',
                meeting: 'WORKS_WEEKLY_REPORT',
                uploadsList: [
                    t('milestones.minutesMeetings'),
                ],
                attendants: [
                    t('milestones.ESCO'),
                    t('milestones.constructionManager'),
                    t('milestones.constructionSupervisor')
                ],
            },
            {
                label: t('milestones.informativeMeetingsToResidents'),
                uploadType: 'informative residents meeting document',
                meeting: 'WORKS_RENOVATION_INFORMATIVE',
                uploadsList: [
                    t('milestones.minutesMeetings'),
                    t('milestones.presentation'),
                ],
            },
            {
                label: t('milestones.otherCommunicationWithResidents'),
                uploadType: 'other residents meeting document',
                meetingSection: true
            },
            {
                label: t('milestones.monthlyReportByCunstruction'),
                uploadType: 'monthly construction company report',
                hint: t('milestones.monthlyReportHint'),
                required: true
            },
        ]
    },
    {
        label: t('milestones.commissioning'),
        milestoneEnum: 'COMMISSIONING',
        otherUploadType: 'commissioning other',
        sections: [
            {
                label: t('milestones.buildingAudit'),
                uploadType: 'building audit document',
                required: true
            },
            {
                label: t('milestones.buildingInspection'),
                uploadType: 'building inspection document',
                required: true
            },
            {
                label: t('milestones.declarationOfAcceptance'),
                uploadType: 'work acceptance document',
                required: true
            },
            {
                label: t('milestones.defectsDelcaration'),
                uploadType: 'defects declarations',
                required: true
            },
            {
                label: t('milestones.momOfConstructionManagers'),
                uploadType: 'construction managers final meeting mom',
                meeting: 'WORKS_CONSTRUCTION_MANAGERS_FINAL',
                uploadsList: [
                    t('milestones.minutesMeetings'),
                ]
            },
            {
                label: t('milestones.momOfFinancialInfo'),
                uploadType: 'residents final meeting mom',
                meeting: 'WORKS_FINAL_INFORMATION',
                uploadsList: [
                    t('milestones.minutesMeetings'),
                ]
            }
        ]
    },
    {
        label: t('milestones.technicalClosing'),
        milestoneEnum: 'TECHNICAL_CLOSING',
        otherUploadType: 'technical other',
        sections: [
            {
                label: t('milestones.buildingUserGuide'),
                uploadType: 'building user guide',
            },
            {
                label: t('milestones.maintenancePlanReview'),
                reviews: ['MAINTENANCE'],
            }
        ]
    },
    {
        label: t('milestones.forfaitingPayout'),
        milestoneEnum: 'FORFAITING_PAYMENT',
        otherUploadType: 'forfaiting other',
        sections: [
            {
                label: t('milestones.declarationOfAcceptance'),
                uploadType: 'work acceptance document'
            },
            {
                label: t('milestones.independentEnergyAudit'),
                uploadType: 'independent energy audit measurement and verification report',
                uploadsList: [
                    t('milestones.measurements'),
                    t('milestones.verificationReport'),
                ]
            },
            {
                label: t('milestones.insurancePolicies'),
                uploadType: 'insurance policies',
            },
            {
                label: t('milestones.confirmationOfNoSignificantChanges'),
                uploadType: 'letter of information',
            },
            {
                label: t('milestones.proofOfTransfer'),
                uploadType: 'proof of transfer',
            },
            {
                label: t('milestones.confirmBankAccountInfo'),
                reviews: ['BANK_ACCOUNT']
            },
            {
                label: t('milestones.fundManagersReviewsConfirmation'),
                reviews: ['FINANCIAL', 'TECHNICAL', 'EXECUTIVE']
            },
            {
                label: t('milestones.paymentDetails'),
                paymentDetails: true
            }
        ]
    },
];

export const monitoringPhase = (t) => [
    {
        label: t('milestones.resultsMonitoringPhase'),
        milestoneEnum: 'RESULTS_MONITORING',
        otherUploadType: 'results other',
        sections: [
            {
                label: t('milestones.resultsMonitoringPhase'),
                editableTable: 'monitoring_phase_table',
            },
        ]
    },
    {
        label: t('milestones.buildingMaintenance'),
        milestoneEnum: 'BUILDING_MAINTENANCE',
        otherUploadType: 'building other',
        sections: [
            {
                label: t('milestones.operationAndMaintenanceManual'),
                editableTable: 'maitenance_log',
            },
        ],
        unlocksOn: ['PROJECT_PREPARATION', 'COMMISSIONING'],
    },
    {
        label: t('milestones.forfaitingAnnualCheck'),
        milestoneEnum: 'FORFAITING_ANNUAL_CHECK',
        otherUploadType: 'annual other',
        sections: [
            {
                forfaitingAnnualCheck: true,
                uploadTypeList: [
                    {
                        label: t('milestones.invoicesIssued'),
                        uploadType: 'investment invoices'
                    },
                    {
                        label: t('milestones.otherFinancial'),
                        uploadType: 'annual check other financials'
                    },
                ],
                reviewType: {
                    label: t('milestones.fundManagerReview'),
                    reviews: ['FORFAITING'],
                },
            }
        ]
    },
    {
        label: t('milestones.paymentOfLoans'),
        milestoneEnum: 'PAYMENT_OF_LOANS',
        otherUploadType: 'payment other',
        sections: [
            {
                label: t('milestones.invoices'),
                uploadType: 'payment of loans'
            },
        ]
    },
];

export const milestonePhases = [
    {
        phase: 'aquisition',
        labelKey: 'translations:projects.assetAcquisition',
        milestones: [
            'ACQUISITION_MEETING',
            'FEASIBILITY_STUDY',
            'COMMITMENT_STUDY',
            'PROJECT_DESIGN',
            'PROJECT_PREPARATION',
            'KICK_OFF_MEETING',
        ],
    },
    {
        phase: 'work',
        labelKey: 'translations:projects.worksPhase',
        milestones: [
            'SIGNED_CONSTRUCTIONS_AND_SUBCONTRACTING_CONTRACTS',
            'RENOVATION_AND_ENGINEERING_WORKS',
            'COMMISSIONING',
            'TECHNICAL_CLOSING',
        ],
    },
    {
        phase: 'monitoring',
        labelKey: 'translations:organizations.monitoringPhaseCount',
        milestones: [
            'RESULTS_MONITORING_AND_ANALYSIS',
            'BUILDING_MAINTENANCE',
            'FORFAITING_ANNUAL_CHECK',
            'PAYMENT_OF_LOANS',
        ],
    },
];

export function milestonePhase(m) {
    const phases = Object.keys(milestonePhases);
    const milestone = m.toUpperCase();

    for (const i in phases) {
        if (milestonePhases[i].milestones.some(_m => _m === milestone)) {
            return milestonePhases[i].phase;
        }
    }

    return m;
}

export function getProjectPhase(project, t) {
    if (!project) {
        return {
            idx: -1,
            label: '',
            phase: '',
        };
    }
    if (project.WorkPhase?.ID === '00000000-0000-0000-0000-000000000000') {
        return {
            idx: 0,
            label: t('projects.assetAcquisition'),
            phase: 'aquisition',
        };
    }

    if (
        project.WorkPhase?.ID !== '00000000-0000-0000-0000-000000000000' &&
        project.MonitoringPhase?.ID === '00000000-0000-0000-0000-000000000000'
    ) {
        return {
            idx: 1,
            label: t('projects.worksPhase'),
            phase: 'work',
        };
    }
    return {
        idx: 2,
        label: t('organizations.monitoringPhaseCount'),
        phase: 'monitoring',
    };
}

export function getPhaseMilestones(phase, t) {
    switch (phase) {
        case 'aquisition':
            return assetAquisition(t);
        case 'work':
            return workPhase(t);
        case 'monitoring':
            return monitoringPhase(t);
        default:
            return null;
    }
}
