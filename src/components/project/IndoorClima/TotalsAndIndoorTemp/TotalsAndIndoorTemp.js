import React, { Component } from 'react';

import { Field } from 'redux-form';
import { withStyles } from '@material-ui/core/styles';
import { textInput } from './../../../../components/utils/redux-form-wrappers/redux-form-wrappers';

import Button from '@material-ui/core/Button';

import styles from './styles';

class TotalsAndIndoorTemp extends Component {
  render(){
    const { initVal, singleProject, singleProjectReady, classes } = this.props;

    return(
      <div>
        <table className={classes.tableStyle}>
          <tbody>
            <tr>
              <td colSpan='2' className={classes.upperHeaderStyle}>
                Category
              </td>
              <td className={classes.upperHeaderStyle}>
                {singleProjectReady ? singleProject.data.first_year - 3 : ''}
              </td>
              <td className={classes.upperHeaderStyle}>
                {singleProjectReady ? singleProject.data.first_year - 2 : ''}
              </td>
              <td className={classes.upperHeaderStyle}>
                {singleProjectReady ? singleProject.data.first_year - 1 : ''}
              </td>
            </tr>

            <tr>
              <td colSpan='2' className={classes.titleStyle}>
                Total HT [W/K]
              </td>
              <td colSpan='3' className={classes.innerHeadersStyle}>
                <div>
                  {initVal.totalHt}
                </div>
              </td>
            </tr>

            <tr>
              <td rowSpan='2' className={classes.headersStyle}>
                Heat gains
              </td>
              <td className={classes.headersStyle}>
                Internal [W]
              </td>
              <td colSpan='3' className={classes.innerHeadersStyle}>
                {initVal.heatGainsInternal}
              </td>
            </tr>

            <tr>
              <td className={classes.headersStyle}>
                Solar [W]
              </td>
              <td colSpan='3' className={classes.innerHeadersStyle}>
                {initVal.heatGainsSolar}
              </td>
            </tr>

            <tr>
              <td rowSpan='4' className={classes.headersStyle}>
                Air exchanges
              </td>
              <td className={classes.headersStyle}>
                Replaced windows [%]
              </td>
              <td className={classes.tableRowInput}>
                <Field name='airExchangeReplacedWindowsBase' component={textInput} addClass={{inputClass: classes.prjTableInputField}}/>
              </td>
              <td className={classes.tableRowInput}>
                <Field name='airExchangeReplacedWindowsBase1' component={textInput} addClass={{inputClass: classes.prjTableInputField}}/>
              </td>
              <td className={classes.tableRowInput}>
                <Field name='airExchangeReplacedWindowsBase2' component={textInput} addClass={{inputClass: classes.prjTableInputField}}/>
              </td>
            </tr>

            <tr>
              <td className={classes.headersStyle}>
                Air exchange in the building [1/h]
              </td>
              <td className={classes.innerHeadersStyle}>
                {initVal.airExchangeBuildingBase}
              </td>
              <td className={classes.innerHeadersStyle}>
                {initVal.airExchangeBuildingBase1}
              </td>
              <td className={classes.innerHeadersStyle}>
                {initVal.airExchangeBuildingBase2}
              </td>
            </tr>

            <tr>
              <td className={classes.headersStyle}>
                Total Hve [W/K]
              </td>
              <td className={classes.tableRowInput}>
                <Field name='airExchangeTotalBase' component={textInput} addClass={{inputClass: classes.prjTableInputField}}/>
              </td>
              <td className={classes.tableRowInput}>
                <Field name='airExchangeTotalBase1' component={textInput} addClass={{inputClass: classes.prjTableInputField}}/>
              </td>
              <td className={classes.tableRowInput}>
                <Field name='airExchangeTotalBase2' component={textInput} addClass={{inputClass: classes.prjTableInputField}}/>
              </td>
            </tr>

            <tr>
              <td className={classes.headersStyle}>
                Heated Volume
              </td>
              <td colSpan='3' className={classes.tableRowInput}>
                <Field name='airExchangeTotalBase' component={textInput} addClass={{inputClass: classes.prjTableInputField}}/>
              </td>
            </tr>

            <tr>
              <td colSpan='2' className={classes.titleStyle}>
                Total energy consmption [MWh]
              </td>
              <td className={classes.innerHeadersStyle}>
                {initVal.totalEnergyConsumptionBase}
              </td>
              <td className={classes.innerHeadersStyle}>
                {initVal.totalEnergyConsumptionBase1}
              </td>
              <td className={classes.innerHeadersStyle}>
                {initVal.totalEnergyConsumptionBase2}
              </td>
            </tr>

            <tr>
              <td colSpan='2' className={classes.titleStyle}>
                Total energy consumption for space heating and circulation losses [MWh]
              </td>
              <td className={classes.innerHeadersStyle}>
                {initVal.totalEnergyConsumptionCirculationBase}
              </td>
              <td className={classes.innerHeadersStyle}>
                {initVal.totalEnergyConsumptionCirculationBase1}
              </td>
              <td className={classes.innerHeadersStyle}>
                {initVal.totalEnergyConsumptionCirculationBase2}
              </td>
            </tr>

            <tr>
              <td colSpan='2' className={classes.titleStyle}>
                Circulation losses during the period when the space heating system is not operated [MWh]
              </td>
              <td className={classes.innerHeadersStyle}>
                {initVal.circulationLossesBase}
              </td>
              <td className={classes.innerHeadersStyle}>
                {initVal.circulationLossesBase1}
              </td>
              <td className={classes.innerHeadersStyle}>
                {initVal.circulationLossesBase2}
              </td>
            </tr>

            <tr>
              <td colSpan='2' className={classes.titleStyle}>
                Distribution losses through space heating pipes installed in the basement [MWh]
              </td>
              <td colSpan='3' className={classes.innerHeadersStyle}>
                {initVal.distributionLossesBasement}
              </td>
            </tr>

            <tr>
              <td colSpan='2' className={classes.titleStyle}>
                Distribution losses through space heating pipes installed in the technical attic [MWh]
              </td>
              <td colSpan='3' className={classes.innerHeadersStyle}>
                {initVal.distributionLossesAttic}
              </td>
            </tr>

            <tr>
              <td colSpan='2' className={classes.titleStyle}>
                Total measured [MWh]
              </td>
              <td className={classes.innerHeadersStyle}>
                {initVal.totalMeasuredBase}
              </td>
              <td className={classes.innerHeadersStyle}>
                {initVal.totalMeasuredBase1}
              </td>
              <td className={classes.innerHeadersStyle}>
                {initVal.totalMeasuredBase2}
              </td>
            </tr>

            <tr>
              <td colSpan='2' className={classes.titleStyle}>
                Total calculated [MWh]
              </td>
              <td className={classes.innerHeadersStyle}>
                {initVal.totalCalculatedBase}
              </td>
              <td className={classes.innerHeadersStyle}>
                {initVal.totalCalculatedBase1}
              </td>
              <td className={classes.innerHeadersStyle}>
                {initVal.totalCalculatedBase2}
              </td>
            </tr>

            <tr>
              <td colSpan='2' className={classes.titleStyle}>
                Indoor temperature [°C]
              </td>
              <td className={classes.tableRowInput}>
                <Field name='indoorTemperatureBase' component={textInput} addClass={{inputClass: classes.prjTableInputField}}/>
              </td>
              <td className={classes.tableRowInput}>
                <Field name='indoorTemperatureBase1' component={textInput} addClass={{inputClass: classes.prjTableInputField}}/>
              </td>
              <td className={classes.tableRowInput}>
                <Field name='indoorTemperatureBase2' component={textInput} addClass={{inputClass: classes.prjTableInputField}}/>
              </td>
            </tr>
          </tbody>
        </table>
        <Button
          variant='contained'
          className={classes.saveButton}
          type='submit'
          fullWidth={false}
        >
          Save
        </Button>
      </div>
    )
  }
}

export default withStyles(styles)(TotalsAndIndoorTemp)
