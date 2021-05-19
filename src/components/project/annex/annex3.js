import React from 'react';
import { withTranslation } from 'react-i18next';

// COMPONENTS
import ExpandablePanel from './ExpandablePanel';
import TableForm from './../../../containers/smartcomponents/TableWrappers/OperationTableWrapper';
import ProgressBar from './../../../components/utils/ProgressBar';

// CSS
import './annex3.css';

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
      annex3Ready,
      updateEnergyTable,
      singleProject,
      loggedUserRole
    } = this.props;

    if (!annex3Ready) {
      return <ProgressBar />;
    }

    const baseyear_n_2 = [
      annexes.table1.columns,
      annexes.table1.rows,
      [
        'baseyear_n_2'
      ]
    ];

    const baseyear_n_1 = [
      annexes.table2.columns,
      annexes.table2.rows,
      [
        'baseyear_n_1'
      ]
    ];

    const baseyear_n = [
      annexes.table3.columns,
      annexes.table3.rows,
      [
        'baseyear_n'
      ]
    ];

    const baseline = [
      annexes.table4.columns,
      annexes.table4.rows,
      [
        'baseline'
      ],
      [3, 4, 5, 6]
    ];

    const obj1 = {};
    setTableFormInitialValues(obj1, baseyear_n_2);
    const obj2 = {};
    setTableFormInitialValues(obj2, baseyear_n_1);
    const obj3 = {};
    setTableFormInitialValues(obj3, baseyear_n);
    const obj4 = {};
    setTableFormInitialValues(obj4, baseline);

    const inputData = () => {
      return (
        <div className='firstTabContainer'>
          <p>Upon entering into this Agreement and prior to the execution of the Renovation Works the Parties shall
          calculate the average heat consumption of the Building during the Reference Period as follows:</p>
          <div>
            <TableForm
              form={baseyear_n_2[2][0]}
              handleFormSubmit={updateEnergyTable}
              initialValues={obj1}
              data={baseyear_n_2}
              singleProject={singleProject}
              loggedUserRole={loggedUserRole}
            />
            <TableForm
              form={baseyear_n_1[2][0]}
              handleFormSubmit={updateEnergyTable}
              initialValues={obj2}
              data={baseyear_n_1}
              singleProject={singleProject}
              loggedUserRole={loggedUserRole}
            />
            <TableForm
              form={baseyear_n[2][0]}
              handleFormSubmit={updateEnergyTable}
              initialValues={obj3}
              data={baseyear_n}
              singleProject={singleProject}
              loggedUserRole={loggedUserRole}
            />
          </div>
        </div>
      );
    };

    const baseLine = () => {
      return (
        <div className='secondTabContainer'>
          <p>The baseline is determined in accordance with the specifications listed in LABEEF Financial and
          Technical Rules and Guidelines for Energy Efficiency Measures:</p>
          <div>
            <TableForm
              form={baseline[2][0]}
              handleFormSubmit={updateEnergyTable}
              initialValues={obj4}
              data={baseline}
              singleProject={singleProject}
              loggedUserRole={loggedUserRole}
            />
          </div>
        </div>
      );
    };

    const guaranteedEnergySavings = () => {
      return (
        <div className='thirdTabContainer'>
          <p>The Contractor guarantees for the entire term of this Agreement that the Renovation Works will reduce
            the energy consumption for space heating and circulation losses (Q Apk, cz,ref ) per settlement period (one
            year) by an amount of:
          </p>
          <p className='centeredParagraph'>SAVINGS, {singleProject ? singleProject.data.savings : ''}%</p>
          <p>This Guarantee Energy Savings corresponds to:</p>
          <p className='centeredParagraph'>Q iet,G = Q Apk, cz,ref x SAVINGS = .MWh/year</p>
          <p>TWhere:<br />Q iet,G Guaranteed Energy Savings, MWh/year<br />
          Q Apk, cz,ref Baseline energy consumption for space heating and circulation losses, MWh/year0</p>
        </div>
      );
    };

    const guaranteedConsumption = () => {
      return (
        <div className='fourthTabContainer'>
          <p>The Guaranteed Energy Consumption is the energy consumption for space heating and circulation
            losses after implementation of the Renovation Works based on the given Guarantee Energy Savings and
            on yearly basis corresponds to:
          </p>
          <p className='centeredParagraph'>Q Apk, cz,G = Q Apk, cz,ref – Q iet,G = MWh/year</p>
          <p>Where:<br />Q Apk, cz,G is the Guaranteed Energy Consumption for space heating and circulation losses,
            MWh/year<br />Q Apk, cz,ref Baseline energy consumption
            for space heating and circulation losses, MWh/year<br />
            Q iet,G Guaranteed Energy Savings, MWh/year
          </p>
        </div>
      );
    };

    return (
        <React.Fragment>
          <ExpandablePanel
            expanded={expanded === 'panel1'}
            onChange={() => this.handleChange('panel1')}
            label="INPUT DATA"
            data={inputData()}
          />
          <ExpandablePanel
            expanded={expanded === 'panel2'}
            onChange={() => this.handleChange('panel2')}
            label="BASE LINE"
            data={baseLine()}
          />
          <ExpandablePanel
            expanded={expanded === 'panel3'}
            onChange={() => this.handleChange('panel3')}
            label="GUARANTEED ENERGY SAVINGS"
            data={guaranteedEnergySavings()}
          />
          <ExpandablePanel
            expanded={expanded === 'panel4'}
            onChange={() => this.handleChange('panel4')}
            label="GUARANTEED ENERGY CONSUMPTION"
            data={guaranteedConsumption()}
          />
        </React.Fragment>
    );
  }
}

export default withTranslation('translations', 'serverMessages')(ProjectAnnexView);
