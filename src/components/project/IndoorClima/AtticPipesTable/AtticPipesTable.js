import React, { Component } from 'react'

import { Field } from 'redux-form'
import { withStyles } from '@material-ui/core/styles';
import { textInput } from './../../../../components/utils/redux-form-wrappers/redux-form-wrappers';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import styles from './styles';

class AtticPipesTable extends Component {
  render(){
    const { initVal, classes } = this.props;
    
    return(
      <div className={classes.container}>
        <Typography
          className={classes.titleStyle}
        >
          Attic Pipes
        </Typography>
        <Table>
          <TableBody>
            <TableRow selected={false}>
              <td className={classes.leftHeaderStyle}>
                Quality
              </td>
              <td className={classes.headersStyle}>
                Installed lenght [m]
              </td>
              <td className={classes.headersStyle}>
                Diameter [cm]
              </td>
              <td className={classes.headersStyle}>
                Heat loss unit [MWh/m]
              </td>
              <td className={classes.headersStyle}>
                Heat loss year [MWh/year]
              </td>
            </TableRow>

            <TableRow selected={false}>
              <td className={classes.tableRowInput}>
                <Field className={classes.selectStyle} name="atticPipesQuiality" component="select">
                  <option value="1">Good insolation</option>
                  <option value="2">Poor insulation</option>
                  <option value="3">No insulation</option>
                </Field>
              </td>
              <td className={classes.tableRowInput}>
                <Field name='atticPipesInstalledlength' component={textInput} addClass={{inputClass: classes.prjTableInputField}}/>
              </td>
              <td className={classes.tableRowInput}>
                <Field name='atticPipesDiameter' component={textInput} addClass={{inputClass: classes.prjTableInputField}}/>
              </td>
              <td className={classes.heatLossStyle}>
                {initVal.atticPipesHeatLossUnit.toFixed(3)}
              </td>
              <td classes={{ root: classes.tableCellRoot}} className={classes.heatLossStyle}>
                {initVal.atticPipesHeatLossYear.toFixed(3)}
              </td>
            </TableRow>

            <TableRow selected={false}>
              <td className={classes.tableRowInput}>
                <Field className={classes.selectStyle} name="atticPipesQuiality1" component="select">
                  <option value="1">Good insolation</option>
                  <option value="2">Poor insulation</option>
                  <option value="3">No insulation</option>
                </Field>
              </td>
              <td className={classes.tableRowInput}>
                <Field name='atticPipesInstalledlength1' component={textInput} addClass={{inputClass: classes.prjTableInputField}}/>
              </td>
              <td className={classes.tableRowInput}>
                <Field name='atticPipesDiameter1' component={textInput} addClass={{inputClass: classes.prjTableInputField}}/>
              </td>
              <td className={classes.heatLossStyle}>
                {initVal.atticPipesHeatLossUnit1.toFixed(3)}
              </td>
              <td classes={{ root: classes.tableCellRoot}} className={classes.heatLossStyle}>
                {initVal.atticPipesHeatLossYear1.toFixed(3)}
              </td>
            </TableRow>

            <TableRow selected={false}>
              <td className={classes.tableRowInput}>
                <Field className={classes.selectStyle} name="atticPipesQuiality2" component="select">
                  <option value="1">Good insolation</option>
                  <option value="2">Poor insulation</option>
                  <option value="3">No insulation</option>
                </Field>
              </td>
              <td className={classes.tableRowInput}>
                <Field name='atticPipesInstalledlength2' component={textInput} addClass={{inputClass: classes.prjTableInputField}}/>
              </td>
              <td className={classes.tableRowInput}>
                <Field name='atticPipesDiameter2' component={textInput} addClass={{inputClass: classes.prjTableInputField}}/>
              </td>
              <td className={classes.heatLossStyle}>
                {initVal.atticPipesHeatLossUnit2.toFixed(3)}
              </td>
              <td classes={{ root: classes.tableCellRoot}} className={classes.heatLossStyle}>
                {initVal.atticPipesHeatLossYear2.toFixed(3)}
              </td>
            </TableRow>

            <TableRow selected={false}>
              <td className={classes.tableRowInput}>
                <Field className={classes.selectStyle} name="atticPipesQuiality3" component="select">
                  <option value="1">Good insolation</option>
                  <option value="2">Poor insulation</option>
                  <option value="3">No insulation</option>
                </Field>
              </td>
              <td className={classes.tableRowInput}>
                <Field name='atticPipesInstalledlength3' component={textInput} addClass={{inputClass: classes.prjTableInputField}}/>
              </td>
              <td className={classes.tableRowInput}>
                <Field name='atticPipesDiameter3' component={textInput} addClass={{inputClass: classes.prjTableInputField}}/>
              </td>
              <td className={classes.heatLossStyle}>
                {initVal.atticPipesHeatLossUnit3.toFixed(3)}
              </td>
              <td classes={{ root: classes.tableCellRoot}} className={classes.heatLossStyle}>
                {initVal.atticPipesHeatLossYear3.toFixed(3)}
              </td>
            </TableRow>

            <TableRow selected={false}>
              <td className={classes.tableRowInput}>
                <Field className={classes.selectStyle} name="atticPipesQuiality4" component="select">
                  <option value="1">Good insolation</option>
                  <option value="2">Poor insulation</option>
                  <option value="3">No insulation</option>
                </Field>
              </td>
              <td className={classes.tableRowInput}>
                <Field name='atticPipesInstalledlength4' component={textInput} addClass={{inputClass: classes.prjTableInputField}}/>
              </td>
              <td className={classes.tableRowInput}>
                <Field name='atticPipesDiameter4' component={textInput} addClass={{inputClass: classes.prjTableInputField}}/>
              </td>
              <td className={classes.heatLossStyle}>
                {initVal.atticPipesHeatLossUnit4.toFixed(3)}
              </td>
              <td classes={{ root: classes.tableCellRoot}} className={classes.heatLossStyle}>
                {initVal.atticPipesHeatLossYear4.toFixed(3)}
              </td>
            </TableRow>

            <TableRow selected={false}>
              <td className={classes.tableRowInput}>
                <Field className={classes.selectStyle} name="atticPipesQuiality5" component="select">
                  <option value="1">Good insolation</option>
                  <option value="2">Poor insulation</option>
                  <option value="3">No insulation</option>
                </Field>
              </td>
              <td className={classes.tableRowInput}>
                <Field name='atticPipesInstalledlength5' component={textInput} addClass={{inputClass: classes.prjTableInputField}}/>
              </td>
              <td className={classes.tableRowInput}>
                <Field name='atticPipesDiameter5' component={textInput} addClass={{inputClass: classes.prjTableInputField}}/>
              </td>
              <td className={classes.heatLossStyle}>
                {initVal.atticPipesHeatLossUnit5.toFixed(3)}
              </td>
              <td classes={{ root: classes.tableCellRoot}} className={classes.heatLossStyle}>
                {initVal.atticPipesHeatLossYear5.toFixed(3)}
              </td>
            </TableRow>

            <TableRow selected={false}>
              <td className={classes.tableRowInput}>
                <Field className={classes.selectStyle} name="atticPipesQuiality6" component="select">
                  <option value="1">Good insolation</option>
                  <option value="2">Poor insulation</option>
                  <option value="3">No insulation</option>
                </Field>
              </td>
              <td className={classes.tableRowInput}>
                <Field name='atticPipesInstalledlength6' component={textInput} addClass={{inputClass: classes.prjTableInputField}}/>
              </td>
              <td className={classes.tableRowInput}>
                <Field name='atticPipesDiameter6' component={textInput} addClass={{inputClass: classes.prjTableInputField}}/>
              </td>
              <td className={classes.heatLossStyle}>
                {initVal.atticPipesHeatLossUnit6.toFixed(3)}
              </td>
              <td classes={{ root: classes.tableCellRoot}} className={classes.heatLossStyle}>
                {initVal.atticPipesHeatLossYear6.toFixed(3)}
              </td>
            </TableRow>

            <TableRow selected={false}>
              <td className={classes.tableRowInput}>
                <Field className={classes.selectStyle} name="atticPipesQuiality7" component="select">
                  <option value="1">Good insolation</option>
                  <option value="2">Poor insulation</option>
                  <option value="3">No insulation</option>
                </Field>
              </td>
              <td className={classes.tableRowInput}>
                <Field name='atticPipesInstalledlength7' component={textInput} addClass={{inputClass: classes.prjTableInputField}}/>
              </td>
              <td className={classes.tableRowInput}>
                <Field name='atticPipesDiameter7' component={textInput} addClass={{inputClass: classes.prjTableInputField}}/>
              </td>
              <td className={classes.heatLossStyle}>
                {initVal.atticPipesHeatLossUnit7.toFixed(3)}
              </td>
              <td classes={{ root: classes.tableCellRoot}} className={classes.heatLossStyle}>
                {initVal.atticPipesHeatLossYear7.toFixed(3)}
              </td>
            </TableRow>

            <TableRow selected={false}>
              <td className={classes.tableRowInput}>
                <Field className={classes.selectStyle} name="atticPipesQuiality8" component="select">
                  <option value="1">Good insolation</option>
                  <option value="2">Poor insulation</option>
                  <option value="3">No insulation</option>
                </Field>
              </td>
              <td className={classes.tableRowInput}>
                <Field name='atticPipesInstalledlength8' component={textInput} addClass={{inputClass: classes.prjTableInputField}}/>
              </td>
              <td className={classes.tableRowInput}>
                <Field name='atticPipesDiameter8' component={textInput} addClass={{inputClass: classes.prjTableInputField}}/>
              </td>
              <td className={classes.heatLossStyle}>
                {initVal.atticPipesHeatLossUnit8.toFixed(3)}
              </td>
              <td classes={{ root: classes.tableCellRoot}} className={classes.heatLossStyle}>
                {initVal.atticPipesHeatLossYear8.toFixed(3)}
              </td>
            </TableRow>

            <TableRow selected={false}>
              <td className={classes.tableRowInput}>
                <Field className={classes.selectStyle} name="atticPipesQuiality9" component="select">
                  <option value="1">Good insolation</option>
                  <option value="2">Poor insulation</option>
                  <option value="3">No insulation</option>
                </Field>
              </td>
              <td className={classes.tableRowInput}>
                <Field name='atticPipesInstalledlength9' component={textInput} addClass={{inputClass: classes.prjTableInputField}}/>
              </td>
              <td className={classes.tableRowInput}>
                <Field name='atticPipesDiameter9' component={textInput} addClass={{inputClass: classes.prjTableInputField}}/>
              </td>
              <td className={classes.heatLossStyle}>
                {initVal.atticPipesHeatLossUnit9.toFixed(3)}
              </td>
              <td classes={{ root: classes.tableCellRoot}} className={classes.heatLossStyle}>
                {initVal.atticPipesHeatLossYear9.toFixed(3)}
              </td>
            </TableRow>
          </TableBody>
        </Table>
        <div className={classes.footerStyle}>
          <Typography className={classes.totalTypography}>
            Total
          </Typography>
          <Typography className={classes.valueTypography}>
            {parseFloat(initVal.distributionLossesAttic).toFixed(2)}
          </Typography>
        </div>
        <Button
          variant='contained'
          className={classes.saveButton}
          type='submit'
          label='Save'
          fullWidth={false}
        >
          Save
        </Button>
      </div>
    )
  }
}

export default withStyles(styles)(AtticPipesTable);
