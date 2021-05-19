import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import {
  Grid,
  Paper,
  makeStyles,
} from '@material-ui/core';

import ImageTypePicker from './../../../components/utils/ImageTypePicker';
import infoTypes from './../../../constants/infoTypes';

const useStyles = makeStyles(theme => ({
  button: {
    backgroundColor: theme.palette.background.paper,
    display: 'inline-block',
    width: '100%',
    height: '100%',
    textDecoration: 'none',
    color: theme.palette.text.primary,
    fontWeight: 600,
    fontSize: 16,
  },
  imageTypePicker: {
    padding: `${theme.spacing(4)}px 0`,
    height: '100%',
  },
}));

const imageLinks = {
  new: { href: 'https://sunshineplatform.eu/wp-content/uploads/D2-05_Handbook_BuildingDeepRenovation-EN.pdf', target: '_blank', rel: 'noopener noreferrer' },
  funding: { href: 'https://sunshineplatform.eu/labeef-2/', target: '_blank', rel: 'noopener noreferrer' },
  participate: { to: '/calculator' },
  expert: { href: 'https://sunshineplatform.eu/esco/', target: '_blank', rel: 'noopener noreferrer' },
  demo: { href: 'mailto:office@fcubed.eu', target: '_blank', rel: 'noopener noreferrer' },
  support: { href: 'mailto:sunshinehelp@ekubirojs.lv', target: '_blank', rel: 'noopener noreferrer' },
};

function QuickLinks() {
  const { t } = useTranslation('translations');
  const classes = useStyles();

  return (
    <Grid container item spacing={2}>
      {Object.keys(infoTypes).map((type) => {
        return (
          <Grid item md={2} sm={4} xs={6} key={type}>
            <Paper
              component={imageLinks[type].to ? Link : 'a'}
              className={classes.button}
              {...imageLinks[type]}
            >
              <ImageTypePicker
                rootClass={classes.imageTypePicker}
                imgStyle={{ height: '50px', width: '50px', marginBottom: '10px' }}
                text={t(`info.${type}`)}
                imgSrc={infoTypes[type]}
              />
            </Paper>
          </Grid>
        );
      })}
    </Grid>
  );
}

export default QuickLinks;
