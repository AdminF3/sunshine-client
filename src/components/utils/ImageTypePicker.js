import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';

/**
 * Select one from multiple instances of this component
 *
 * @param  {func}   onClick         Function to be executed on Click event
 * @param  {JSS}    rootStyle       JSS style of the root element
 * @param  {CSS}    rootClass       CSS class of the root element
 * @param  {string} imgSrc          Src of the image to be displayed
 * @param  {JSS}    imgStyle        JSS style of the image element
 * @param  {string} text            Text to be included with the image
 * @param  {bool}   selected        Is the image selected
 * @param  {JSS}    selectedStyle   JSS style of the root element when selected
 * @param  {comp}   icon            Icon is visible when selected (not required)
 * @param  {JSS}    iconButtonStyle JSS of the Floating Action Button Wrapper of the icon
 * @param  {JSS}    iconStyle       JSS of the Icon element
 *
 * @return {React.Component}        // depents on material-ui, flexbox-grid.css
 */

const styles = theme => ({
  imageTypePicker: {
    '&:hover': {
      boxShadow: '0px 3px 21px 0px rgba(0, 0, 0, 0.4) !important',
    },
  },
});

export default withStyles(styles)(({ onClick, rootStyle, rootClass, imgSrc, imgStyle, text, selected, selectedStyle, icon, iconButtonStyle, iconStyle, classes }) => (
  <div style={ selected ? {...rootStyle, ...selectedStyle} : rootStyle } onClick={ onClick } className={`${rootClass} ${classes.imageTypePicker}`}>
    <div className='row middle-xs' style={{height: '100%'}}>
      <div className='col-xs center-xs' >
        <img src={ imgSrc } alt={ text } style={ imgStyle }/>
        <div >{text}</div>
      </div>
    </div>

    {icon && selected ?
      (<Fab mini="true" style={ iconButtonStyle } iconstyle={ iconStyle } >
          {icon}
      </Fab>
    ) : null}
  </div>
))
