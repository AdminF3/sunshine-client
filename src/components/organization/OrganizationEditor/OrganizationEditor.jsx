import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import moment from 'moment';

import StepperEditor from '../../../containers/smartcomponents/StepperEditor/StepperEditor';
import { createOrUpateOrganization } from '../../../actions/organizations';
import { uploadFile as uploadFileAction } from '../../../actions/uploads';
import { isResidentsCommunity } from '../../../constants/legalStatusTypes';
import ENDPOINTS from '../../../constants/endpoints';
import {
  OrganizationDetailsForm,
  OrganizationLegalForm,
  OrganizationNameForm,
} from '../OrganizationForms';
import { organizationReducer, organizationInitialState } from './reducers';
import {
  vlalidationRules,
  requiredFilesFields,
  requiredLearApply
} from './utils';

const steps = {
  name: {
    label: 'organizations.nameAndAddress',
    requiredFields: ['name', 'address', 'country'],
    Component: OrganizationNameForm,
  },
  information: {
    label: 'organizations.information',
    requiredFields: [
      'registered',
      'registration_number',
      { name: 'website', rules: [{ ...vlalidationRules.website }] },
      'vat',
      { name: 'email', rules: [{ ...vlalidationRules.email }] },
    ],
    Component: OrganizationDetailsForm,
  },
  legalForm: {
    label: 'organizations.legalForm',
    requiredFields: (s) => {
      // If organization already registered, i.e. this is
      // an edit action - don't require file uploads.
      if (s.ID) {
        return ['legal_form'];
      }
      return [...requiredFilesFields(s.legal_form), ...requiredLearApply(s.legal_form), 'legal_form'];
    },
    Component: OrganizationLegalForm,
  },
};

function OrganizationEditor(props) {
  const {
    title,
    data,
    userUUID,
    submitCreateOrUpdate,
    handleClose,
    submitLEARApplication
  } = props;

  const [stepsOrder, setStepsOrder] = useState(['legalForm', 'name', 'information']);
  const onFinalize = (d) => {
    submitCreateOrUpdate(d).then(res => {
      if (res.message === 'conflict') {
        return;
      }
      if (Object.keys(d.learApplyDoc).length !== 0) {
        submitLEARApplication({
          userID: userUUID,
          file: d.learApplyDoc[0],
          organizationID: res._id,
          organizationName: res.data.name,
        });
      }
      handleClose();
    });
  };

  return (
    <StepperEditor
      open={props.open}
      title={title}
      steps={stepsOrder.map(s => steps[s])}
      reducerFn={organizationReducer}
      initialState={initialState(data, userUUID)}
      handleClose={handleClose}
      handleFinalize={onFinalize}
      onlegal_formChange={lf => {
        if (isResidentsCommunity(lf)) {
          setStepsOrder(['legalForm', 'name']);
        } else {
          setStepsOrder(['legalForm', 'name', 'information']);
        }
      }}
    />
  );
}

function initialState(data, userUUID) {
  const s = { ...organizationInitialState, ...data };
  if (data) {
    s.legal_form = data.legal_form.toString();
    s.logoURL = ENDPOINTS.SERVER + data.logo;
    s.registered = moment(data.registered).format('YYYY-MM-DD');
  } else {
    s.roles.lear = userUUID;
  }

  return s;
}

OrganizationEditor.propTypes = {
  open: PropTypes.bool.isRequired,
  data: PropTypes.shape({
    ID: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    vat: PropTypes.string.isRequired,
    address: PropTypes.string.isRequired,
    registered: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    telephone: PropTypes.string.isRequired,
    website: PropTypes.string.isRequired,
    legal_form: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    country: PropTypes.string.isRequired,
    logo: PropTypes.string.isRequired,
    roles: PropTypes.shape({
      lear: PropTypes.string.isRequired,
      lsigns: PropTypes.array.isRequired,
      leaas: PropTypes.array.isRequired,
      members: PropTypes.array.isRequired,
    }).isRequired,
  }),
};

OrganizationEditor.defaultProps = {
  open: false,
};

export default connect(
  state => ({
    userUUID: state.user.profileInfo._id,
  }),
  dispatch => ({
    submitCreateOrUpdate: (data) => dispatch(createOrUpateOrganization(data)),
    submitLEARApplication: ({ userID, file, organizationID }) => dispatch(uploadFileAction(
      file,
      {
        id: userID,
        type: 'user',
        comment: JSON.stringify({ organizationID }),
        uploadType: 'lear apply',
        kind: 'learApply',
      },
      { successMessageKey: 'translations:roles.applyAsLEARSuccess' },
    )),
  }),
)(OrganizationEditor);
