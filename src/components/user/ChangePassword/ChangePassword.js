import React from 'react'
import PropTypes from 'prop-types'

import { withTranslation } from 'react-i18next';
import { withStyles } from '@material-ui/core/styles';
import { Field, reduxForm } from 'redux-form';

import Dialog from '@material-ui/core/Dialog';
import Button from '@material-ui/core/Button';

import CheckCircle from '@material-ui/icons/CheckCircle';

import styles from './styles';

const validate = (values, props) => {
  let { t } = props;
  const errors = {}

  if (!values.currentPassword) {
    errors.currentPassword = t('auth.required');
  } else if (values.currentPassword && values.currentPassword.length <= 8) {
    errors.currentPassword = t('auth.passwordShort');
  }

  if (!values.newPassword) {
    errors.newPassword = t('auth.required');
  } else if (values.newPassword && values.newPassword.length <= 8) {
    errors.newPassword = t('auth.passwordShort');
  } else if (values.newPassword !== values.confirmPassword) {
    errors.confirmPassword = t('auth.passwordMatch');
  }

  if (!values.confirmPassword) {
    errors.confirmPassword = t('auth.required');
  } else if (values.confirmPassword && values.confirmPassword.length <= 8) {
    errors.confirmPassword = t('auth.passwordShort');
  } else if (values.newPassword !== values.confirmPassword) {
    errors.confirmPassword = t('auth.passwordMatch');
  }

  return errors
}

const warn = (values, props) => {
  let t = props.t;
  const warnings = {};

  if (values.newPassword && values.newPassword.length <= 8) {
    warnings.newPassword = t('auth.passwordWeak');
  }

  return warnings
}

const renderField = ({input, label, placeholder, type, classes,
  meta: {
    touched,
    error,
    warning
  }
}) => (
  <div>
    <div style={{ marginTop: '20px' }} className='start-xs'>
      <label className={classes.authLabel}>{label}</label>
    </div>
    <input {...input} placeholder={placeholder} type={type} autoComplete="off" className={`col-xs ${classes.inputStyle}`}/>
    <div className={classes.authError}>
      {touched && ((error && <span className={`row center-xs ${classes.authError}`}>{error}</span>)
      || (warning && <span className={`row center-xs ${classes.authWarning}`}>{warning}</span>))}
    </div>
  </div>
)

class ChangePasswordForm extends React.Component {
  state = {
    data: {
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    }
  }

  handleSetState(name, value) {
    this.setState({ data: {...this.state.data, [name]: value} })
  }

  render() {
    let { handleFormSubmit, t, message, passwordChanged, classes, handlePasswordClose, open } = this.props;

    return (
      <div>
        <Dialog
          open={open}
          onClose={handlePasswordClose}
          maxWidth='xs'
          fullWidth={true}
        >
          { passwordChanged
            ?
            <div className={classes.successfullyChangedPasswordContainer}>
              <CheckCircle classes={{ root: classes.checkCircleIcon }}/>
              <div className={classes.successfullyChangedPasswordText}>
                Your password has been changed successfully
              </div>
            </div>
            :
            <div>
              <div className='row center-xs'>
                <Field classes={classes} name='currentPassword' type='password' component={renderField} label={t('auth.currentPassword')} placeholder={t('auth.currentPassword')} onChange={(event) => this.handleSetState('currentPassword', event.target.value)}/>
              </div>
              <div className='row center-xs'>
                <Field classes={classes} name='newPassword' type='password' component={renderField} label={t('auth.newPassword')} placeholder={t('auth.newPassword')} onChange={(event) => this.handleSetState('newPassword', event.target.value)}/>
              </div>
              <div className='row center-xs'>
                <Field classes={classes} name='confirmPassword' type='password' component={renderField} label={t('auth.confirmPassword')} placeholder={t('auth.confirmPassword')} onChange={(event) => this.handleSetState('confirmPassword', event.target.value)}/>
              </div>
              {message
                ? <div
                    style={{ marginTop: '20px' }}
                    className='row center-xs'>
                    <span className={classes.authError}>{t(`serverMessages:auth.${message}`)}</span>
                  </div>
                : ''
              }
              <div className='row center-xs'>
                <Button
                  variant='contained'
                  className={classes.buttonStyle}
                  onClick={() => handleFormSubmit(this.state.data)}
                >
                  {t('translations:profile.confirm')}
                </Button>
              </div>
            </div>
          }
        </Dialog>
      </div>
    );
  }
}

ChangePasswordForm.propTypes = {
  handleSubmit: PropTypes.func
};

export default withTranslation('translations',
 'serverMessages')(reduxForm({
  form: 'changePasswordForm',
  fields: [
    'currentPassword', 'newPassword', 'confirmPassword'
  ],
  enableReinitialize: true,
  validate, // <--- Synchronous validation
  warn // <--- Synchronous warning
})(withStyles(styles)(ChangePasswordForm)));
