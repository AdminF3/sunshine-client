import React from 'react';
import { connect } from 'react-redux';
import { useQuery, useMutation } from '@apollo/client';
import { useTranslation } from 'react-i18next';

import { monitoringPhase } from '../../../constants/milestones';
import { GET_MONITORING_PHASE, GET_TABLE } from '../../../actions/projectsQueries';
import { REVIEW_MONITORING_PHASE, UPDATE_TABLE } from '../../../actions/projectsMutations';
import { addAlert } from '../../../actions/alerts';

import apolloClient from '../../../utils/apolloClient';
import Milestones from './Milestones';
import deepCopy from '../../../utils/deepCopy';

function MonitoringPhaseWrapper(props) {
    const { t } = useTranslation('translations');
    const monitoring = useQuery(GET_MONITORING_PHASE, {
        client: apolloClient,
        variables: {
            id: props.project?.data?.MonitoringPhase.ID
        }
    });

    const monitoringTable = useQuery(GET_TABLE, {
        client: apolloClient,
        variables: {
            projectID: props.project?._id,
            tableName: 'monitoring_phase_table'
        }
    });

    const maintenanceTable = useQuery(GET_TABLE, {
        client: apolloClient,
        variables: {
            projectID: props.project?._id,
            tableName: 'maitenance_log'
        }
    });

    const [reviewWorkPhase] = useMutation(REVIEW_MONITORING_PHASE, {
        client: apolloClient,
        onCompleted: () => monitoring.refetch()
    });

    const [updateTable] = useMutation(UPDATE_TABLE, {
        client: apolloClient,
        onCompleted: (data) => {
            if (data.updateTable.rows.length === 240) {
                monitoringTable.refetch();
            } else {
                maintenanceTable.refetch();
            }

            props.addAlert({ text: t('projects.tableUpdated'), level: 'success' });
        }
    });

    if (monitoring.loading || monitoringTable.loading || maintenanceTable.loading) {
        return null;
    }

    const consumedMonitoringTable = [
        monitoringTable.data.getTable.columns,
        deepCopy(monitoringTable.data.getTable.rows),
        [
            'monitoring_phase_table'
        ]
    ];

    let newArray = [];
    const newMonitoringTable = [];
    let counter = 0;

    for (let i = 0; i <= consumedMonitoringTable[1].length; i++) {
        if (counter === 12) {
            newMonitoringTable.push(newArray);
            newArray = [];
            counter = 0;
        }
        newArray.push(consumedMonitoringTable[1][i]);
        counter++;
    }

    const dataForMonitoringTable = [];
    newMonitoringTable.map(tab => dataForMonitoringTable.push(
        [
            monitoringTable.data.getTable.columns,
            tab,
            ['monitoring_phase_table']
        ]
    ));

    const dataForMaintenanceTable = [
        maintenanceTable.data.getTable.columns,
        deepCopy(maintenanceTable.data.getTable.rows),
        ['maitenance_log']
    ];

    const newRows = [];
    dataForMonitoringTable.forEach(el => el[1].forEach(e => newRows.push(e)));

    // Set phase to `false` if no phase yet, so that
    // `canEdit` checks can know that the phase is not
    // reached yet.
    const phase = monitoring?.data?.getMonitoringPhase || false;

    return (
        <Milestones
            milestones={monitoringPhase(t)}
            phase={phase}
            disabled={!phase}
            handleReview={reviewWorkPhase}
            refetchPhase={monitoring.refetch}
            monitoringTable={dataForMonitoringTable}
            maintenanceTable={dataForMaintenanceTable}
            updateMonitoringTable={() => {
                updateTable({
                    variables: {
                        projectID: props.project?._id,
                        tableName: 'monitoring_phase_table',
                        table: {
                            columns: monitoringTable.data.getTable.columns.map(({ name, kind, headers }) => ({ name, kind, headers })),
                            rows: newRows
                        }
                    }
                });
            }}
            updateMaintenanceTable={() => {
                updateTable({
                    variables: {
                        projectID: props.project?._id,
                        tableName: 'maitenance_log',
                        table: {
                            columns: maintenanceTable.data.getTable.columns.map(({ name, kind, headers }) => ({ name, kind, headers })),
                            rows: dataForMaintenanceTable[1]
                        }
                    }
                });
            }}
            unlocked
            labelIconBlank
        />
    );
}

export default connect(
    state => ({
        project: state.project.singleProject
    }),
    dispatch => ({
        addAlert: (a) => dispatch(addAlert(a))
    })
)(MonitoringPhaseWrapper);
