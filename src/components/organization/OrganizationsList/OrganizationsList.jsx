import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import {
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  ListItemSecondaryAction,
  makeStyles,
} from '@material-ui/core';

import OrganizationLogo from '../OrganizationLogo';

const useStyles = makeStyles(theme => ({
  root: {
    '& a': {
      textDecoration: 'none',
      color: 'inherit',
    }
  },
  noResultsWrapper: {
    padding: 20,
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
}));

function OrganizationsList(props) {
  const {
    organizations,
  } = props;

  const classes = useStyles();

  return (
    <List className={['ProjectsList', classes.root].join(' ')}>
      {organizations.map(o => (
        <ListItem key={o._id} button component={Link} to={`/organization/${o._id}`}>
          <ListItemAvatar className={classes.avatar}>
            <OrganizationLogo organization={o.data} />
          </ListItemAvatar>
          <ListItemText
            primary={o.data.name}
          />
          <ListItemSecondaryAction />
        </ListItem>
      ))}
    </List>
  );
}

OrganizationsList.propTypes = {
  organizations: PropTypes.array,
};

OrganizationsList.defaultProps = {
  organizations: [],
};

export default OrganizationsList;
