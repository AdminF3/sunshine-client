import React from 'react';
import { withStyles } from '@material-ui/core/styles';

/**
 * Multifunctional input field with validation and floating right icon. No fields are required...
 *
 * @param  {func}   initialScript Function to be executed on componentDidMount
 * @param  {string} type          type of validation required (required / email / date / address / name)
 * @param  {string} label         input label
 * @param  {string} placeholder   input placeholder
 * @param  {JSS}    style         JSS of the root element
 * @param  {string} rootClass     css class for the root element
 * @param  {string} labelClass    css class for the label element
 * @param  {string} inputClass    css class for the input element
 * @param  {string} floatRightClass  css class for the floating right placeholder element
 * @param  {string / comp} floatRight  floating right placeholder element (icon or text)
 * @param  {func}   inputRef      function to set reference to the input element
 * @param  {string} initialValue  initial value of the input element
 * @param  {func}   handleStateTransfer two params ( err, value ) to be transfered to the parent component on every Change or Blur event
 *
 * @return {React.Component}
 */

import styles from './styles';

class InputWithValidation extends React.Component {
  constructor(props) {
    super();
    this.state = {
      value: '',
      error: ''
    };
    this.validate = this.validate.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
  }
  handleChange(event) {
    this.setState({ value: event.target.value });
    this.validate(event.target.value);
  }
  componentDidMount() {
    const { initialScript } = this.props;
    if (initialScript) {
      initialScript();
    }
  }
  handleBlur(event) {
    this.handleChange(event);
  }
  validate(value) {
    const { type, handleStateTransfer } = this.props;
    let error = null;
    switch (type) {
      case 'required':
        if (!value) {
          error = 'Field is required!';
          break;
        } else {
          break;
        }
      case 'email':
        if (!value) {
          error = 'Field is required!';
          break;
        } else if (/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
          break;
        } else {
          error = 'Enter valid E-mail address!';
          break;
        }
      case 'date':
        let patt = new RegExp(
          '^(?:(1[0-2]|0?[1-9])/(3[01]|[12][0-9]|0?[1-9])|(3[01]|[12][0-9]|0?[1-9])/(1[0-2]|0?[1-9]))/(?:[0-9]{2})?[0-9]{2}$'
        );
        if (!value) {
          error = 'Field is required!';
          break;
        } else if (patt.test(value)) {
          if (Date.parse(value)) {
            break;
          } else {
            error = 'Enter valid date. Example mm/dd/yyyy.';
            break;
          }
        } else {
          error = 'Enter valid date. Example mm/dd/yyyy.';
          break;
        }
      case 'vat':
        if (!value) {
          error = 'Field is required!';
          break;
        } else if (/^[0-9]{6,}$/.test(value)) {
          break;
        } else {
          error = 'Enter valid VAT number!';
          break;
        }
      case 'address':
        if (!value) {
          error = 'Field is required!';
          break;
        } else break;
      case 'name':
        if (!value) {
          error = 'Field is required!';
          break;
        } else if (/[a-zA-Z]{2,}/.test(value)) {
          break;
        } else {
          error = 'Legal name must be two or more characters!';
          break;
        }
      case 'uint16_required':
        if (!value) {
          error = 'Field is required!';
          break;
        } else if (value < 65535) {
          break;
        } else {
          error = 'Enter valid value (up to 65535)!';
          break;
        }
      case 'uint16':
        if (value < 65535) {
          break;
        } else {
          error = 'Enter valid value (up to 65535)!';
          break;
        }
      case 'uint8':
        if (value < 255) {
          break;
        } else {
          error = 'Enter valid value (up to 255)!';
          break;
        }
      case 'url':
        let reg = RegExp(/^(http(s)?:\/\/)[\w.-]+(?:\.[\w.-]+)+[\w\-._~:/?#[\]@!$&'()*+,;=.]+$/)
        if (reg.test(value)) {
          break;
        } else {
          error = 'Please enter valid URL! ex: http://websitename.com'
          break;
        }
      default:
        break;
    }

    this.setState({ error: error });
    handleStateTransfer( error, value );
  }
  render() {
    const { label, placeholder, style, inputRef,
      floatRight, floatRightClass, rootClass, labelClass,
      inputClass, initialValue, onKeyPress, classes, errorProp } = this.props;
    let { error } = this.state;
    let rightPlaceholder = <div className={ floatRightClass || classes.assetRegisterPlaceholderIcon } >{ floatRight }</div>

    return (
      <div style={ style } className={ rootClass || null }>

        <div className={ labelClass || classes.orgRegister1Headline }>{ label }</div>

        <input
          ref={ inputRef }
          type="text"
          placeholder={ placeholder }
          onChange={ this.handleChange }
          className={ inputClass || classes.orgRegister1Input }
          onBlur={ this.handleBlur }
          value={ initialValue ? initialValue : '' }
          onKeyPress={ onKeyPress }
        />

        { floatRight ? rightPlaceholder : null }
        <div className={classes.authError}>{ errorProp ? errorProp : error ? error : '\u00A0' }</div>

      </div>
    );
  }
}

export default withStyles(styles)(InputWithValidation);
