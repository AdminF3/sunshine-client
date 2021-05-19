import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { useQuery } from '@apollo/client';
import {
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  List,
  ListItem,
  Typography,
  makeStyles
} from '@material-ui/core';

import apolloClient from '../../../utils/apolloClient';
import { GET_DPOS } from './countryRolesQueries';

const useStyles = makeStyles(theme => ({
  actionBar: {
    display: 'flow-root'
  },
  okButton: {
    marginLeft: 16,
    float: 'right'
  },
  spaceBetween: {
    justifyContent: 'space-between',
  },
  contentWrapper: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
}));

function CountryRolesDialog(props) {
  const {
    role,
    title,
    onClose,
  } = props;

  const { t } = useTranslation('translations');

  const { loading, data } = useQuery(GET_DPOS, {
    client: apolloClient,
  });

  const dpoRoles = {
    Latvia: [],
    Poland: [],
    Bulgaria: [],
    Romania: [],
    Slovakia: [],
    Austria: [],
  };

  for (const i in data?.getDPOs) {
    const u = data.getDPOs[i];
    for (const j in u.countryRoles) {
      const r = u.countryRoles[j];
      if (r.role === role) {
        dpoRoles[r.country].push(u);
      }
    }
  }

  return (
    <Dialog open fullWidth onClose={onClose} maxWidth="sm">
      <DialogTitle>{title}</DialogTitle>
      <Content
        roles={dpoRoles}
        loading={loading}
      />
      <DialogActions>
        <Button
          variant="contained"
          color="primary"
          onClick={onClose}
        >
          {t('navigation.ok')}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

function Content(props) {
  const {
    loading,
    roles,
  } = props;

  const classes = useStyles();

  if (loading) {
    return (
      <DialogContent className={classes.contentWrapper}>
        <CircularProgress />
      </DialogContent>
    );
  }

  return (
    <DialogContent>
      {Object.keys(roles).map((c) => (
        <List
          key={c}
          subheader={<Typography variant="h6">{c}</Typography>}
        >
          {roles[c].map(user => (
            <ListItem key={user.ID} className={classes.spaceBetween}>
              <strong>{user.name}</strong> <a href={`mailto:${user.email}`}>{user.email}</a>
            </ListItem>
          ))}
        </List>
      ))}
    </DialogContent>
  );
}

CountryRolesDialog.propTypes = {
  role: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default CountryRolesDialog;
