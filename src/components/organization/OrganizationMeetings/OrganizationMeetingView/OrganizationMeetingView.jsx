import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import moment from 'moment';
import { useMutation } from '@apollo/client';
import {
  Avatar,
  Button,
  Card,
  CardContent,
  CardHeader,
  Grid,
  Typography,
  makeStyles,
} from '@material-ui/core';
import {
  ArrowBack as ArrowBackIcon,
  BusinessCenter as OrganizationIcon,
  Equalizer as ProjectIcon,
  Event as DateIcon,
  Language as URLIcon,
  MergeType as TypeIcon,
  Room as LocationIcon,
  SupervisedUserCircle as MeetingIcon,
} from '@material-ui/icons';

import apolloClient from '../../../../utils/apolloClient';
import { validateFields } from '../../../../utils/validation';
import { UPDATE_MEETING } from '../../../../actions/organizationsMutations';
import { LIST_MEETINGS, GET_MEETING } from '../../../../actions/organizationsQueries';
import { addAlert as addAlertAction } from '../../../../actions/alerts';
import { uploadAndDeleteFiles } from '../../../../actions/uploads';
import {
  organizationMeetingTypes,
  projectMeetingTypes
} from '../../../../constants/legalStatusTypes';
import FilesManager from '../../../../containers/smartcomponents/FilesManager/FilesManager';
import Input from '../../../utils/Input';
import TextWithIcon from '../../../utils/TextWithIcon';
import MeetingGuestManager from '../MeetingGuestManager';

const useStyles = makeStyles(theme => ({
  root: {
    margin: theme.spacing(4),
    '& .MuiCardHeader-action': {
      margin: 0,
      '& > *': {
        marginRight: theme.spacing(1),
        '&:last-child': {
          marginRight: 0,
        },
      },
    },
    '& .MuiCardHeader-avatar': {
      '& .MuiAvatar-root': {
        backgroundColor: 'transparent',
        width: 50,
        height: 50,
      },
      '& .MuiSvgIcon-root': {
        width: '100%',
        height: '100%',
      },
    },
    '& .MuiCardHeader-subheader': {
      display: 'flex',
      flexDirection: 'column',

      '& .MuiSvgIcon-root': {
        width: '1rem',
        height: '1rem',
      },
    },
    '& .UploadFile-root': {
      marginTop: 0,

      '& section': {
        height: 'auto',
      },
      '& .UploadedFile-container': {
        height: 'auto',

        '& td': {
          wordBreak: 'break-all',
        },
      },
      '& .UploadFile-button': {
        height: 'auto',
      },
    },
  },
}));

const validations = { name: ['nonEmpty'], location: ['nonEmpty'], date: ['nonEmpty'], topic: ['nonEmpty'] };

function OrganizationMeetingView(props) {
  const {
      meeting,
      refetchMeeting,
      processFiles,
      addAlert,
  } = props;

  const { t } = useTranslation('translations');
  const classes = useStyles();

  const [data, setData] = useState({
    ...meeting,
    guests: meeting.guests?.map(g => ({
      email: g.email || '',
      name: g.name || '',
      organization: g.organization || '',
      phone: g.phone || '',
      type: g.type,
    })) || [],
  });

  const meetingTypes = (
    meeting.project ? projectMeetingTypes : organizationMeetingTypes
  ).map(o => ({ value: o.value, label: t(o.labelKey) }));

  const [updateMeeting] = useMutation(UPDATE_MEETING, {
    client: apolloClient,
    onError: err => {
      addAlert(err?.message);
    },
    onCompleted: () => addAlert({ text: t('meetings.updateSuccess'), level: 'success' }),
    refetchQueries: [
      { query: LIST_MEETINGS, variables: { id: meeting.host.ID } },
      { query: GET_MEETING, variables: { id: meeting.ID } },
    ],
  });

  const [meetingFiles, setMeetingFiles] = useState(meeting.attachments || []);
  const onFileAdded = acceptedFiles => {
    setMeetingFiles([...acceptedFiles, ...meetingFiles]);
  };
  const onFileDeleted = f => {
    const filtered = meetingFiles.filter(_f => _f.name !== f.name);
    setMeetingFiles(filtered);
  };

  const onSubmit = () => {
    const filesToDelete = meeting.attachments.filter(
      ma => !meetingFiles.some(mf => ma.ID === mf.ID)
    );
    const filesToAdd = meetingFiles.filter(
      mf => !meeting.attachments.some(ma => mf.ID === ma.ID)
    );

    processFiles({ toDelete: filesToDelete, toAdd: filesToAdd }, { ID: meeting.ID, type: 'meeting' }).then(() => {
      updateMeeting({
        variables: {
          meeting: {
            ID: meeting.ID,
            name: data.name,
            location: data.location,
            date: data.date,
            objective: data.objective,
            guests: data.guests,
            stage: data.stage,
            actions_taken: data.actions_taken,
            internalProject: data.internalProject,
            notes: data.notes,
            topic: data.topic,
          },
        },
      }).then((res) => {
        setMeetingFiles([...res.data.updateMeeting.attachments]);
      }).then(() => refetchMeeting);
    }).catch(err => addAlert({ text: err.message, level: 'error' }));
  };

  const validationResult = validateFields(data, validations);

  return (
    <Card className={classes.root}>
      <MeetingHeader meeting={meeting} />
      <CardContent component={Grid} container spacing={2}>
        <Grid item sm={6} xs={12}>
          <Grid container direction="column" spacing={2}>
            <Grid container item xs={12} spacing={2}>
              <Grid item sm={6} xs={12}>
                <Input
                  label={t('meetings.meetingType')}
                  value={data.topic}
                  startAdornment={<TypeIcon color="disabled" />}
                  options={meetingTypes}
                  onChange={e => setData({ ...data, topic: e.target.value })}
                />
              </Grid>
              <Grid item sm={6} xs={12}>
                <Input
                  type="datepicker"
                  label={t('meetings.date')}
                  value={data.date}
                  startAdornment={<DateIcon color="disabled" />}
                  onChange={e => setData({
                    ...data,
                    date: e.target.value ? moment(e.target.value).toISOString() : '',
                  })}
                />
              </Grid>
              <Grid item xs={12}>
                <Input
                  label={t('meetings.location')}
                  value={data.location}
                  startAdornment={<LocationIcon color="disabled" />}
                  onChange={e => setData({ ...data, location: e.target.value })}
                />
              </Grid>
              <Grid item sm={6} xs={12}>
                <Input
                  label={t('meetings.internalProject')}
                  value={data.internalProject}
                  startAdornment={<ProjectIcon color="disabled" />}
                  onChange={e => setData({ ...data, internalProject: e.target.value })}
                />
              </Grid>
              <Grid item sm={6} xs={12}>
                <Input
                  label={t('meetings.urlToConference')}
                  startAdornment={<URLIcon color="disabled" />}
                  value={data.stage}
                  onChange={e => setData({ ...data, stage: e.target.value })}
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid item sm={6} xs={12}>
          <Grid container direction="column" spacing={2}>
            <Grid item xs={12}>
              <Input
                label={t('meetings.meetingObjective')}
                multiline
                rows={3}
                value={data.objective}
                onChange={e => setData({ ...data, objective: e.target.value })}
              />
            </Grid>
            <Grid item xs={12}>
              <Input
                multiline
                rows={3}
                label={t('meetings.actionsTaken')}
                value={data.actions_taken}
                onChange={e => setData({ ...data, actions_taken: e.target.value })}
              />
            </Grid>
          </Grid>
        </Grid>

        <Grid item xs={12}>
          <MeetingGuestManager
            guestList={data.guests}
            addGuest={g => setData({
              ...data,
              guests: [...data.guests, { ...g }],
            })}
            editGuest={(i, guest) => setData({
              ...data,
              guests: data.guests.map((g, idx) => idx !== i ? g : { ...guest }),
            })}
            removeGuest={i => setData({
              ...data,
              guests: data.guests.filter((_, idx) => i !== idx),
            })}
          />
        </Grid>

        <Grid item xs={12}>
          <FilesManager
            title={t('meetings.listOfFiles')}
            subtitle={t('meetings.uploadMinutes')}
            files={meetingFiles}
            entityType="meeting"
            entityID={meeting.ID}
            onFileAdded={onFileAdded}
            onFileDeleted={onFileDeleted}
          />
        </Grid>

        <Grid container item xs={12} direction="row-reverse">
          <Button
            variant="contained"
            color="secondary"
            onClick={onSubmit}
            disabled={!validationResult.valid}
          >
            {t('meetings.save')}
          </Button>
        </Grid>

      </CardContent>
    </Card>
  );
}

function MeetingHeader(props) {
  const { meeting } = props;
  const { t } = useTranslation('translations');

  const d = moment(meeting.date).format('YYYY-MM-DD HH:mm');
  const buttons = [];
  if (meeting.project) {
    buttons.push(
      <Button
        key="p"
        component={Link}
        to={`/project/${meeting.project.ID}`}
        variant="contained"
        color="primary"
        startIcon={<ArrowBackIcon />}
      >
        {t('meetings.toProject')}
      </Button>
    );
  }
  buttons.push(
    <Button
      key="o"
      component={Link}
      to={`/organization/${meeting.host.ID}`}
      variant="contained"
      color="primary"
      startIcon={<ArrowBackIcon />}
    >
      {t('meetings.backToOrganization')}
    </Button>
  );

  const headerProps = {
    subheaderTitle: `${t('assets.organization')} ${meeting.host.name}`,
    subheaderIcon: OrganizationIcon,
  };

  if (meeting.project) {
    headerProps.subheaderTitle = `${t('projects.project')} ${meeting.project.name}`;
    headerProps.subheaderIcon = ProjectIcon;
  }

  return (
    <CardHeader
      avatar={
        <Avatar>
          <MeetingIcon color="action"/>
        </Avatar>
      }
      title={
        <Typography variant="h5">
          {meeting.name}
        </Typography>
      }
      subheader={
        <React.Fragment>
          <TextWithIcon
            icon={<headerProps.subheaderIcon color="action" />}
            variant="caption"
          >
            {headerProps.subheaderTitle}
          </TextWithIcon>
          <TextWithIcon
            icon={<DateIcon color="action" />}
            variant="caption"
          >
            {d}
          </TextWithIcon>
        </React.Fragment>
      }
      action={
        <React.Fragment>
          {buttons.map(b => b)}
        </React.Fragment>
      }
    />
  );
}

export default connect(
  null,
  dispatch => ({
    addAlert: (message) => dispatch(addAlertAction(message)),
    processFiles: (toDel, toAdd, entity) => dispatch(uploadAndDeleteFiles(toDel, toAdd, entity)),
  }),
)(OrganizationMeetingView);
