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

class BasementPipesTable extends Component {
  render() {
    const { initVal, classes } = this.props;

    return(
      <div className={classes.container}>
        <Typography
          className={classes.titleStyle}
        >
          Basement Pipes
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
                <Field className={classes.selectStyle} name="basementPipesQuiality" component="select">
                  <option value="1">Good insolation</option>
                  <option value="2">Poor insulation</option>
                  <option value="3">No insulation</option>
                </Field>
              </td>
              <td className={classes.tableRowInput}>
                <Field name='basementPipesInstalledlength' component={textInput} addClass={{inputClass: classes.prjTableInputField}}/>
              </td>
              <td className={classes.tableRowInput}>
                <Field name='basementPipesDiameter' component={textInput} addClass={{inputClass: classes.prjTableInputField}}/>
              </td>
              <td className={classes.heatLossStyle}>
                {initVal.basementPipesHeatLossUnit.toFixed(3)}
              </td>
              <td className={classes.heatLossStyle}>
                {initVal.basementPipesHeatLossYear.toFixed(3)}
              </td>
            </TableRow>

            <TableRow selected={false}>
              <td className={classes.tableRowInput}>
                <Field className={classes.selectStyle} name="basementPipesQuiality1" component="select">
                  <option value="1">Good insolation</option>
                  <option value="2">Poor insulation</option>
                  <option value="3">No insulation</option>
                </Field>
              </td>
              <td className={classes.tableRowInput}>
                <Field name='basementPipesInstalledlength1' component={textInput} addClass={{inputClass: classes.prjTableInputField}}/>
              </td>
              <td className={classes.tableRowInput}>
                <Field name='basementPipesDiameter1' component={textInput} addClass={{inputClass: classes.prjTableInputField}}/>
              </td>
              <td className={classes.heatLossStyle}>
                {initVal.basementPipesHeatLossUnit1.toFixed(3)}
              </td>
              <td className={classes.heatLossStyle}>
                {initVal.basementPipesHeatLossYear1.toFixed(3)}
              </td>
            </TableRow>

            <TableRow selected={false}>
              <td className={classes.tableRowInput}>
                <Field className={classes.selectStyle} name="basementPipesQuiality2" component="select">
                  <option value="1">Good insolation</option>
                  <option value="2">Poor insulation</option>
                  <option value="3">No insulation</option>
                </Field>
              </td>
              <td className={classes.tableRowInput}>
                <Field name='basementPipesInstalledlength2' component={textInput} addClass={{inputClass: classes.prjTableInputField}}/>
              </td>
              <td className={classes.tableRowInput}>
                <Field name='basementPipesDiameter2' component={textInput} addClass={{inputClass: classes.prjTableInputField}}/>
              </td>
              <td className={classes.heatLossStyle}>
                {initVal.basementPipesHeatLossUnit2.toFixed(3)}
              </td>
              <td className={classes.heatLossStyle}>
                {initVal.basementPipesHeatLossYear2.toFixed(3)}
              </td>
            </TableRow>

            <TableRow selected={false}>
              <td className={classes.tableRowInput}>
                <Field className={classes.selectStyle} name="basementPipesQuiality3" component="select">
                  <option value="1">Good insolation</option>
                  <option value="2">Poor insulation</option>
                  <option value="3">No insulation</option>
                </Field>
              </td>
              <td className={classes.tableRowInput}>
                <Field name='basementPipesInstalledlength3' component={textInput} addClass={{inputClass: classes.prjTableInputField}}/>
              </td>
              <td className={classes.tableRowInput}>
                <Field name='basementPipesDiameter3' component={textInput} addClass={{inputClass: classes.prjTableInputField}}/>
              </td>
              <td className={classes.heatLossStyle}>
                {initVal.basementPipesHeatLossUnit3.toFixed(3)}
              </td>
              <td className={classes.heatLossStyle}>
                {initVal.basementPipesHeatLossYear3.toFixed(3)}
              </td>
            </TableRow>

            <TableRow selected={false}>
              <td className={classes.tableRowInput}>
                <Field className={classes.selectStyle} name="basementPipesQuiality4" component="select">
                  <option value="1">Good insolation</option>
                  <option value="2">Poor insulation</option>
                  <option value="3">No insulation</option>
                </Field>
              </td>
              <td className={classes.tableRowInput}>
                <Field name='basementPipesInstalledlength4' component={textInput} addClass={{inputClass: classes.prjTableInputField}}/>
              </td>
              <td className={classes.tableRowInput}>
                <Field name='basementPipesDiameter4' component={textInput} addClass={{inputClass: classes.prjTableInputField}}/>
              </td>
              <td className={classes.heatLossStyle}>
                {initVal.basementPipesHeatLossUnit4.toFixed(3)}
              </td>
              <td className={classes.heatLossStyle}>
                {initVal.basementPipesHeatLossYear4.toFixed(3)}
              </td>
            </TableRow>

            <TableRow selected={false}>
              <td className={classes.tableRowInput}>
                <Field className={classes.selectStyle} name="basementPipesQuiality5" component="select">
                  <option value="1">Good insolation</option>
                  <option value="2">Poor insulation</option>
                  <option value="3">No insulation</option>
                </Field>
              </td>
              <td className={classes.tableRowInput}>
                <Field name='basementPipesInstalledlength5' component={textInput} addClass={{inputClass: classes.prjTableInputField}}/>
              </td>
              <td className={classes.tableRowInput}>
                <Field name='basementPipesDiameter5' component={textInput} addClass={{inputClass: classes.prjTableInputField}}/>
              </td>
              <td className={classes.heatLossStyle}>
                {initVal.basementPipesHeatLossUnit5.toFixed(3)}
              </td>
              <td className={classes.heatLossStyle}>
                {initVal.basementPipesHeatLossYear5.toFixed(3)}
              </td>
            </TableRow>

            <TableRow selected={false}>
              <td className={classes.tableRowInput}>
                <Field className={classes.selectStyle} name="basementPipesQuiality6" component="select">
                  <option value="1">Good insolation</option>
                  <option value="2">Poor insulation</option>
                  <option value="3">No insulation</option>
                </Field>
              </td>
              <td className={classes.tableRowInput}>
                <Field name='basementPipesInstalledlength6' component={textInput} addClass={{inputClass: classes.prjTableInputField}}/>
              </td>
              <td className={classes.tableRowInput}>
                <Field name='basementPipesDiameter6' component={textInput} addClass={{inputClass: classes.prjTableInputField}}/>
              </td>
              <td className={classes.heatLossStyle}>
                {initVal.basementPipesHeatLossUnit6.toFixed(3)}
              </td>
              <td className={classes.heatLossStyle}>
                {initVal.basementPipesHeatLossYear6.toFixed(3)}
              </td>
            </TableRow>

            <TableRow selected={false}>
              <td className={classes.tableRowInput}>
                <Field className={classes.selectStyle} name="basementPipesQuiality7" component="select">
                  <option value="1">Good insolation</option>
                  <option value="2">Poor insulation</option>
                  <option value="3">No insulation</option>
                </Field>
              </td>
              <td className={classes.tableRowInput}>
                <Field name='basementPipesInstalledlength7' component={textInput} addClass={{inputClass: classes.prjTableInputField}}/>
              </td>
              <td className={classes.tableRowInput}>
                <Field name='basementPipesDiameter7' component={textInput} addClass={{inputClass: classes.prjTableInputField}}/>
              </td>
              <td className={classes.heatLossStyle}>
                {initVal.basementPipesHeatLossUnit7.toFixed(3)}
              </td>
              <td className={classes.heatLossStyle}>
                {initVal.basementPipesHeatLossYear7.toFixed(3)}
              </td>
            </TableRow>

            <TableRow selected={false}>
              <td className={classes.tableRowInput}>
                <Field className={classes.selectStyle} name="basementPipesQuiality8" component="select">
                  <option value="1">Good insolation</option>
                  <option value="2">Poor insulation</option>
                  <option value="3">No insulation</option>
                </Field>
              </td>
              <td className={classes.tableRowInput}>
                <Field name='basementPipesInstalledlength8' component={textInput} addClass={{inputClass: classes.prjTableInputField}}/>
              </td>
              <td className={classes.tableRowInput}>
                <Field name='basementPipesDiameter8' component={textInput} addClass={{inputClass: classes.prjTableInputField}}/>
              </td>
              <td className={classes.heatLossStyle}>
                {initVal.basementPipesHeatLossUnit8.toFixed(3)}
              </td>
              <td className={classes.heatLossStyle}>
                {initVal.basementPipesHeatLossYear8.toFixed(3)}
              </td>
            </TableRow>

            <TableRow selected={false}>
              <td className={classes.tableRowInput}>
                <Field className={classes.selectStyle} name="basementPipesQuiality9" component="select">
                  <option value="1">Good insolation</option>
                  <option value="2">Poor insulation</option>
                  <option value="3">No insulation</option>
                </Field>
              </td>
              <td className={classes.tableRowInput}>
                <Field name='basementPipesInstalledlength9' component={textInput} addClass={{inputClass: classes.prjTableInputField}}/>
              </td>
              <td className={classes.tableRowInput}>
                <Field name='basementPipesDiameter9' component={textInput} addClass={{inputClass: classes.prjTableInputField}}/>
              </td>
              <td className={classes.heatLossStyle}>
                {initVal.basementPipesHeatLossUnit9.toFixed(3)}
              </td>
              <td className={classes.heatLossStyle}>
                {initVal.basementPipesHeatLossYear9.toFixed(3)}
              </td>
            </TableRow>
          </TableBody>
        </Table>
        <div className={classes.footerStyle}>
          <Typography className={classes.totalTypography} >
            Total
          </Typography>
          <Typography className={classes.valueTypography}>
            {parseFloat(initVal.distributionLossesBasement).toFixed(2)}
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

export default withStyles(styles)(BasementPipesTable)
