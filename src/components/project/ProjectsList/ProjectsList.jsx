import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import {
  Avatar,
  Grid,
  CircularProgress,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  ListItemSecondaryAction,
  makeStyles,
} from '@material-ui/core';
import {
  Error as ErrorIcon,
} from '@material-ui/icons';

import { assetTypeImage } from '../../../constants/assetTypes';
import StatusBadge from '../../utils/StatusBadge';
import TextWithIcon from '../../utils/TextWithIcon';
import { getProjects } from '../../../actions/projects';

const useStyles = makeStyles({
  root: {
    '& a': {
      textDecoration: 'none',
      color: 'inherit',
    }
  },
  noResultsWrapper: {
    padding: 20,
  },
});

function ProjectsList(props) {
  const {
    params: {
      owner,
      assetOwner,
      relatedOrganizationID,
    },
    projects,
    noResultsWarning,
    projectsGet,
  } = props;

  const { t } = useTranslation('translations');

  const classes = useStyles();

  useEffect(() => {
    projectsGet({
      owner,
      asset_owner: assetOwner,
      related_organization_id: relatedOrganizationID,
    });
  }, [owner, assetOwner, relatedOrganizationID, projectsGet]);

  if (projects.isFetchingList) {
    return (
      <Grid container justify="center">
        <Grid item><CircularProgress /></Grid>
      </Grid>
    );
  }

  if (projects.allProjectsNumber === 0) {
    return (
      <TextWithIcon
        icon={<ErrorIcon color="disabled" />}
        className={classes.noResultsWrapper}
      >
        {noResultsWarning || t('assets.noResultsFound')}
      </TextWithIcon>
    );
  }

  return (
    <List className={['ProjectsList', classes.root].join(' ')}>
      {projects.allProjects.map(p => (
        <ListItem key={p._id} button component={Link} to={`/project/${p._id}`}>
          <ListItemAvatar>
            <Avatar alt={p.data.name} src={assetTypeImage(p.data.asset.data)} />
          </ListItemAvatar>
          <ListItemText
            primary={
              <StatusBadge
                validationStatus={p.data.status}
                type="project"
                variant="badge"
              >
                {p.data.name}
              </StatusBadge>
            }
          />
          <ListItemSecondaryAction />
        </ListItem>
      ))}
    </List>
  );
}

ProjectsList.propTypes = {
  params: PropTypes.shape({
    owner: PropTypes.string,
    assetOwner: PropTypes.string,
    relatedOrganizationID: PropTypes.string,
  }).isRequired,
  noResultsWarning: PropTypes.node,
};

ProjectsList.defaultProps = {
  params: {},
  noResultsWarning: null,
  className: null,
};

export default connect(
  state => ({
    projects: state.project,
  }),
  dispatch => ({
    projectsGet: (p) => dispatch(getProjects(p)),
  }),
)(ProjectsList);
