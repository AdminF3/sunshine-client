import React from 'react';
import { connect } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useQuery } from '@apollo/client';
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  List,
  ListItem,
  ListItemIcon,
  Typography,
  ListItemText,
  makeStyles,
} from '@material-ui/core';
import {
  Adjust as CurrentMilestoneIcon,
  Done as CompletePhaseIcon,
  CheckCircleOutline as CompletedIcon,
  DonutLargeSharp as InProgressIcon,
  ExpandMore as ExpandMoreIcon,
  RadioButtonUnchecked as NotStartedIcon,
} from '@material-ui/icons';

import apolloClient from '../../utils/apolloClient';
import { LIST_MEETINGS } from '../../actions/organizationsQueries';
import {
  milestonePhases as phases,
  getProjectPhase,
  getPhaseMilestones,
} from '../../constants/milestones';
import Loader from '../utils/Loader';

const useStyles = makeStyles(theme => ({
  list: {
    flexGrow: 1,
    '& .MuiListItemIcon-root': {
      minWidth: theme.spacing(4),
    },
    '& .MuiListItemText-primary': {
      display: 'flex',
      justifyContent: 'space-between',
    },
  },
  missingFilesList: {
    paddingLeft: 12,
    fontSize: 12,
    // listStyleType: 'none',

    // '& > li': {
    //   fontWeight: 600,
    //   display: 'block',
    //   '&:before': {
    //     content: '–',
    //     position: 'absolute',
    //     marginLeft: -theme.spacing(1),
    //   },
    // },
  },
  titleSummary: {
    '& .MuiSvgIcon-root': {
      marginRight: theme.spacing(1),
    },
  },
}));

function ProjectProgress(props) {
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

  if (listMeetings?.loading) {
    return <Loader />;
  }

  const currentPhase = getProjectPhase(project.data, t);

  return (
    <React.Fragment>
      {phases.map((p, i) => {
        const isCurrentPhase = p.phase === currentPhase.phase;
        const isCompleted = currentPhase.idx > i;
        const milestones = getPhaseMilestones(p.phase, t);
        let icon = <InProgressIcon color="disabled" />;
        if (isCurrentPhase) {
          icon = <CurrentMilestoneIcon color="primary" />;
        } else if (isCompleted) {
          icon = <CompletePhaseIcon color="primary" />;
        }

        return (
          <Accordion key={p.phase} defaultExpanded={isCurrentPhase}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />} className={classes.titleSummary}>
              {icon} <Typography>{t(p.labelKey)}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <List dense className={classes.list}>
                {milestones.map(milestone => {
                  const progress = milestoneProgress(project, listMeetings?.data?.listMeetings, milestone);
                  return (
                    <ListItem key={milestone.milestoneEnum}>
                      <ListItemIcon>
                        {progress.icon}
                      </ListItemIcon>
                      <ListItemText
                        primary={
                          <React.Fragment>
                            {milestone.label} <span>{progress.progress}% {t('milestones.complete')}</span>
                          </React.Fragment>
                        }
                        secondary={progress.missingFiles?.length > 0 && (
                          <React.Fragment>
                            <Typography
                              variant="caption"
                              color="textPrimary"
                            >
                              {t('projects.missingFiles')}
                            </Typography>
                            <ol className={classes.missingFilesList}>
                              {progress.missingFiles.map((f, j) => <li key={j}>{f}</li>)}
                            </ol>
                          </React.Fragment>
                        )}
                        secondaryTypographyProps={{ component: 'div' }}
                      />
                    </ListItem>
                  );
                })}
              </List>
            </AccordionDetails>
          </Accordion>
        );
      })}
    </React.Fragment>
  );
}

function milestoneProgress(project, meetings, milestone) {
  if (!project || !meetings || !milestone) {
    return { progress: 0 };
  }
  const res = { progress: 0, total: 0, completed: 0, missingFiles: [], icon: null };

  for (let i = 0; i < milestone.sections.length; i++) {
    const section = milestone.sections[i];
    if (!section.required) {
      continue;
    }
    res.total++;

    if (section.meeting) {
      if (meetings.some(m => m.topic === section.meeting && m.attachments.length > 0)) {
        res.completed++;
      } else {
        res.missingFiles.push(section.uploadType);
      }

      continue;
    }

    if (Object.values(project._attachments || []).some(f => f.upload_type === section.uploadType)) {
      res.completed++;
    } else {
      res.missingFiles.push(section.uploadType);
    }
  }
  res.progress = (res.completed / res.total) * 100 || 0;
  switch (res.progress) {
    case 100:
      res.icon = <CompletedIcon color="primary" />;
      break;
    case 0:
      res.icon = <NotStartedIcon color="inherit" />;
      break;
    default:
      res.icon = <InProgressIcon color="inherit" />;
  }

  return res;
}

export default connect(
  state => ({
    project: state.project.singleProject,
  })
)(ProjectProgress);
