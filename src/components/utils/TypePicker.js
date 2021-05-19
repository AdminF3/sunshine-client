import React from 'react';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  typePicker: {
  	border: '1px solid #BBBDBF',
  	borderRadius: '40px',
  	padding: '5px 15px 5px 15px',
  	margin: '10px',
  	display: 'inline-flex',
  	color: '#354052',
  	fontSize: '14px',
  	fontWeight: '600',
  	cursor: 'pointer',
  	justifyContent: 'center',
  	verticalAlign: 'middle',
  	alignItems: 'center',
  },
  typePickerSelected: {
  	backgroundColor: '#FEEA3B !important',
  },
})

// import './TypePicker.css';

/**
 * Select one from multiple instances of this component
 *
 * @param  {string} value         Text
 * @param  {bool}   selected      is this element selected?
 * @param  {func}   onClick       function to be executed on Click event
 * @param  {comp}   leftIcon      icon will appear when element is selected
 * @param  {JSS}    style         JSS of the root element
 * @param  {string} initialClass  css class for the text holder element
 * @param  {string} selectedClass css class for the text holder element when selected is true
 *
 * @return {React.Component}
 */

export default withStyles(styles)(({ value, selected, onClick, leftIcon, style, initialClass, selectedClass, classes }) => (
  <div  onClick={ onClick } style={ style } >
    <div className={`${initialClass || classes.typePicker} ${selected ? (selectedClass ? selectedClass : classes.typePickerSelected) : null}`}>
      { selected ? [leftIcon, value] : value }
    </div>
  </div>
))
