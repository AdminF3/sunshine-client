import React from 'react';
import { useTranslation } from 'react-i18next';
import {
  Grid,
  makeStyles,
} from '@material-ui/core';

import { canAssignProjectRoles } from '../../utils/can';
import * as mutations from '../../actions/projectsMutations';
import RolesManager from '../roles/RolesManager';
import Widget from '../utils/Widget';
import MarkdownText from '../utils/MarkdownText';
import ProjectProgress from './ProjectProgress';
import ProjectFiles from './ProjectFiles';

const styles = {
  root: {
    margin: '0 30px 20px 30px',
  },
  tooltipIcon: {
    marginRight: 6,
  },
};

const useStyles = makeStyles(styles);

function ProjectManager(props) {
  const {
    singleProject,
    searchUsers,
    clearResults,
    foundUsers,
    refetch,
    user,
  } = props;
  const { t } = useTranslation('translations');
  const classes = useStyles();

  const roles = [];
  const canEditRoles = canAssignProjectRoles(user, singleProject);

  const fcpAssigned = [];
  if (singleProject.data.ForfaitingApplication) {
    fcpAssigned.push(singleProject.data.ForfaitingApplication?.Manager);
  }

  roles.push(
    {
      title: t('projects.pm'),
      multiple: true,
      assigned: singleProject.data.roles.pm.map(userID => singleProject.dependencies[userID].data),
      assignMutation: mutations.ASSIGN_PM,
      assignMutationVariables: { projectID: singleProject._id },
      deleteMutation: mutations.REMOVE_ROLE,
      deleteMutationVariables: { projectID: singleProject._id, role: 'PM' },
    },
    {
      title: t('projects.plsign'),
      multiple: true,
      assigned: singleProject.data.roles.plsign.map(userID => singleProject.dependencies[userID].data),
      assignMutation: mutations.ASSIGN_ROLE,
      assignMutationVariables: { projectID: singleProject._id, role: 'PLSIGN' },
      deleteMutation: mutations.REMOVE_ROLE,
      deleteMutationVariables: { projectID: singleProject._id, role: 'PLSIGN' },
    },
    {
      title: t('projects.tama'),
      multiple: true,
      assigned: singleProject.data.roles.tama.map(userID => singleProject.dependencies[userID].data),
      assignMutation: mutations.ASSIGN_ROLE,
      assignMutationVariables: { projectID: singleProject._id, role: 'TAMA' },
      deleteMutation: mutations.REMOVE_ROLE,
      deleteMutationVariables: { projectID: singleProject._id, role: 'TAMA' },
    },
    {
      title: t('projects.teme'),
      multiple: true,
      assigned: singleProject.data.roles.teme.map(userID => singleProject.dependencies[userID].data),
      assignMutation: mutations.ASSIGN_ROLE,
      assignMutationVariables: { projectID: singleProject._id, role: 'TEME' },
      deleteMutation: mutations.REMOVE_ROLE,
      deleteMutationVariables: { projectID: singleProject._id, role: 'TEME' },
    },
    {
      title: t('projects.fcp'),
      multiple: false,
      assigned: fcpAssigned,
      assignMutation: mutations.UPDATE_FORFAITING_APPLICATION,
      assignMutationVariables: {
        id: singleProject?.data?.ForfaitingApplication?.ID,
      },
      assignVariablesResolver: (userID) => ({
        fa: { manager: userID },
      }),
    }
  );

  return (
    <div className={classes.root}>
      <Grid container spacing={2}>
        <Grid item sm={6} xs={12}>
          <Grid container direction="column" spacing={2}>
            <Grid item xs={12}>
              <RolesManager
                type="project"
                title={t('projects.projectRoles')}
                tooltip={<MarkdownText text={t('tooltips:projects.roles', { returnObjects: true })} />}
                roles={roles}
                viewOnly={!canEditRoles}
                searchUsers={searchUsers}
                clearResults={clearResults}
                foundUsers={foundUsers ? foundUsers.documents : []}
                refetch={refetch}
              />
            </Grid>
            <Grid item xs={12}>
              <Widget
                title={t('projects.projectFiles')}
                withDivider
              >
                <ProjectFiles />
              </Widget>
            </Grid>
          </Grid>
        </Grid>
        <Grid item sm={6} xs={12}>
          <Grid container direction="column" spacing={2}>
            <Grid item xs={12}>
              <Widget
                title={t('projects.projectProgress')}
                withDivider
              >
                <ProjectProgress />
              </Widget>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}

export default ProjectManager;
