import React from 'react';
import PropTypes from 'prop-types';

// WRAPPERS
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import { Field, reduxForm } from 'redux-form';
import { withStyles } from '@material-ui/core/styles';

// COMPONENTS
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';

// Actions
import { loginUser } from './../../../actions/authentication';

import styles from './styles';

class LoginForm extends React.Component {

 render() {
   const { classes, t, handleFormSubmit, handleSubmit } = this.props;

   return (
     <form onSubmit={handleSubmit(handleFormSubmit.bind(this))} className={classes.formStyle} >
        <div className='row start-xs' style={{ marginTop: '20px' }}>
          <label className={classes.authLabel}>
            {t('translations:auth.email')}
          </label>
        </div>
        <div className='row center-xs'>
          <Field className={`col-xs ${classes.specialInput}`} name='email' type='email' component='input' placeholder={t('translations:auth.email')}/>
        </div>

        <div className='row start-xs' style={{ marginTop: '20px' }}>
          <label className={classes.authLabel}>
            {t('translations:auth.password')}
          </label>
        </div>
        <div className='row center-xs'>
          <Field className={`col-xs ${classes.specialInput}`} name='password' type='password' component='input' placeholder={t('translations:auth.password')}/>
        </div>

        <div className='row center-xs' styles={{ height: '90px' }}>
          <Button
            type='submit'
            variant='contained'
            className={`col-xs-6 ${classes.loginButton}`}
          >
            {t('translations:auth.login')}
          </Button>
        </div>

        {this.props.registerAction && (
          <div className='row center-xs' style={{ marginBottom: '15px' }}>
            <Link to='/register' className={`col-xs ${classes.primaryRedirect}`}>
              {t('translations:auth.registerMessage')}
            </Link>
          </div>
        )}
      </form>
    );
  }
}

LoginForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  handleFormSubmit: PropTypes.func.isRequired,
  registerAction: PropTypes.bool.isRequired,
};

LoginForm.defaultProps = {
  registerAction: true,
};

const mapDispatchToProps = dispatch => ({
  handleFormSubmit: (creds) => {
    dispatch(loginUser(creds));
  },
});

export default (
  withTranslation('translations',
 'serverMessages')(
  reduxForm({form: 'loginForm'})(
  withStyles(styles, { withTheme: true })(
  connect(null, mapDispatchToProps)(LoginForm))))
);
