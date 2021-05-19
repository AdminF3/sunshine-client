import React from 'react';
import { withTranslation } from 'react-i18next';

// COMPONENTS
import ExpandablePanel from './ExpandablePanel';
import TableForm from './../../../containers/smartcomponents/TableWrappers/OperationTableWrapper';
import ProgressBar from './../../../components/utils/ProgressBar';

// STYLES
import './annex5.css';

// IMAGES
import formula1 from './../../../images/formulas/formula1.png';
import formula2 from './../../../images/formulas/formula2.png';
import formula3 from './../../../images/formulas/formula3.png';
import formula4 from './../../../images/formulas/formula4.png';
import formula7 from './../../../images/formulas/formula7.png';
import formula8 from './../../../images/formulas/formula8.png';
import formula9 from './../../../images/formulas/formula9.png';
import formula10 from './../../../images/formulas/formula10.png';
import formula11 from './../../../images/formulas/formula11.png';
import formula12 from './../../../images/formulas/formula12.png';

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
      annex5Ready,
      updateFeesTable,
      singleProject,
      loggedUserRole,
      addTableRow
    } = this.props;

    if (!annex5Ready) {
      return <ProgressBar />;
    }

    const calc_energy_fee = [
      annexes.table1.columns,
      annexes.table1.rows,
      [
        'calc_energy_fee'
      ],
      [2]
    ];
    const balancing_period_fee = [
      annexes.table2.columns,
      annexes.table2.rows,
      [
        'balancing_period_fee'
      ],
      [2, 5]
    ];
    const maintenance_fee = [
      annexes.table3.columns,
      annexes.table3.rows,
      [
        'operations_maintenance_fee'
      ],
      [1, 2]
    ];

    const obj1 = {};
    setTableFormInitialValues(obj1, calc_energy_fee);
    const obj2 = {};
    setTableFormInitialValues(obj2, balancing_period_fee);
    const obj3 = {};
    setTableFormInitialValues(obj3, maintenance_fee);

    const general = () => {
      return (
        <div className='firstTabContainerAnnex5'>
          <p>The Client owes for the Term of this Agreement a monthly Fee in Euro excluding VAT, subject to
            subsequent indexation and comprised of:</p>
          <div><span className='boldText'>i. Energy fee:</span>
            the amount due for the Energy Consumption and distributed in equal monthly
            payments, subject to a settlement once per annum to account for
          <span className='subParagraphs'>a. the actual weather conditions prevailing for the referenced Period, and<br />b. the Measurement and Verification of the Guaranteed Energy Savings.</span>
            <span className='boldText'>ii. Renovation fee:</span> the amount due for the renovation costs of the Building indexed toEURIBOR;<br />
            <span className="boldText">iii. Operation and Maintenance fee:</span> the amount due for the Operation and Maintenance
              Expenses and subject to annual indexation with the applicable Latvian Consumer Price
              Index for the respective year as published by Centrala statistikas parvalde (Central
              Statistical Bureau);<br />
            <span className="boldText">iv. Domestic hot water:</span> the amount due at the current Energy Tariff calculated for the actual
            domestic hot water consumption;<br />
            <span className="boldText">v. Any taxes</span> due (such as VAT) in delivering the service.</div>
        </div>
      );
    };

    const energyFee = () => {
      return (
        <div className='secondTabContainerAnnex5'>
          <div>
            <span className="boldText">1.1. Calculation of the flat energy fee</span><br /><br />
            The fee for heating shall be calculated for the Payment Period and divided into 12 equal parts, thus the
            Apartment Owners make equal payments every month (within a 12-month period) by paying a fixed
            fee for heating.<br /><br />
            The monthly Energy Fee shall be calculated based on the Guaranteed Energy Consumption, the current
            Energy Tariff and the Billing Area of the Building in the following manner for each month for the full
            Term of Client payment:
            <div className="inputInsideTextWrapper">
              <input
                type='text'
                placeholder='Months of Payment'
                onChange={(e) => {
                  this.setState({ monthsInput: e.target.value });
                }}
                className='preampleTabInput'
                value={this.state.monthsInput ? this.state.monthsInput : ''}
              />
            </div>
            months:<br />
            <div className="centeredParagraph"><img alt='formula1' src={formula1} className='formula' /></div>
          </div><br />
          <TableForm
            form={calc_energy_fee[2][0]}
            addTableRow={addTableRow}
            handleFormSubmit={updateFeesTable}
            initialValues={obj1}
            data={calc_energy_fee}
            singleProject={singleProject}
            monthsInput={this.state.monthsInput}
            loggedUserRole={loggedUserRole}
          />

          <div className="centeredParagraph"><img alt='formula2' src={formula2} className='formula' /></div>
          <p>Where:<br />
            <span className="boldText">Q<sup>m</sup><sub>Apk,cz,G</sub></span> is the monthly Guaranteed Energy Consumption calculated as formula above<br />
            <span className="boldText">Q<sub>Apk,cz,G</sub></span> is the Guaranteed Energy Consumption for space heating and circulation losses as calculated in
          Annex No. 3 of this Agreement, MWh<br />
            <span className="boldText">ET<sup>m</sup> </span>is the Energy Tariff applicable for the relative billing month, EUR/MWh
          <span className="boldText">E<sup>m</sup><sub>F,G</sub></span> is the total monthly Energy Fee for the building calculated as Q<sup>m</sup><sub>Apk,cz,G</sub> x ET<sup>m</sup> ,<br />
            <span className="boldText">A<sub>Apk</sub></span> is heated area of the building used for billing purposes, m²<br />
            <span className="boldText">Ap<sup>m</sup></span> is the Energy Fee used for billing purposes, EUR/m² month
        </p>
          <div>
            <span className="boldText">1.2. Balancing of the flat energy fee at the settlement period</span><br /><br />
            At the end of each Settlement Period (i.e. each anniversary of this Agreement) the Contractor will send
            an invoice for balancing the payments occurred with the 12 equal flat payments against the actual heat
          energy consumption. The settlement amount is calculated as:<br /></div>
          <div className="centeredParagraph"><img alt='formula8' src={formula8} className='formula' /></div>
          <div> Where:<br />
            <span className="boldText">E<sub>F,S,T</sub></span> is the total yearly Energy Fee based on the metered energy data, calculated as the sum of
          the monthly over the 12 months settlement period, EUR<br />
            <span className="boldText">E<sub>F,G,T</sub></span> is the total yearly Energy Fee for the building, calculated as the sum of the monthly E<sup>m</sup><sub>F,G</sub> over the
            12 months settlement period, EUR
            Which values are calculated based on the following table:
        </div><br />
          <TableForm
            form={balancing_period_fee[2][0]}
            addTableRow={addTableRow}
            handleFormSubmit={updateFeesTable}
            initialValues={obj2}
            data={balancing_period_fee}
            singleProject={singleProject}
            loggedUserRole={loggedUserRole}
          />
          <div className="centeredParagraph"><img alt='formula3' src={formula3} className='formula' /></div>
          <div>Where:<br />
            <span className="boldText">Q<sup>m</sup><sub>Apk,cz,G</sub></span> are the monthly Guaranteed Energy Consumption calculated as the formula above where:<br />
            <span className="boldText">Q<sub>Apk,cz,G</sub></span> is the
            Guaranteed Energy Consumption for space heating and circulation losses as calculated in
          Annex No 3 of this Agreement, MWh<br />
            <span className="boldText">ET<sup>m</sup></span> is the Energy Tariff applicable for the relative billing month, EUR/MWh <br />
            <span className="boldText">Q<sup>m</sup><sub>Apk,cz,S</sub></span> is the monthly Energy Consumption for space heating and circulation losses subject to
            Measurement and Verification in accordance with t LABEEF Financial and Technical Rules
          and Guidelines for Energy Efficiency Measures<br />
            <span className="boldText">E<sup>m</sup><sub>F,G</sub></span> is the total monthly Energy Fee for the building calculated each month as Q<sup>m</sup><sub>Apk,cz,G</sub> x ET<sup>m</sup>,<br /><br />
            If the difference is negative (B<sub>F</sub> is a negative number) the Parties shall settle the difference either
            through a one-off payment of the balance from the Contractor to the Client or subtracting the
            outstanding balance in equal amounts from the due payment of the Client to the Contractor distributed
            throughout the next settlement Period. For the last Settlement Period after which the Agreement
            terminates the balance is settle through a one-off payment
          If the difference is positive (B<sub>F</sub> is a positive number) the Parties shall settle the difference either through
                  a one-off payment of the balance from the Client to the Contractor or adding the outstanding balance
                  in equal amounts to the due payment of the Client to the Contractor distributed throughout the next
                  settlement Period. For the last Settlement Period after which the Agreement terminates the balance is
          settle through a one-off payment<br />
            The Client duly acknowledges that all changes or modifications in Energy Tariff (ET<sup>m</sup>) are applicable
            towards the fee for heating immediately upon their adoption by the respective Regulator or the
            applicable towards the case authority and shall apply from the date of their ratification and entering
          into force to the manner pursuant to which the calculations of the fee for heating are executed.<br /><br />
            <span className="boldText">1.3. Settlement and verification of the energy savings</span><br /><br />
            Upon every 12-month anniversary of this Agreement, the Parties shall verify that the Guaranteed
            Energy Consumption under this Agreement is fulfilled.
          The verification of the energy savings guarantee is based on the following steps:<br /><br />
            <span className="subParagraphs"> <span className="boldText">a. Weather adjustment:</span><br />

              Weather adjustments are made in order to more realistically compare post retrofit conditions to the
              Baseline conditions (weather that differs from the Base Years or different indoor temperatures). If
              these factors were not accounted for, it is possible that the Energy Savings would be improperly
          calculated too low or too high. The adjustment is calculated using the following formula:<br /><br />
              <div className="centeredParagraph"><img alt='formula4' src={formula4} className='formula4' /></div><br />
              Where:<br />
              <span className="boldText">Q<sup>Adj</sup><sub>Apk,cz,S</sub></span> is weather-adjusted energy consumption for space heating and circulation losses in the
          accounting settlement year, MWh<br />
              <span className="boldText">Q<sub>Apk,S</sub></span> is actual energy consumption for space heating in the accounting settlement year, MWh<br />
              <span className="boldText">Q<sub>cz,S</sub></span> is actual energy consumption for circulation losses in the accounting settlement year, MWh<br />
              <span className="boldText">GDD<sub>Ref</sub></span> is heating degree days in the reference year (baseline year)<br />
              <span className="boldText">GDD<sub>S</sub></span> is heating degree days in the year under account for settlement subject to Measurement and
              Verification according to LABEEF Financial and Technical Rules and Guidelines for Energy
          Efficiency Measures<br /><br />
              <span className="boldText">b. Savings guarantee and determination of the fulfilment of the guarantee</span><br />
              The fulfillment of the guarantee and thus the assessment of whether the Client is entitled to a
          compensation claim is determined at the end of each Settlement Period as shown below:<br /><br />

              <div className="centeredParagraph"><img alt='formula9' src={formula9} className='formula4' /></div><br />

              Where:<br />
              <span className="boldText">Q<sub>Apk,cz,ref</sub></span> is baseline Energy consumption for space heating and circulation losses, MWh (Annex No 3)<br />
              <span className="boldText">Q<sup>Adj</sup><sub>Apk,cz,S</sub></span> is weather-adjusted energy consumption for space heating and circulation losses in the
          accounting Settlement Period, MWh<br />
              <span className="boldText">Q<sub>iet,S</sub></span> is energy Savings for space heating and circulation losses for the Settlement Period, MWh<br />
              <span className="boldText">Q<sub>iet,G</sub></span> is guaranteed Energy Savings for space heating and circulation losses, MWh (Annex No 3)<br />
              <span className="boldText">B<sub>iet</sub></span> is balance for the Settlement Period, MWh<br />
              - Fulfillment of the guarantee<br />
              If the balance equal B<sub>iet</sub>=0.0 MWh then the Contractor has fulfilled his Guaranteed Energy Savings for
              the respective Settlement Period and the Client holds no claims for reimbursement against him
          regarding non-compliance of the Guaranteed Energy Consumption.<br />
              - Non- fulfillment of the guarantee<br />
              If the balance is negative (B<sub>iet</sub> is a negative number) then the Contractor has missed his Guaranteed
              Energy Savings for the respective Settlement Period by the amount of negative balance and should
              refund the Client with the negative balance as compensation for non-fulfillment of the guarantee.
          The compensation shall be calculated as:<br /><br />
              <div className="centeredParagraph"><img alt='formula10' src={formula10} className='formula' /></div><br />
              Where:<br />
              <span className="boldText">C<sub>G</sub></span> is compensation for Non- fulfillment of the Guaranteed Energy Savings during the settlement
          period, EUR (excluding VAT)<br />
              <span className="boldText">B<sub>iet</sub></span> is balance for the Settlement Period, MWh<br />
              <span className="boldText">ET<sub>S</sub></span> is average Energy Tariff during the Settlement Period calculated as the sum of the monthly
              energy heating tariffs during the Settlement Period divided by the number of months in the
          respective Settlement Period, EUR/MWh (excluding VAT)<br />
              For this difference (B<sub>iet</sub>) the Parties shall settle the payment either through a one-off payment of the
              balance from the Contractor to the Client or subtracting the outstanding balance in equal amounts
              from the due payment of the Client to the Contractor distributed throughout the next settlement
              Period. For the last Settlement Period after which the Agreement terminates the balance is settle
          through a one-off payment<br />
              - Extra Performance<br />
              If the balance is positive (B<sub>iet</sub> is a positive number), then the Contractor has over-achieved his
              Guaranteed Energy Savings and shall be entitled to retain any and all payments in lieu thereof.
          The extra performance shall be calculated as:<br />
              <div className="centeredParagraph"><img alt='formula11' src={formula11} className='formula' /></div><br />
              Where:<br />
              <span className="boldText">P<sub>G</sub></span> is extra performance of the guarantee during the settlement period, EUR (excluding VAT)<br />
              <span className="boldText">B<sub>iet</sub></span> is balance for the Settlement Period, MWh<br />
              <span className="boldText">ET<sub>S</sub></span> is average Energy Tariff during the Settlement Period calculated as the sum of the monthly
              energy heating tariffs during the Settlement Period divided by the number of months in the
          respective Settlement Period, EUR/MWh (excluding VAT)<br />
              For this difference (B<sub>iet</sub>) the Parties shall settle the payment either through a one-off payment of the
              balance from the Client to the Contractor or adding the outstanding balance in equal amounts to the
              due payment of the Client to the Contractor distributed throughout the next settlement Period. For the
              last Settlement Period after which the Agreement terminates the balance is settle through a one-off
          payment<br /><br />

              <span className="boldText">c. Measurement and Verification</span><br />
              For the determination of the Guaranteed Energy Consumption and determination of the fulfillment of
              the Guaranteed Energy Savings the input data are determinate according to LABEEF Financial and
          Technical Rules and Guidelines for Energy Efficiency Measures.</span>
          </div>
        </div>
      );
    };

    const operationAndMaintenanceExpenses = () => {
      return (
        <div className='fourthTabContainerAnnex5'>
          <div>
            The Client shall reimburse the Contractor for its incurred operation and maintenance expenses in the
            amount of [•] EUR without VAT and in consideration of its Services rendered throughout the term of
            this Agreement (referred to hereinafter as the “Operation and Maintenance Fee”) and as described in
            Annex 4. Each year the Operation and Maintenance Fee as indicated in Annex No 4 of this agreement
            shall be subject to a revision (the “Revised Operation and Maintenance Fee”) based on the changed
            Latvian Consumer Price Index, published by the Central Statistical Bureau (Centrala statistikas parvalde)
        and applied in Latvia for the preceding twelve months, to reflect the following general principle:<br /><br />
            <div className="centeredParagraph"><img alt='formula12' src={formula12} className='formula12' /></div>
          </div>
          <p>
            Where:<br />
            <span className="boldText">y</span> is the year number from the beginning of the agreement, whereas y=1 is the first year of the
        agreement and y=[●] is the last year of this Agreement<br />
            <span className="boldText">OM<sub>y</sub></span> is the Operation and Maintenance Fee for settlement year<br />
            <span className="boldText">OM<sub>y-1</sub></span> is the Operation and Maintenance Fee of the year previous to settlement
      </p>
          <TableForm
            form={maintenance_fee[2][0]}
            addTableRow={addTableRow}
            handleFormSubmit={updateFeesTable}
            initialValues={maintenance_fee[1]
              ? obj3
              : null
            }
            data={maintenance_fee}
            singleProject={singleProject}
            loggedUserRole={loggedUserRole}
          />
        </div>
      );
    };

    const domesticHotWaterFee = () => {
      return (
        <div className='fifthTabContainerAnnex5'>
          <div>
            Payment for domestic hot water is based on the actual domestic hot water consumption reading
            incurred by each separate Apartment Owner and duly recorded per the separate meter or other
            calibrated metering device installed at the each of the Apartments. The payments are based on
          monthly basis as follows:<br /><br />
            <div className="centeredParagraph"><img alt='formula7' src={formula7} className='formula7' /></div>
            Where:<br />
            <span className="boldText">V<sub>m</sub></span> is monthly domestic hot water consumption, m 3<br />
            <span className="boldText">p<sub>kū</sub></span> is water density at the hot water temperature corresponding to 985 kg/m³<br />
            <span className="boldText">c<sub>ū</sub></span> is specific heat capacity of water corresponding to 4.1868 x 10 -3 J/kg ˚C<br />
            <span className="boldText">θ<sub>ū, pieg</sub></span> is cold water temperature from the water supply company, ˚C<br />
            <span className="boldText">θ<sub>kū</sub></span> is hot water supplied temperature at the substation subject to Measurement and Verification
          according the LABEEF Financial and Technical Rules and Guidelines for Energy Efficiency Measures, ˚C<br />
            <span className="boldText">ET<sub>m</sub></span> is the Energy Tariff applicable for the relative billing month, EUR/MWh<br />
            The Client duly acknowledges that all changes or modifications in the Energy Tariff are applicable
            towards the fee for hot water immediately upon their adoption by the respective Regulator or the
            applicable towards the case authority and shall apply from the date of their ratification and entering
            into force to the manner pursuant to which the calculations of the fee for heating are executed.
        </div>
        </div>
      );
    };

    return (
      <React.Fragment>
        <ExpandablePanel
          expanded={expanded === 'panel1'}
          onChange={() => this.handleChange('panel1')}
          label="GENERAL"
          data={general()}
        />
        <ExpandablePanel
          expanded={expanded === 'panel2'}
          onChange={() => this.handleChange('panel2')}
          label="ENERGY FEE"
          data={energyFee()}
        />
        <ExpandablePanel
          expanded={expanded === 'panel3'}
          onChange={() => this.handleChange('panel3')}
          label="OPERATION AND MAINTENANCE EXPENSES"
          data={operationAndMaintenanceExpenses()}
        />
        <ExpandablePanel
          expanded={expanded === 'panel4'}
          onChange={() => this.handleChange('panel4')}
          label="DOMESTIC HOT WATER FEE"
          data={domesticHotWaterFee()}
        />
      </React.Fragment>
    );
  }
}

export default withTranslation('translations', 'serverMessages')(ProjectAnnexView);
