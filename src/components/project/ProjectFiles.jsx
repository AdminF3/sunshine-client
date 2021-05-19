import React from 'react';
import { connect } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useQuery } from '@apollo/client';
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
  makeStyles,
} from '@material-ui/core';
import {
  InsertDriveFile as FileIcon,
} from '@material-ui/icons';

import { SERVER as backendURL } from '../../constants/endpoints';
import Loader from '../utils/Loader';
import apolloClient from '../../utils/apolloClient';
import { LIST_MEETINGS } from '../../actions/organizationsQueries';

const useStyles = makeStyles({
  root: {
    maxHeight: 400,
    overflow: 'auto',
  },
  textBox: {
    padding: 20,
  },
});

function ProjectFiles(props) {
  const {
    project,
  } = props;
  const { t } = useTranslation('translations');
  const classes = useStyles();

  const listMeetings = useQuery(LIST_MEETINGS, {
    client: apolloClient,
    variables: {
      id: project._id
    }
  });

  const files = Object.values(project._attachments || {});
  (listMeetings?.data?.listMeetings || []).forEach(
    m => m.attachments.forEach(a => {
      files.push({
        ...a,
        upload_type: t('projects.fileUploadedInMeeting', { file: a.name, meeting: m.name} ),
        url: `${backendURL}/meeting/${m.ID}/${a.name}`,
      });
    })
  );

  if (listMeetings?.loading) {
    return <Loader />;
  }

  if (files.length < 1) {
    return <Typography className={classes.textBox}>{t('projects.noFilesInProject')}</Typography>;
  }

  return (
    <List dense className={classes.root}>
      {files.map(f => {
        return (
          <ListItem key={f.ID}>
            <ListItemIcon>
              <FileIcon color="inherit" />
            </ListItemIcon>
            <ListItemText
              primary={
                <a
                  href={f.url || `${backendURL}/project/${project._id}/${f.name}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {decodeURI(f.name)}
                </a>
              }
              secondary={f.upload_type}
            />
          </ListItem>
        );
      })}
    </List>
  );
}

export default connect(
  state => ({
    project: state.project.singleProject,
  })
)(ProjectFiles);
