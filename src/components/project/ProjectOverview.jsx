import React from 'react';
import { useTranslation } from 'react-i18next';
import { useQuery } from '@apollo/client';
import {
  Grid,
  Typography,
  makeStyles,
} from '@material-ui/core';

import apolloClient from '../../utils/apolloClient';

import { canEditProject } from '../../utils/can';
import { getProjectPhase } from '../../constants/milestones';
import Widget from '../utils/Widget';
import OrganizationsList from '../organization/OrganizationsList/OrganizationsList';
import OrganizationMeetingsList from '../organization/OrganizationMeetings/OrganizationMeetingsList/OrganizationMeetingsList'; // eslint-disable-line max-len
import ProjectCard from './ProjectCard/ProjectCard';
import MilestonesMap from './ProjectMilestone/MilestonesMap';
import Loader from '../utils/Loader';

import { GET_FORFAITING_APPLICATION } from '../../actions/projectsQueries';

const styles = {
  root: {
    margin: '0 30px 20px 30px',
  },
  column: {
    '& > *': {
      marginBottom: 16,
      '&:last-child': {
        marginBottom: 0,
      },
    },
  },
  prjOverviewContainer: {
    marginLeft: '30px',
    marginRight: '30px',
    marginTop: '30px',
    '@media screen and (max-width: 960px)': {
      marginLeft: '10px',
      marginRight: '10px',
      marginTop: '10px',
    },
  },
  innerContainerMargin: {
    marginBottom: '20px',
    '@media screen and (max-width: 960px)': {
      marginBottom: '10px',
      padding: 0
    },
  },
  widgetText: {
    padding: '8px 20px',
    display: 'inline-block',
  },
};

const useStyles = makeStyles(styles);

function ProjectOverview(props) {
  const {
    singleProject,
    singleAsset,
    singleProjectReady,
    toggleEditProjectDialog,
    isProjectDialogOpen,
    singleOrganization,
    userIsLogged,
    searchMyAssets,
    searchMyOrganizations,
    foundAssets,
    foundOrganizations,
    clearAssetSearchResults,
    clearMyAssets,
    loggedUserRole,
    user,
    userIsSuperUser,
    projectClientName,
  } = props;
  const { t } = useTranslation('translations');
  const classes = useStyles(styles);

  const { loading, data } = useQuery(GET_FORFAITING_APPLICATION, {
    client: apolloClient,
    variables: {
      id: props.singleProject?.data?.ForfaitingApplication?.ID || '00000000-0000-0000-0000-000000000000'
    }
  });

  if (loading) {
    return <Loader />;
  }

  const currentPhase = getProjectPhase(singleProject.data, t);
  const canEdit = canEditProject(singleProject, user);

  return (
    <div className={classes.root}>
      <Grid container spacing={2}>
        <Grid item sm={6} xs={12}>
          <ProjectCard
            overview
            data={singleProject}
            singleProjectReady={singleProjectReady}
            singleAsset={singleAsset}
            singleOrganization={singleOrganization}
            userIsLogged={userIsLogged}
            searchMyAssets={searchMyAssets}
            searchMyOrganizations={searchMyOrganizations}
            foundAssets={foundAssets}
            foundOrganizations={foundOrganizations}
            clearAssetSearchResults={clearAssetSearchResults}
            toggleEditProjectDialog={toggleEditProjectDialog}
            isProjectDialogOpen={isProjectDialogOpen}
            loggedUserRole={loggedUserRole}
            userIsSuperUser={userIsSuperUser}
            projectClientName={projectClientName}
            clearMyAssets={clearMyAssets}
            forfaitingApplication={data?.getForfaitingApplication || null}
          />
        </Grid>
        <Grid container item xs={12} sm={6} direction="column" className={classes.column}>
          <Grid item>
            <OrganizationMeetingsList
              organization={{
                name: Object.values(singleProject.dependencies).find(dep => dep._id === singleProject.data.owner),
                id: singleProject.data.owner
              }}
              project={singleProject._id}
              viewOnly={!canEdit}
            />
          </Grid>
          <Grid item>
            <Widget
              title={t('projects.consortiumOrganizations')}
              withDivider
            >
              <ConsortiumOrganizations organizations={singleProject.data.consortiumOrganizations} />
            </Widget>
          </Grid>
          <Grid item>
            <Widget
              title={t('projects.projectPhase')}
              overline={currentPhase.label}
            >
              <MilestonesMap />
            </Widget>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}

function ConsortiumOrganizations(props) {
  const { organizations } = props;
  const { t } = useTranslation('translations');
  const classes = useStyles();

  if (!organizations || organizations.length < 1) {
    return (
      <Typography variant="overline" className={classes.widgetText}>
        {t('projects.noConsortiumOrganizations')}
      </Typography>
    );
  }

  return (
    <OrganizationsList organizations={organizations} />
  );
}

ConsortiumOrganizations.defaultProps = {
  organizations: null,
};

export default ProjectOverview;
