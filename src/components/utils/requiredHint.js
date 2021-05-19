import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { withTranslation } from 'react-i18next';

const styles = theme => ({
  footer: {
    position: 'fixed',
    bottom: 0,
    width: '100%',
  },
  center : {
    justifyContent: 'center',
    textAlign: 'center',
    color: '#808080'
  }
});

export default withTranslation('translations')
(withStyles(styles)(({ classes, t }) => (
  <div className={classes.footer}>
    <div className={classes.center}>
      {t('translations:utils.hint')}
    </div>
  </div>
)))
