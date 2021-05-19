import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import {
  Typography,
  Paper,
  makeStyles,
} from '@material-ui/core';

import registerSVG from '../../../images/svgIcons/Asset.svg';
import styles from './styles';

const useStyles = makeStyles(styles);

function RegisterOrganizationCard(props) {
  const { onClick } = props;
  const { t } = useTranslation('translations');
  const classes = useStyles();

  return (
    <Paper
      className={classes.registerCardRoot}
      onClick={onClick}
      style={{ backgroundImage: `url('${registerSVG}')`}}
    >
      <Typography variant="h6" className={classes.registerCardTitle}>
        {t('assets.registerAsset')}
      </Typography>
    </Paper>
  );
}

RegisterOrganizationCard.propTypes = {
  onClick: PropTypes.func,
};

export default RegisterOrganizationCard;
