import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import {
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  makeStyles,
} from '@material-ui/core';
import {
  Error as ErrorIcon,
} from '@material-ui/icons';

import TextWithIcon from '../../utils/TextWithIcon';
import OrganizationLogo from '../OrganizationLogo';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
  },
  avatar: {
    maxWidth: theme.spacing(14),
    paddingRight: theme.spacing(2),

    '& > img': {
      width: '100%',
      height: '100%',
      objectFit: 'cover',
    },
  },
  errorMessage: {
    padding: 20,
  },
}));

function OrganizationListItem(props) {
  const {
    organization,
    errorMessage,
  } = props;
  const classes = useStyles();

  if (!organization) {
    return (
      <TextWithIcon
        icon={<ErrorIcon color="disabled" />}
        className={classes.errorMessage}
      >
        {errorMessage}
      </TextWithIcon>
    );
  }

  return (
    <List disablePadding className={classes.root}>
      <ListItem key={organization._id} button component={Link} to={`/organization/${organization._id}`}>
        <ListItemAvatar className={classes.avatar}>
          <OrganizationLogo organization={organization.data} />
        </ListItemAvatar>
        <ListItemText primary={organization.data.name} />
      </ListItem>
    </List>
  );
}

OrganizationListItem.propTypes = {
  organization: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    data: PropTypes.shape({
      name: PropTypes.string.isRequired,
    }).isRequired,
  }),
  errorMessage: PropTypes.string.isRequired,
};

OrganizationListItem.defaultProps = {
  errorMessage: 'Error',
};

export default OrganizationListItem;
