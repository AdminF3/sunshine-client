import React, { useState } from 'react';
import { connect } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useQuery } from '@apollo/client';
import {
  Icon,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Stepper,
  Step,
  StepConnector,
  StepLabel,
  Typography,
  makeStyles,
  withStyles,
} from '@material-ui/core';
import {
  RadioButtonUnchecked as CheckIcon,
  RadioButtonChecked as CheckedIcon,
} from '@material-ui/icons';
import clsx from 'clsx';

import apolloClient from '../../../utils/apolloClient';
import { LIST_MEETINGS } from '../../../actions/organizationsQueries';
import {
  milestonePhases,
  getProjectPhase,
  getPhaseMilestones,
} from '../../../constants/milestones';
import SunshineLogo from '../../../images/Sunshine.png';
import MilestoneStepIcon from './MilestoneStepIcon';
import { stepStatus } from './utils';

const useStyles = makeStyles(theme => ({
  root: {
    '& .MuiStepLabel-label.MuiStepLabel-alternativeLabel': {
      marginTop: theme.spacing(0.5),
    },
  },
  verticalSteper: {
    '& .MuiStepLabel-labelContainer': {
      width: 'auto',
    },
    '& .MuiStepConnector-vertical': {
      padding: `${theme.spacing(0.5)}px 0`,
    },
    '& .MuiStepConnector-lineVertical': {
      minHeight: theme.spacing(1),
    },
  },
  titlePadding: {
    padding: '0 20px',
  },
  sentencize: {
    '&:first-letter': {
      textTransform: 'uppercase',
    },
  },
  filesList: {
    '& .MuiListItem-root': {
      paddingLeft: 20,
      paddingRight: 20,
    },
    '& .MuiListItemIcon-root': {
      minWidth: theme.spacing(4),
    },
  },
  selectedStepLabel: {
    '& .MuiStepLabel-label': {
      fontWeight: 600,
    },
  },
  pointer: {
    cursor: 'pointer',
  },
}));

function MilestonesMap(props) {
  const { project } = props;
  const { t } = useTranslation('translations');
  const classes = useStyles();

  const currentPhase = getProjectPhase(project.data, t);
  const [selectedPhaseIDX, setSelectedPhaseIDX] = useState(currentPhase.idx);

  if (!project?.data) {
    return null;
  }

  return (
    <React.Fragment>
      <Stepper
        alternativeLabel
        activeStep={currentPhase.idx}
        className={classes.root}
        connector={<SunshineStepConnector />}
      >
        {milestonePhases.map((p, i) => {
          return (
            <Step
              key={p.phase}
              className={classes.pointer}
              onClick={() => setSelectedPhaseIDX(i)}
            >
              <StepLabel
                className={clsx({
                  [classes.selectedStepLabel]: selectedPhaseIDX === i
                })}
                StepIconComponent={SunshineStepIcon}
              >
                {t(p.labelKey)}
              </StepLabel>
            </Step>
          );
        })}
      </Stepper>
      <MilestonesStepper
        phase={milestonePhases[selectedPhaseIDX]?.phase}
        project={project}
        disabled={selectedPhaseIDX > currentPhase.idx}
      />
    </React.Fragment>
  );
}

function MilestonesStepper(props) {
  const {
    project,
    phase,
    disabled,
  } = props;
  const { t } = useTranslation('translations');
  const classes = useStyles();
  const listMeetings = useQuery(LIST_MEETINGS, {
    client: apolloClient,
    variables: {
        id: project._id
    }
  });

  const milestone = project.data.milestone.toUpperCase();
  const milestones = getPhaseMilestones(phase, t);

  const stepLabelProps = {};
  let activeStep;
  if (phase !== 'aquisition') {
    stepLabelProps.icon = <CheckedIcon color={disabled ? 'disabled' : 'primary'} />;
    activeStep = -1;
  } else {
    for (let i = 0; i < milestones.length; i++) {
      if (milestones[i].milestoneEnum === milestone) {
        activeStep = i + 1;
        break;
      }
    }
  }

  const [selectedStep, setSelectedStep] = useState(activeStep);
  const [selectedPhase, setSelectedPhase] = useState(phase);
  // Check if the component is rendering new phase.
  if (selectedPhase !== phase) {
    // If so - update the local state.
    setSelectedPhase(phase);
    // And set new initial step, persisting the one from
    // the passed milestone if possible, else set to `0`.
    const initialStep = activeStep < 0 ? 0 : activeStep;
    if (selectedStep !== initialStep) {
      setSelectedStep(initialStep);
    }
  }

  const filesList = [];
  (milestones[selectedStep]?.sections || []).forEach(s => {
    if (!s.uploadType) {
      return;
    }

    const validStatus = stepStatus(s, project._attachments, listMeetings?.data?.listMeetings);
    filesList.push(
      <ListItem key={s.uploadType}>
        <ListItemIcon>
          <MilestoneStepIcon validStatus={validStatus} />
        </ListItemIcon>
        <ListItemText
          primary={s.label}
        />
      </ListItem>
    );
  });

  return (
    <React.Fragment>
      <Stepper
        activeStep={activeStep}
        nonLinear
        orientation="vertical"
        className={classes.verticalSteper}
      >
        {milestones.map((m, i) => {
          return (
            <Step
              key={m.milestoneEnum}
              className={clsx(classes.pointer, {
                [classes.selectedStepLabel]: selectedStep === i,
              })}
              onClick={() => setSelectedStep(i)}
              completed={activeStep > 0 && activeStep > i}
            >
              <StepLabel {...stepLabelProps}>{m.label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      {filesList.length > 0 && (
        <React.Fragment>
          <Typography variant="subtitle2" className={clsx(classes.titlePadding, classes.sentencize)}>
            {t('projects.milestoneRelatedFiles')}
          </Typography>
          <List dense className={classes.filesList}>
            {filesList}
          </List>
          <Typography variant="caption" gutterBottom component="p" className={classes.titlePadding}>
            <i>{t('documents.requiredFilesAreMarkedWithRed')}</i>
          </Typography>
        </React.Fragment>
      )}
    </React.Fragment>
  );
}

function SunshineStepIcon(props) {
  const {
    active,
    completed,
    onClick,
  } = props;

  let icon;
  switch (true) {
    case completed:
      icon = <Icon component="img" src={SunshineLogo} fontSize="large" />;
      break;
    case active:
      icon = <CheckedIcon fontSize="large" color="primary" />;
      break;
    default:
      icon = <CheckIcon fontSize="large" color="disabled" />;
  }
  return <IconButton onClick={onClick}>{icon}</IconButton>;
}

const SunshineStepConnector = withStyles({
  alternativeLabel: {
    top: 30,
    left: 'calc(-50% + 50px)',
    right: 'calc(50% + 50px)',
  },
})(StepConnector);

export default connect(
  state => ({
    project: state.project.singleProject,
  }),
)(MilestonesMap);
