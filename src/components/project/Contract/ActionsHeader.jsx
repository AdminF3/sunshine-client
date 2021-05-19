import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import {
  Button,
  Grid,
  makeStyles,
} from '@material-ui/core';
import {
  CloudDownload as DownloadIcon,
  InfoOutlined as InfoIcon,
} from '@material-ui/icons';

import { SERVER as backendURL} from '../../../constants/endpoints';
import isSupportedCountry from '../../../utils/isSupportedCountry';
import { CountryFlag } from '../../utils/SVGflags';
import UserTooltip from '../../utils/UserTooltip';
import MarkdownText from '../../utils/MarkdownText';

const useStyles = makeStyles(theme => ({
  buttons: {
    '& .UserTooltip-grow': {
      marginLeft: theme.spacing(1),
    },
  },
  languageButton: {
    marginRight: theme.spacing(0.5),
  },
}));

function ActionsHeader(props) {
  const {
    country,
    language,
    onSelectLanguage,
    projectID,
    tooltip,
    downloadButtonProps,
  } = props;

  const downloadURL = `${backendURL}/project/${projectID}/download/${language}`;

  const { t } = useTranslation('translations');
  const classes = useStyles();
  const fallbackCountry = isSupportedCountry(country) ? country : 'Latvia';
  return (
    <Grid container justify="space-between">
      <Grid item className={classes.buttons}>
        <Button
          startIcon={<CountryFlag country="England" />}
          variant="outlined"
          className={classes.languageButton}
          color={language === 'english' ? 'primary' : 'default'}
          onClick={() => onSelectLanguage('english')}
        >
          {t('countryAdjectiveKeys.England')}
        </Button>
        <Button
          startIcon={<CountryFlag country={fallbackCountry} />}
          variant="outlined"
          className={classes.languageButton}
          color={language === 'native' ? 'primary' : 'default'}
          onClick={() => onSelectLanguage('native')}
        >
          {t(`countryAdjectiveKeys.${fallbackCountry}`)}
        </Button>
        {tooltip && (
          <UserTooltip
              action="click"
              icon={<InfoIcon />}
              iconButtonProps={{ size: 'small', color: 'primary' }}
              title={
                  <MarkdownText
                      text={t(tooltip, { returnObjects: true })}
                  />
              }
          />
        )}
      </Grid>
      <Grid item>
        <Button
          variant="contained"
          color="primary"
          startIcon={<DownloadIcon />}
          href={downloadButtonProps.href || downloadURL}
          download
        >
          {downloadButtonProps.title || t('annexes.downloadContract')}
        </Button>
      </Grid>
    </Grid>
  );
}

ActionsHeader.propTypes = {
  projectID: PropTypes.string.isRequired,
  country: PropTypes.string.isRequired,
  language: PropTypes.oneOf([ 'native', 'english' ]).isRequired,
  onSelectLanguage: PropTypes.func.isRequired,
  tooltip: PropTypes.string,
  downloadButtonProps: PropTypes.shape({
    href: PropTypes.string,
    title: PropTypes.string,
  }).isRequired,
};

ActionsHeader.defaultProps = {
  country: 'England',
  language: 'english',
  downloadButtonProps: {},
  onSelectLanguage: () => {},
};

export default ActionsHeader;
