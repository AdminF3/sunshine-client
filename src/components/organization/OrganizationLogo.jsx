import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core';

import testlogo from '../../images/Sunshine-Logo-FB1200x627.png';
import residentialCommunity from '../../images/ResidentialCommunity.png';
import ENDPOINTS from '../../constants/endpoints';
import { isResidentsCommunity } from '../../constants/legalStatusTypes';

const useStyles = makeStyles({
  coverWrapper: {
    position: 'relative',
    display: 'inline-block',
    width: '100%',
    paddingTop: '48%',

    '& > img': {
      position: 'absolute',
      top: 0,
      width: '100%',
      height: '100%',
      objectFit: 'cover',
    },
  },
});

function OrganizationLogo(props) {
  const {
    organization,
    className,
    cover,
  } = props;

  const classes = useStyles();
  const logoURL = getLogoURL(organization);

  if (!cover) {
    return (
      <img
        alt={organization.name}
        src={logoURL}
        className={className}
      />
    );
  }

  return (
    <span className={classes.coverWrapper}>
      <img
        alt={organization.name}
        src={logoURL}
        className={className}
      />
    </span>
  );
}

export function getLogoURL(o) {
  if (o.logo) {
    return ENDPOINTS.SERVER + o.logo;
  }
  if (isResidentsCommunity(o.legal_form)) {
    return residentialCommunity;
  }
  return testlogo;
}

OrganizationLogo.propTypes = {
  organization: PropTypes.shape({
    name: PropTypes.string.isRequired,
    logo: PropTypes.string,
  }).isRequired,
  cover: PropTypes.bool.isRequired,
};

OrganizationLogo.defaultProps = {
  cover: false,
};

export default OrganizationLogo;
