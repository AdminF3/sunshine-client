import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  Grid,
  Typography,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  makeStyles,
} from '@material-ui/core';

import { legalForms, isResidentsCommunity } from '../../../constants/legalStatusTypes';
import StatusBadge from '../../utils/StatusBadge';
import ApplyToOrganization from '../ApplyToOrganization/ApplyToOrganization';
import OrganizationLogo from '../OrganizationLogo';

import styles from './styles';

const useStyles = makeStyles(styles);

function OrganizationCard(props) {
  const {
    data: { data },
    withApplyButton,
    withStatusBadge,
  } = props;

  const classes = useStyles();
  const { t } = useTranslation('translations');

  return (
    <Card className={classes.root}>
      <Link
        to={'organization/' + data.ID}
        className={classes.content}
      >
        <CardHeader
          avatar={
            <div className={classes.logoContainer}>
              <OrganizationLogo organization={data} className={classes.logo} />
            </div>
          }
          action={
            withStatusBadge && <StatusBadge validationStatus={data.valid} />
          }
          title={data.name}
          subheader={data.address}
        />
        <CardContent>
          <Grid container alignItems="center">
            {!isResidentsCommunity(data.legal_form) && (
              <React.Fragment>
                <Grid item xs={4}>
                  <Typography color="textSecondary">{t('organizations.vat')}</Typography>
                </Grid>
                <Grid item xs={8}>
                  <Typography>{data.vat}</Typography>
                </Grid>
              </React.Fragment>
            )}
            <Grid item xs={4}>
              <Typography color="textSecondary">{t('auth.email')}</Typography>
            </Grid>
            <Grid item xs={8}>
              <Typography>{data.email}</Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography color="textSecondary">{t('organizations.legalForm')}</Typography>
            </Grid>
            <Grid item xs={8}>
              <Typography>{legalForms(t)[data.legal_form]}</Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Link>
      {withApplyButton && (
        <CardActions>
          <ApplyToOrganization organization={data} />
        </CardActions>
      )}
    </Card>
  );
}

OrganizationCard.propTypes = {
  withApplyButton: PropTypes.bool,
  withStatusBadge: PropTypes.bool,
  data: PropTypes.object.isRequired
};

OrganizationCard.defaultProps = {
  withApplyButton: false,
  withStatusBadge: true,
};

export default OrganizationCard;
