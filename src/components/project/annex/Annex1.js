import React from 'react';
import { withTranslation } from 'react-i18next';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';

// COMPONENTS
import ExpandablePanel from './ExpandablePanel';
import TableForm from './../../../containers/smartcomponents/TableWrappers/OperationTableWrapper';
import ProgressBar from './../../../components/utils/ProgressBar';

const styles = {
  container: {
    width: '100%',
    boxSizing: 'border-box',
  },
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
      annex1Ready,
      updateBudgetTable,
      singleProject,
      loggedUserRole,
      classes,
      t
    } = this.props;

    if (!annex1Ready) {
      return <ProgressBar />;
    }

    const budgetWorks = [
      annexes.table1.columns,
      annexes.table1.rows,
      [
        'renovation_overall_budget'
      ]
    ];
    const workingCapitalNeeds = [
      annexes.table2.columns,
      annexes.table2.rows,
      [
        'renovation_financial_plan_a'
      ]
    ];
    const sourceOfFunding = [
      annexes.table3.columns,
      annexes.table3.rows,
      [
        'renovation_financial_plan_b'
      ]
    ];
    const subsidies = [
      annexes.table4.columns,
      annexes.table4.rows,
      [
        'renovation_financial_plan_c'
      ]
    ];

    const budgetRenovationWorks = () => {
      return (
        <div className={classes.container}>
          <div>
            <TableForm
              handleFormSubmit={updateBudgetTable}
              data={budgetWorks}
              singleProject={singleProject}
              loggedUserRole={loggedUserRole}
            />
          </div>
        </div>
      );
    };

    const financialRenovationWorks = () => {
      return (
        <div className={classes.container}>
          <div>
            <TableForm
              handleFormSubmit={updateBudgetTable}
              data={workingCapitalNeeds}
              singleProject={singleProject}
              loggedUserRole={loggedUserRole}
            />
            <TableForm
              handleFormSubmit={updateBudgetTable}
              data={sourceOfFunding}
              singleProject={singleProject}
              loggedUserRole={loggedUserRole}
            />
            <TableForm
              handleFormSubmit={updateBudgetTable}
              data={subsidies}
              singleProject={singleProject}
              loggedUserRole={loggedUserRole}
            />
          </div>
        </div>
      );
    };

    const chargedInvestment = () => {
      return (
        <div className={classes.container}>
          <p>The portion of investment costs used for the calculation of the
            Renovation Fee in Annex 5 of this agreement is calculated
            as the Total Cost for the Renovation Works minus all eligible subsidies and calculated as:</p><br/>
            <p className='center-xs'>RDI= RDT – Subsidy</p>
          <div>
            <p>WHERE:</p><br/>
            <span className='boldText'>RDI: </span>
            Investment costs excluding VAT used for the calculation of the Renovation Fee<br/>
            <span className='boldText'>RDT: </span>
            The Total Cost for the Renovation Works excluding VAT and calculated as in point 2 of this Annex 1
          </div>
        </div>
      );
    };
    return (
      <React.Fragment>
        <ExpandablePanel
          expanded={expanded === 'panel1'}
          onChange={() => this.handleChange('panel1')}
          label={t('translations:annexes.annex1.scopeOfRenovation')}
          data={financialRenovationWorks()}
        />
        <ExpandablePanel
          expanded={expanded === 'panel2'}
          onChange={() => this.handleChange('panel2')}
          label={t('translations:annexes.annex1.overallBudget')}
          data={budgetRenovationWorks()}
        />
        <ExpandablePanel
          expanded={expanded === 'panel3'}
          onChange={() => this.handleChange('panel3')}
          label={t('translations:annexes.annex1.financialPlan')}
          data={chargedInvestment()}
        />
      </React.Fragment>
    );
  }
}

export default withTranslation('translations',
 'serverMessages')(connect(
)(withStyles(styles)(ProjectAnnexView)));
