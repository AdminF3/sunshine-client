import React, { Component } from 'react';

import { Field } from 'redux-form'
import { withStyles } from '@material-ui/core/styles';
import { textInput } from './../../../../components/utils/redux-form-wrappers/redux-form-wrappers';

import Button from '@material-ui/core/Button';

import styles from './styles';

class BuildingEnvelope extends Component {
  render(){
    const { initVal, singleProject, singleProjectReady, classes } = this.props;
    return(
      <div>
          <table className={classes.tableStyle}>
            <tbody>
            {/* Row with Zones and Years */}
            <tr>
              <td colSpan='3' rowSpan='2' className={classes.headersStyle}>

              </td>
              <td colSpan='3' className={classes.headersStyle}>
                Zone 1
              </td>
              <td colSpan='3' className={classes.headersStyle}>
                Zone 2
              </td>
            </tr>
            <tr>
              <td className={classes.headersStyle}>
                {singleProjectReady ? singleProject.data.first_year - 3 : ''}
              </td>
              <td className={classes.headersStyle}>
                {singleProjectReady ? singleProject.data.first_year - 2 : ''}
              </td>
              <td className={classes.headersStyle}>
                {singleProjectReady ? singleProject.data.first_year - 1 : ''}
              </td>
              <td className={classes.headersStyle}>
                {singleProjectReady ? singleProject.data.first_year - 3 : ''}
              </td>
              <td className={classes.headersStyle}>
                {singleProjectReady ? singleProject.data.first_year - 2 : ''}
              </td>
              <td className={classes.headersStyle}>
                {singleProjectReady ? singleProject.data.first_year - 1 : ''}
              </td>
            </tr>

            {/* Actual content of the table  */}

            {/* Attic part */}
            <tr>
              <td rowSpan='5' className={classes.leftTitleStyle}>
                Attic
              </td>
              <td rowSpan='5' className={classes.numberColumnStyle}>
                1
              </td>
              <td className={classes.rightTitleStyle}>
                Area [m2]
              </td>
              <td colSpan='3' className={classes.tableRowInput}>
                <Field name='atticZone1Area' component={textInput} addClass={{inputClass: classes.prjTableInputField}}/>
              </td>
              <td colSpan='3' className={classes.tableRowInput}>
                <Field name='atticZone2Area' component={textInput} addClass={{inputClass: classes.prjTableInputField}}/>
              </td>
            </tr>

            <tr>
              <td className={classes.rightTitleStyle}>
                U-Value [W/(m2K)]
              </td>
              <td colSpan='3' className={classes.tableRowInput}>
                <Field name='atticZone1uValue' component={textInput} addClass={{inputClass: classes.prjTableInputField}}/>
              </td>
              <td colSpan='3' className={classes.tableRowInput}>
                <Field name='atticZone2uValue' component={textInput} addClass={{inputClass: classes.prjTableInputField}}/>
              </td>
            </tr>

            <tr>
              <td className={classes.rightTitleStyle}>
                Outdoor Temperature [°C]
              </td>
              <td className={classes.tableRowInput}>
                <Field name='atticZone1OutTempBase' component={textInput} addClass={{inputClass: classes.prjTableInputField}}/>
              </td>
              <td className={classes.tableRowInput}>
                <Field name='atticZone1OutTempBase1' component={textInput} addClass={{inputClass: classes.prjTableInputField}}/>
              </td>
              <td className={classes.tableRowInput}>
                <Field name='atticZone1OutTempBase2' component={textInput} addClass={{inputClass: classes.prjTableInputField}}/>
              </td>
              <td className={classes.tableRowInput}>
                <Field name='atticZone2OutTempBase' component={textInput} addClass={{inputClass: classes.prjTableInputField}}/>
              </td>
              <td className={classes.tableRowInput}>
                <Field name='atticZone2OutTempBase1' component={textInput} addClass={{inputClass: classes.prjTableInputField}}/>
              </td>
              <td className={classes.tableRowInput}>
                <Field name='atticZone2OutTempBase2' component={textInput} addClass={{inputClass: classes.prjTableInputField}}/>
              </td>
            </tr>

            <tr>
              <td className={classes.rightTitleStyle}>
                Temperature difference [°C]
              </td>
              <td className={classes.tableRowInput}>
                <Field name='atticZone1TempDiffBase' component={textInput} addClass={{inputClass: classes.prjTableInputField}}/>
              </td>
              <td className={classes.tableRowInput}>
                <Field name='atticZone1TempDiffBase1' component={textInput} addClass={{inputClass: classes.prjTableInputField}}/>
              </td>
              <td className={classes.tableRowInput}>
                <Field name='atticZone1TempDiffBase2' component={textInput} addClass={{inputClass: classes.prjTableInputField}}/>
              </td>
              <td className={classes.tableRowInput}>
                <Field name='atticZone2TempDiffBase' component={textInput} addClass={{inputClass: classes.prjTableInputField}}/>
              </td>
              <td className={classes.tableRowInput}>
                <Field name='atticZone2TempDiffBase1' component={textInput} addClass={{inputClass: classes.prjTableInputField}}/>
              </td>
              <td className={classes.tableRowInput}>
                <Field name='atticZone2TempDiffBase2' component={textInput} addClass={{inputClass: classes.prjTableInputField}}/>
              </td>
            </tr>

            <tr>
              <td className={classes.rightTitleStyle}>
                Heat loss coefficient [W/K]
              </td>
              <td colSpan='3' className={classes.tableRowInput}>
                <Field name='atticZone1HeatLossCoeff' component={textInput} addClass={{inputClass: classes.prjTableInputField}}/>
              </td>
              <td colSpan='3' className={classes.tableRowInput}>
                <Field name='atticZone2HeatLossCoeff' component={textInput} addClass={{inputClass: classes.prjTableInputField}}/>
              </td>
            </tr>

            {/* Basement ceiling part */}
            <tr>
              <td rowSpan='5' className={classes.leftTitleStyle}>
                Basement ceiling
              </td>
              <td rowSpan='5' className={classes.numberColumnStyle}>
                1
              </td>
              <td className={classes.rightTitleStyle}>
                Area [m2]
              </td>
              <td colSpan='3' className={classes.tableRowInput}>
                <Field name='basementCeilingZone1Area' component={textInput} addClass={{inputClass: classes.prjTableInputField}}/>
              </td>
              <td colSpan='3' className={classes.tableRowInput}>
                <Field name='basementCeilingZone2Area' component={textInput} addClass={{inputClass: classes.prjTableInputField}}/>
              </td>
            </tr>

            <tr>
              <td className={classes.rightTitleStyle}>
                U-Value [W/(m2K)]
              </td>
              <td colSpan='3' className={classes.tableRowInput}>
                <Field name='basementCeilingZone1uValue' component={textInput} addClass={{inputClass: classes.prjTableInputField}}/>
              </td>
              <td colSpan='3' className={classes.tableRowInput}>
                <Field name='basementCeilingZone2uValue' component={textInput} addClass={{inputClass: classes.prjTableInputField}}/>
              </td>
            </tr>

            <tr>
              <td className={classes.rightTitleStyle}>
                Outdoor Temperature [°C]
              </td>
              <td className={classes.tableRowInput}>
                <Field name='basementCeilingZone1OutTempBase' component={textInput} addClass={{inputClass: classes.prjTableInputField}}/>
              </td>
              <td className={classes.tableRowInput}>
                <Field name='basementCeilingZone1OutTempBase1' component={textInput} addClass={{inputClass: classes.prjTableInputField}}/>
              </td>
              <td className={classes.tableRowInput}>
                <Field name='basementCeilingZone1OutTempBase2' component={textInput} addClass={{inputClass: classes.prjTableInputField}}/>
              </td>
              <td className={classes.tableRowInput}>
                <Field name='basementCeilingZone2OutTempBase' component={textInput} addClass={{inputClass: classes.prjTableInputField}}/>
              </td>
              <td className={classes.tableRowInput}>
                <Field name='basementCeilingZone2OutTempBase1' component={textInput} addClass={{inputClass: classes.prjTableInputField}}/>
              </td>
              <td className={classes.tableRowInput}>
                <Field name='basementCeilingZone2OutTempBase2' component={textInput} addClass={{inputClass: classes.prjTableInputField}}/>
              </td>
            </tr>

            <tr>
              <td className={classes.rightTitleStyle}>
                Temperature difference [°C]
              </td>
              <td className={classes.tableRowInput}>
                <Field name='basementCeilingZone1TempDiffBase' component={textInput} addClass={{inputClass: classes.prjTableInputField}}/>
              </td>
              <td className={classes.tableRowInput}>
                <Field name='basementCeilingZone1TempDiffBase1' component={textInput} addClass={{inputClass: classes.prjTableInputField}}/>
              </td>
              <td className={classes.tableRowInput}>
                <Field name='basementCeilingZone1TempDiffBase2' component={textInput} addClass={{inputClass: classes.prjTableInputField}}/>
              </td>
              <td className={classes.tableRowInput}>
                <Field name='basementCeilingZone2TempDiffBase' component={textInput} addClass={{inputClass: classes.prjTableInputField}}/>
              </td>
              <td className={classes.tableRowInput}>
                <Field name='basementCeilingZone2TempDiffBase1' component={textInput} addClass={{inputClass: classes.prjTableInputField}}/>
              </td>
              <td className={classes.tableRowInput}>
                <Field name='basementCeilingZone2TempDiffBase2' component={textInput} addClass={{inputClass: classes.prjTableInputField}}/>
              </td>
            </tr>

            <tr>
              <td className={classes.rightTitleStyle}>
                Heat loss coefficient [W/K]
              </td>
              <td colSpan='3' className={classes.tableRowInput}>
                <Field name='basementCeilingZone1HeatLossCoeff' component={textInput} addClass={{inputClass: classes.prjTableInputField}}/>
              </td>
              <td colSpan='3' className={classes.tableRowInput}>
                <Field name='basementCeilingZone2HeatLossCoeff' component={textInput} addClass={{inputClass: classes.prjTableInputField}}/>
              </td>
            </tr>

            {/* Base wall part */}
            <tr>
              <td rowSpan='5' className={classes.leftTitleStyle}>
                Base wall
              </td>
              <td rowSpan='5' className={classes.numberColumnStyle}>
                1
              </td>
              <td className={classes.rightTitleStyle}>
                Area [m2]
              </td>
              <td colSpan='3' className={classes.tableRowInput}>
                <Field name='baseWallZone1Area' component={textInput} addClass={{inputClass: classes.prjTableInputField}}/>
              </td>
              <td colSpan='3' className={classes.tableRowInput}>
                <Field name='baseWallZone2Area' component={textInput} addClass={{inputClass: classes.prjTableInputField}}/>
              </td>
            </tr>

            <tr>
              <td className={classes.rightTitleStyle}>
                U-Value [W/(m2K)]
              </td>
              <td colSpan='3' className={classes.tableRowInput}>
                <Field name='baseWallZone1uValue' component={textInput} addClass={{inputClass: classes.prjTableInputField}}/>
              </td>
              <td colSpan='3' className={classes.tableRowInput}>
                <Field name='baseWallZone2uValue' component={textInput} addClass={{inputClass: classes.prjTableInputField}}/>
              </td>
            </tr>

            <tr>
              <td className={classes.rightTitleStyle}>
                Outdoor Temperature [°C]
              </td>
              <td className={classes.tableRowInput}>
                <Field name='baseWallZone1OutTempBase' component={textInput} addClass={{inputClass: classes.prjTableInputField}}/>
              </td>
              <td className={classes.tableRowInput}>
                <Field name='baseWallZone1OutTempBase1' component={textInput} addClass={{inputClass: classes.prjTableInputField}}/>
              </td>
              <td className={classes.tableRowInput}>
                <Field name='baseWallZone1OutTempBase2' component={textInput} addClass={{inputClass: classes.prjTableInputField}}/>
              </td>
              <td className={classes.tableRowInput}>
                <Field name='baseWallZone2OutTempBase' component={textInput} addClass={{inputClass: classes.prjTableInputField}}/>
              </td>
              <td className={classes.tableRowInput}>
                <Field name='baseWallZone2OutTempBase1' component={textInput} addClass={{inputClass: classes.prjTableInputField}}/>
              </td>
              <td className={classes.tableRowInput}>
                <Field name='baseWallZone2OutTempBase2' component={textInput} addClass={{inputClass: classes.prjTableInputField}}/>
              </td>
            </tr>

            <tr>
              <td className={classes.rightTitleStyle}>
                Temperature difference [°C]
              </td>
              <td className={classes.tableRowInput}>
                <Field name='baseWallZone1TempDiffBase' component={textInput} addClass={{inputClass: classes.prjTableInputField}}/>
              </td>
              <td className={classes.tableRowInput}>
                <Field name='baseWallZone1TempDiffBase1' component={textInput} addClass={{inputClass: classes.prjTableInputField}}/>
              </td>
              <td className={classes.tableRowInput}>
                <Field name='baseWallZone1TempDiffBase2' component={textInput} addClass={{inputClass: classes.prjTableInputField}}/>
              </td>
              <td className={classes.tableRowInput}>
                <Field name='baseWallZone2TempDiffBase' component={textInput} addClass={{inputClass: classes.prjTableInputField}}/>
              </td>
              <td className={classes.tableRowInput}>
                <Field name='baseWallZone2TempDiffBase1' component={textInput} addClass={{inputClass: classes.prjTableInputField}}/>
              </td>
              <td className={classes.tableRowInput}>
                <Field name='baseWallZone2TempDiffBase2' component={textInput} addClass={{inputClass: classes.prjTableInputField}}/>
              </td>
            </tr>

            <tr>
              <td className={classes.rightTitleStyle}>
                Heat loss coefficient [W/K]
              </td>
              <td colSpan='3' className={classes.tableRowInput}>
                <Field name='baseWallZone1HeatLossCoeff' component={textInput} addClass={{inputClass: classes.prjTableInputField}}/>
              </td>
              <td colSpan='3' className={classes.tableRowInput}>
                <Field name='baseWallZone2HeatLossCoeff' component={textInput} addClass={{inputClass: classes.prjTableInputField}}/>
              </td>
            </tr>

            {/* Slab on ground part */}
            <tr>
              <td rowSpan='5' className={classes.leftTitleStyle}>
                Slab on ground
              </td>
              <td rowSpan='5' className={classes.numberColumnStyle}>
                1
              </td>
              <td className={classes.rightTitleStyle}>
                Area [m2]
              </td>
              <td colSpan='3' className={classes.tableRowInput}>
                <Field name='groundZone1Area' component={textInput} addClass={{inputClass: classes.prjTableInputField}}/>
              </td>
              <td colSpan='3' className={classes.tableRowInput}>
                <Field name='groundZone2Area' component={textInput} addClass={{inputClass: classes.prjTableInputField}}/>
              </td>
            </tr>

            <tr>
              <td className={classes.rightTitleStyle}>
                U-Value [W/(m2K)]
              </td>
              <td colSpan='3' className={classes.tableRowInput}>
                <Field name='groundZone1uValue' component={textInput} addClass={{inputClass: classes.prjTableInputField}}/>
              </td>
              <td colSpan='3' className={classes.tableRowInput}>
                <Field name='groundZone2uValue' component={textInput} addClass={{inputClass: classes.prjTableInputField}}/>
              </td>
            </tr>

            <tr>
              <td className={classes.rightTitleStyle}>
                Outdoor Temperature [°C]
              </td>
              <td className={classes.tableRowInput}>
                <Field name='groundZone1OutTempBase' component={textInput} addClass={{inputClass: classes.prjTableInputField}}/>
              </td>
              <td className={classes.tableRowInput}>
                <Field name='groundZone1OutTempBase1' component={textInput} addClass={{inputClass: classes.prjTableInputField}}/>
              </td>
              <td className={classes.tableRowInput}>
                <Field name='groundZone1OutTempBase2' component={textInput} addClass={{inputClass: classes.prjTableInputField}}/>
              </td>
              <td className={classes.tableRowInput}>
                <Field name='groundZone2OutTempBase' component={textInput} addClass={{inputClass: classes.prjTableInputField}}/>
              </td>
              <td className={classes.tableRowInput}>
                <Field name='groundZone2OutTempBase1' component={textInput} addClass={{inputClass: classes.prjTableInputField}}/>
              </td>
              <td className={classes.tableRowInput}>
                <Field name='groundZone2OutTempBase2' component={textInput} addClass={{inputClass: classes.prjTableInputField}}/>
              </td>
            </tr>

            <tr>
              <td className={classes.rightTitleStyle}>
                Temperature difference [°C]
              </td>
              <td className={classes.tableRowInput}>
                <Field name='groundZone1TempDiffBase' component={textInput} addClass={{inputClass: classes.prjTableInputField}}/>
              </td>
              <td className={classes.tableRowInput}>
                <Field name='groundZone1TempDiffBase1' component={textInput} addClass={{inputClass: classes.prjTableInputField}}/>
              </td>
              <td className={classes.tableRowInput}>
                <Field name='groundZone1TempDiffBase2' component={textInput} addClass={{inputClass: classes.prjTableInputField}}/>
              </td>
              <td className={classes.tableRowInput}>
                <Field name='groundZone2TempDiffBase' component={textInput} addClass={{inputClass: classes.prjTableInputField}}/>
              </td>
              <td className={classes.tableRowInput}>
                <Field name='groundZone2TempDiffBase1' component={textInput} addClass={{inputClass: classes.prjTableInputField}}/>
              </td>
              <td className={classes.tableRowInput}>
                <Field name='groundZone2TempDiffBase2' component={textInput} addClass={{inputClass: classes.prjTableInputField}}/>
              </td>
            </tr>

            <tr>
              <td className={classes.rightTitleStyle}>
                Heat loss coefficient [W/K]
              </td>
              <td colSpan='3' className={classes.tableRowInput}>
                <Field name='groundZone1HeatLossCoeff' component={textInput} addClass={{inputClass: classes.prjTableInputField}}/>
              </td>
              <td colSpan='3' className={classes.tableRowInput}>
                <Field name='groundZone2HeatLossCoeff' component={textInput} addClass={{inputClass: classes.prjTableInputField}}/>
              </td>
            </tr>

            {/* Roof  part */}
            <tr>
              <td rowSpan='5' className={classes.leftTitleStyle}>
                Roof
              </td>
              <td rowSpan='5' className={classes.numberColumnStyle}>
                1
              </td>
              <td className={classes.rightTitleStyle}>
                Area [m2]
              </td>
              <td colSpan='3' className={classes.tableRowInput}>
                <Field name='roofZone1Area' component={textInput} addClass={{inputClass: classes.prjTableInputField}}/>
              </td>
              <td colSpan='3' className={classes.tableRowInput}>
                <Field name='roofZone2Area' component={textInput} addClass={{inputClass: classes.prjTableInputField}}/>
              </td>
            </tr>

            <tr>
              <td className={classes.rightTitleStyle}>
                U-Value [W/(m2K)]
              </td>
              <td colSpan='3' className={classes.tableRowInput}>
                <Field name='roofZone1uValue' component={textInput} addClass={{inputClass: classes.prjTableInputField}}/>
              </td>
              <td colSpan='3' className={classes.tableRowInput}>
                <Field name='roofZone2uValue' component={textInput} addClass={{inputClass: classes.prjTableInputField}}/>
              </td>
            </tr>

            <tr>
              <td className={classes.rightTitleStyle}>
                Outdoor Temperature [°C]
              </td>
              <td className={classes.tableRowInput}>
                <Field name='roofZone1OutTempBase' component={textInput} addClass={{inputClass: classes.prjTableInputField}}/>
              </td>
              <td className={classes.tableRowInput}>
                <Field name='roofZone1OutTempBase1' component={textInput} addClass={{inputClass: classes.prjTableInputField}}/>
              </td>
              <td className={classes.tableRowInput}>
                <Field name='roofZone1OutTempBase2' component={textInput} addClass={{inputClass: classes.prjTableInputField}}/>
              </td>
              <td className={classes.tableRowInput}>
                <Field name='roofZone2OutTempBase' component={textInput} addClass={{inputClass: classes.prjTableInputField}}/>
              </td>
              <td className={classes.tableRowInput}>
                <Field name='roofZone2OutTempBase1' component={textInput} addClass={{inputClass: classes.prjTableInputField}}/>
              </td>
              <td className={classes.tableRowInput}>
                <Field name='roofZone2OutTempBase2' component={textInput} addClass={{inputClass: classes.prjTableInputField}}/>
              </td>
            </tr>

            <tr>
              <td className={classes.rightTitleStyle}>
                Temperature difference [°C]
              </td>
              <td className={classes.tableRowInput}>
                <Field name='roofZone1TempDiffBase' component={textInput} addClass={{inputClass: classes.prjTableInputField}}/>
              </td>
              <td className={classes.tableRowInput}>
                <Field name='roofZone1TempDiffBase1' component={textInput} addClass={{inputClass: classes.prjTableInputField}}/>
              </td>
              <td className={classes.tableRowInput}>
                <Field name='roofZone1TempDiffBase2' component={textInput} addClass={{inputClass: classes.prjTableInputField}}/>
              </td>
              <td className={classes.tableRowInput}>
                <Field name='roofZone2TempDiffBase' component={textInput} addClass={{inputClass: classes.prjTableInputField}}/>
              </td>
              <td className={classes.tableRowInput}>
                <Field name='roofZone2TempDiffBase1' component={textInput} addClass={{inputClass: classes.prjTableInputField}}/>
              </td>
              <td className={classes.tableRowInput}>
                <Field name='roofZone2TempDiffBase2' component={textInput} addClass={{inputClass: classes.prjTableInputField}}/>
              </td>
            </tr>

            <tr>
              <td className={classes.rightTitleStyle}>
                Heat loss coefficient [W/K]
              </td>
              <td colSpan='3' className={classes.tableRowInput}>
                <Field name='roofZone1HeatLossCoeff' component={textInput} addClass={{inputClass: classes.prjTableInputField}}/>
              </td>
              <td colSpan='3' className={classes.tableRowInput}>
                <Field name='roofZone2HeatLossCoeff' component={textInput} addClass={{inputClass: classes.prjTableInputField}}/>
              </td>
            </tr>

            {/* External door part */}
            <tr>
              <td rowSpan='10' className={classes.leftTitleStyle}>
                External door
              </td>
              <td rowSpan='5' className={classes.numberColumnStyle}>
                1
              </td>
              <td className={classes.rightTitleStyle}>
                Area [m2]
              </td>
              <td colSpan='3' className={classes.tableRowInput}>
                <Field name='externalDoor1Zone1Area' component={textInput} addClass={{inputClass: classes.prjTableInputField}}/>
              </td>
              <td colSpan='3' className={classes.tableRowInput}>
                <Field name='externalDoor1Zone2Area' component={textInput} addClass={{inputClass: classes.prjTableInputField}}/>
              </td>
            </tr>

            <tr>
              <td className={classes.rightTitleStyle}>
                U-Value [W/(m2K)]
              </td>
              <td colSpan='3' className={classes.tableRowInput}>
                <Field name='externalDoor1Zone1uValue' component={textInput} addClass={{inputClass: classes.prjTableInputField}}/>
              </td>
              <td colSpan='3' className={classes.tableRowInput}>
                <Field name='externalDoor1Zone2uValue' component={textInput} addClass={{inputClass: classes.prjTableInputField}}/>
              </td>
            </tr>

            <tr>
              <td className={classes.rightTitleStyle}>
                Outdoor Temperature [°C]
              </td>
              <td className={classes.tableRowInput}>
                <Field name='externalDoor1Zone1OutTempBase' component={textInput} addClass={{inputClass: classes.prjTableInputField}}/>
              </td>
              <td className={classes.tableRowInput}>
                <Field name='externalDoor1Zone1OutTempBase1' component={textInput} addClass={{inputClass: classes.prjTableInputField}}/>
              </td>
              <td className={classes.tableRowInput}>
                <Field name='externalDoor1Zone1OutTempBase2' component={textInput} addClass={{inputClass: classes.prjTableInputField}}/>
              </td>
              <td className={classes.tableRowInput}>
                <Field name='externalDoor1Zone2OutTempBase' component={textInput} addClass={{inputClass: classes.prjTableInputField}}/>
              </td>
              <td className={classes.tableRowInput}>
                <Field name='externalDoor1Zone2OutTempBase1' component={textInput} addClass={{inputClass: classes.prjTableInputField}}/>
              </td>
              <td className={classes.tableRowInput}>
                <Field name='externalDoor1Zone2OutTempBase2' component={textInput} addClass={{inputClass: classes.prjTableInputField}}/>
              </td>
            </tr>

            <tr>
              <td className={classes.rightTitleStyle}>
                Temperature difference [°C]
              </td>
              <td className={classes.tableRowInput}>
                <Field name='externalDoor1Zone1TempDiffBase' component={textInput} addClass={{inputClass: classes.prjTableInputField}}/>
              </td>
              <td className={classes.tableRowInput}>
                <Field name='externalDoor1Zone1TempDiffBase' component={textInput} addClass={{inputClass: classes.prjTableInputField}}/>
              </td>
              <td className={classes.tableRowInput}>
                <Field name='externalDoor1Zone1TempDiffBase' component={textInput} addClass={{inputClass: classes.prjTableInputField}}/>
              </td>
              <td className={classes.tableRowInput}>
                <Field name='externalDoor1Zone2TempDiffBase' component={textInput} addClass={{inputClass: classes.prjTableInputField}}/>
              </td>
              <td className={classes.tableRowInput}>
                <Field name='externalDoor1Zone2TempDiffBase' component={textInput} addClass={{inputClass: classes.prjTableInputField}}/>
              </td>
              <td className={classes.tableRowInput}>
                <Field name='externalDoor1Zone2TempDiffBase' component={textInput} addClass={{inputClass: classes.prjTableInputField}}/>
              </td>
            </tr>

            <tr>
              <td className={classes.rightTitleStyle}>
                Heat loss coefficient [W/K]
              </td>
              <td colSpan='3' className={classes.tableRowInput}>
                <Field name='externalDoor1Zone1HeatLossCoeff' component={textInput} addClass={{inputClass: classes.prjTableInputField}}/>
              </td>
              <td colSpan='3' className={classes.tableRowInput}>
                <Field name='externalDoor1Zone2HeatLossCoeff' component={textInput} addClass={{inputClass: classes.prjTableInputField}}/>
              </td>
            </tr>

            <tr>
              <td rowSpan='5' className={classes.numberColumnStyle}>
                2
              </td>
              <td className={classes.rightTitleStyle}>
                Area [m2]
              </td>
              <td colSpan='3' className={classes.tableRowInput}>
                <Field name='externalDoor2Zone1Area' component={textInput} addClass={{inputClass: classes.prjTableInputField}}/>
              </td>
              <td colSpan='3' className={classes.tableRowInput}>
                <Field name='externalDoor2Zone2Area' component={textInput} addClass={{inputClass: classes.prjTableInputField}}/>
              </td>
            </tr>

            <tr>
              <td className={classes.rightTitleStyle}>
                U-Value [W/(m2K)]
              </td>
              <td colSpan='3' className={classes.tableRowInput}>
                <Field name='externalDoor2Zone1uValue' component={textInput} addClass={{inputClass: classes.prjTableInputField}}/>
              </td>
              <td colSpan='3' className={classes.tableRowInput}>
                <Field name='externalDoor2Zone2uValue' component={textInput} addClass={{inputClass: classes.prjTableInputField}}/>
              </td>
            </tr>

            <tr>
              <td className={classes.rightTitleStyle}>
                Outdoor Temperature [°C]
              </td>
              <td className={classes.tableRowInput}>
                <Field name='externalDoor2Zone1OutTempBase' component={textInput} addClass={{inputClass: classes.prjTableInputField}}/>
              </td>
              <td className={classes.tableRowInput}>
                <Field name='externalDoor2Zone1OutTempBase1' component={textInput} addClass={{inputClass: classes.prjTableInputField}}/>
              </td>
              <td className={classes.tableRowInput}>
                <Field name='externalDoor2Zone1OutTempBase2' component={textInput} addClass={{inputClass: classes.prjTableInputField}}/>
              </td>
              <td className={classes.tableRowInput}>
                <Field name='externalDoor2Zone2OutTempBase' component={textInput} addClass={{inputClass: classes.prjTableInputField}}/>
              </td>
              <td className={classes.tableRowInput}>
                <Field name='externalDoor2Zone2OutTempBase1' component={textInput} addClass={{inputClass: classes.prjTableInputField}}/>
              </td>
              <td className={classes.tableRowInput}>
                <Field name='externalDoor2Zone2OutTempBase2' component={textInput} addClass={{inputClass: classes.prjTableInputField}}/>
              </td>
            </tr>

            <tr>
              <td className={classes.rightTitleStyle}>
                Temperature difference [°C]
              </td>
              <td className={classes.tableRowInput}>
                <Field name='externalDoor2Zone1TempDiffBase' component={textInput} addClass={{inputClass: classes.prjTableInputField}}/>
              </td>
              <td className={classes.tableRowInput}>
                <Field name='externalDoor2Zone1TempDiffBase1' component={textInput} addClass={{inputClass: classes.prjTableInputField}}/>
              </td>
              <td className={classes.tableRowInput}>
                <Field name='externalDoor2Zone1TempDiffBase2' component={textInput} addClass={{inputClass: classes.prjTableInputField}}/>
              </td>
              <td className={classes.tableRowInput}>
                <Field name='externalDoor2Zone2TempDiffBase' component={textInput} addClass={{inputClass: classes.prjTableInputField}}/>
              </td>
              <td className={classes.tableRowInput}>
                <Field name='externalDoor2Zone2TempDiffBase1' component={textInput} addClass={{inputClass: classes.prjTableInputField}}/>
              </td>
              <td className={classes.tableRowInput}>
                <Field name='externalDoor2Zone2TempDiffBase2' component={textInput} addClass={{inputClass: classes.prjTableInputField}}/>
              </td>
            </tr>

            <tr>
              <td className={classes.rightTitleStyle}>
                Heat loss coefficient [W/K]
              </td>
              <td colSpan='3' className={classes.tableRowInput}>
                <Field name='externalDoor2Zone1HeatLossCoeff' component={textInput} addClass={{inputClass: classes.prjTableInputField}}/>
              </td>
              <td colSpan='3' className={classes.tableRowInput}>
                <Field name='externalDoor2Zone2HeatLossCoeff' component={textInput} addClass={{inputClass: classes.prjTableInputField}}/>
              </td>
            </tr>

            {/* External wall part */}
            <tr>
              <td rowSpan='20' className={classes.leftTitleStyle}>
                External wall
              </td>
              <td rowSpan='5' className={classes.numberColumnStyle}>
                1
              </td>
              <td className={classes.rightTitleStyle}>
                Area [m2]
              </td>
              <td colSpan='3' className={classes.tableRowInput}>
                <Field name='externalWall1Zone1Area' component={textInput} addClass={{inputClass: classes.prjTableInputField}}/>
              </td>
              <td colSpan='3' className={classes.tableRowInput}>
                <Field name='externalWall1Zone2Area' component={textInput} addClass={{inputClass: classes.prjTableInputField}}/>
              </td>
            </tr>

            <tr>
              <td className={classes.rightTitleStyle}>
                U-Value [W/(m2K)]
              </td>
              <td colSpan='3' className={classes.tableRowInput}>
                <Field name='externalWall1Zone1uValue' component={textInput} addClass={{inputClass: classes.prjTableInputField}}/>
              </td>
              <td colSpan='3' className={classes.tableRowInput}>
                <Field name='externalWall1Zone2uValue' component={textInput} addClass={{inputClass: classes.prjTableInputField}}/>
              </td>
            </tr>

            <tr>
              <td className={classes.rightTitleStyle}>
                Outdoor Temperature [°C]
              </td>
              <td className={classes.tableRowInput}>
                <Field name='externalWall1Zone1OutTempBase' component={textInput} addClass={{inputClass: classes.prjTableInputField}}/>
              </td>
              <td className={classes.tableRowInput}>
                <Field name='externalWall1Zone1OutTempBase1' component={textInput} addClass={{inputClass: classes.prjTableInputField}}/>
              </td>
              <td className={classes.tableRowInput}>
                <Field name='externalWall1Zone1OutTempBase2' component={textInput} addClass={{inputClass: classes.prjTableInputField}}/>
              </td>
              <td className={classes.tableRowInput}>
                <Field name='externalWall1Zone2OutTempBase' component={textInput} addClass={{inputClass: classes.prjTableInputField}}/>
              </td>
              <td className={classes.tableRowInput}>
                <Field name='externalWall1Zone2OutTempBase1' component={textInput} addClass={{inputClass: classes.prjTableInputField}}/>
              </td>
              <td className={classes.tableRowInput}>
                <Field name='externalWall1Zone2OutTempBase2' component={textInput} addClass={{inputClass: classes.prjTableInputField}}/>
              </td>
            </tr>

            <tr>
              <td className={classes.rightTitleStyle}>
                Temperature difference [°C]
              </td>
              <td className={classes.tableRowInput}>
                <Field name='externalWall1Zone1TempDiffBase' component={textInput} addClass={{inputClass: classes.prjTableInputField}}/>
              </td>
              <td className={classes.tableRowInput}>
                <Field name='externalWall1Zone1TempDiffBase1' component={textInput} addClass={{inputClass: classes.prjTableInputField}}/>
              </td>
              <td className={classes.tableRowInput}>
                <Field name='externalWall1Zone1TempDiffBase2' component={textInput} addClass={{inputClass: classes.prjTableInputField}}/>
              </td>
              <td className={classes.tableRowInput}>
                <Field name='externalWall1Zone2TempDiffBase' component={textInput} addClass={{inputClass: classes.prjTableInputField}}/>
              </td>
              <td className={classes.tableRowInput}>
                <Field name='externalWall1Zone2TempDiffBase1' component={textInput} addClass={{inputClass: classes.prjTableInputField}}/>
              </td>
              <td className={classes.tableRowInput}>
                <Field name='externalWall1Zone2TempDiffBase2' component={textInput} addClass={{inputClass: classes.prjTableInputField}}/>
              </td>
            </tr>

            <tr>
              <td className={classes.rightTitleStyle}>
                Heat loss coefficient [W/K]
              </td>
              <td colSpan='3' className={classes.tableRowInput}>
                <Field name='externalWall1Zone1HeatLossCoeff' component={textInput} addClass={{inputClass: classes.prjTableInputField}}/>
              </td>
              <td colSpan='3' className={classes.tableRowInput}>
                <Field name='externalWall1Zone2HeatLossCoeff' component={textInput} addClass={{inputClass: classes.prjTableInputField}}/>
              </td>
            </tr>

            <tr>
              <td rowSpan='5' className={classes.numberColumnStyle}>
                2
              </td>
              <td className={classes.rightTitleStyle}>
                Area [m2]
              </td>
              <td colSpan='3' className={classes.tableRowInput}>
                <Field name='externalWall2Zone1Area' component={textInput} addClass={{inputClass: classes.prjTableInputField}}/>
              </td>
              <td colSpan='3' className={classes.tableRowInput}>
                <Field name='externalWall2Zone2Area' component={textInput} addClass={{inputClass: classes.prjTableInputField}}/>
              </td>
            </tr>

            <tr>
              <td className={classes.rightTitleStyle}>
                U-Value [W/(m2K)]
              </td>
              <td colSpan='3' className={classes.tableRowInput}>
                <Field name='externalWall2Zone1uValue' component={textInput} addClass={{inputClass: classes.prjTableInputField}}/>
              </td>
              <td colSpan='3' className={classes.tableRowInput}>
                <Field name='externalWall2Zone2uValue' component={textInput} addClass={{inputClass: classes.prjTableInputField}}/>
              </td>
            </tr>

            <tr>
              <td className={classes.rightTitleStyle}>
                Outdoor Temperature [°C]
              </td>
              <td className={classes.tableRowInput}>
                <Field name='externalWall2Zone1OutTempBase' component={textInput} addClass={{inputClass: classes.prjTableInputField}}/>
              </td>
              <td className={classes.tableRowInput}>
                <Field name='externalWall2Zone1OutTempBase1' component={textInput} addClass={{inputClass: classes.prjTableInputField}}/>
              </td>
              <td className={classes.tableRowInput}>
                <Field name='externalWall2Zone1OutTempBase2' component={textInput} addClass={{inputClass: classes.prjTableInputField}}/>
              </td>
              <td className={classes.tableRowInput}>
                <Field name='externalWall2Zone2OutTempBase' component={textInput} addClass={{inputClass: classes.prjTableInputField}}/>
              </td>
              <td className={classes.tableRowInput}>
                <Field name='externalWall2Zone2OutTempBase1' component={textInput} addClass={{inputClass: classes.prjTableInputField}}/>
              </td>
              <td className={classes.tableRowInput}>
                <Field name='externalWall2Zone2OutTempBase2' component={textInput} addClass={{inputClass: classes.prjTableInputField}}/>
              </td>
            </tr>

            <tr>
              <td className={classes.rightTitleStyle}>
                Temperature difference [°C]
              </td>
              <td className={classes.tableRowInput}>
                <Field name='externalWall2Zone1TempDiffBase' component={textInput} addClass={{inputClass: classes.prjTableInputField}}/>
              </td>
              <td className={classes.tableRowInput}>
                <Field name='externalWall2Zone1TempDiffBase1' component={textInput} addClass={{inputClass: classes.prjTableInputField}}/>
              </td>
              <td className={classes.tableRowInput}>
                <Field name='externalWall2Zone1TempDiffBase2' component={textInput} addClass={{inputClass: classes.prjTableInputField}}/>
              </td>
              <td className={classes.tableRowInput}>
                <Field name='externalWall2Zone2TempDiffBase' component={textInput} addClass={{inputClass: classes.prjTableInputField}}/>
              </td>
              <td className={classes.tableRowInput}>
                <Field name='externalWall2Zone2TempDiffBase1' component={textInput} addClass={{inputClass: classes.prjTableInputField}}/>
              </td>
              <td className={classes.tableRowInput}>
                <Field name='externalWall2Zone2TempDiffBase2' component={textInput} addClass={{inputClass: classes.prjTableInputField}}/>
              </td>
            </tr>

            <tr>
              <td className={classes.rightTitleStyle}>
                Heat loss coefficient [W/K]
              </td>
              <td colSpan='3' className={classes.tableRowInput}>
                <Field name='externalWall2Zone1HeatLossCoeff' component={textInput} addClass={{inputClass: classes.prjTableInputField}}/>
              </td>
              <td colSpan='3' className={classes.tableRowInput}>
                <Field name='externalWall2Zone2HeatLossCoeff' component={textInput} addClass={{inputClass: classes.prjTableInputField}}/>
              </td>
            </tr>

            <tr>
              <td rowSpan='5' className={classes.numberColumnStyle}>
                3
              </td>
              <td className={classes.rightTitleStyle}>
                Area [m2]
              </td>
              <td colSpan='3' className={classes.tableRowInput}>
                <Field name='externalWall3Zone1Area' component={textInput} addClass={{inputClass: classes.prjTableInputField}}/>
              </td>
              <td colSpan='3' className={classes.tableRowInput}>
                <Field name='externalWall3Zone2Area' component={textInput} addClass={{inputClass: classes.prjTableInputField}}/>
              </td>
              </tr>

              <tr>
              <td className={classes.rightTitleStyle}>
                U-Value [W/(m2K)]
              </td>
              <td colSpan='3' className={classes.tableRowInput}>
                <Field name='externalWall3Zone1uValue' component={textInput} addClass={{inputClass: classes.prjTableInputField}}/>
              </td>
              <td colSpan='3' className={classes.tableRowInput}>
                <Field name='externalWall3Zone2uValue' component={textInput} addClass={{inputClass: classes.prjTableInputField}}/>
              </td>
            </tr>

            <tr>
              <td className={classes.rightTitleStyle}>
                Outdoor Temperature [°C]
              </td>
              <td className={classes.tableRowInput}>
                <Field name='externalWall3Zone1OutTempBase' component={textInput} addClass={{inputClass: classes.prjTableInputField}}/>
              </td>
              <td className={classes.tableRowInput}>
                <Field name='externalWall3Zone1OutTempBase1' component={textInput} addClass={{inputClass: classes.prjTableInputField}}/>
              </td>
              <td className={classes.tableRowInput}>
                <Field name='externalWall3Zone1OutTempBase2' component={textInput} addClass={{inputClass: classes.prjTableInputField}}/>
              </td>
              <td className={classes.tableRowInput}>
                <Field name='externalWall3Zone2OutTempBase' component={textInput} addClass={{inputClass: classes.prjTableInputField}}/>
              </td>
              <td className={classes.tableRowInput}>
                <Field name='externalWall3Zone2OutTempBase1' component={textInput} addClass={{inputClass: classes.prjTableInputField}}/>
              </td>
              <td className={classes.tableRowInput}>
                <Field name='externalWall3Zone2OutTempBase2' component={textInput} addClass={{inputClass: classes.prjTableInputField}}/>
              </td>
            </tr>

            <tr>
              <td className={classes.rightTitleStyle}>
                Temperature difference [°C]
              </td>
              <td className={classes.tableRowInput}>
                <Field name='externalWall3Zone1TempDiffBase' component={textInput} addClass={{inputClass: classes.prjTableInputField}}/>
              </td>
              <td className={classes.tableRowInput}>
                <Field name='externalWall3Zone1TempDiffBase1' component={textInput} addClass={{inputClass: classes.prjTableInputField}}/>
              </td>
              <td className={classes.tableRowInput}>
                <Field name='externalWall3Zone1TempDiffBase2' component={textInput} addClass={{inputClass: classes.prjTableInputField}}/>
              </td>
              <td className={classes.tableRowInput}>
                <Field name='externalWall3Zone2TempDiffBase' component={textInput} addClass={{inputClass: classes.prjTableInputField}}/>
              </td>
              <td className={classes.tableRowInput}>
                <Field name='externalWall3Zone2TempDiffBase1' component={textInput} addClass={{inputClass: classes.prjTableInputField}}/>
              </td>
              <td className={classes.tableRowInput}>
                <Field name='externalWall3Zone2TempDiffBase2' component={textInput} addClass={{inputClass: classes.prjTableInputField}}/>
              </td>
            </tr>

            <tr>
              <td className={classes.rightTitleStyle}>
                Heat loss coefficient [W/K]
              </td>
              <td colSpan='3' className={classes.tableRowInput}>
                <Field name='externalWall3Zone1HeatLossCoeff' component={textInput} addClass={{inputClass: classes.prjTableInputField}}/>
              </td>
              <td colSpan='3' className={classes.tableRowInput}>
                <Field name='externalWall3Zone2HeatLossCoeff' component={textInput} addClass={{inputClass: classes.prjTableInputField}}/>
              </td>
            </tr>

            <tr>
              <td rowSpan='5' className={classes.numberColumnStyle}>
                4
              </td>
              <td className={classes.rightTitleStyle}>
                Area [m2]
              </td>
              <td colSpan='3' className={classes.tableRowInput}>
                <Field name='externalWall4Zone1Area' component={textInput} addClass={{inputClass: classes.prjTableInputField}}/>
              </td>
              <td colSpan='3' className={classes.tableRowInput}>
                <Field name='externalWall4Zone2Area' component={textInput} addClass={{inputClass: classes.prjTableInputField}}/>
              </td>
              </tr>

              <tr>
              <td className={classes.rightTitleStyle}>
                U-Value [W/(m2K)]
              </td>
              <td colSpan='3' className={classes.tableRowInput}>
                <Field name='externalWall4Zone1uValue' component={textInput} addClass={{inputClass: classes.prjTableInputField}}/>
              </td>
              <td colSpan='3' className={classes.tableRowInput}>
                <Field name='externalWall4Zone2uValue' component={textInput} addClass={{inputClass: classes.prjTableInputField}}/>
              </td>
            </tr>

            <tr>
              <td className={classes.rightTitleStyle}>
                Outdoor Temperature [°C]
              </td>
              <td className={classes.tableRowInput}>
                <Field name='externalWall4Zone1OutTempBase' component={textInput} addClass={{inputClass: classes.prjTableInputField}}/>
              </td>
              <td className={classes.tableRowInput}>
                <Field name='externalWall4Zone1OutTempBase1' component={textInput} addClass={{inputClass: classes.prjTableInputField}}/>
              </td>
              <td className={classes.tableRowInput}>
                <Field name='externalWall4Zone1OutTempBase2' component={textInput} addClass={{inputClass: classes.prjTableInputField}}/>
              </td>
              <td className={classes.tableRowInput}>
                <Field name='externalWall4Zone2OutTempBase' component={textInput} addClass={{inputClass: classes.prjTableInputField}}/>
              </td>
              <td className={classes.tableRowInput}>
                <Field name='externalWall4Zone2OutTempBase1' component={textInput} addClass={{inputClass: classes.prjTableInputField}}/>
              </td>
              <td className={classes.tableRowInput}>
                <Field name='externalWall4Zone2OutTempBase2' component={textInput} addClass={{inputClass: classes.prjTableInputField}}/>
              </td>
            </tr>

            <tr>
              <td className={classes.rightTitleStyle}>
                Temperature difference [°C]
              </td>
              <td className={classes.tableRowInput}>
                <Field name='externalWall4Zone1TempDiffBase' component={textInput} addClass={{inputClass: classes.prjTableInputField}}/>
              </td>
              <td className={classes.tableRowInput}>
                <Field name='externalWall4Zone1TempDiffBase1' component={textInput} addClass={{inputClass: classes.prjTableInputField}}/>
              </td>
              <td className={classes.tableRowInput}>
                <Field name='externalWall4Zone1TempDiffBase2' component={textInput} addClass={{inputClass: classes.prjTableInputField}}/>
              </td>
              <td className={classes.tableRowInput}>
                <Field name='externalWall4Zone2TempDiffBase' component={textInput} addClass={{inputClass: classes.prjTableInputField}}/>
              </td>
              <td className={classes.tableRowInput}>
                <Field name='externalWall4Zone2TempDiffBase1' component={textInput} addClass={{inputClass: classes.prjTableInputField}}/>
              </td>
              <td className={classes.tableRowInput}>
                <Field name='externalWall4Zone2TempDiffBase2' component={textInput} addClass={{inputClass: classes.prjTableInputField}}/>
              </td>
            </tr>

            <tr>
              <td className={classes.rightTitleStyle}>
                Heat loss coefficient [W/K]
              </td>
              <td colSpan='3' className={classes.tableRowInput}>
                <Field name='externalWall4Zone1HeatLossCoeff' component={textInput} addClass={{inputClass: classes.prjTableInputField}}/>
              </td>
              <td colSpan='3' className={classes.tableRowInput}>
                <Field name='externalWall4Zone2HeatLossCoeff' component={textInput} addClass={{inputClass: classes.prjTableInputField}}/>
              </td>
            </tr>



            {/* WIndow part */}
            <tr>
              <td rowSpan='10' className={classes.leftTitleStyle}>
                Window
              </td>
              <td rowSpan='5' className={classes.numberColumnStyle}>
                1
              </td>
              <td className={classes.rightTitleStyle}>
                Area [m2]
              </td>
              <td colSpan='3' className={classes.tableRowInput}>
                <Field name='window1Zone1Area' component={textInput} addClass={{inputClass: classes.prjTableInputField}}/>
              </td>
              <td colSpan='3' className={classes.tableRowInput}>
                <Field name='window1Zone2Area' component={textInput} addClass={{inputClass: classes.prjTableInputField}}/>
              </td>
            </tr>

            <tr>
              <td className={classes.rightTitleStyle}>
                U-Value [W/(m2K)]
              </td>
              <td colSpan='3' className={classes.tableRowInput}>
                <Field name='window1Zone1uValue' component={textInput} addClass={{inputClass: classes.prjTableInputField}}/>
              </td>
              <td colSpan='3' className={classes.tableRowInput}>
                <Field name='window1Zone2uValue' component={textInput} addClass={{inputClass: classes.prjTableInputField}}/>
              </td>
            </tr>

            <tr>
              <td className={classes.rightTitleStyle}>
                Outdoor Temperature [°C]
              </td>
              <td className={classes.tableRowInput}>
                <Field name='window1Zone1OutTempBase' component={textInput} addClass={{inputClass: classes.prjTableInputField}}/>
              </td>
              <td className={classes.tableRowInput}>
                <Field name='window1Zone1OutTempBase1' component={textInput} addClass={{inputClass: classes.prjTableInputField}}/>
              </td>
              <td className={classes.tableRowInput}>
                <Field name='window1Zone1OutTempBase2' component={textInput} addClass={{inputClass: classes.prjTableInputField}}/>
              </td>
              <td className={classes.tableRowInput}>
                <Field name='window1Zone2OutTempBase' component={textInput} addClass={{inputClass: classes.prjTableInputField}}/>
              </td>
              <td className={classes.tableRowInput}>
                <Field name='window1Zone2OutTempBase1' component={textInput} addClass={{inputClass: classes.prjTableInputField}}/>
              </td>
              <td className={classes.tableRowInput}>
                <Field name='window1Zone2OutTempBase2' component={textInput} addClass={{inputClass: classes.prjTableInputField}}/>
              </td>
            </tr>

            <tr>
              <td className={classes.rightTitleStyle}>
                Temperature difference [°C]
              </td>
              <td className={classes.tableRowInput}>
                <Field name='window1Zone1TempDiffBase' component={textInput} addClass={{inputClass: classes.prjTableInputField}}/>
              </td>
              <td className={classes.tableRowInput}>
                <Field name='window1Zone1TempDiffBase1' component={textInput} addClass={{inputClass: classes.prjTableInputField}}/>
              </td>
              <td className={classes.tableRowInput}>
                <Field name='window1Zone1TempDiffBase2' component={textInput} addClass={{inputClass: classes.prjTableInputField}}/>
              </td>
              <td className={classes.tableRowInput}>
                <Field name='window1Zone2TempDiffBase' component={textInput} addClass={{inputClass: classes.prjTableInputField}}/>
              </td>
              <td className={classes.tableRowInput}>
                <Field name='window1Zone2TempDiffBase1' component={textInput} addClass={{inputClass: classes.prjTableInputField}}/>
              </td>
              <td className={classes.tableRowInput}>
                <Field name='window1Zone2TempDiffBase2' component={textInput} addClass={{inputClass: classes.prjTableInputField}}/>
              </td>
            </tr>

            <tr>
              <td className={classes.rightTitleStyle}>
                Heat loss coefficient [W/K]
              </td>
              <td colSpan='3' className={classes.tableRowInput}>
                <Field name='window1Zone1HeatLossCoeff' component={textInput} addClass={{inputClass: classes.prjTableInputField}}/>
              </td>
              <td colSpan='3' className={classes.tableRowInput}>
                <Field name='window1Zone2HeatLossCoeff' component={textInput} addClass={{inputClass: classes.prjTableInputField}}/>
              </td>
            </tr>

            <tr>
              <td rowSpan='5' className={classes.numberColumnStyle}>
                2
              </td>
              <td className={classes.rightTitleStyle}>
                Area [m2]
              </td>
              <td colSpan='3' className={classes.tableRowInput}>
                <Field name='window2Zone1Area' component={textInput} addClass={{inputClass: classes.prjTableInputField}}/>
              </td>
              <td colSpan='3' className={classes.tableRowInput}>
                <Field name='window2Zone2Area' component={textInput} addClass={{inputClass: classes.prjTableInputField}}/>
              </td>
            </tr>

            <tr>
              <td className={classes.rightTitleStyle}>
                U-Value [W/(m2K)]
              </td>
              <td colSpan='3' className={classes.tableRowInput}>
                <Field name='window2Zone1uValue' component={textInput} addClass={{inputClass: classes.prjTableInputField}}/>
              </td>
              <td colSpan='3' className={classes.tableRowInput}>
                <Field name='window2Zone2uValue' component={textInput} addClass={{inputClass: classes.prjTableInputField}}/>
              </td>
            </tr>

            <tr>
              <td className={classes.rightTitleStyle}>
                Outdoor Temperature [°C]
              </td>
              <td className={classes.tableRowInput}>
                <Field name='window2Zone1OutTempBase' component={textInput} addClass={{inputClass: classes.prjTableInputField}}/>
              </td>
              <td className={classes.tableRowInput}>
                <Field name='window2Zone1OutTempBase1' component={textInput} addClass={{inputClass: classes.prjTableInputField}}/>
              </td>
              <td className={classes.tableRowInput}>
                <Field name='window2Zone1OutTempBase2' component={textInput} addClass={{inputClass: classes.prjTableInputField}}/>
              </td>
              <td className={classes.tableRowInput}>
                <Field name='window2Zone2OutTempBase' component={textInput} addClass={{inputClass: classes.prjTableInputField}}/>
              </td>
              <td className={classes.tableRowInput}>
                <Field name='window2Zone2OutTempBase1' component={textInput} addClass={{inputClass: classes.prjTableInputField}}/>
              </td>
              <td className={classes.tableRowInput}>
                <Field name='window2Zone2OutTempBase2' component={textInput} addClass={{inputClass: classes.prjTableInputField}}/>
              </td>
            </tr>

            <tr>
              <td className={classes.rightTitleStyle}>
                Temperature difference [°C]
              </td>
              <td className={classes.tableRowInput}>
                <Field name='window2Zone1TempDiffBase' component={textInput} addClass={{inputClass: classes.prjTableInputField}}/>
              </td>
              <td className={classes.tableRowInput}>
                <Field name='window2Zone1TempDiffBase1' component={textInput} addClass={{inputClass: classes.prjTableInputField}}/>
              </td>
              <td className={classes.tableRowInput}>
                <Field name='window2Zone1TempDiffBase2' component={textInput} addClass={{inputClass: classes.prjTableInputField}}/>
              </td>
              <td className={classes.tableRowInput}>
                <Field name='window2Zone2TempDiffBase' component={textInput} addClass={{inputClass: classes.prjTableInputField}}/>
              </td>
              <td className={classes.tableRowInput}>
                <Field name='window2Zone2TempDiffBase1' component={textInput} addClass={{inputClass: classes.prjTableInputField}}/>
              </td>
              <td className={classes.tableRowInput}>
                <Field name='window2Zone2TempDiffBase2' component={textInput} addClass={{inputClass: classes.prjTableInputField}}/>
              </td>
            </tr>

            <tr>
              <td className={classes.rightTitleStyle}>
                Heat loss coefficient [W/K]
              </td>
              <td colSpan='3' className={classes.tableRowInput}>
                <Field name='window2Zone1HeatLossCoeff' component={textInput} addClass={{inputClass: classes.prjTableInputField}}/>
              </td>
              <td colSpan='3' className={classes.tableRowInput}>
                <Field name='window2Zone2HeatLossCoeff' component={textInput} addClass={{inputClass: classes.prjTableInputField}}/>
              </td>
            </tr>

            </tbody>

            {/* Footer of the table with Calculated Totals  */}
            <tfoot>
              <tr className={classes.footerStyle}>
                <td colSpan='3' className={classes.footerTextStyle}>
                  Total HT [W/K]
                </td>
                <td colSpan='3' className={classes.footerTextStyle}>
                  {initVal.totalHtZone1}
                </td>
                <td colSpan='3' className={classes.footerTextStyle}>
                  {initVal.totalHtZone2}
                </td>
              </tr>
            </tfoot>
          </table>
          <Button
            type='submit'
            className={classes.saveButton}
            fullWidth={false}
          >
            Save
          </Button>
        </div>
    )
  }
}

export default withStyles(styles)(BuildingEnvelope);
