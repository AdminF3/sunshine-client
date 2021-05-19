import React from 'react';
import PropTypes from 'prop-types';
import {
  CheckCircleOutline as CheckCircleOutlineIcon,
  HighlightOff as HighlightOffIcon,
} from '@material-ui/icons';

function MilestoneStepIcon(props) {
  const { validStatus, disabled } = props;

  if (validStatus.valid && validStatus.complete) {
      return <CheckCircleOutlineIcon color="inherit" />;
  }
  if (validStatus.valid) {
      return <HighlightOffIcon color="inherit" />;
  }

  return <HighlightOffIcon color={disabled ? 'disabled' : 'error'} />;
}

MilestoneStepIcon.propTypes = {
  validStatus: PropTypes.shape({
    valid: PropTypes.bool.isRequired,
    complete: PropTypes.bool.isRequired,
  }).isRequired,
  disabled: PropTypes.bool.isRequired,
};

MilestoneStepIcon.defaultProps = {
  disabled: false,
};

export default MilestoneStepIcon;
