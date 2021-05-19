import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Checkbox from '@material-ui/core/Checkbox';
import FlatButton from '@material-ui/core/Button';
import SMSicon from '@material-ui/icons/Sms';
import { Facebook, Twitter } from './../SocialIcons';

import styles from './styles';

export const textInput = withStyles(styles)(({ input, label, placeholder, type, permanentPlaceholder, addStyle, classes,
  meta: { touched, error, warning },
  addClass: { labelClass, inputClass } }) => (
  <div>
      {label ? <div style={labelClass ? {} : { marginTop: '20px' }} className={`${labelClass || classes.authLabel} start-xs`}>
        <label>{label}</label>
      </div> : null}
      <div className='start-xs'>
        {permanentPlaceholder
        ? <span className={classes.permanentPlaceholder}>{permanentPlaceholder}</span>
        : null}
        <input {...input}
          placeholder={placeholder}
          type={type} style={addStyle}
          className={`col-xs ${inputClass}`}/>
        {touched && ((error && <span className={`row center-xs ${classes.authError}`}>{error}</span>)
        || (warning && <span className={`row center-xs ${classes.authWarning}`}>{warning}</span>))}
      </div>
  </div>
))

export const textArea = withStyles(styles)(({ input, label, placeholder, type, permanentPlaceholder, addStyle, classes,
  meta: { touched, error, warning },
  addClass: { labelClass, inputClass } }) => (
  <div className={classes.textareaField}>
      {label ? <div style={labelClass ? {} : { marginTop: '20px' }} className={`${labelClass || classes.authLabel} start-xs`}>
        <label>{label}</label>
      </div> : null}
      <div className={`start-xs ${classes.textareaField}`}>
        {permanentPlaceholder
        ? <span className={classes.permanentPlaceholder}>{permanentPlaceholder}</span>
        : null}
        <textarea {...input} placeholder={placeholder} type={type} style={addStyle} className={`col-xs ${inputClass}`} />
        {touched && ((error && <span className={`row center-xs ${classes.authError}`}>{error}</span>)
        || (warning && <span className={`row center-xs ${classes.authWarning}`}>{warning}</span>))}
      </div>
  </div>
))

export const socialInput = withStyles(styles)(({ input, label, placeholder, type, network, classes,
  meta: { touched, error, warning },
  addClass: { labelClass, inputClass, socialClass } }) => (
  <div>
      {label ? <div style={labelClass ? {} : { marginTop: '20px' }} className={`${labelClass || classes.authLabel} start-xs`}>
        <label>{label}</label>
      </div> : null}
      <div className='start-xs'>
        {network === 'Facebook'
        ? <Facebook className={socialClass} />
        : <Twitter className={socialClass} />}
        {touched && ((error && <span className={`row center-xs ${classes.authError}`}>{error}</span>)
        || (warning && <span className={`row center-xs ${classes.authWarning}`}>{warning}</span>))}
        <input {...input} placeholder={placeholder} type={type} className={`col-xs ${inputClass}`}></input>
      </div>
  </div>
))

export const renderMobile = withStyles(styles)(({ input, label, placeholder, verify, verifySMS, type, classes,
  meta: { touched, error, warning },
  addClass: { labelClass, inputClass } }) => (
  <div>
      <div style={labelClass ? {} : { marginTop: '20px' }} className='start-xs'>
        <label className={`${classes.authLabel} ${labelClass}`}>{label}</label>
      </div>
      <input {...input} placeholder={placeholder} type={type} className={`col-xs ${inputClass}`}/>
      <FlatButton
        variant='text'
        className={classes.flatButton}
        icon={<SMSicon></SMSicon>}
        onClick={() => {
          document.getElementById('verifyCode').style.display = 'initial';
          verifySMS();
        }}
      >
        {verify}
      </FlatButton>

      {touched && ((error && <span className={`row center-xs ${classes.authError}`}>{error}</span>)
      || (warning && <span className={`row center-xs ${classes.authWarning}`}>{warning}</span>))}
  </div>
))

export const renderCheckbox = withStyles(styles)(({ input, label, classes, meta: { touched, error } }) => (
  <div className='start-xs'>
    <Checkbox
      label={label}
      checked={input.value ? true : false}
      onCheck={input.onChange}
      style={{width: '370px', marginTop: '20px', textAlign: 'justified'}}
    />
    {touched && ((error && <span className={`row center-xs ${classes.authError}`}>{error}</span>))}
  </div>
))

const adaptFileEventToValue = delegate =>
  e => delegate(e.target.files[0]);

export const renderFileInput = withStyles(styles)((classes, { input: { onChange, onBlur, ...inputProps }, ...props }) => (
  <input
    onChange={adaptFileEventToValue(onChange)}
    onBlur={adaptFileEventToValue(onBlur)}
    type="file"
    {...inputProps}
    {...props}
  />
));
