import React from 'react';
import { withTranslation } from 'react-i18next';

// COMPONENTS
import ExpandablePanel from './ExpandablePanel';
import TableForm from './../../../containers/smartcomponents/TableWrappers/OperationTableWrapper';
import ProgressBar from './../../../components/utils/ProgressBar';

// / STYLES
import './annex4.css';

const setTableFormInitialValues = (obj, table) => {
  table[1].map((value, key) =>
    value.map((val, k) => {
      obj[`${table[2][0]}-table-redux-field-${key}-${k}`] = val;
      return obj;
    }
    )
  );
};

class ProjectAnnexView extends React.Component {
  constructor() {
    super();
    this.state = {
      expanded: 'panel1'
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(panel) {
    const { expanded } = this.state;
    this.setState({
      expanded: expanded !== panel ? panel : false,
    });
  }

  render() {
    const { expanded } = this.state;
    const {
      annexes,
      annex4Ready,
      updateMaintenanceTable,
      loggedUserRole,
      addTableRow
    } = this.props;

    if (!annex4Ready) {
      return <ProgressBar />;
    }

    const periodic_maint_activities = [
      annexes.table1.columns,
      annexes.table1.rows,
      [
        'periodic_maint_activities_covered_by_contractor'
      ]
    ];
    const mid_term_preventative = [
      annexes.table2.columns,
      annexes.table2.rows,
      [
        'mid_term_preventative_activity'
      ]
    ];
    const long_term_provisioned = [
      annexes.table3.columns,
      annexes.table3.rows,
      [
        'long_term_provisioned_activities'
      ]
    ];
    const operation_maintenance = [
      annexes.table4.columns,
      annexes.table4.rows,
      [
        'operation_maintenance_budget'
      ]
    ];
    const reccomended_maintanance = [
      annexes.table5.columns,
      annexes.table5.rows,
      [
        'reccomended_maintanance_activity'
      ]
    ];

    const obj1 = {};
    setTableFormInitialValues(obj1, periodic_maint_activities);
    const obj2 = {};
    setTableFormInitialValues(obj2, mid_term_preventative);
    const obj3 = {};
    setTableFormInitialValues(obj3, long_term_provisioned);
    const obj4 = {};
    setTableFormInitialValues(obj4, operation_maintenance);
    const obj5 = {};
    setTableFormInitialValues(obj5, reccomended_maintanance);

    const periodicMaintenance = () => {
      return (
        <div className='firstTabContainerAnnex4'>
          <h2 className='tableHeading'>Periodic Maintenance Activity</h2>
          <TableForm
            form={periodic_maint_activities[2][0]}
            addTableRow={addTableRow}
            handleFormSubmit={updateMaintenanceTable}
            initialValues={obj1}
            data={periodic_maint_activities}
            loggedUserRole={loggedUserRole}
          />

        </div>
      );
    };

    const midTermPreventativeMaint = () => {
      return (
        <div className='secondTabContainerAnnex4'>
          <h2 className='tableHeading'>Mid term preventative maintenance activity</h2>
          <TableForm
            form={long_term_provisioned[2][0]}
            addTableRow={addTableRow}
            handleFormSubmit={updateMaintenanceTable}
            initialValues={obj2}
            data={long_term_provisioned}
            loggedUserRole={loggedUserRole}
          />
        </div>
      );
    };

    const longTermProvisionedMaint = () => {
      return (
        <div className='thirdTabContainerAnnex4'>
          <h2 className='tableHeading'>Long term preventative maintenance activity</h2>
          <TableForm
            form={mid_term_preventative[2][0]}
            addTableRow={addTableRow}
            handleFormSubmit={updateMaintenanceTable}
            initialValues={obj3}
            data={mid_term_preventative}
            loggedUserRole={loggedUserRole}
          />
        </div>
      );
    };

    const operationalExpenses = () => {
      return (
        <div className='fourthTabContainerAnnex4'>
          <ul className="list">
            <li><span>
              Administration cost for organising maintenance activities and activities part of this agreement
            </span></li><br />
            <li><span>
              Emergency calls
            </span></li><br />
            <li><span>
              Electricity consumption for new electrical loads installed as part of this agreement
            </span></li><br />
            <li><span>
              Building insurance policy
            </span></li>
          </ul>
        </div>
      );
    };

    const operationalAndMaint = () => {
      return (
        <div className='fifthTabContainerAnnex4'>
          <p>
            For the first year of this agreement the costs for
            Operational and Maintenance correspond to an annual fee of
            OM1=________EUR.   For the subsequent years of this agreement,
            this sum is adjusted according to the provision of Annex No 5 of this agreement.<br /><br />
            The breakdown of the operational and maintenance costs is as follows:
          </p>
          <TableForm
            form={operation_maintenance[2][0]}
            addTableRow={addTableRow}
            handleFormSubmit={updateMaintenanceTable}
            data={operation_maintenance}
            initialValues={obj4}
            loggedUserRole={loggedUserRole}
          />
        </div>
      );
    };

    const recomendedMaint = () => {
      return (
        <div className='sixthTabContainerAnnex4'>
          <TableForm
            form={reccomended_maintanance[2][0]}
            addTableRow={addTableRow}
            handleFormSubmit={updateMaintenanceTable}
            data={reccomended_maintanance}
            initialValues={obj5}
            loggedUserRole={loggedUserRole}
          />
        </div>
      );
    };
    return (
      <React.Fragment>
        <ExpandablePanel
          expanded={expanded === 'panel1'}
          onChange={() => this.handleChange('panel1')}
          label="PERIODIC MAINTENANCE ACTIVITIES COVERED BY THE CONTACTOR AS PART OF THIS AGREEMENT"
          data={periodicMaintenance()}
        />
        <ExpandablePanel
          expanded={expanded === 'panel2'}
          onChange={() => this.handleChange('panel2')}
          label="MID-TERM PREVENTATIVE MAINTENANCE ACTIVITY"
          data={midTermPreventativeMaint()}
        />
        <ExpandablePanel
          expanded={expanded === 'panel3'}
          onChange={() => this.handleChange('panel3')}
          label="LONG-TERM PROVISIONED MAINTENANCE ACTIVITIES COVERED BY THE CONTACTOR AS PART OF THIS AGREEMENT"
          data={longTermProvisionedMaint()}
        />
        <ExpandablePanel
          expanded={expanded === 'panel4'}
          onChange={() => this.handleChange('panel4')}
          label="OPERATIONAL EXPENSES COVERED BY THE CONTACTOR AS PART OF THIS AGREEMENT"
          data={operationalExpenses()}
        />
        <ExpandablePanel
          expanded={expanded === 'panel5'}
          onChange={() => this.handleChange('panel5')}
          label="OPERATIONAL AND MAINTENANCE COSTS"
          data={operationalAndMaint()}
        />
        <ExpandablePanel
          expanded={expanded === 'panel6'}
          onChange={() => this.handleChange('panel6')}
          label="RECOMMENDED MAINTENANCE ACTIVITY"
          data={recomendedMaint()}
        />
      </React.Fragment>
    );
  }
}

export default withTranslation('translations', 'serverMessages')(ProjectAnnexView);
