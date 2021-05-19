import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { useTranslation } from 'react-i18next';
import clsx from 'clsx';
import {
  makeStyles,
} from '@material-ui/core';
import {
  CheckCircleOutline as CheckIcon,
  HighlightOff as CancelIcon,
} from '@material-ui/icons';

import get from '../../../utils/get';
import set from '../../../utils/set';
import { SERVER as backendURL } from '../../../constants/endpoints';
import { updateAnnexesFields } from '../../../actions/annex';
import TextWithIcon from '../../utils/TextWithIcon';

const useStyles = makeStyles(theme => ({
  input: {
    position: 'relative',
    outline: 0,
    marginLeft: theme.spacing(0.5),
    backgroundColor: 'transparent',
    lineHeight: 'inherit',
    fontWeight: 600,
    minWidth: 18,
    border: `1px solid ${theme.palette.divider}`,
    display: 'inline-block',

    '&:hover': {
      borderColor: theme.palette.action.hover,
    },
    '&:active, &:focus': {
      borderColor: `${theme.palette.action.focus} !important`,
    },
  }
}));

const titleKeys = {
  'acquisition meeting': 'milestones.acquisitionMeeting',
  'commitment protocol meeting': 'milestones.commitmentMeeting',
  'kickoff protocol meeting': 'milestones.kickoffMeeting',
  'energy audit report': 'milestones.energyAuditReport',
  'technical inspection report': 'milestones.technicalInspectionReport',
};
const hintKeys = {
  'acquisition meeting': 'milestones.signedProtocolAcquisitionMeetingHint',
  'commitment protocol meeting': 'milestones.signedProtocolCommitmentMeetingHint',
  'kickoff protocol meeting': 'milestones.signedProtocolKickOffMeetingHint',
  'energy audit report': 'milestones.energyAuditReportHint',
  'technical inspection report': 'milestones.technicalInspectionReportHint',
};

function AnnexInlineInstruction(props) {
  const {
    command,
    value,
    project,
    projectSetData,
    fields,
    fieldsSetData,
  } = props;

  const projectID = project.singleProject._id;

  if (!command || !projectID) {
    return value;
  }

  const inputMatch = command.match(/input\s(.*)/);
  if (inputMatch) {
    return (
      <AnnexInlineInput
        projectID={projectID}
        project={project.updateData || {}}
        projectSetData={projectSetData}
        fields={fields}
        fieldsSetData={fieldsSetData}
        storeKey={inputMatch[1]}
        value={value}
      />
    );
  }
  const attachmentsMatch = command.match(/attachment\s?(.*)/);
  if (attachmentsMatch) {
    return (
      <AnnexInlineAttachment
        projectID={projectID}
        attachments={project.singleProject._attachments}
        uploadType={value}
      />
    );
  }
  return null;
}

AnnexInlineInstruction.propTypes = {
  command: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  projectID: PropTypes.string.isRequired,
};

AnnexInlineInstruction.defaultProps = {
  command: '',
  value: '',
  projectID: '',
};

function AnnexInlineAttachment(props) {
  const {
    attachments,
    uploadType,
    projectID,
  } = props;

  const { t } = useTranslation('translations');

  let file;
  for (const fn in attachments) {
    const a = attachments[fn];
    if (a.upload_type === uploadType) {
      file = {
        name: a.name,
        url: `${backendURL}/project/${projectID}/${a.name}`,
      };
      break;
    }
  }

  if (file) {
    return (
      <TextWithIcon icon={<CheckIcon color="primary" />} variant="caption">
        <React.Fragment>
          {t(titleKeys[uploadType])}&nbsp;
          <a href={file.url} target="_blank" rel="noopener noreferrer">{file.name}</a>
        </React.Fragment>
      </TextWithIcon>
    );
  }
  return (
    <TextWithIcon icon={<CancelIcon color="disabled" />} variant="caption">
      {t(hintKeys[uploadType])}
    </TextWithIcon>
  );
}

function AnnexInlineInput(props) {
  const {
    value,
    storeKey,
    projectID,
  } = props;

  const classes = useStyles();

  const storeKeyParts = storeKey.split('.');

  const entity = storeKeyParts[0];
  if (!props[entity]) {
    console.warn(`${entity} not found in props!`); // eslint-disable-line no-console
    return value;
  }
  const updateAction = `${entity}SetData`;
  if (!props[updateAction]) {
    console.warn(`${updateAction} not found in props!`); // eslint-disable-line no-console
    return value;
  }

  const storeValue = get(props, storeKeyParts);

  return (
    <React.Fragment>
      <span
        contentEditable
        suppressContentEditableWarning
        className={clsx(classes.input, 'annex-inline-input')}
        onBlur={e => {
          const v = e.target.innerHTML;
          if (value === v) {
            return;
          }
          props[updateAction](set({ [entity]: { ...props[entity] } }, storeKeyParts, v), projectID);
        }}
      >
        {storeValue}
      </span>
    </React.Fragment>
  );
}

export default connect(
  state => ({
    project: state.project,
    fields: state.project.annexes?.annex67?.annex67Fields || {},
  }),
  dispatch => ({
    projectSetData: (data) => dispatch({ type: 'SET_PROJECT_UPDATE_DATA', data }),
    fieldsSetData: (data, proectID) => dispatch(updateAnnexesFields(data, proectID, { dispatchAlerts: false })),
  }),
)(AnnexInlineInstruction);
