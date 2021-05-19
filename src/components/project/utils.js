import React from 'react';
import moment from 'moment';
import { useTranslation } from 'react-i18next';
import {
  Typography,
  makeStyles,
} from '@material-ui/core';

const useStyles = makeStyles({
  yearNumTitle: {
    textTransform: 'uppercase',
    marginRight: 8,
  },
});

export function constructionPeriod(p, separator = ' ') {
  return moment(p.constructionFrom).format('DD.MM.YYYY') + separator + moment(p.constructionTo).format('DD.MM.YYYY');
}

export function MaintenanceYear(props) {
  const {
    project,
    year,
  } = props;

  const { t } = useTranslation('translations');
  const classes = useStyles();

  if (!project?.data) {
    return null;
  }

  let commissioningDate;
  if (project.data.CommissioningDate.indexOf('0001') > -1) {
    commissioningDate = project.data.construction_to;
  } else {
    commissioningDate = project.data.CommissioningDate;
  }
  const dateFrom = moment(commissioningDate).add(year, 'year');
  const dateTo = moment(commissioningDate).add(year + 1, 'year');

  return (
    <React.Fragment>
      <Typography variant="subtitle2" component="span" className={classes.yearNumTitle}>
        {t('projects.year')} {year + 1}
      </Typography>
      <Typography variant="caption" component="span">
        {dateFrom.format('YYYY-MM')} - {dateTo.format('YYYY-MM')}
      </Typography>
    </React.Fragment>
  );
}
