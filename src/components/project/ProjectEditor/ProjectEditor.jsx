import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import moment from 'moment';
import {
  Typography,
  makeStyles,
} from '@material-ui/core';

import StepperEditor from '../../../containers/smartcomponents/StepperEditor/StepperEditor';
import { createOrUpdateProject } from './../../../actions/projects';

import { projectEditorReducer, projectEditorInitialState } from './reducer';
import {
  BuildingForm,
  OwnerForm,
  ConstructionPeriodForm,
} from '../ProjectForms';

const useStyles = makeStyles(theme => ({
  root: {
    '& .IconWidget': {
      position: 'relative',
      flexGrow: 1,
      marginTop: theme.spacing(2),
    }
  },
}));

const steps = [
  {
    label: 'projects.ownerInformation',
    requiredFields: ['ownerUUID'],
    Component: OwnerForm,
  },
  {
    label: 'projects.building',
    requiredFields: ['assetUUID'],
    Component: BuildingForm,
  },
  {
    label: 'projects.constructionContractInfo',
    requiredFields: ['construction_from', 'construction_to'],
    Component: ConstructionPeriodForm,
  },
];

function ProjectEditor(props) {
  const {
    title,
    data,
    submitCreateOrUpdate,
    handleClose,
  } = props;

  const classes = useStyles();

  const onFinalize = (d) => {
    submitCreateOrUpdate(d).then(res => {
      if (res.message === 'conflict') {
        return;
      }
      handleClose();
    });
  };

  return (
    <StepperEditor
      title={d => <Title suffix={d.name}>{title}</Title>}
      open={props.open}
      steps={steps}
      className={classes.root}
      reducerFn={projectEditorReducer}
      initialState={projectDataInitialState(data)}
      handleClose={handleClose}
      handleFinalize={onFinalize}
    />
  );
}

function Title(props) {
  const { suffix, children } = props;
  if (!suffix) {
    return children;
  }

  return (
    <React.Fragment>
      {children} <Typography variant="h6" component="span"><strong>{suffix}</strong></Typography>
    </React.Fragment>
  );
}

const dataMap = {
  asset: 'assetUUID',
  owner: 'ownerUUID',
};

function projectDataInitialState(data) {
  const initialState = { ...projectEditorInitialState };

  if (!data) {
    return initialState;
  }

  for (const k in data) {
    if (Object.keys(projectShape).indexOf(k) === -1 || !data[k]) {
      continue;
    }
    if (k in dataMap) {
      initialState[dataMap[k]] = data[k];
      continue;
    }
    if (['construction_from', 'construction_to'].indexOf(k) > -1) {
      initialState[k] = moment(data[k]).format('YYYY-MM-DD');
      continue;
    }
    initialState[k] = data[k];
  }

  return initialState;
}

const projectShape = {
  ID: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  asset: PropTypes.string.isRequired,
  owner: PropTypes.string.isRequired,
  consortium_organizations: PropTypes.array,
  airtemp: PropTypes.number.isRequired,
  watertemp: PropTypes.number.isRequired,
  savings: PropTypes.number.isRequired,
  contract_term: PropTypes.number.isRequired,
  first_year: PropTypes.number.isRequired,
  construction_from: PropTypes.string.isRequired,
  construction_to: PropTypes.string.isRequired,
};

ProjectEditor.propTypes = {
  open: PropTypes.bool.isRequired,
  data: PropTypes.shape(projectShape),
};

ProjectEditor.defaultProps = {
  open: false,
  data: null,
};

export default connect(
  null,
  dispatch => ({
    submitCreateOrUpdate: (data) => dispatch(createOrUpdateProject(data))
  }),
)(ProjectEditor);
